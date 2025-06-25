
import PropTypes from 'prop-types';
// import './Card.css';

const Card = ({ id, message, likes_count, onLike, onDelete }) => {
  const handleLike = () => {
    onLike(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li>
      <button onClick={handleDelete}>❌</button>
      <div>{message}</div>
      <div>{likes_count}<button onClick={handleLike}>❤️</button></div>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likes_count: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;