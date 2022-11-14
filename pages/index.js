import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Board from '../components/Board.js';
import determineWinner from '../determineWinner';


export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({ isConnected }) {
  const [boardValues, setBoardValues] = useState([]);
  const [OWins, setOwins] = useState(0);
  const [XWins, setXwins] = useState(0);
  const [XTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const fetchValues = async () => {
      const boardValuesFromDB = await fetch('/api/fetchValues');
      const boardValuesJson = await boardValuesFromDB.json();
      let values = [];
      boardValuesJson[0].values.forEach(obj => {
        values.push(obj.value)
      })
      setXTurn(boardValuesJson[0].xTurn);
      setBoardValues(values);
      console.log("I am hard-working")
    };
    fetchValues();
  }, [boardValues]);

  const updateBoard =  async (id, value, xTurn) => {
      const response = await fetch("/api/updateValue", {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          value: value,
        }),
        headers: 
        {
          "Content-Type": 
          "application/json",
        },
      });
      const responseUserTurn = await fetch("/api/updateTurn", {
        method: "PUT",
        body: JSON.stringify({
          xTurn: xTurn 
        }),
        headers: 
        {
          "Content-Type": 
          "application/json",
        },
      });
  };

  const handleSquareClick = (position, message) => {
    console.log(`${position} I've been clicked`);
    const emptyBoard = ['-', '-', '-', '-', '-', '-','-', '-', '-']

    let cloneBoardValues = [...boardValues];
    if (cloneBoardValues[position] !== '-') {
      console.log('cloneBoardValues[position] !== '-'')
      return;
    }
    if (XTurn) {
      cloneBoardValues[position] = 'X';
      updateBoard(position, 'X', XTurn)
      setXTurn(false) 
    } else {
      cloneBoardValues[position] = 'O';
      updateBoard(position, 'O')
      setXTurn(true) 
    }
    setBoardValues(cloneBoardValues);
    
    let winner = determineWinner(cloneBoardValues);
    if (winner === 'X' && winner !== '-') {
      setXwins(XWins + 1);
      console.log("HERE??")
      resetBoard(emptyBoard);
    } else if (winner === 'O' && winner !== '-') {
      setOwins(OWins + 1);
      resetBoard(emptyBoard);
    }
    setWinner(winner);
  }

  const resetBoard =  async (emptyBoard) => {
    setBoardValues(['-', '-', '-', '-', '-', '-','-', '-', '-',])
    const boardValueObj = {}
    emptyBoard.forEach((boardValue, index) => {
      boardValueObj[index] = boardValue;
    })

    const response = await fetch("/api/resetBoard", {
      method: "PUT",
      body: JSON.stringify({ boardValueObj }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });

    const data = await response.json();
  }

  function restart() {
    const emptyBoard = ['-', '-', '-', '-', '-', '-','-', '-', '-']
    resetBoard(emptyBoard);
    setOwins(0);
    setXwins(0);
    setWinner('');
  }

  return (
    
    <div className="container">
      <Head>
        <title>Tic Tac Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>  
        <h2>Tic-Tac-Tito</h2>
        <div className={styles.container2}>
          <Board boardValues={boardValues} handleSquareClick={handleSquareClick}/>
          <div className={styles.scoreboard}>
            <h3>O wins: {OWins} X wins: {XWins}</h3>
            <h3>The Winner: {winner}</h3>
          </div>
        </div>
      <button className={styles.button} onClick={restart}>Restart</button>
      </div>
      This game can be played two player online
    </div>
  )
}
