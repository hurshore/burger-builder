import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
   const [showSideDrawer, setShowSideDrawer] = useState(false);
   
   const hideSideDrawerHandler = () => {
      setShowSideDrawer(false);
   }

   const showSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
   }

  return (
    <Aux>   
      <Toolbar isAuth={props.isAuthenticated} drawerTogglerClicked={showSideDrawerHandler} />
      <SideDrawer isAuth={props.isAuthenticated} display={showSideDrawer} conceal={hideSideDrawerHandler} />
      <main className={classes.content}>
          {props.children}
      </main>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

export default connect(mapStateToProps)(Layout);