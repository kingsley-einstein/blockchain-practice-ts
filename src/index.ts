import express from "express";

const app: express.Application = express();

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`App is running on port ${port}`));
