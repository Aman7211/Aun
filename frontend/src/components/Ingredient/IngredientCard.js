import React from 'react';

const IngredientCard = ({ ingredient, onReadMore }) => {
    return (
        <div className="border container mx-auto rounded p-4 m-2 w-1/4 shadow-xl">
            <img src={ingredient.image} alt="" className='h-[300px] w-full'/>
            <h3 className="text-xl my-2 font-medium">{ingredient.name}</h3>
            <p className="text-gray-700 mb-2 text-black my-4">
                {ingredient.desc.substring(0, 150)} ....
            </p>
            <button 
                onClick={() => onReadMore(ingredient)}
                className="mt-2 p-2 bg-red-900 text-white rounded">
                Read More
            </button>
        </div>
    );
};

export default IngredientCard;
