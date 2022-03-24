import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const HorizontalMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
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
  poster_path,
  original_title,
  release_date,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HorizontalMovie>
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
    </TouchableOpacity>
  );
};

export default HMedia;
