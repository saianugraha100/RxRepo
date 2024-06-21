/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { db } from "../models/index.js";
import * as mockService from "../services/mock-service.js";
export const syncDb = () => {
    db.sequelize.sync()
    .then(() => {
        return Promise.all([ // Returning and thus passing a Promise here
            mockService.demoDataSeed(db.rxData),
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
}