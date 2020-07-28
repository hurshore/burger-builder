import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
   let attachedClasses = [classes.SideDrawer, classes.Close];
   if(props.display) {
      attachedClasses[1] = [classes.Open];
   }

   return (
      <Aux>
         <Backdrop show={props.display} clicked={props.conceal}/>
         <div className={attachedClasses.join(' ')} onClick={props.conceal}>
            <div className={classes.Logo}>
               <Logo />
            </div>
            <nav>
               <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
         </div>
      </Aux>
   )
}

export default sideDrawer;