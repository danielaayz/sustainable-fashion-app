import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Add this import

import materialsRouter from "./data/materialsDb.js";  // Make sure to include the ".js" extension

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());  // Middleware to parse JSON requests

// Register the materials API routes
app.use('/api', materialsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});