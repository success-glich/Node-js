import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname,'../data/todos.json')

class Todo{
    static async find(){
        
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    static async saveTodos(todos){
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(todos), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    static async create(todo){
        const todos = await this.find();
        todo.id = todos.length ? todos[todos.length - 1].id + 1 : 1;
        todos.push(todo);
        await this.saveTodos(todos);
        return todo;
    }
    static update(id, updatedTodo) {
        const todos = this.find();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index] = { id, ...updatedTodo };
            this.saveTodos(todos);
        }
    }
    static async findById(id) {
        const todos = await this.find();
        return todos.find(todo => todo.id === id);
    }   
    static  async delete(id) {
       try{
        
        const todos = await this.find();
        const filteredTodos = todos.filter(todo => todo.id !== id);
        await this.saveTodos(filteredTodos);
        return true;
       }catch(err){
        console.log(err)
       }
    }
}
export default Todo;