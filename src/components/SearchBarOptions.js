import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

export const Option = ({ id, title, onClick }) => (
  <Dropdown.Item onClick={(e) => {onClick(e, id)}}>
    {title}
  </Dropdown.Item>
);

Option.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}


const SearchBarOptions = ({ movies, onClick }) => {
  return (
    <>
      {!!movies &&
        movies.map((movie) => (
          <Option key={movie.id} id={movie.id} title={movie.title} onClick={onClick} />
        ))}
    </>
  );
};

SearchBarOptions.propTypes = {
  movies: PropTypes.array,
  onClick: PropTypes.func,
};

SearchBarOptions.defaultProps = {
  movies: [],
  onClick: () => {},
};

export default SearchBarOptions;
