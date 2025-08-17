const express=require('express');
const problemRouter=express.Router();
const adminMiddleware=require('../middleware/adminMiddleware')
//this code handle by only admin....
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.patch("/:id",updateProblem);
problemRouter.delete("/:id",deleteProblem);


// And this can handle anyone user or admin.......
// problemRouter.get("/:id",fetchProblem);
// problemRouter.get("/:id",fetchAllProblem);
// problemRouter.get("/:id",solvedProblem);

// Public routes (user or admin)
problemRouter.get("/fetch/:id", getProblemById);          // fetch specific problem
problemRouter.get("/all", getAllProblem);             // fetch all problems
problemRouter.get("/solved/:id", solvedProblem);        // get solved status by user/problem ID

module.exports=problemRouter;