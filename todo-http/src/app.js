import http from "node:http";
import fs from "node:fs";
import TodoController from "./controller/TodoController.js";
import path from "path";
import url,{fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const {pathname} =url.parse(req.url);

    console.log(`Api hit: ${req.url} => ${req.method} `);

    if (pathname === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, content) => {
            if (err) {
              console.log(err);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (pathname === '/todos' && req.method === 'GET') {
        TodoController.getTodos(req, res);
    } else if (pathname === '/todos' && req.method === 'POST') {
        TodoController.createTodo(req, res);
    } else if (pathname.match(/\/todos\/\d+/) && req.method === 'PUT') {
        TodoController.updateTodo(req, res);
    } else if (pathname.match(/\/todos\/\d+/) && req.method === 'DELETE') {
        TodoController.deleteTodo(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});


const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})