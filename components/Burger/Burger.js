import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.css';


const Burger = props => {
  //  shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps.ingredient !== props.ingredient;
  //  }

 
  let newIngredients = Object.keys(props.ingredient).map((igKey) => {
      return [...Array(props.ingredient[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />
      });
  }).reduce((arr, curr) => {
      return arr.concat(curr);
  }, []);
  
  if(newIngredients.length === 0) {
      newIngredients = <p>Please start adding ingredients!</p>
  }

  return (
      <div className={classes.Burger}>
        <BurgerIngredients type="bread-top" />
        { newIngredients }
        <BurgerIngredients type="bread-bottom" />
      </div>
  )

}

export default React.memo(Burger, (prevProps, nextProps) => nextProps.ingredient === prevProps.ingredient)