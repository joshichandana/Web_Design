
import Express from 'express';




import cors from 'cors';
import mongoose from "mongoose";
import routes from "./api/routes/index.js";
import bodyParser from "body-parser";

import config from "./api/config/index.js";

const app = Express();
app.use(bodyParser.json());
app.use(Express.json());
app.use(cors());
app.use(Express.urlencoded());



mongoose
    .connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!"); //if connected to db
    })
    
    .catch(err => {
      console.log("Cannot connect to the database!", err); // if not coonected to db
      process.exit();
    });


    routes(app);

    
    
    export default app;



