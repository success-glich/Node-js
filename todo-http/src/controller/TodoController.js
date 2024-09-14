import Todo from '../model/Todo.js';

class TodoController {
    static  async getTodos(req, res) {
        try {
            const todos = await Todo.find();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(todos));
            
        } catch (error) {
            console.log("error:",error);
            return res.end(JSON.stringify({
                error: "something went wrong",
                message: error.message
                
            }));
        }
    }

    static createTodo(req, res) {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newTodo = JSON.parse(body);
            Todo.create(newTodo);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message:"todo created successfully",data:newTodo,}));
        });
    }

    static updateTodo(req, res) {
        const id = parseInt(req.url.split('/').pop());
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedTodo = JSON.parse(body);
            Todo.update(id, updatedTodo);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedTodo));
        });
    }

    static async deleteTodo(req, res) {
        const id = parseInt(req.url.split('/').pop());
    
        const todo = await Todo.findById(id);
        console.log('todo',todo);
        if(!todo){
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }

         await Todo.delete(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message:"data deleted successfully",
        }));
    }
}


export default TodoController;