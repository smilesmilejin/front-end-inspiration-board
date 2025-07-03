
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const Card = ({ id, message, likes_count, onLike, onDelete, color }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes_count > 0) {
      setLiked(true);
    }
  }, [likes_count]);

  const handleLike = () => {
    if (!liked) setLiked(true);
    onLike(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className='card' style={{backgroundColor: color}}>
      <button className='delete-card' onClick={handleDelete}>×</button>
      <div>{message}</div>
      <div className="like-card">
    <span className="like-count">{likes_count}</span>
    <button
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={handleLike}
    >
       <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
    </button>
  </div>
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