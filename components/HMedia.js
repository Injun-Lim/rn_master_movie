import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const HorizontalMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const ReleaseDate = styled.Text`
  color: white;
  opacity: 0.8;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const OriginalTitle = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia = ({
  key_id,
  poster_path,
  original_title,
  release_date,
  overview,
}) => {
  return (
    <HorizontalMovie key={key_id}>
      <Poster path={poster_path} />
      <HColumn>
        <OriginalTitle>{original_title}</OriginalTitle>
        <ReleaseDate>
          {new Date(release_date).toLocaleDateString("ko")}
        </ReleaseDate>
        <Overview>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HorizontalMovie>
  );
};

export default HMedia;