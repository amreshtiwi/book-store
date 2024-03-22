import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";


const app = express();

app.use(express.json());

app.use(cors())

app.use('/books',bookRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to DB');
    app.listen(PORT,()=>{
        console.log(`App is listen on port: ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
}
)
