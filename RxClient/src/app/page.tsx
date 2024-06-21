'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const rxListUrl = "/api/rx-data";
  console.log("Url:", rxListUrl);
  let [rxList, setRxList] = useState([]);
  useEffect(() => {
    fetch(rxListUrl)
    .then(response => response.json())
    .then(data =>  setRxList(data))
  },[])
  return (
    <main className="flex flex-col justify-between p-24">
      <div>
        <h1>Rx List</h1>
      </div>
      <br/>
      <div className="rx-list">
          <table className="rx-table">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Synopsis</th>
                      <th>Dosage</th>
                      <th>View Detail</th>
                      
                  </tr>
              </thead>
              <tbody>
                  {rxList && rxList.map((item: any) => (
                      <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.synopsis}</td>
                          <td>{item.dosage}</td>
                          <td>
                            <Link href={`/rx-detail/${item.id}`}>
                              <button className="button button-download">View</button>
                            </Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
      {/* <div>
        <h1>Rx Detail</h1>
      </div>
      <div className="rx-detail">
        <PdfViewer rx={rx}></PdfViewer>
      </div> */}
    </main>
  );
}
