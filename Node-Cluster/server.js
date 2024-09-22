const cluster = require("node:cluster");
const http = require('node:http');
const app = require('express');
const os = require('node:os');
const express = require('express');

// const totalCPUs = os.cpus().length;

const numCPUs = require('node:os').availableParallelism();
console.log(numCPUs)

if(cluster.isPrimary){
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
}else{
    const app = express();
    const PORT = 8000;
    app.get("/",(req,res)=>{
        return res.json({message:`Hello from Express server ${process.pid}`})
    });
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}
// For worker

