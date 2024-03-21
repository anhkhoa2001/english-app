import React from 'react';
import './css/SummaryTab.scss'

const SummaryTab: React.FC<{summary: React.ReactNode}> = ({summary}) => {
    return <div className="summary-tab">
        <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
}


export default SummaryTab;