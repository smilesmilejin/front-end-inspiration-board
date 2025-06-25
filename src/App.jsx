import { useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);


const getAllBoardssApi = () => {
  return axios.get(`${kBaseUrl}/boards`) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      console.log(error);
    });
};


const postBoardApi = (newBoardData) => {
  return axios.post(`${kBaseUrl}/boards`, newBoardData)
    .then(response => {
      console.log(response.data.board);
      return response.data.board
    })
      .catch (error => {
        console.log(error);
      });
};


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


// testing purpose, need to think set up state for board_id
const board_id = 3;


function App() {
  // const [count, setCount] = useState(0)
  const [boardData, setBoardData] = useState([]);
  // const [boardData, setBoardData] = useState(kBoardData);


  const getAllBoards = () => {
    return getAllBoardssApi()
      .then(boards => setBoardData(boards));
  };


  useEffect (()=> {
    getAllBoards(); 

    console.log('##################')
  }, []); // Empty dependency array: run only once on component mount

  const postBoard = (newBoardData) => {
    postBoardApi(newBoardData)
      .then(newBoard => {
        setBoardData(prevBoards => [...prevBoards, newBoard])
      });
  };

  const postCard = (newCardData) => {
    console.log('postCard');
    postCardApi(board_id, newCardData)
    .then(newCard => {
          setBoardData (prevBoards => {
          console.log('############ in PostCard, prevBoards is :');
          console.log(prevBoards);

          const updatedBoards = prevBoards.map (board => {
            if (board.id === board_id) {
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


  return (
    <>
      <NewBoardForm onPostBoard={postBoard}/>
      <NewCardForm onPostCard={postCard}/>
    </>
  )
}

export default App
