'use client'
import PdfViewer from "@/app/components/pdf-viewer";
import { useEffect, useState } from "react";
import Link from 'next/link';

type Data = {
  id: string;
  synopsis: string;
  dosage: string;
  description: string;
}
export default function RxDetail({ params }: any) {
  console.log(`Parameter id: ${params.id}`);
  let [rx, setRx] = useState<Data | null>(null);
  useEffect(() => {
    fetch(`/api/rx-data/${params.id}`)
    .then(response => response.json())
    .then(data => { console.log(data); setRx(data);})
  },[])
  return (
    <main className="flex flex-col justify-between p-24">

      <div className="flex flex-row justify-between">
        <div>
          <h1>Rx Detail</h1>
        </div>
        <div>
          <Link href="/">
            <button className="button button-download">Back to List</button>
          </Link>
        </div>
      </div>
      <br />
      <div className="rx-detail">
        {rx != null && <table className="rx-table">
            <tbody>
                <tr>
                    <td><span className="detail-header">Id</span></td>
                    <td><span>{rx.id}</span></td>
                </tr>
                <tr>
                    <td><span className="detail-header">Synopsis</span></td>
                    <td><span>{rx.synopsis}</span></td>
                </tr>
                <tr>
                    <td><span className="detail-header">Dosage</span></td>
                    <td><span>{rx.dosage}</span></td>
                </tr>
                <tr>
                    <td><span className="detail-header">Description</span></td>
                    <td><span>{rx.description}</span></td>
                </tr>
            </tbody>
        </table>}
      </div>
      <br />
      {rx != null && <div className="rx-detail">
        <PdfViewer rx={rx}></PdfViewer>
      </div>}
    </main>
  );
}
