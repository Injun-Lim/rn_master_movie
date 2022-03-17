import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "./../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image`
  /* width: 100%;
  height: 100%;
  position: absolute; */
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
  margin-left: 10px;
`;

const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview1,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdrop_path) }}
      />
      <BlurView
        intensity={80}
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
      >
        <Wrapper>
          <Poster path={poster_path}></Poster>
          <Column>
            <Title>{original_title}</Title>
            <Overview>
              {overview1 ? overview1.slice(0, 150) : "no overview ^^"}...
            </Overview>
            {vote_average > 0 ? <Votes>⭐ {vote_average}/10</Votes> : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
