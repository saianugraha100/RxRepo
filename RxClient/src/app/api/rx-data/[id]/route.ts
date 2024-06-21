import { NextResponse } from 'next/server';

export async function GET(req: any, { params }: { params: { id: any } }) {
    console.log(req);
    const rxDetailUrl = `${process.env.RX_API_BASE_URL}/RxData/${params.id}`;
    console.log(rxDetailUrl);
    const data = await new Promise((resolve, reject) => {
        fetch(rxDetailUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resolve(data);
        }); 
    });
    return NextResponse.json(data, { status: 200 });
}