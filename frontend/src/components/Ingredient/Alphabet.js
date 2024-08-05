import React from 'react';

const Alphabet = ({ onSelectLetter, alphabetWithIngredients }) => {
    return (
        <div className="flex flex-wrap justify-center mx-3">
            {alphabetWithIngredients.map(({ letter, hasIngredients }) => (
                <button 
                    key={letter} 
                    onClick={() => hasIngredients && onSelectLetter(letter)}
                    className={`mx-1 px-[14px] py-2 rounded-xl my-4 ${hasIngredients ? 'bg-[#63082c] text-white ' : 'bg-gray-400 text-gray-800 cursor-not-allowed'}`}
                    disabled={!hasIngredients}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Alphabet;
