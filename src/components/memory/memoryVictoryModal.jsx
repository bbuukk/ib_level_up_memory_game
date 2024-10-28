import { useEffect, useRef, useState } from 'react';

const MemoryVictoryModal = ({ clicks, restartGame, sound }) => {
  const [scoreBeated, setScoreBeaten] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
    sound.currentTime = 0;
    sound.volume = 0.05;
    sound.play();

    //register new best score
    const localBestScore = localStorage.getItem('bestScore');
    if (!localBestScore || clicks < localBestScore) {
      localStorage.setItem('bestScore', clicks);
      setScoreBeaten(true);
    }
  }, [sound, clicks]);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      restartGame();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="min-h-[300px] max-w-[600px] rounded-lg shadow-xl backdrop:bg-gray-800/50"
    >
      <header className="relative flex items-center justify-center border-b border-blu-light-cyan p-4">
        <h2 className="text-2xl font-bold">Congratulations! 😄</h2>
      </header>
      <div className="flex flex-col items-center justify-between gap-10 p-8">
        <p className="font-bold">You have successfully passed all the game!</p>
        <div className="flex flex-col gap-4 text-center">
          {scoreBeated && <span>You have set a new record!</span>}
          <span className="text-6xl font-bold text-yell-brightsun">
            {clicks}
          </span>
          <span className="text-xl font-bold text-gray-400">CLICKS</span>
        </div>

        <button
          onClick={handleClose}
          className="flex items-center justify-center rounded bg-red-500 px-5 py-4 text-xl font-bold leading-3 text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default MemoryVictoryModal;
