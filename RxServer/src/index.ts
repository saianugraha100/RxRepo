/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { routes } from "./routes/index.js";
import express from "express";
import cors from "cors";
import * as syncService from "./services/db-sync-service.js";
const app = express();
app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

syncService.syncDb();

const port = process.env['NODE_DOCKER_PORT'] ?? 8080;

routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});