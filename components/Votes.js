import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

const TrendingVotes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = ({ vote_average, fSize }) => {
  return (
    <TrendingVotes style={{ fontSize: fSize }}>
      {vote_average > 0 ? `⭐ ${vote_average}/10` : "Comming Soon"}
    </TrendingVotes>
  );
};

export default Votes;
