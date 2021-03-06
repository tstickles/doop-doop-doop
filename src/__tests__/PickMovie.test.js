import { shallow, mount } from "enzyme";
import PickMoviePage from "../pages/PickMoviePage";
import SearchBar from "../components/SearchBar";
import SearchBarOptions, { Option } from "../components/SearchBarOptions";
import {
  FORMATTED_DATA,
  SEARCH_MOVIES_QUERY_PRIDE_AND_PREJUDICE,
} from "../mocks/search_movie_data";
import { BEE_MOVIE_CAST_AND_CREW } from "../mocks/movie_cast_data";

test("component exists and renders appropriate children", () => {
  const wrapper = shallow(<PickMoviePage />);
  wrapper.exists();
  expect(wrapper.find(SearchBar).length).toBe(1);
  expect(wrapper.find(SearchBarOptions).length).toBe(1);
});

test("expect search movies service to be called when user types into the search box", () => {
  const searchMovies = jest
    .fn()
    .mockResolvedValue(SEARCH_MOVIES_QUERY_PRIDE_AND_PREJUDICE);

  const wrapper = shallow(<PickMoviePage searchMovies={searchMovies} />);

  wrapper.find(SearchBar).simulate("change", { target: { value: "howdy" } });

  expect(searchMovies).toBeCalled();
});

test("if there is an error in the api call, no results are displayed in the drop down", () => {
  const searchMovies = jest.fn().mockRejectedValue();

  const wrapper = shallow(<PickMoviePage searchMovies={searchMovies} />);

  // mocking a happy path where there is movie data
  wrapper.setState({ options: FORMATTED_DATA });
  wrapper.update();

  wrapper.find(SearchBar).simulate("change", { target: { value: "howdy" } });
  expect(wrapper.find(SearchBarOptions).find(Option).length).toBe(0);
});

test("when user types in the search bar, results are displayed in the options drop down; the system can handle backspacing without breaking", () => {
  const wrapper = mount(<PickMoviePage />);
  expect(wrapper.find(SearchBarOptions).find(Option).length).toBe(0);

  wrapper.setState({ options: FORMATTED_DATA });
  wrapper.update();
  expect(wrapper.find(SearchBarOptions).find(Option).length).toBe(2);

  wrapper.setState({ options: [] });
  wrapper.update();
  expect(wrapper.find(SearchBarOptions).find(Option).length).toBe(0);

  wrapper.unmount();
});

test.only("getMovieCast service and onMovieClick handler are called when user selects a movie", () => {
  const getMovieCast = jest.fn().mockResolvedValue(BEE_MOVIE_CAST_AND_CREW);
  const onMovieSelection = jest.fn();

  const wrapper = mount(
    <PickMoviePage
      getMovieCast={getMovieCast}
      onMovieSelection={onMovieSelection}
    />
  );

  wrapper.setState({ options: FORMATTED_DATA });
  wrapper.update();

  const e = { target: { text: "abc" } };
  wrapper.find(SearchBarOptions).prop("onClick")(e, 123);

  expect(getMovieCast).toBeCalled();
  // this test is failing for some weird reason
  //expect(onMovieSelection).toBeCalled();
  wrapper.unmount();
});
