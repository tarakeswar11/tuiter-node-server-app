import express from 'express'
import cors from 'cors'
import session from "express-session";
import HelloController from "./controllers/hello-controller.js"
import UserController from './controllers/users/users-controller.js';
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from './controllers/users/auth-controller.js';
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://giuseppi:supersecretpassword@cluster0.wnj4due.mongodb.net/?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/tuiter");
const app = express();
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
   );
app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        // Allow all origins
        callback(null, true);
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow all CRUD operations
    })
  );
  
  

app.use(express.json());
app.options('*', cors());
const port = process.env.PORT || 4000;   
app.use(express.json());
TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT|| 4000);


