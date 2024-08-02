import React from 'react';

const Alphabet = ({ onSelectLetter }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
        <div className="flex flex-wrap justify-center mx-3">
            {alphabet.map(letter => (
                <button 
                    key={letter} 
                    onClick={() => onSelectLetter(letter)}
                    className="mx-1 px-[14px] py-2 bg-[#63082c] text-white rounded-xl my-4">
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Alphabet;
