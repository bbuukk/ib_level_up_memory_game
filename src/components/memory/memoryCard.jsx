const MemoryCard = ({
  active,
  onClick,
  solved,
  show,
  sound,
  faceDownImage,
  faceUpImage
}) => {
  function handleClick() {
    sound.currentTime = 0;
    sound.volume = 0.05;
    sound.play();
    onClick();
  }

  return (
    <div
      onClick={handleClick}
      className={`container--card size-full cursor-pointer rounded-xl
      ${solved && show ? 'animate-pulse' : ''}
      ${show ? '' : 'bg-blu-light-cyan opacity-5'}
      ${active ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <div
        className={`card ease relative size-full
        ${active ? 'card--active' : ''}
        ${show ? 'visible' : 'invisible'}`}
      >
        <div
          className="absolute size-full overflow-hidden
          rounded-xl border-4 border-blu-light-cyan
          bg-[length:200%_200%] bg-repeat transition-all
          hover:border-blue-300"
          style={{ backgroundImage: `url("${faceDownImage}")` }}
        />

        <img
          className="card__upImage absolute size-full overflow-hidden rounded-xl bg-white object-cover p-2"
          src={faceUpImage}
          alt={`Memory card image`}
        />
      </div>
    </div>
  );
};

export default MemoryCard;
