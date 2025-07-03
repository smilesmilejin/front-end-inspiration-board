import PropTypes from 'prop-types';
import { useRef } from 'react';
import Card from './Card.jsx';
import '../styles/CardList.css';

const CardList = ({ cards, onLike, onDelete }) => {
  const pastelColors = ['#FFD601', '#47FFA6', '#FF8D95'];
  const cardColorMap = useRef({});
  const getCardColor = (id) => {
    if (!cardColorMap.current[id]) {
      const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      cardColorMap.current[id] = color;
    }
    return cardColorMap.current[id];
  };
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      
      return (
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
          likes_count={card.likes_count}
          onLike={onLike}
          onDelete={onDelete}
          color={getCardColor(card.id)}
        />
      );
    });
  };
  return <ul className='card-board'>{getCardListJSX(cards)}</ul>;
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