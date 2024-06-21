/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "../models/index.js";
import { getBlobClient } from "../util/azure-blob-storage.js";
import { generatePdf } from "../services/pdf-service.js";
const rxDataModel = db.rxData;

// Find a single rxDataModel with an id
export const getPdfDocument = async (req: any, res: any) => {
  const rx: any = await rxDataModel.findByPk(req.params.id);
  console.log(rx);
  const pdfFile = `${rx.id}.pdf`;
  const blobClient = getBlobClient(process.env["DOCUMENTS_CONTAINER"]!, pdfFile);
  console.log(pdfFile);
  const exists: any = await blobClient.exists();
  if (!exists) { 
    console.log(`File ${pdfFile} not exists.`)
    const buffer: any = await generatePdf(rx)
    const uploadResponse = await blobClient.upload(buffer, buffer.length);
    console.log(uploadResponse);
    res.contentType("application/pdf");
    res.send(buffer);
  }
  else {
    console.log(`File ${pdfFile} already exists.`)
    const blobResponse = await blobClient.download();
    if (blobResponse && blobResponse.readableStreamBody) {
        res.contentType("application/pdf");
        blobResponse.readableStreamBody.pipe(res);
    }
    else {
        res.status(500).send({
            message: "Some error occurred while retrieving document."
        });
    }
  }
};