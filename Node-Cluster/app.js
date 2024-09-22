const express = require("express");
const {Worker} = require('worker_threads');
const statusMonitor = require('express-status-monitor')();
const app = express();
const PORT = 8000;

app.use(statusMonitor);

app.get("/",(req,res)=>{
    return res.json({message:`Hello from Express server ${process.pid}`})
});

app.get('/blocking',async(req,res)=>{
    const worker = new Worker('./worker.js');
    worker.on('message',(counter)=>{
    res.status(200).send(`result is ${counter}`)
    });
    worker.on("error",(error)=>{
        res.status(404).json({message:`An error occurred ${error}}`})
    })
    // let counter =0;
    // for(let i=0;i<20_0000_0000_00;i++){
    //     counter++;
    // }
    // res.status(200).json({message:`Blocking process ${counter}`})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});