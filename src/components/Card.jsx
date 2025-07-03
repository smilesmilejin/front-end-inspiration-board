
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ id, message, likes_count, onLike, onDelete, color }) => {
  const handleLike = () => {
    onLike(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className='card' style={{backgroundColor: color}}>
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
  color: PropTypes.string.isRequired,
};

export default Card;