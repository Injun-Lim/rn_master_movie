import React from "react";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { FlatList } from "react-native";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 10px;
`;

const HList = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeparator}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={
              item.original_title ? item.original_title : item.original_name
            }
            vote_average={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
