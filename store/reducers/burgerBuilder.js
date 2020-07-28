import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.2
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = updateObject(state, {ingredients: updatedIngredients, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName], building: true});
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = updateObject(state, {ingredients: updatedIngs, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName], building: true});
      return updateObject(state, updatedSt);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {ingredients: action.ingredients, errro: false, totalPrice: 4, building: false});
    case actionTypes.FETCH_INGREDIENT_ERROR:
      return updateObject(state, {error: true});
    default:
      return state;
  }
}

export default reducer;