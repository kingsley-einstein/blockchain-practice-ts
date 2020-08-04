import express from "express";
import configure from "./config";

// console.log("In app");

const app: express.Application = express();

configure(app);

const port = process.env.PORT || 4444;

app.listen(port, () => {
 console.log(`App is running on port ${port}`);
});
