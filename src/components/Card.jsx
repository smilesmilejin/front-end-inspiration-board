
import PropTypes from 'prop-types';
// import './Card.css';

const Card = ({ id, message, likes_count, onLike }) => {
  const handleLike = () => {
    onLike(id);
  };

  return (
    <div>
      <div>❌</div>
      <div>{message}</div>
      <div>{likes_count}<button onClick={handleLike}>❤️</button></div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likes_count: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Card;