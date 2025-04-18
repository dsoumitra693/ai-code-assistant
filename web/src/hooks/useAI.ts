import axios from "axios";
import { API_ENDPOINT, API_KEY, MAX_TOKENS, MODEL, SYSTEM_PROMPT, TEMPERATURE, USER_PROMPT } from "../utils/constant";

export default function useAI() {
    const generatePlan = async (taskDescription: string) => {
        try {
            if (!API_ENDPOINT || !API_KEY) {
                throw new Error("API endpoint or key not found");
            }
            const requestBody = {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: USER_PROMPT(taskDescription)
                    }
                ],
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS
            };

            console.log("Request Body:", requestBody);  // Debugging request

            // const response = await axios.post(API_ENDPOINT!, requestBody, {
            //     headers: {
            //         Authorization: `Bearer ${API_KEY}`,
            //         "Content-Type": "application/json",
            //     }
            // });

            const response = {
                data: {
                    "choices": [
                        {
                            "finish_reason": "stop",
                            "index": 0,
                            "logprobs": null,
                            "message": {
                                "content": "# Step-by-Step Plan to Create a Todo App with Node.js\n\nHere's a complete guide to building a simple todo app with Node.js, Express, and MongoDB:\n\n## 1. Initialize the Project\n```bash\nmkdir todo-app\ncd todo-app\nnpm init -y\n```\n\n## 2. Install Required Dependencies\n```bash\nnpm install express mongoose body-parser ejs\n```\n\n## 3. Create Basic Server Structure\n\nCreate `app.js`:\n```javascript\nconst express = require('express');\nconst bodyParser = require('body-parser');\nconst mongoose = require('mongoose');\nconst app = express();\n\n// Middleware\napp.use(bodyParser.urlencoded({ extended: true }));\napp.use(express.static('public'));\napp.set('view engine', 'ejs');\n\n// Database connection\nmongoose.connect('mongodb://localhost:27017/todoDB', { \n    useNewUrlParser: true, \n    useUnifiedTopology: true \n});\n\n// Todo Schema\nconst todoSchema = new mongoose.Schema({\n    task: String,\n    completed: {\n        type: Boolean,\n        default: false\n    },\n    created: {\n        type: Date,\n        default: Date.now\n    }\n});\n\nconst Todo = mongoose.model('Todo', todoSchema);\n\n// Routes\napp.get('/', async (req, res) => {\n    try {\n        const todos = await Todo.find({});\n        res.render('index', { todos: todos });\n    } catch (err) {\n        console.error(err);\n        res.status(500).send('Server Error');\n    }\n});\n\napp.post('/add', async (req, res) => {\n    const newTodo = new Todo({\n        task: req.body.task\n    });\n    try {\n        await newTodo.save();\n        res.redirect('/');\n    } catch (err) {\n        console.error(err);\n        res.status(500).send('Server Error');\n    }\n});\n\napp.post('/complete/:id', async (req, res) => {\n    try {\n        const todo = await Todo.findById(req.params.id);\n        todo.completed = !todo.completed;\n        await todo.save();\n        res.redirect('/');\n    } catch (err) {\n        console.error(err);\n        res.status(500).send('Server Error');\n    }\n});\n\napp.post('/delete/:id', async (req, res) => {\n    try {\n        await Todo.findByIdAndDelete(req.params.id);\n        res.redirect('/');\n    } catch (err) {\n        console.error(err);\n        res.status(500).send('Server Error');\n    }\n});\n\n// Start server\nconst PORT = 3000;\napp.listen(PORT, () => {\n    console.log(`Server running on http://localhost:${PORT}`);\n});\n```\n\n## 4. Create Views Directory and EJS Templates\n\nCreate `views/index.ejs`:\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Todo App</title>\n    <style>\n        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }\n        .todo-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }\n        .completed { text-decoration: line-through; color: #888; }\n        form { display: flex; margin-bottom: 20px; }\n        input[type=\"text\"] { flex-grow: 1; padding: 8px; }\n        button { padding: 8px 15px; cursor: pointer; }\n    </style>\n</head>\n<body>\n    <h1>Todo App</h1>\n    \n    <form action=\"/add\" method=\"POST\">\n        <input type=\"text\" name=\"task\" placeholder=\"Add a new task\" required>\n        <button type=\"submit\">Add</button>\n    </form>\n\n    <ul>\n        <% todos.forEach(todo => { %>\n            <li class=\"todo-item <%= todo.completed ? 'completed' : '' %>\">\n                <%= todo.task %>\n                <div>\n                    <form action=\"/complete/<%= todo._id %>\" method=\"POST\" style=\"display: inline;\">\n                        <button type=\"submit\"><%= todo.completed ? 'Undo' : 'Complete' %></button>\n                    </form>\n                    <form action=\"/delete/<%= todo._id %>\" method=\"POST\" style=\"display: inline;\">\n                        <button type=\"submit\">Delete</button>\n                    </form>\n                </div>\n            </li>\n        <% }); %>\n    </ul>\n</body>\n</html>\n```\n\n## 5. Create Public Directory for Static Files\n\nCreate `public/style.css` (optional - we're using inline styles in this example):\n```css\n/* Additional styles can be added here if needed */\n```\n\n## 6. Start MongoDB Server (Make sure MongoDB is installed and running)\n```bash\n# On macOS with Homebrew:\nbrew services start mongodb-community\n\n# On Linux (Ubuntu/Debian):\nsudo systemctl start mongod\n\n# On Windows (run as Administrator):\nnet start MongoDB\n```\n\n## 7. Run the Application\n```bash\nnode app.js\n```\n\n## 8. Access the Application\nOpen your browser and visit:\n```\nhttp://localhost:3000\n```\n\n## Complete Features:\n- Add new todos\n- Mark todos as complete/incomplete\n- Delete todos\n- Persistent storage with MongoDB\n- Responsive design\n\nTo stop the application, press `Ctrl+C` in the terminal.",
                                "role": "assistant"
                            }
                        }
                    ],
                    "created": 1744904859.0717163,
                    "id": "50600e8c-3292-4f91-bbe1-e227f62a9b7a",
                    "model": "DeepSeek-V3-0324",
                    "object": "chat.completion",
                    "system_fingerprint": "fastcoe",
                    "usage": {
                        "completion_tokens": 1193,
                        "completion_tokens_after_first_per_sec": 237.36731761339138,
                        "completion_tokens_after_first_per_sec_first_ten": 237.6211986794456,
                        "completion_tokens_per_sec": 231.28144871036608,
                        "end_time": 1744904859.071653,
                        "is_last_response": true,
                        "prompt_tokens": 69,
                        "start_time": 1744904853.9134355,
                        "stop_reason": "stop",
                        "time_to_first_token": 0.13646459579467773,
                        "total_latency": 5.158217430114746,
                        "total_tokens": 1262,
                        "total_tokens_per_sec": 244.65816284365633
                    }
                }
            }

            return {
                success: true,
                data: response.data.choices[0].message.content,
            };
        } catch (error) {
            const errorObj = error as Error
            console.error("Error generating plan:", errorObj.message);
            return {
                success: false,
                data: errorObj.message
            };
        }
    };

    return { MODEL, generatePlan };
}