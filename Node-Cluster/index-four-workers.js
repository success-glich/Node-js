const express = require("express");
const {Worker} = require('worker_threads');
const statusMonitor = require('express-status-monitor')();
const app = express();
const PORT = 8000;
const THREAD_COUNT=4;



function createWorker(){
    return new Promise((resolve,reject)=>{
        const worker = new Worker('./four-worker.js',{
            workerData:{
                thread_count:THREAD_COUNT
            }
        });
        worker.on('message',(counter)=>{
            resolve(counter);
        });

        worker.on('error',(error)=>{
            reject(error);
        })
    });

}



app.use(statusMonitor);

app.get("/",(req,res)=>{
    return res.json({message:`Hello from Express server ${process.pid}`})
});

app.get('/blocking',async(req,res)=>{
    // const worker = new Worker('./worker.js');
    // worker.on('message',(counter)=>{
    // res.status(200).send(`result is ${counter}`)
    // });
    // worker.on("error",(error)=>{
    //     res.status(404).json({message:`An error occurred ${error}}`})
    // })
    // let counter =0;
    // for(let i=0;i<20_0000_0000_00;i++){
    //     counter++;
    // }
    // res.status(200).json({message:`Blocking process ${counter}`})

    const workerPromises = [];
    for(let i=0;i<THREAD_COUNT;i++){
        workerPromises.push(createWorker());
    }

    const thread_results = await Promise.all(workerPromises);
    const total= thread_results.reduce((acc,value)=>acc+value,0);
    res.status(200).send(`result is ${total}`)
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});