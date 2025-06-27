import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import BoardList from './components/BoardList';
import Board from './components/Board';
import CardList from './components/CardList';


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);

// get all boards from database - receive list of objects
const getAllBoardsApi = () => {
  return axios.get(`${kBaseUrl}/boards`) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      console.log(error);
    });
};

// get specific board from database
const getOneBoardApi = (boardId) => {
  return axios.get(`${kBaseUrl}/boards/${boardId}`) 
    .then(response => { 
      return response.data['board'];
    })
    .catch (error => {
      console.log(error);
    });
};

// post new board to the database
const postBoardApi = (newBoardData) => {
  return axios.post(`${kBaseUrl}/boards`, newBoardData)
    .then(response => {
      console.log(response.data.board);
      return response.data["board"];
    })
      .catch (error => {
        console.log(error);
      });
};

// post new card to existing board -- to database
const postCardApi = (board_id, newCardData) => {
  console.log("Posting card with data:", newCardData);

  return axios.post(`${kBaseUrl}/boards/${board_id}/cards`, newCardData)
    .then(response => {
      console.log('###### Post Card API response')
      console.log(response.data);
      return response.data
    })
      .catch (error => {
        console.log(error);
      });
};

// increase likes by one on selected card
const likeCardApi = (cardId) => {
  return axios.patch(`${kBaseUrl}/cards/${cardId}/like`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

// deletes selected card from db
const deleteCardApi = (cardId) => {
  return axios.delete(`${kBaseUrl}/cards/${cardId}`)
    .catch(error => console.log(error));
};


function App() {
  const [boardData, setBoardData] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const selectedBoard = boardData.find((board) => board.id == currentBoardId);
  const [sortType, setSortType] = useState("id-asc"); // default sort by id in ascending

  const changeCurrentBoard = (board_id) => {
    console.log('Selected Board Id is:', board_id);
    setCurrentBoardId(board_id);
};

  // getting all the boards from db and rendering them once on loading the page with UseEffect
  const getAllBoards = () => {
    return getAllBoardsApi().then((boards) => {
      setBoardData(boards);
      if (boards.length > 0) {
        setCurrentBoardId(boards[0].id);
      }
    });
  };
  
  useEffect (()=> {
    getAllBoards(); 
    console.log('I am inside the useEffect')
  }, []); // Empty dependency array: run only once on component mount

  const postBoard = (newBoardData) => {
    postBoardApi(newBoardData)
      .then(newBoard => {
        setBoardData(prevBoards => [...prevBoards, newBoard])
      });
  };

  const postCard = (newCardData) => {
    console.log('postCard');
    postCardApi(currentBoardId, newCardData)
    .then(newCard => {
          setBoardData (prevBoards => {
          console.log('############ in PostCard, prevBoards is :');
          console.log(prevBoards);

          const updatedBoards = prevBoards.map (board => {
            if (board.id === currentBoardId) {
              console.log('when board is matches');
              console.log(board)

              console.log('updated board with new card')
              console.log({
                ...board,
                cards: [...board.cards, newCard]  // add the new card
              })
              
              // create new board object with updated cards
              return {
                ...board,
                cards: [...board.cards, newCard]  // add the new card
              };

            } else {
              return board;
            }
          });
          console.log('Updated boards:', updatedBoards);
          return updatedBoards;
        });
    });
  };

  const likeCard = (cardId) => {
    likeCardApi(cardId).then((updatedCard) => {
      setBoardData((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === currentBoardId) {
            const updatedCards = board.cards.map((card) =>
              card.id === cardId ? updatedCard : card
            );
            return { ...board, cards: updatedCards };
          }
          return board;
        });
      });
    });
  };

  const deleteCard = (cardId) => {
    deleteCardApi(cardId).then(() => {
      setBoardData((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === currentBoardId) {
            const updatedCards = board.cards.filter((card) => card.id !== cardId);
            return { ...board, cards: updatedCards };
          }
          return board;
        });
      });
    });
  };

  const getSortedCards = () => {
    if (!selectedBoard?.cards) return [];

    const sorted = [...selectedBoard.cards];

    switch (sortType) {
      case "id-asc":
        sorted.sort((a, b) => a.id - b.id);
        break;
      case "id-desc":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "likes-asc":
        sorted.sort((a, b) => a.likes_count - b.likes_count);
        break;
      case "likes-desc":
        sorted.sort((a, b) => b.likes_count - a.likes_count);
        break;
      case "message-asc":
        sorted.sort((a, b) => a.message.localeCompare(b.message));
        break;
      case "message-desc":
        sorted.sort((a, b) => b.message.localeCompare(a.message));
        break;
      default:
        break;
    }

    return sorted;
  };


  return (
    <>
      <BoardList boards={boardData} onBoardClick={changeCurrentBoard}/>
      <NewBoardForm onPostBoard={postBoard}/>
      {selectedBoard && (
      <>
        <Board
          id={selectedBoard.id}
          title={selectedBoard.title}
          owner={selectedBoard.owner}
          cards={selectedBoard.cards}
          onBoardClick={changeCurrentBoard}
        />
        <NewCardForm onPostCard={postCard}/>
        <label htmlFor="sort">Sort cards by: </label>
        <select id="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="id-asc">ID ↑ (ascending)</option>
          <option value="id-desc">ID ↓ (descending)</option>
          <option value="likes-asc">Likes ↑ (ascending)</option>
          <option value="likes-desc">Likes ↓ (descending)</option>
          <option value="message-asc">Message A-Z</option>
          <option value="message-desc">Message Z-A</option>
        </select>
        <CardList cards={getSortedCards()} onLike={likeCard} onDelete={deleteCard} />
        {/* <CardList cards={selectedBoard.cards || []} onLike={likeCard} onDelete={deleteCard}/> */}
      </>
    )}
      
    </>
  )
};

export default App;
