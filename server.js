import path, { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from 'dotenv';
import express from 'express';

import bookRoutes from './routes/books.js';

dotenv.config();
const PORT = process.env.PORT;

// set absolute path
const __fileName = fileURLToPath(import.meta.url);
const PATH = dirname(__fileName);

const app = express();

// set template engin
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'))

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// static folder path
app.use(express.static(path.join(PATH, 'public')))

// routes
app.use('/api/books', bookRoutes);

// 404 route
app.use((req, res) => {
    res.status(200).render('404', { message: `Page doesn't fond` })

})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
