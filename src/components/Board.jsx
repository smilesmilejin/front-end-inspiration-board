import PropTypes from 'prop-types';
// import './Board.css';

const Board = ({ id, title, owner, onBoardClick }) => {
  const handleClick = () => {
    onBoardClick(id);
  };

  return (
    <li onClick={handleClick}>
      <p>{title}</p>
      <p>{owner}</p>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Board;
