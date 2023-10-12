import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';

const initialConfiguration = [
  1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
];

const checkIsArraySorted = (arr: number[]) => {
  for (let index = 1; index < arr.length; index++) {
    if (arr[index] - arr[index - 1] !== 1) {
      return false;
    }
  }
  return true;
};

function App() {
  const [configuration, setConfiguration] = createSignal(initialConfiguration);

  createEffect(() => {
    const config = configuration();
    if (config.at(-1) === 0) {
      const isSorted = checkIsArraySorted(config.slice(0, config.length - 1));
      if (isSorted) {
        alert('Congratulations! You are a winner!');
      }
    }
  });

  const handleTileClick = (tileIndex: number) => () => {
    const zeroIndex = configuration().indexOf(0);

    const isInOneRow = Math.floor(zeroIndex / 4) === Math.floor(tileIndex / 4);
    const isNeighbor = Math.abs(zeroIndex - tileIndex) === 1;
    const isInColumn = Math.abs(zeroIndex - tileIndex) === 4;

    if ((isInOneRow && isNeighbor) || isInColumn) {
      setConfiguration((oldConfig) => {
        const newConfig = [...oldConfig];
        newConfig[zeroIndex] = newConfig[tileIndex];
        newConfig[tileIndex] = 0;
        return newConfig;
      });
    }
  };

  return (
    <div class={styles.board}>
      {configuration().map((tile, index) => {
        if (tile === 0) return <div />;
        return (
          <div class={styles.tile} onClick={handleTileClick(index)}>
            {tile}
          </div>
        );
      })}
    </div>
  );
}

export default App;
