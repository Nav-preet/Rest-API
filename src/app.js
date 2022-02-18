const express = require("express");
require("./db/config");
const Student = require("./model/students");
const app = express();
const port = process.env.PORT || 3000;

app.get('/students',async(req,res)=>{
    try{
        const getStudents = await Student.find();
        res.status(200).send(getStudents);
    }catch(e){
        res.status(400).send(e);
    }
    
})

//for single student
app.get('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.status(200).send(studentData);
        }
    }catch(e){
        res.status(400).send(e);
    }
    
})


app.use(express.json());
app.post('/students',(req,res)=>{
    
    console.log(req.body);
    const postStudents = new Student(req.body);
    postStudents.save().then(()=>{
        res.status(201).send(postStudents);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.patch('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{ new : true});
        res.status(200).send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }
    
})

app.delete('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        res.status(200).send(deleteStudent);
    }catch(e){
        res.status(400).send(e);
    }
    
})


app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})