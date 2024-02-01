import { useState, useEffect } from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';

const Voice = () => {
  const [ssmlInput, setSSMLInput] = useState<string>('');

  const { synthesizeText, audioData, error, loading } = useTextToSpeech();

  const handleSSMLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSSMLInput(event.target.value);
  };

  const handleSynthesizeClick = () => {
    synthesizeText(ssmlInput);
  };

  // useEffect(() => {
  //   synthesizeText(ssmlInput);
  // }, [ssmlInput, synthesizeText]);

  return (
    <div className="d-flex flex-column align-items-center h-100">
      <div className="my-auto">
        <div className="position-relative">
        <h3 className="fw-bold mb-3">Text to Speech</h3>
        <span className="fw-lighter position-absolute span-positioning">with SSML</span>
        </div>
        <textarea
          value={ssmlInput}
          onChange={handleSSMLChange}
          placeholder="Enter SSML here..."
          rows={10}
          cols={50}
        />
        <br />
        <button className="btn btn-sm btn-dark" onClick={handleSynthesizeClick}>{loading ? "Synthesizing..." : "Synthesize"}</button>
        <br />
        {error && <p>{error}</p>}

        {audioData && (
          <div className="mt-3">
            <audio controls>
              <source src={`data:audio/wav;base64,${audioData}`} type="audio/wav" />
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voice;
