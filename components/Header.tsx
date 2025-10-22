
import React from 'react';
import { DotnetIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center gap-4">
        <div className="bg-purple-600 p-2 rounded-lg">
          <DotnetIcon />
        </div>
        <div>
            <h1 className="text-xl font-bold text-white tracking-tight">.NET PDF Service Generator</h1>
            <p className="text-sm text-gray-400">Powered by Coding Work Space TH</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
