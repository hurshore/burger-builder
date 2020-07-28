import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import BurgerLogo from '../../Logo/Logo';
import classes from './OrderSummary.module.css';
// import { Link } from 'react-router-dom'

const orderSummary = (props) => {
   const ingredientSummary = Object.keys({...props.ingredients}).map(igKey => {
      return <li key={igKey}>
         <span style={{textTransform: 'capitalize'}}>{igKey}</span>
         <span>Qty: {props.ingredients[igKey]}</span>
         <span>${(props.ingredientPrice[igKey] * props.ingredients[igKey]).toFixed(2)}</span>
      </li>
   });

   return (
      <Aux>
         <div>
            <div className={classes.Logo}>
               <BurgerLogo />
            </div>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul className={classes.OrderDetails}>
               { ingredientSummary }
            </ul>
            <hr />
            <ul className={classes.OrderCost}>
               <li><span>Subtotal</span><span>${props.price.toFixed(2)}</span></li>
               <li><span>Delivery</span><span>Free</span></li>
               <li><span>Total Price</span><span>${props.price.toFixed(2)}</span></li>
            </ul>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>PLACE ORDER</Button>
            {/* <Link to="/checkout"><Button btnType="Success" clicked={props.purchaseContinued}>PLACE ORDER</Button></Link> */}
         </div>
      </Aux>
   );
};

export default orderSummary;