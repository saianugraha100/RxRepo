import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: any) {
    const rxListUrl = `${process.env.RX_API_BASE_URL}/RxData`;
    console.log(rxListUrl);
    const data = await new Promise((resolve, reject) => {
        fetch(rxListUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resolve(data);
        }); 
    });
    console.log(data);
    return NextResponse.json(data, { status: 200 });
}
  