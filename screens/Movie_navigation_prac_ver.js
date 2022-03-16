import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  /* color: ${(props) => (props.selected ? "blue" : "red")}; */
  color: ${(props) => props.theme.textColor};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "one" })}>
    {/* 네비게이터간 이동은 ROOT에서 지정한 네비게이터 이름과 스크린명을 모두 지정해줘야 함 */}
    <Title selected={true}>Movies</Title>
  </Btn>
);

export default Movies;
