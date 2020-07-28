import * as actionTypes from './actionTypes';

export const addIngredient = (igName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: igName
  }
}

export const removeIngredient = (igName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: igName
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
}

export const fetchIngredientError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_ERROR
  }
}