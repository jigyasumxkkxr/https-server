const express = require('express');
const app = express();
app.use(express.json())
const zod=require("zod")

const schema=zod.array(zod.number())
// function usernameMiddleware(req,res,next){
//   const username=req.headers.username
//   const password=req.headers.password
//   if(username!=="jigyasumakkxr" || password!=="pass"){
//     res.status(401).send("Authourization Error")
//   }
//   else{
//     next()
//   }
// }
// function kidneyMiddleware(req,res,next){
//   const kidneyCount=req.query.kidney
//   if(kidneyCount!=1 && kidneyCount!=2){
//     res.status(400).send("Wrong Input")
//   }
//   else{
//     next()
//   }
// }
app.post('/kidney',(req,res)=>{
    // kidney == [1,2]
  const kidneys=req.body.kidneys
  const response=schema.safeParse(kidneys)
  if(!response.success){
    res.status(403).json({
        msg:"invalid input"
    })
  }
  else{
    res.send({
        response
      })
  }
  
})
app.listen(3000)