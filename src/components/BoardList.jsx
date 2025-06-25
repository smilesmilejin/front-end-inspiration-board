import PropTypes from 'prop-types';
import Board from './Board.jsx';
// import './BoardList.css';

const BoardList = ({ boards }) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <div key={board.id}>
          <Board
            id={board.id}
            title={board.title}
            owner={board.owner}
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
      owner: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default BoardList;