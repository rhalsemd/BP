import React, { useState } from 'react';
import { exec } from 'child_process';

const TTS = () => {
  const [text, setText] = useState('');
  
  const handleSpeak = () => {
    exec(`espeak "${text}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  };

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TTS;