import express from 'express';
import itemRouter from './routes/Item';

const app = express();

app.use(express.json()); // This middleware parses JSON bodies
app.use('/api/items', itemRouter); // Mount the router

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
