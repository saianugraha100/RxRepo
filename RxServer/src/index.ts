/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { routes } from "./routes/index.js";
import express from "express";
import cors from "cors";
import { db } from "./models/index.js";
import { demoDataSeed } from "./models/seed-demo-data.js";
const app = express();
app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    return Promise.all([ // Returning and thus passing a Promise here
        // demoDataSeed(db.rxData),
    ]).then(() => {
        // More seeds that require IDs from the seeds above
    }).then(() => {
        console.log('********** Successfully seeded db **********');
    });
    console.log("Synced db.");
  })
  .catch((err: { message: string; }) => {
    console.log("Failed to sync db: " + err.message);
  });
const port = process.env['NODE_DOCKER_PORT'] ?? 8080;

routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});