import express from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();

// create a book
router.post('/', async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:'send all require feilds: title, author, publish year',
            })
        }

        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        
        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// get all books
router.get('/', async (req,res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// get book by id
router.get('/:id', async (req,res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// update book
router.put('/:id', async (req,res) => {
    try {

        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:'send all require feilds: title, author, publish year',
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).send({message:'Book not found'})
        }

        return res.status(200).send({message: 'Book updated successfully'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})


// delete book
router.delete('/:id', async (req,res) => {
    try {

        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'Book not found'})
        }

        return res.status(200).send({message: 'Book Deleted successfully'})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

export default router;