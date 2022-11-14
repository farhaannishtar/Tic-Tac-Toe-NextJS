import styles from '../styles/Board.module.css';
import Square from './Square.js';

export default function Board({boardValues, handleSquareClick}) {
  return (
    <div className={styles.board}>
      <div className={styles.square_container}>
        <Square value={boardValues[0]} handleSquareClick={() => handleSquareClick(0)}/>
        <Square value={boardValues[1]} handleSquareClick={() => handleSquareClick(1)}/>
        <Square value={boardValues[2]} handleSquareClick={() => handleSquareClick(2)}/>
      </div>
      <div className={styles.square_container}>
        <Square value={boardValues[3]} handleSquareClick={() => handleSquareClick(3)}/>
        <Square value={boardValues[4]} handleSquareClick={() => handleSquareClick(4)}/>
        <Square value={boardValues[5]} handleSquareClick={() => handleSquareClick(5)}/>
      </div>
      <div className={styles.square_container}>
        <Square value={boardValues[6]} handleSquareClick={() => handleSquareClick(6)}/>
        <Square value={boardValues[7]} handleSquareClick={() => handleSquareClick(7)}/>
        <Square value={boardValues[8]} handleSquareClick={() => handleSquareClick(8)}/>
      </div>
    </div>
  )
}