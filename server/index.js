const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://srestha2002:gaAVOj0Q8ReZpkRX@cluster1.rc5cxbz.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster1")

app.post('/register',(req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.listen(5173, ()=>{
    console.log("server is running")

})