import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword));

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : '🔥'}</div>
      {isLoding && <p>Loding...</p>}
      {error && <p>something is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video}></VideoCard>;
          })}
        </ul>
      )}
    </>
  );
}
