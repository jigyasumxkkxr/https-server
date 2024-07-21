const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const PORT=3000
app.use(bodyParser.json());
let bookShelf=[] //{id,title,author,description}
app.get('/bookshelf',(req,res)=>{
    res.json(bookShelf)
})
app.get('/bookshelf/:id',(req,res)=>{
    const bookIndex=bookShelf.findIndex(t=>t.id==req.params.id)
    if(bookIndex==-1){
        res.status(404).send("Invalid ID")
    }
    else{
        res.json(bookShelf[bookIndex])
    }
})
app.post('/bookshelf',(req,res)=>{
    const newBook={
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    }
    bookShelf.push(newBook)
    res.status(201).send()
})
app.put('/bookshelf/:id',(req,res)=>{
    const bookIndex=bookShelf.findIndex(t=>t.id==req.params.id)
    if(bookIndex==-1){
        res.status(404).send("Invalid ID")
    }
    else{
        bookShelf[bookIndex].title=req.body.title
        bookShelf[bookIndex].author=req.body.author
        bookShelf[bookIndex].description=req.body.description
        res.status(200).send(bookShelf[bookIndex])
    }
})
app.delete('/bookshelf/:id',(req,res)=>{
    const bookIndex=bookShelf.findIndex(t=>t.id==req.params.id)
    if(bookIndex==-1){
        res.status(404).send("Invalid ID")
    }
    else{
        bookShelf.splice(bookIndex,1)
        res.status(200).send()
    }
})
app.use((req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(PORT,()=>{
    console.log("Listening app on "+ PORT)
})