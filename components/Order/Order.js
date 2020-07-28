import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for(let ingredientName in props.ingredients) {
    ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
  }
  let myIngredients = ingredients.map(ingredient => {
    return(
      <span key={ingredient.name}
        style={{display: 'inline-block',
        textTransform: 'capitalize',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}>
      {ingredient.name} ({ingredient.amount})
      </span>
    );
  })

  return(
    <div className={classes.Order}>
      <p>Ingredients: {myIngredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
      <button onClick={props.clicked}>Delete</button>
    </div>
  )
};

export default order;