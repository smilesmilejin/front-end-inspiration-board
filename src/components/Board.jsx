import PropTypes from 'prop-types';
// import './Board.css';

const Board = ({ id, title, owner, onBoardClick }) => {
  const handleClick = () => {
    onBoardClick(id);
  };

  return (
    <div onClick={handleClick}>
      <p>{title}</p>
      <p>{owner}</p>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Board;
