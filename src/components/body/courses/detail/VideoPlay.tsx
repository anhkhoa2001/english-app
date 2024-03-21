import './css/VideoPlay.scss'
import { Player } from 'video-react';
import { Tabs, TabsProps } from 'antd';
import SummaryTab from './SummaryTab';
import ReviewsTab from './ReviewsTab';
import QATab from './Q&ATab';
import { useRef } from 'react';

const VideoPlay: React.FC<{ url_video: string, url_image: string, summary: React.ReactNode }> =
  ({ url_video, url_image, summary }) => {

    const playerRef = useRef();
    const onChange = (key: string) => {
      console.log(key);
    };

    const tabs: TabsProps['items'] = [
      {
        key: '1',
        label: 'Summary',
        children: <SummaryTab summary={summary}></SummaryTab>,
      },
      {
        key: '2',
        label: 'Comment',
        children: <QATab />,
      },
      {
        key: '3',
        label: 'Reviews',
        children: <ReviewsTab />,
      },
    ];
    return <div className="video-play">
      <Player
        playsInline
        poster={url_image}
        src={url_video}
      />
      <div className="video-nav">
        <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
      </div>
    </div>
  }


export default VideoPlay;