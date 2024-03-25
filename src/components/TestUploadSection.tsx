'use client';

import { useState } from 'react';
import { FileInput } from './ui/file-input';

const TestUploadSection = () => {
  const [videoName, setVideoName] = useState('Example video name'.split(' ').join(''));
  return (
    <div>
      <FileInput />
      <div>
        <input
          type="text"
          name="video-name"
          id="video-name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default TestUploadSection;
