import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const TrendingMovie = styled.View`
  margin-right: 10px;
  align-items: center;
`;

const TrendingTitle = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ key_id, poster_path, original_title, vote_average }) => {
  return (
    <TrendingMovie key={key_id}>
      <Poster path={poster_path} />
      <TrendingTitle>
        {original_title.slice(0, 10)}
        {original_title.length > 10 ? "..." : null}
      </TrendingTitle>

      {vote_average ? <Votes vote_average={vote_average} fSize={12} /> : null}
    </TrendingMovie>
  );
};

export default VMedia;
