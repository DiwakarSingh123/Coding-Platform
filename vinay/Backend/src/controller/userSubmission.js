const Problem = require('../Models/problem')
const Submission =require('../Models/submission');
const {getLanguageById,submitBatch,submitToken }= require('../utils/problemUtility')
const submitCode = async(req,res)=>{
   
    try{


        const userId = req.user._id;

       

        const problemId = req.params.id;

        const { code,language} = req.body;
        

        if(!userId
            || !problemId||!language
        ){
            return res.status(400).send("some missing field");

        }

        // fetch the problem

        const problem = await Problem.findById(problemId);

       const submittedResult = await  Submission.create({
        userId,
        problemId,
        language,
        code,
        testCasesPassed:0,
        status:'pending',
        testCasesTotal:problem.hiddenTestCases.length
       }) 
        // hidden test cases (judge 0)

          
         

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = problem.hiddenTestCases.map((testcase)=>({
            source_code:code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions); 
        // console.log(submitResult);
        

        const resultToken = submitResult.map((value)=> value.token);

        
        
       const testResult = await submitToken(resultToken);

      //  console.log(testResult);
      let testCasesPassed = 0;
      let runtime =0;
      let memory = 0;
      let status = 'accepted';
      let errorMessage = null;

       for(const test of testResult){

            if(test.status_id==3){
                testCasesPassed++;
                 runtime =runtime+ parseFloat(test.time);
                 memory = Math.max(memory,test.memory)
            }else{
                if(test.status_id==4){
                    status = 'error'
                    errorMessage = test.stdrr
                }else{
                    status = 'wrong result'
                    errorMessage = test.stdrr
                }
            }
       }
      
 
      submittedResult.status = status;
      submittedResult.testCasesPassed = testCasesPassed;
       submittedResult.errorMessage = errorMessage;
        submittedResult.runtime = runtime;
       submittedResult.memory = memory;

     await submittedResult.save();


    //  prolem id ko insert karenge user schema ke problem solved me if not present there

    if(!req.user.problemSolved.includes(problemId)){

        req.user.problemSolved.push(problemId);

       await req.user.save();

    }

     res.status(201).send(submittedResult);

          


    }catch(err){

        res.status(500).send("Internal server error"+err)
    }
}


const runCode = async(req,res)=>{
   
    try{


        const userId = req.user._id;

       console.log(req.user);

        const problemId = req.params.id;
 
        const { code,language} = req.body;
         

        if(!userId
            || !problemId||!language
        ){
            return res.status(400).send("some missing field");

        }

        // fetch the problem

        const problem = await Problem.findById(problemId);

        // visibletest cases (judge 0)

          
         

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = problem.visibleTestCases.map((testcase)=>({
            source_code:code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions); 
        // console.log(submitResult);
        

        const resultToken = submitResult.map((value)=> value.token);

        
        
       const testResult = await submitToken(resultToken);

     res.status(201).send(testResult);

          


    }catch(err){

        res.status(500).send("Internal server error"+err)
    }
}


module.exports = {submitCode,runCode };