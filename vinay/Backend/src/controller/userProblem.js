const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");
const Problem = require("../Models/problem");
const { findById } = require("../Models/User");
const User = require("../Models/User");

const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        
        
       const testResult = await submitToken(resultToken);

      //  console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator:req.user._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const updateProblem = async(req,res)=>{

  const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


  const {id}=  req.params;
 
    try{
      
      if(!id)
        return   res.staus(400).send('missing id');

         const DsaProblem =await Problem.findById(id);

         if(!DsaProblem)
         return res.status(400).send('Id is not preent at server');
        
      //     for(const {language,completeCode} of referenceSolution){
         

      //       const languageId = getLanguageById(language);
          
      //   // I am creating Batch submission
      //       const submissions = visibleTestCases.map((testcase)=>({
      //       source_code:completeCode,
      //       language_id: languageId,
      //       stdin: testcase.input,
      //       expected_output: testcase.output
      //   }));


      //   const submitResult = await submitBatch(submissions);
      //   // console.log(submitResult);

      //   const resultToken = submitResult.map((value)=> value.token);

        
        
      //  const testResult = await submitToken(resultToken);

      // //  console.log(testResult);

      //  for(const test of testResult){
      //   if(test.status_id!=3){
      //    return res.status(400).send("Error Occured");
      //   }
      //  }

      // }
      
     const newProblem= await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

     res.status(200).send(newProblem); 

      
     
     
    }catch(err){
      res.status(404).send("Error"+err);
  }


}

const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  
  try{

    if(!id){
      return res.status(400).send("missing id");
    }

   const Deletedproblem= await Problem.findByIdAndDelete(id);

   if(!Deletedproblem)
    return res.status(500).send("Problem is missing")

   res.status(200).send("Sucessfully Deleted");



  }catch(err){
    
    res.status(500).send("Error"+err);

  }
 
}

const getProblemById = async(req,res)=>{

 const {id}= req.params;

 try{

  if(!id){
  return  res.status(400).send("Id is missing");
  }

 const getProblem = await Problem.findById(id).select('_id title  description  difficulty  tags visibleTestCases startcode')

 if(!getProblem){
  return  res.send(404).send("problem is not found");
 }

 res.status(200).send(getProblem);

 }catch(err){

  res.status(500).send("Error"+err);
    
 }

}

const getAllproblem = async(req,res)=>{

  try{

    const getProblem = await Problem.find({}).select('_id title difficulty tags')

    if( getProblem.length==0){
      return res,ststus(404).send('Problems are missing')
    }
    res.status(200).send(getProblem);

  }catch(err){
    
    res.status(500).send("Error"+err);
 
  }

}

const solvedAllProblembyUser= async(req,res)=>{

  try{

   const userid = req.user._id;
   const user = await User.findById(userid).populate({
    path:"problemSolved",
    select:'_id title difficulty tags'
   })
   res.status(200).send(user.problemSolved);

  }catch(err){
   res.status(500).send("Server Error"+err);
  }
}


 


module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllproblem,solvedAllProblembyUser}


