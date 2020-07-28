import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from './Burger';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

configure({adapter: new Adapter()});

const ingredients = {
  salad: 0,
  bacon: 0,
  cheese: 0,
  meat: 0
}

describe('<Burger />', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = shallow(<Burger ingredient={ingredients} />);
   })

  it('should display only bread top and bottom if no ingredients have been added', () => {
    expect(wrapper.find(BurgerIngredients)).toHaveLength(2);
  })

  it('should diplay at least one ingredient if an ingredient has been added', () => {
    wrapper.setProps({ingredient: {...ingredients, salad: 1}});
    expect(wrapper.find(BurgerIngredients).length).toBeGreaterThan(2);
  }); 
})