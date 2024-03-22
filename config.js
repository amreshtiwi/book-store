import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT;
export const mongoDBURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@book-store.qadaouq.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store`;
