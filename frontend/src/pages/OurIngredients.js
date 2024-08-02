import React, { useState } from 'react';
import AlphabetButtons from '../components/Ingredient/Alphabet';
import IngredientCard from '../components/Ingredient/IngredientCard';
import IngredientDetails from '../components/Ingredient/IngredientDetail';
import { ingredients } from '../assets/Data/ingredientdata';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurIngredients = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const handleSelectLetter = (letter) => {
        setSelectedLetter(letter);
        setSelectedIngredient(null);
    };

    const handleReadMore = (ingredient) => {
        setSelectedIngredient(ingredient);
    };

    const handleClose = () => {
        setSelectedIngredient(null);
    };

    const filteredIngredients = ingredients.filter(ingredient => ingredient.letter === selectedLetter);

    return (
        <>
        <Header/>
        <div className=' bg-yellow-100 py-10'>
        <div className='container mx-auto'>
        <span className='underline underline-offset-8 font-medium text-lg'>
            Our Ingredient
        </span>
        <h1 className='my-3 text-5xl leading-relaxed '>
            Our Ingredient are all fresh,<br/>
             pure and patent.  
        </h1>
        </div>
        </div>
        <div className=" p-4">
            <AlphabetButtons onSelectLetter={handleSelectLetter} />
            {selectedLetter && (
                <div className="flex flex-wrap">
                    {filteredIngredients.map(ingredient => (
                        <IngredientCard 
                            key={ingredient.name} 
                            ingredient={ingredient} 
                            onReadMore={handleReadMore} 
                        />
                    ))}
                </div>
            )}
            {selectedIngredient && (
                <IngredientDetails 
                    ingredient={selectedIngredient} 
                    onClose={handleClose} 
                />
            )}
        </div>
        <Footer/>
        </>
    );
};


export default OurIngredients