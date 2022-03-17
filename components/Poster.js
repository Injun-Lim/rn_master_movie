import react from "react";
import styled from "styled-components";
import { makeImgPath } from "./../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Poster = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
