// import React, { Component } from 'react';

import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
   salad: 0.4,
   bacon: 0.7,
   cheese: 0.5,
   meat: 1.2
}

const burgerBuilder = React.memo((props) => {
  const [purchasing, setPurchasing] = useState(false);
  const fetchIngredients = props.onIngredientFetched

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((total, value) => {
      return total + value;
    },0)

    return sum > 0;
  }

  const purchaseHandler = () => {
    if(props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }
  
  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  }

  const continuePurchaseHandler = () => {
    props.history.push('/checkout');
    props.onInitPurchase();
  }

  const disabledInfo = {
    ...props.ings
  }
  for(let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = props.error ? <p>Error. Ingredients can't be loaded!</p> : <Spinner />
  let orderSummary = null

  if(props.ings) {
    burger = (
      <Aux>
        <Burger ingredient={props.ings} />
        <BuildControls 
        addIngredient={props.onIngredientAdded} 
        removeIngredient={props.onIngredientRemoved}
        disabled={disabledInfo}
        price={props.price}
        purchasable={updatePurchaseState(props.ings)}
        order={purchaseHandler}
        isAuth={props.isAuthenticated} />
      </Aux>
    )

    orderSummary = <OrderSummary ingredients={props.ings} 
    ingredientPrice={INGREDIENT_PRICES}
    price={props.price}
    purchaseCancelled={cancelPurchaseHandler}
    purchaseContinued={continuePurchaseHandler} />
  }

  // if(this.state.loading) {
  //   orderSummary = <Spinner />
  // }

  return (
    <Aux>
      <Modal show={purchasing} hideModal={cancelPurchaseHandler} >
        {orderSummary}
      </Modal>
      { burger }
    </Aux>
  )
})

// export class BurgerBuilder extends Component {
//    state = {
//     purchasing: false
//    }

//    componentDidMount() {
//      this.props.onIngredientFetched()
//    }

//    updatePurchaseState = (ingredients) => {
//       const sum = Object.keys(ingredients).map(igKey => {
//          return ingredients[igKey];
//       }).reduce((total, value) => {
//          return total + value;
//       },0)

//       return sum > 0;
//    }

//    purchaseHandler = () => {
//     if(this.props.isAuthenticated) {
//       this.setState({purchasing: true});
//     } else {
//       this.props.onSetAuthRedirectPath('/checkout');
//       this.props.history.push('/auth');
//     }
//    }
   
//    cancelPurchaseHandler = () => {
//       this.setState({purchasing: false});
//    }

//    continuePurchaseHandler = () => {
//       this.props.history.push('/checkout');
//       this.props.onInitPurchase();
//    }

//    render() {
//       const disabledInfo = {
//          ...this.props.ings
//       }
//       for(let key in disabledInfo) {
//          disabledInfo[key] = disabledInfo[key] <= 0;
//       }

//       let burger = this.props.error ? <p>Error. Ingredients can't be loaded!</p> : <Spinner />
//       let orderSummary = null

//       if(this.props.ings) {
//         burger = (
//           <Aux>
//             <Burger ingredient={this.props.ings} />
//             <BuildControls 
//             addIngredient={this.props.onIngredientAdded} 
//             removeIngredient={this.props.onIngredientRemoved}
//             disabled={disabledInfo}
//             price={this.props.price}
//             purchasable={this.updatePurchaseState(this.props.ings)}
//             order={this.purchaseHandler}
//             isAuth={this.props.isAuthenticated} />
//           </Aux>
//         )

//         orderSummary = <OrderSummary ingredients={this.props.ings} 
//         ingredientPrice={INGREDIENT_PRICES}
//         price={this.props.price}
//         purchaseCancelled={this.cancelPurchaseHandler}
//         purchaseContinued={this.continuePurchaseHandler} />
//       }

//       // if(this.state.loading) {
//       //   orderSummary = <Spinner />
//       // }

//       return (
//          <Aux>
//             <Modal show={this.state.purchasing} hideModal={this.cancelPurchaseHandler} >
//               {orderSummary}
//             </Modal>
//             { burger }
//          </Aux>
//       )
//    };
// }

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
    onIngredientFetched: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));