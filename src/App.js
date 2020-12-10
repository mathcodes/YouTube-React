import React, { useState, useEffect } from "react";

import GithubLink from "./components/GithubLink";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetails";
import VideoList from "./components/VideoList";
import youtube from "./APIS/YouTube";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });
    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  useEffect(() => {
    onTermSubmit("Dogs");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={onTermSubmit} />
      <GithubLink />
      <div className="ui grid">
        <div className="app-row ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList onVideoSelect={onVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
