import PropTypes from 'prop-types';
import Card from './Card.jsx';
// import './CardList.css';

const CardList = ({ cards, ...Card, ... }) => {
  const getcardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <div>
          <Card
            key={card.id}
            id={card.id}
            message={card.message}
            likes_count={card.likes_count}
          />
        </div>
      );
    });
  };
  return <div>{getcardListJSX(cards)}</div>;
};


BoardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CardList;