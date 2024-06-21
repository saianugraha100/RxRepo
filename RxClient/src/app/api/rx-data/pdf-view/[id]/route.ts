
import { NextResponse } from 'next/server';

export async function GET(req: any, { params }: { params: { id: any } }) {
    console.log(params);
    const pdfUrl = `${process.env.RX_API_BASE_URL}/RxData/PdfView/${params.id}`;
    console.log(pdfUrl);
    const data: any = await new Promise((resolve, reject) => {
        fetch(pdfUrl)
        .then((response) => response.arrayBuffer())
        .then((data) => {
            resolve(data);
        }); 
    });
    const res = new NextResponse(data);
	res.headers.set('Content-Type', 'application/pdf');
    return res; 
}