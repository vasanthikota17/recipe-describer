import axios from 'axios';
import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [dish, setDish] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setDish(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe',
        params: {
          query: dish,
        },
        headers: {
          'X-RapidAPI-Key': 'c13c61a9ddmshca8c5f205a8a42dp10b211jsnb350c32bc99d',
          'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com',
        },
      });

      if (response.data.length === 0) {
        setError('No recipes found. Please try a different dish.');
      } else {
        setResult(response.data);
      }
    } catch (error) {
      setError('Failed to fetch recipes. Please try again.');
      setResult([]);
    }
    setDish(""); 
  };

  return (
    <div className='card3'>
      <center>
        <div className="card">
          <h1 className="card-title">MAKE YOUR RECIPE</h1>
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter your recipe.."
              name="dish"
              value={dish}
              onChange={changeHandler}
              className='input'
            />
            <input type="submit" value="Submit" className='butt' />
          </form>
        </div>
        {error && <p>{error}</p>}
        <div className='card1'>
          <ul className="list">
            {result.map((recipe, index) => (
              <li className="lili" key={index}>
                <div>
                <h2>{recipe.title}</h2>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </center>
    </div>
  );
};

export default App;
