const express=require('express');
const problemRouter=express.Router();

//this code handle by only admin....
problemRouter.post("/create",problemCreate);
problemRouter.patch("/:id",problemUpdate);
problemRouter.delete("/:id",problemDelete);


// And this can handle anyone user or admin.......
// problemRouter.get("/:id",fetchProblem);
// problemRouter.get("/:id",fetchAllProblem);
// problemRouter.get("/:id",solvedProblem);

// Public routes (user or admin)
problemRouter.get("/fetch/:id", fetchProblem);          // fetch specific problem
problemRouter.get("/all", fetchAllProblem);             // fetch all problems
problemRouter.get("/solved/:id", solvedProblem);        // get solved status by user/problem ID

module.exports=problemRouter;