import React from "react";
import {
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "./../components/Votes";
import VMedia from "./../components/VMedia";
import HMedia from "./../components/HMedia";

const API_KEY = "4bcbfabbc30b44ceca30afb09d315286";

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

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );

    const { results } = await response.json();
    setNowPlaying(results);
  };

  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );

    const { results } = await response.json();
    setUpcoming(results);
  };

  const getTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const { results } = await response.json();
    setTrending(results);
  };

  const getData = async () => {
    //Promise.all -> 파라미터의 모든 것들을 수행하는 것을 기다림
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="#999999" />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        {nowPlaying.map((movie) => (
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
          contentContainerStyle={{ paddingLeft: 10 }}
        >
          {trending.map((movie) => (
            <VMedia
              key_id={movie.id}
              poster_path={movie.poster_path}
              original_title={movie.original_title}
              vote_average={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>
      <CommingSoonTitle>Coming Soon</CommingSoonTitle>
      {upcoming.map((movie) => (
        <HMedia
          key_id={movie.id}
          poster_path={movie.poster_path}
          original_title={movie.original_title}
          release_date={movie.release_date}
          overview={movie.overview}
        ></HMedia>
      ))}
    </Container>
  );
};

export default Movies;
