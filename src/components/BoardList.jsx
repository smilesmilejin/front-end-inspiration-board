import PropTypes from 'prop-types';
import Board from './Board.jsx';
// import './BoardList.css';

const BoardList = ({ boards, ...Board, ... }) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <div>
          <Board
            key={board.id}
            id={board.id}
            title={board.title}
            author={board.author}
            cards={board.cards}
          />
        </div>
      );
    });
  };
  return <div>{getBoardListJSX(boards)}</div>;
};


BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      cards: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BoardList;