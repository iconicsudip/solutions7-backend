import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mainRoutes from "./route"
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import cors from 'cors';
import "reflect-metadata";
import path from 'path';
import websiteRoutes from './route/website.route';
AppDataSource.initialize().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*'
    }))
    // Set the views directory
    app.set('views', path.join(__dirname, 'views'));
    // Set the templating engine (e.g., EJS)
    app.set('view engine', 'ejs'); // Change this if using another engine like Pug
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    const PORT = process.env.APP_PORT || 8000;

    app.use('/api/v0/', mainRoutes);
    app.use("/", websiteRoutes);
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Route Not found" });
    });

    app.listen(PORT, async () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch((error) => {
    console.error(error);
    process.exit(1);
});