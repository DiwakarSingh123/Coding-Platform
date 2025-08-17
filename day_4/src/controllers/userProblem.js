const {getlanguageById,submitBatch}=require('../utils/problemUtility');

const createProblem = async (req,res)=>{
   try{
     const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,refranceSolution,problemCreator} = req.body;

    //user ka aaya hua code here.....
    for(const {language,completeCode} of refranceSolution){

        const languageId=getlanguageById(language);

        const submissions = visibleTestCases.map(test => ({
            language_id: languageId,
            source_code: completeCode,
            stdin: test.input,
            expected_output: test.output
        }));


        const response = await submitBatch(submissions);
        res.status(201).json({ message: "Problem created successfully." });
    }
   }catch(err){
     res.status(500).json({ error: "Something went wrong" });
   }
}