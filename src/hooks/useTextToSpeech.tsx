import { useState } from 'react';

const useTextToSpeech = () => {
  const [audioData, setAudioData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const synthesizeText = async (ssml: string) => {
    const apiUrl = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize';
    const apiKey = 'AIzaSyBjUzGr8BV9WCGTa79q1LPfFM6zfPA76_E';

    const requestBody = {
      audioConfig: {
        audioEncoding: 'LINEAR16',
        effectsProfileId: ['small-bluetooth-speaker-class-device'],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        ssml,
      },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Studio-O',
      },
    };
    setAudioData(null);
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setAudioData(data.audioContent);
      setError(null);
      
    } catch (err) {
      setAudioData(null);
      setLoading(false);
      setError(`Error:${err}`);
    }
  };

  return { synthesizeText, audioData, error, loading };
};

export default useTextToSpeech;
