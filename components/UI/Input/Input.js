import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let errorMessage = null

  if(props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
    errorMessage = <p className={classes.Error}>Please enter a valid {props.valueType}</p>
  }
  
  switch(props.elementType) {
    case 'input':
      inputElement = <input 
      className={inputClasses.join(' ')}
      {...props.elementConfig} 
      value={props.value} 
      onChange={props.changed}/>;
      break;
    case 'textarea':
      inputElement = <textarea 
      className={classes.InputElement} 
      {...props.elementConfig} 
      value={props.value}
      onChange={props.changed} />
      break
    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={props.value}onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>{option.displayedValue}</option>
          ))}
        </select>);
      break;
    default:
      inputElement = <input 
      className={classes.InputElement} 
      {...props.elementConfig} 
      value={props.value} 
      onChange={props.changed}/>
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      { inputElement }
      { errorMessage }
    </div>
  );
}

export default input;