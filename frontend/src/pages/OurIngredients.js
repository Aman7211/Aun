import React, { useState, useEffect } from 'react';
import AlphabetButtons from '../components/Ingredient/Alphabet';
import IngredientCard from '../components/Ingredient/IngredientCard';
import IngredientDetails from '../components/Ingredient/IngredientDetail';
import { ingredients } from '../assets/Data/ingredientdata';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurIngredients = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        // Set default letter if none is selected and there are ingredients available
        if (!selectedLetter && ingredients.length > 0) {
            const defaultLetter = ingredients[0].letter; // Default to the letter of the first ingredient
            setSelectedLetter(defaultLetter);
        }
    }, [selectedLetter]);

    const handleSelectLetter = (letter) => {
        setSelectedLetter(letter);

        setSelectedIngredient(null); // Clear selected ingredient when letter changes
    };

    const handleReadMore = (ingredient) => {
        setSelectedIngredient(ingredient);
    };

    const handleClose = () => {
        setSelectedIngredient(null); // Close the ingredient detail view
    };

    const filteredIngredients = ingredients.filter(ingredient => ingredient.letter === selectedLetter);

    const alphabetWithIngredients = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
        letter,
        hasIngredients: ingredients.some(ingredient => ingredient.letter === letter)
    }));

    return (
        <>
            <Header />
            <div className='bg-yellow-100 py-10'>
                <div className='container mx-auto'>
                    <span className='underline underline-offset-8 font-medium text-lg'>
                        Our Ingredient
                    </span>
                    <h1 className='my-3 text-5xl leading-relaxed'>
                        Our Ingredients are all fresh,<br />
                        pure and patent.
                    </h1>
                </div>
            </div>
            <div className="p-4">
                <AlphabetButtons 
                    onSelectLetter={handleSelectLetter} 
                    alphabetWithIngredients={alphabetWithIngredients}
                />
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
            <Footer />
        </>
    );
};

export default OurIngredients;
