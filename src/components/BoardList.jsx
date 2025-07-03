import PropTypes from 'prop-types';
import Board from './Board.jsx';
import '../styles/BoardList.css';

const BoardList = ({ boards, onBoardClick}) => {
  const pastelColors = ['#FFD464', '#FFC7DE', '#FFFFFF', '#A8FFD3'];
  const getBoardListJSX = (boards) => {
    return boards.map((board,index) => {
      const color = pastelColors[index % pastelColors.length];
      return (
        <Board
          key={board.id}
          id={board.id}
          title={board.title}
          owner={board.owner}
          cards={board.cards}
          onBoardClick={onBoardClick}
          color={color}
        />
      );
    });
  };

  return <ul className='board-list'>{getBoardListJSX(boards)}</ul>;
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