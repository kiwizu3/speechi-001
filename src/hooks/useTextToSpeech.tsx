const useTextToSpeech = (message: any) => {

  let utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-US";
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;

  let isSpeaking = false;

  utterance.onstart = () => {
    isSpeaking = true;
  };

  utterance.onend = utterance.onpause = utterance.onresume = () => {
    isSpeaking = false;
  };

  const start = () => {
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    speechSynthesis.pause();
  }

  const stop = () => {
    speechSynthesis.cancel();
  };

  const playing = () => {
    return isSpeaking;
  };

  return {start, pause, stop, playing}

};

export default useTextToSpeech;
