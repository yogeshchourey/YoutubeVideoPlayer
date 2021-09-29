import React from 'react';
import PropTypes from 'prop-types';

interface videoData {
    videoId: string,
    start: number
}
const VideoPlayer = (videoData: videoData) => {
    const finalUrl = `https://www.youtube.com/embed/${videoData.videoId}?start=${videoData.start}${videoData.start === 0 ? '' : `&autoplay=1`}`;
    return (
        <div className="videoContainer">
            <iframe
                width="853"
                height="480"
                src={finalUrl}
                frameBorder='0'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
                allowFullScreen
                title="Youtube videos"
            />
        </div>
    )
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired
}

export default VideoPlayer;
