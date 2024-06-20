// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer(props: any) {
    console.log(props.rx);
    const url = `http://localhost:8080/RxData/PdfView/${props.rx.id}`;
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return(
        (props.rx &&
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
        <Viewer
            fileUrl={url}
            plugins={[
                // Register plugins
                defaultLayoutPluginInstance,
            ]}/>
        </Worker>))
}