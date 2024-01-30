import { useState } from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';

const Voice = () => {
  const [text, setText] = useState<string>('');
  
  const { start, pause, stop, playing } = useTextToSpeech(text);
  return (
    <div className="d-flex flex-column align-items-center m-5">
      <h1 className="text-center fw-bold">Text to Speech</h1>
      <textarea
        value={text}
        className="form-control shadow w-100 w-md-50 w-lg-50 border-0 my-4"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
      />
      <div className="ms-auto">
        {playing() ? "speaking" : "no"}
      <button className="btn btn-dark me-2" onClick={start}>Listen to audio</button>
      <button className="btn btn-danger" onClick={stop}>Stop</button>
      </div>
 
    </div>
  );
};

export default Voice;
