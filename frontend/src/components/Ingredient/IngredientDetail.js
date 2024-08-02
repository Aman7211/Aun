import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../Header';

const IngredientDetail = ({ ingredient, onClose }) => {

    const formatContent = (content, delimiter) => {
        return content?.split(delimiter).map((str, index) => (
            <p key={index} className={delimiter === '\n' ? 'mb-4' : 'mb-2'}>
                {str}
            </p>
        ));
    };

    return (
        <>
      
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
        <button onClick={onClose} className="absolute flex left-10 top-10 bg-red-900 text-white p-2 rounded-full">
          <ArrowBackIcon />
        </button>
            <div className="bg-white p-8 rounded h-[100vh] w-[100vw]">
            <h2 className="text-6xl text-center font-bold my-7 mt-10">{ingredient.name}</h2>
                <div className='flex'>
                    <div className='w-[60%]'>
                 
                <p className="mt-4">   {formatContent(ingredient.desc, '\n')}</p>
                <h1 className='my-4 text-xl font-bold '>Uses & Benefits : </h1>
                <p className="mt-4"> {formatContent(ingredient.uses, '\n')}</p>

                </div>
                <div className='w-[40%] ml-5'>
                <img src={ingredient.image} alt={ingredient.name} className="h-[400px] w-[500px] flex justify-end mt-4 rounded-3xl"/>
               </div>
                </div>
                <button 
                    onClick={onClose}
                    className="mt-4 p-3 px-6 bg-red-900 text-white rounded">
                    Close
                </button>
            </div>
        </div>
        </>
    );
};

export default IngredientDetail;
