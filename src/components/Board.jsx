
import PropTypes from 'prop-types';
// import './Board.css';

const Board = ({ id, title, owner, cards }) => {

  return (
    <>
      <p>{title}</p>
      <p>{owner}</p>
    </>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cards: PropTypes.string.isRequired,
};

export default Board;
