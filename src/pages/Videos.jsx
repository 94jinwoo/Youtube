import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(
    ['videos', keyword],
    async () => {
      return axios
        .get(`/videos/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => res.data.items);
    },
    {}
  );

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
