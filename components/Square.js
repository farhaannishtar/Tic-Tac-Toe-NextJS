import styles from '../styles/Square.module.css';

export default function Square({value, handleSquareClick}) {

  return (
    <div className={styles.square} onClick={() => handleSquareClick()}>{value}</div>
  )
}