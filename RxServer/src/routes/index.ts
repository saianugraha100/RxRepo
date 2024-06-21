/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from 'pdfkit';
import concat from 'concat-stream';
import * as rxDataController from "../controllers/rxdata.controller.js";
import * as pdfController from "../controllers/pdf.controller.js";
import * as homeController from "../controllers/home.controller.js";
import { db } from "../models/index.js";
import { getBlobClient } from "../util/azure-blob-storage.js";
import { generatePdf } from "../services/pdf-service.js";

const rxDataModel = db.rxData;
export const routes = (app: any) => {
    app.get('/', homeController.getIndex);
    app.get('/health', homeController.getHealth);
    app.get('/RxData', rxDataController.findAll);
    app.get('/RxData/:id', rxDataController.findOne);
    app.post('/RxData', rxDataController.create);
    app.get('/RxData/PdfView/:id', pdfController.getPdfDocument);
}