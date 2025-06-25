import PropTypes from 'prop-types';
import Card from './Card.jsx';
// import './CardList.css';

const CardList = ({ cards, onLike }) => {
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <div key={card.id}>
          <Card
            id={card.id}
            message={card.message}
            likes_count={card.likes_count}
            onLike={onLike}
          />
        </div>
      );
    });
  };
  return <div>{getCardListJSX(cards)}</div>;
};


CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired
    })
  ).isRequired,
};

export default CardList;