import cors from 'cors'

import express from "express"
import "dotenv/config";
import { swaggerDocs } from './swagger/swagger.js';
import testRoute from "./routes/tests.routes.js"

//import path from "path";

// import { fileURLToPath } from "url";

// // recreate __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 8000;

//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log(process.env.FRONT_END, "is trh front end");
//general middleware
app.use(express.json());

app.use(cors({
    origin: process.env.FRONT_END,
    credentials: true
}));


// Register Swagger
swaggerDocs(app, port);

//routes
app.use(testRoute);


//app.use(express.text({type:['text/plain', 'text/html', 'application/javascript', 'application/xml']}));
//app.use(express.urlencoded());


app.use((error, req, res, next)=>{ //universal error handling middleware.
    return res
    .status(error.status||501)
    .json({message:error.message || "something went wrong"});
})

app.listen(port,  () => {
    console.log(`app is running on port ${port}`);
})