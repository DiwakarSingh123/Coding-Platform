const express =require('express');
const problemRouter =express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllproblem,solvedAllProblembyUser} = require('../controller/userProblem')
const userMiddleware = require('../middleware/userMiddleware');



problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);


problemRouter.get("/ProblemById/:id", userMiddleware, getProblemById);

problemRouter.get("/getAllProblem",getAllproblem);
problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblembyUser);

module.exports = problemRouter;