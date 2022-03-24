import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "./../utils";
import Poster from "./Poster";
import Votes from "./Votes";

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
  fullData,
}) => {
  // const isDark = useColorScheme() === "dark";
  /* 테스트용으로 전부 darkTheme, 후에 위 주석 해제 필요 */
  const isDark = true;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
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
              {vote_average > 0 ? (
                <Votes vote_average={vote_average} fSize={14} />
              ) : null}
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
