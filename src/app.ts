import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/UserRoutes";
import bookRoutes from "./routes/BookRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

export class App {
    private readonly app: Application;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddlewares(): void {
        this.app.use(bodyParser.json());
    }

    private setupRoutes(): void {
        this.app.use("/users", userRoutes);
        this.app.use("/books", bookRoutes);
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandlerMiddleware);
    }

    public start(port: number | string): void {
        this.app.listen(port, () => console.log(`Server running on port: ${port}`));
    }
}
