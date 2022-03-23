import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const TrendingMovie = styled.View`
  align-items: center;
`;

const TrendingTitle = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ poster_path, original_title, vote_average }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <TrendingMovie>
        <Poster path={poster_path} />
        <TrendingTitle>
          {original_title.slice(0, 10)}
          {original_title.length > 10 ? "..." : null}
        </TrendingTitle>

        {vote_average ? <Votes vote_average={vote_average} fSize={12} /> : null}
      </TrendingMovie>
    </TouchableOpacity>
  );
};

export default VMedia;
