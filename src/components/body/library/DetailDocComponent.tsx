import './css/DetailDocComponent.scss';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Document, Page, pdfjs } from 'react-pdf';
import { DocumentDTO } from '../../../entity/props/DocumentDTO';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DetailDocComponent: React.FC<{item?: DocumentDTO}> = ({item}) => {


    return <div className="detail-doc">
      <Document file={item?.link} >
        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
}


export default DetailDocComponent;