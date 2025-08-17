const express=require('express');
const submitRouter=express.Router();
const userMiddleware=require('../middleware/userMiddleware');
const submitCode=require('../controllers/userSubmission')

submitRouter.post('/submit/:id',userMiddleware,submitCode);



// echo "# Coding-Platform" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/DiwakarSingh123/Coding-Platform.git
// git push -u origin main
// …or push an existing repository from the command line
// git remote add origin https://github.com/DiwakarSingh123/Coding-Platform.git
// git branch -M main
// git push -u origin main