/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from 'pdfkit';
import concat from 'concat-stream';

export const generatePdf = async (rxData: any) => {
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
    const promise = new Promise((resolve) => {
      doc.pipe(concat((buffer: any) => {
        resolve(buffer);
      }));
    });
    return promise;
}