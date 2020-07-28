import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* <NavLink to={props.link} href={props.link} className={props.active ? classes.active : null}>{ props.children }</NavLink> */}
    <NavLink to={props.link} exact={props.active} href={props.link} activeClassName={classes.active}>{ props.children }</NavLink>

  </li>
);

export default navigationItem;