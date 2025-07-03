import PropTypes from 'prop-types';
import '../styles/Board.css';

const Board = ({ id, title, owner, onBoardClick,color }) => {
  const handleClick = () => {
    onBoardClick(id);
  };

  return (
    <li onClick={handleClick} style={{backgroundColor:color}}>
      <p className='board-title'>{title}</p>
      <p className='board-owner-2'>{owner}</p>
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
