import { useState, useEffect, useRef } from 'react';

import shuffleArray from 'utils/shuffleArray';
import MemoryCard from 'components/memory/memoryCard';

const MemoryTable = ({ gameState, addClick, registerVictory }) => {
  const soundTimerRef = useRef(null);
  const deactiveCardsTimerRef = useRef(null);

  const [cardsIds, setCardsIds] = useState([]);

  const [activeCards, setActiveCards] = useState([]);
  const [solvedCards, setSolvedCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);

  const clickSound = useRef(new Audio('/sounds/cool-click.wav'));
  const cardsMatchSound = useRef(new Audio('/sounds/cards-match.wav'));

  //reinitilize game board
  useEffect(() => {
    setSolvedCards([]);
    setActiveCards([]);

    setTimeout(() => {
      setHiddenCards([]);

      const ids = shuffleArray([
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8
      ]);
      setCardsIds(ids);
    }, 250);
  }, [gameState]);

  //register victory
  useEffect(() => {
    if (hiddenCards.length > 0 && hiddenCards.length === cardsIds.length) {
      registerVictory();
    }
  }, [hiddenCards.length, registerVictory, cardsIds.length]);

  useEffect(() => {
    if (activeCards.length < 2) {
      return;
    }

    //3 cards active, prev cards aren't matched
    if (activeCards.length > 2) {
      setActiveCards([activeCards.at(-1)]);
      clearTimeout(deactiveCardsTimerRef.current);
      return;
    }

    //2 cards active, check for match
    const [fIdx, sIdx] = activeCards;
    if (cardsIds[fIdx] == cardsIds[sIdx]) {
      setSolvedCards((prevSolvedCards) => [...prevSolvedCards, fIdx, sIdx]);

      soundTimerRef.current = setTimeout(() => {
        setHiddenCards((prevHiddenCards) => [...prevHiddenCards, fIdx, sIdx]);
        cardsMatchSound.current.currentTime = 0;
        cardsMatchSound.current.volume = 0.05;
        cardsMatchSound.current.play();
      }, 2000);

      setActiveCards([]);
    } else {
      deactiveCardsTimerRef.current = setTimeout(() => {
        setActiveCards([]);
      }, 1000);
    }
  }, [activeCards, cardsIds]);

  useEffect(() => {
    return () => clearTimeout(soundTimerRef.current);
  }, []);

  return (
    <div
      className="grid grid-cols-[repeat(4,_150px)] grid-rows-[repeat(4,_150px)]
      items-center justify-center gap-5 py-5"
    >
      {cardsIds.map((id, index) => {
        const active = activeCards.includes(index);
        const solved = solvedCards.includes(index);
        const hidden = hiddenCards.includes(index);

        return (
          <MemoryCard
            key={`memoryCardNum${index}`}
            active={active || solved}
            onClick={() => {
              setActiveCards([...activeCards, index]);
              addClick();
            }}
            solved={solved}
            show={!hidden}
            sound={clickSound.current}
            faceUpImage={`/images/sea_creature_${id}.svg`}
            faceDownImage="/images/bubbies.png"
          />
        );
      })}
    </div>
  );
};

export default MemoryTable;
