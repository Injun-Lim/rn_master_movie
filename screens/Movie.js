import React from "react";
import {
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Text,
  FlatList,
  View,
  LogBox,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "./../components/Votes";
import VMedia from "./../components/VMedia";
import HMedia from "./../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "./../utils/api";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]); // js timer 오류 무시하는 구문

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//const SCREEN_HEIGHT = Dimensions.get("window").height;와 동일

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  width: 10px;
`;
const HSeparator = styled.View`
  height: 10px;
`;

const Movies = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["nowPlaying", "movies"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["upcoming", "movies"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery(["trending", "movies"], moviesApi.trending);

  const onRefresh = async () => {
    console.log("refreshing");
    queryClient.refetchQueries(["movies"]);
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
    />
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );

  const movieKeyExtractor = movieKeyExtractor;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  console.log(refreshing);
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="#999999" />
    </Loader>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview1={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              data={trendingData.results}
              keyExtractor={movieKeyExtractor}
              ItemSeparatorComponent={VSeperator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <CommingSoonTitle>Coming Soon</CommingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
