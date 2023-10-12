import dotenv from 'dotenv';
import express from 'express';
import bookRoutes from './routes/books.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// parse body
app.use(express.json());

app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
