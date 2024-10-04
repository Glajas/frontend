import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania przepisów:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Recipes</h1>
      {recipes.map(recipe => (
        <div key={recipe.recipe_id} className="recipe">
          <h2>{recipe.recipe_name}</h2>
          <p>{recipe.description}</p>
          <p>Duration: {recipe.duration} minutes</p>
          <p>Servings: {recipe.servings}</p>

          <table className="ingredients-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Calories</th>
                <th>Default Portion</th>
                <th>Allergens</th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredients.map(ingredient => (
                <tr key={ingredient.ingredient_id}>
                  <td>{ingredient.ingredient_name}</td>
                  <td>{ingredient.calories}</td>
                  <td>{ingredient.default_portion}</td>
                  <td>
                    {ingredient.allergens.length > 0 ? (
                      <ul>
                        {ingredient.allergens.map(allergen => (
                          <li key={allergen.allergen_id}>
                            {allergen.allergen_name} (Amount: {allergen.allergen_amount})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No allergens'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
