import React from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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
const TrendingMovie = styled.View`
  margin-right: 10px;
  align-items: center;
`;
const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const TrendingTitle = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const TrendingVotes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HorizontalMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const ReleaseDate = styled.Text`
  color: white;
  opacity: 0.8;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

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
            <TrendingMovie key={movie.id}>
              <Poster path={movie.poster_path} />
              <TrendingTitle>
                {movie.original_title.slice(0, 10)}
                {movie.original_title.length > 10 ? "..." : null}
              </TrendingTitle>

              <TrendingVotes>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average}/10`
                  : "Comming Soon"}
              </TrendingVotes>
            </TrendingMovie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <CommingSoonTitle>Coming Soon</CommingSoonTitle>
      {upcoming.map((movie) => (
        <HorizontalMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <TrendingTitle>{movie.original_title}</TrendingTitle>
            <ReleaseDate>
              {new Date(movie.release_date).toLocaleDateString("ko")}
            </ReleaseDate>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 140
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HorizontalMovie>
      ))}
    </Container>
  );
};

export default Movies;
