import { useEffect, useState } from 'react';
import Board from '../Board/Board';
import BoardTitle from '../BoardTitle/BoardTitle';
import './InstrumentSection.css';

function InstrumentSection({
  instrument,
  currentBeat,
  totalBeats,
  beatDivision,
  isPlaying,
  oneIsSelected,
  selectedType,
  setSelectedType,
  numMinimized,
  setNumMinimized,
  index,
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [shouldExpandClass, setShouldExpandClass] = useState('');

  const { type } = instrument;
  const leftPosition = `${index * 25}vw`;

  useEffect(() => {
    if (oneIsSelected && selectedType !== type) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [oneIsSelected, selectedType, type]);

  useEffect(() => {
    if (
      (type === 'drums' && numMinimized > 0 && !isMinimized) ||
      numMinimized === 2 ||
      (numMinimized === 3 && !isMinimized)
    ) {
      setShouldExpandClass(' double-width-section');
    } else {
      setShouldExpandClass('');
    }
  }, [type, numMinimized, isMinimized]);

  return (
    <div
      id={`${type}-section`}
      className={`instrument-section${
        isMinimized ? ' minimized-section' : ''
      }${isSelected ? ' selected-section' : ''}${
        isHidden ? ' hidden' : ''
      }${shouldExpandClass}`}
      style={{ left: leftPosition }}
    >
      <BoardTitle
        instrument={instrument}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        setSelectedType={setSelectedType}
        setNumMinimized={setNumMinimized}
      />
      <Board
        instrument={instrument}
        currentBeat={currentBeat}
        totalBeats={totalBeats}
        beatDivision={beatDivision}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default InstrumentSection;
