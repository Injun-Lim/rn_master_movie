import React, { useState } from "react";
import { Dimensions, FlatList, LogBox } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import HList from "../components/HList";
import Slide from "../components/Slide";
import HMedia from "./../components/HMedia";
import Loader from "./../components/Loader";
import VMedia from "./../components/VMedia";
import { moviesApi } from "./../utils/api";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]); // js timer 오류 무시하는 구문

const Container = styled.ScrollView``;

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
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    // getNextPageParam을 쓰면 api에서 pageParam 인자를 받을 수 있고, 이를 api에 그대로 넘겨주면 된다. 이번의 경우 moviesApi.upcoming에 이걸 활용함.
    getNextPageParam: (currentPage) => {
      //인자는 2개를 받을 수 있음. (현재 페이지, 페이지 모두) Movie API는 이게 잘 구현되어 있어서 인자 1개로 한다고 함.
      if (currentPage.page + 1 > currentPage.total_pages) {
        return null;
      }
      return currentPage.page + 1;
    },
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );

  const movieKeyExtractor = (item) => {
    return item.id;
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // const refreshing =
  //   isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const loadMore = (hasNextPage) => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore} /* 무한스크롤 - function 실행 */
      // onEndReachedThreshold={0.4} /* 무한스크롤 - function 실행할 시점 설정 */
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
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <CommingSoonTitle>Coming Soon</CommingSoonTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
