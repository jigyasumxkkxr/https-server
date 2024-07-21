// const express = require('express')
// const bodyParser=require("body-parser")
// const app = express()
// const port = 3000

// app.get('/conversations',(req,res)=>{
//   res.send("hello")
// })

// app.use(bodyParser.json())
// app.post('/conversations',(req,res)=>{
//   const data=req.body;
//   // console.log(data)
//   console.log("Name: "+data.name)
//   console.log("Age: "+data.age)
//   console.log("Gender: "+data.gender)
//   res.send()
// })
// app.post('/conversations',(req,res)=>{
//   console.log(req.headers["authorization"])
//   res.send({
//     msg:"2+2 equals 4."
//   })
// })
// function calculateSum(n){
//   let ans=0;
//   for(let i=1;i<n;i++){
//     ans+=i
//   }
//   return ans
// }

// app.get('/',(req,res)=>{
//   const n=req.query.n
//   res.send(calculateSum(n).toString())
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const express = require('express');
//     const fs = require('fs');
//     const path = require('path');
//     const app = express();
    
//     app.get('/files',(req,res)=>{
//       files=fs.readdir('D:\\Code\\cohort\\assignments\\week-2\\02-nodejs\\files',(err,files)=>{
//         res.json({
//           file:files
//         })
//       })
//     })
//     app.get('/file/:filename',(req,res)=>{
//       const fileName=req.params.filename
//       const filePath='D:\\Code\\cohort\\assignments\\week-2\\02-nodejs\\files\\'+fileName
//       fs.readFile(filePath,'utf-8',(err,data)=>{
//         if(err){
//           if (err.code === 'ENOENT') {
//             res.status(404).send('File not found');
//           } else {
//             res.status(500).send('Error reading file');
//           }
//         }
//         else{
//           res.json(data)
//         }
//       })
//     })
//     app.use((req, res) => {
//       res.status(404).send('Route not found');
//     });

//     app.listen(3000)

const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  app.use(bodyParser.json());
  var todoList=[]
  // todo ->{ title:"scjhsdh" , description:"dsvhs"}
  
  app.get('/todos',(req,res)=>{
    res.json(todoList)
  })
  app.get('/todos/:id',(req,res)=>{
    const todoID=req.params.id
    let filteredTodos = todoList.filter(todo => {
      return todo.id == todoID;
  });
    if(filteredTodos.length==0){
      res.status(404).send("Not Found")
    }
    else{
      res.status(200).json(filteredTodos[0])
    }
  })
  app.post('/todos',(req,res)=>{
    const newTodo={
      id: Math.floor(Math.random() * 1000000),
      title:req.body.title,
      description:req.body.description
    }
    todoList.push(newTodo)
    res.status(201).json(newTodo)
  })
  app.put('/todos/:id',(req,res)=>{
    const todoIndex=todoList.findIndex(t=> t.id==req.params.id)
    if(todoIndex==-1){
      res.status(404).send()
    }
    else{
      todoList[todoIndex].title=req.body.title
      todoList[todoIndex].description=req.body.description
      res.json(todoList[todoIndex]);
    }
  })
  app.delete('/todos/:id',(req,res)=>{
    const todoIndex=todoList.findIndex(t=> t.id==req.params.id)
    if(todoIndex==-1){
      res.status(404).send()
    }
    else{
      todos.splice(todoIndex, 1);
      res.status(200).send();
    }
  })
  app.use((req, res) => {
    res.status(404).send();
  });
  app.listen(3000)