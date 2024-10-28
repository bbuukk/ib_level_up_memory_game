import { useEffect, useState } from 'react';

const MemoryDashboard = ({ clicks, restartGame, gameState }) => {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const localScore = localStorage.getItem('bestScore');
    setBestScore(localScore ?? '?');
  }, [gameState]);

  return (
    <div className="relative flex h-[200px] w-full items-center justify-between rounded-xl border-4 border-blu-light-cyan bg-white p-2">
      <div className="flex w-3/12 flex-col pl-10 text-center">
        <span className="text-5xl font-bold">{clicks}</span>
        <span className="text-xl font-bold opacity-50">CLICKS</span>
      </div>
      <button
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded border-2 border-black bg-red-500 p-5 text-xl font-bold leading-3 text-white hover:bg-red-700"
        onClick={restartGame}
      >
        Restart
      </button>
      <div className="m-2 flex w-3/12 flex-col pr-10 text-center">
        <span className="text-5xl font-bold">{bestScore}</span>
        <span className="text-xl font-bold opacity-50">BEST SCORE</span>
      </div>
    </div>
  );
};

export default MemoryDashboard;
