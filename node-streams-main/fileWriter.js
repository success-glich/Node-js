const fs = require('fs');

const writableStream = fs.createWriteStream('log.txt');


setTimeout(()=>{
    writableStream.write("hello after 10 seconds")
},10*1000)

process.stdin.pipe(writableStream);

const readableSteam = fs.createReadStream('log.txt');

readableSteam.pipe(process.stdout);




// process.stdout("hello boys");