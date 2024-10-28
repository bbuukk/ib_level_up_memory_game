import MemoryDashboard from 'components/memory/memoryDashboard';
import MemoryTable from 'components/memory/memoryTable';
import MemoryVictoryModal from 'components/memory/memoryVictoryModal';
import { useState, useRef } from 'react';

const Root = () => {
  const [clicks, setClicks] = useState(0);
  const [gameState, setGameState] = useState('running');

  const victorySound = useRef(new Audio('/sounds/victory.mp3'));

  function restartGame() {
    setClicks(0);
    setGameState('restart');

    //set back to running in next render
    setTimeout(() => {
      setGameState('running');
    }, 0);
  }

  function registerVictory() {
    setGameState('victory');
  }

  return (
    <>
      <main className="flex max-w-[900px] flex-col items-center">
        <MemoryTable
          gameState={gameState}
          addClick={() => setClicks(clicks + 1)}
          registerVictory={registerVictory}
        />
        <MemoryDashboard
          clicks={clicks}
          restartGame={restartGame}
          gameState={gameState}
        />
      </main>

      {gameState === 'victory' && (
        <MemoryVictoryModal
          clicks={clicks}
          restartGame={restartGame}
          sound={victorySound.current}
        />
      )}
    </>
  );
};

export default Root;
