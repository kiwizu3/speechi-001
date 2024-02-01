import { useState, useEffect } from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';

const sampleSSML = "<speak> Here are <say-as interpret-as=\"characters\">SSML</say-as> samples. I can pause <break time=\"3s\"/>. I can play a sound <audio src=\"https://www.example.com/MY_MP3_FILE.mp3\">didn't get your MP3 audio file</audio>. I can speak in cardinals. Your number is <say-as interpret-as=\"cardinal\">10</say-as>. Or I can speak in ordinals. You are <say-as interpret-as=\"ordinal\">10</say-as> in line. Or I can even speak in digits. The digits for ten are <say-as interpret-as=\"characters\">10</say-as>. I can also substitute phrases, like the <sub alias=\"World Wide Web Consortium\">W3C</sub>. Finally, I can speak a paragraph with two sentences. <p><s>This is sentence one.</s><s>This is sentence two.</s></p> </speak>";

const Voice = () => {
  const [ssmlInput, setSSMLInput] = useState<string>('');

  const { synthesizeText, audioData, error, loading } = useTextToSpeech();

  const handleSSMLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSSMLInput(event.target.value);
  };

  const handleSynthesize = () => {
    synthesizeText(ssmlInput);
  };

  const loadSampleSSML = () => {
    setSSMLInput(sampleSSML);
  }
  const clearSSML = () =>{
    setSSMLInput('');
  }

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
        <div className="d-flex justify-content-between">
        <button className="btn btn-sm rounded-0 btn-dark" onClick={loadSampleSSML}>Load Sample</button>
        <button className="btn btn-sm rounded-0 btn-success ms-auto me-2" onClick={handleSynthesize}>{loading ? "Synthesizing..." : "Synthesize"}</button>
        <button className="btn btn-sm rounded-0 btn-danger" onClick={clearSSML}>Clear</button>
        </div>
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
