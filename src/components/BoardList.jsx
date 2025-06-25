import PropTypes from 'prop-types';
import Board from './Board.jsx';
// import './BoardList.css';

const BoardList = ({ boards, onBoardClick}) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <Board
          key={board.id}
          id={board.id}
          title={board.title}
          owner={board.owner}
          cards={board.cards}
          onBoardClick={onBoardClick}
        />
      );
    });
  };

  return <ul>{getBoardListJSX(boards)}</ul>;
};


BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default BoardList;