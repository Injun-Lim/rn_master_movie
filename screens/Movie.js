import React from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";

const API_KEY = "4bcbfabbc30b44ceca30afb09d315286";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//const SCREEN_HEIGHT = Dimensions.get("window").height;와 동일

const Movies = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

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

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="#999999" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
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
    </Container>
  );
};

export default Movies;
