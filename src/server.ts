import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/dataSource";
import { App } from "./app";

const startServer = async () => {
    const port = process.env.PORT || 3000;
    try {
        await AppDataSource.initialize();

        const app = new App();
        app.start(port);
    } catch (error) {
        console.error('Error during server initialization:', error);
        process.exit(1);
    }
};

startServer();