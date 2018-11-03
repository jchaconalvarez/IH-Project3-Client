playSong = () => {
  const { noteHistory } = this.state;

  const noteArray = noteHistory.map((note) => {
    return note.data;
  });

  const durationArray = noteHistory.map((note) => {
    const { timeStampOn, timeStampOff } = note;
    return { timeStampOn, timeStampOff };
  });

  const handleArrays = (noteArray, durationArray, time) => {
    
  };

  // const timeInterval = setInterval(())
}
