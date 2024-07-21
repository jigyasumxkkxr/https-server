const express=require("express")
const app=express()
const PORT=3000;
app.use(express.json())
var users=[{
    name:'John',
    kidneys:[{
        healthy:'false'
    },{
        healthy:'true'
    }]
}]

app.get('/',(req,res)=>{
    const patientName=users[0]["name"]
    const noOfKidney=users[0]["kidneys"].length
    let healthyKidney=0;
    for(let i=0;i<noOfKidney;i++){
        if(users[0].kidneys[i].healthy=='true'){
            healthyKidney++
        }
    }
    const unhealthyKidney=noOfKidney-healthyKidney
    res.json({
        patientName,
        noOfKidney,
        healthyKidney,
        unhealthyKidney
    })
})

app.post('/',(req,res)=>{
    const isHealthy=req.body.healthy
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.send("Done!")
})

app.put('/',(req,res)=>{
    let kidneyunhealthy=atleastOneUnhealthyKidney();
    if(kidneyunhealthy=='true'){
        for(let i=0;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy='true'
        }
        res.send("all healthy!")
    }
    else{
        res.status(400).json({
            msg:'There are all healthy kidneys'
        })
    }
})

app.delete('/',(req,res)=>{
    let kidneyunhealthy=atleastOneUnhealthyKidney();
    if(kidneyunhealthy=='true'){
        let newKidneys=[]
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy=='true'){
                newKidneys.push({
                    healthy:'true'
                })
            }
        }
        users[0].kidneys=newKidneys
        res.send("deleted unhealthy kidneys")
    }
    else{
        res.status(400).json({
            msg:'There are all healthy kidneys'
        })
    }
})
function atleastOneUnhealthyKidney(){
    let oneUnhealthyKidney='false'
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy=='false'){
            oneUnhealthyKidney='true'
        }
    }
    return oneUnhealthyKidney
}

app.listen(PORT,()=>{
    console.log("Listining on port "+PORT)
})