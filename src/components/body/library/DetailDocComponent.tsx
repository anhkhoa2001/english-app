import './css/DetailDocComponent.scss';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DetailDocComponent: React.FC = () => {

    return <div className="detail-doc">
      <Document file="/hello.pdf" >
        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
}


export default DetailDocComponent;