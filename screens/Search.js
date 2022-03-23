import React, { useState } from "react";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "./../utils/api";
import { useQuery } from "react-query";
import Loader from "./../components/Loader";
import HList from "./../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 20px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, { enabled: false });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });

  const onChangeText = (text) => {
    setQuery(text);
  };

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {movieLoading || tvLoading ? <Loader /> : null}
      {movieData ? (
        <HList title="Movie Result" data={movieData.results} />
      ) : null}
      {tvData ? <HList title="TV Result" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
