/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import PDFDocument from 'pdfkit';
import concat from 'concat-stream';
import * as rxDataController from "../controllers/rxdata.controller.js";
import { db } from "../models/index.js";
import { getBlobClient } from "../util/azure-blob-storage.js";

const rxDataModel = db.rxData;
export const routes = (app: any) => {
    app.get('/', (req: any, res: any) => {
        res.send('welcome to rx server');
    });

    app.get('/health', (req: any, res: any) => {
        res.send('rx server');
    });

    app.get('/RxData', rxDataController.findAll);
    app.get('/RxData/:id', rxDataController.findOne);
    app.get('/RxData/PdfView/:id', async (req: any, res: any) => {
        const rx: any = await rxDataModel.findByPk(req.params.id);
        console.log(rx);
        const pdfFile = `${rx.id}.pdf`;
        const blobClient = getBlobClient(process.env["DOCUMENTS_CONTAINER"], pdfFile);
        console.log(pdfFile);
        const exists: any = await blobClient.exists();
        if (!exists) { 
            console.log(`File ${pdfFile} not exists.`)
            await generatePdf(req, res, rx, pdfFile, blobClient);
        }
        else {
            console.log(`File ${pdfFile} already exists.`)
            const blobResponse = await blobClient.download();
            res.contentType("application/pdf");
            blobResponse.readableStreamBody.pipe(res);
        }
    });
}

const generatePdf = async (req: any, res: any, rxData: any, pdfFile: any, blobClient: any) => {
    // Create a document
    const doc = new PDFDocument({font: 'Times-Roman'});

    doc.fontSize(18);
    doc.font('Times-Bold')
    .text(rxData.synopsis, {
        align: 'center'
    });
    doc.moveDown();
    doc.moveDown();

    doc.fontSize(12);
    doc.font('Times-Bold')
    .text('Dosage', {
        align: 'left'
    });
    doc.moveDown();

    doc.fontSize(8);
    doc.font('Times-Roman')
    .text(rxData.dosage, {
        align: 'left'
    });
    doc.moveDown();

    doc.fontSize(12);
    doc.font('Times-Bold')
    .text('Description', {
        align: 'left'
    });
    doc.moveDown();

    doc.fontSize(8);
    doc.font('Times-Roman')
    .text(rxData.description, {
        align: 'left'
    });
    doc.moveDown();

    doc.fontSize(12);
    doc.font('Times-Bold')
    .text('Created On', {
        align: 'left'
    });
    doc.moveDown();

    doc.fontSize(8);
    doc.font('Times-Roman')
    .text(rxData.createdAt, {
        align: 'left'
    });
    doc.moveDown();

    // Adding an image in the pdf.
    // doc.image('download3.jpg', {
    //     fit: [300, 300],
    //     align: 'center',
    //     valign: 'center'
    // });

    // Finalize PDF file
    doc.end();
    // Saving the pdf file in root directory.
    // doc.pipe(fs.createWriteStream(pdfFile));
    doc.pipe(concat(async(buffer: any) => {
        // const base64Data = buffer.toString('base64');
        const uploadResponse = await blobClient.upload(buffer, buffer.length);
        console.log(uploadResponse);
        // do something with the string here...
    }));
    res.contentType("application/pdf");
    doc.pipe(res);
}