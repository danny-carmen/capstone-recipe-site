import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddedIngredient = (props) => {

    deleteIngredient(){
        props.deleteIngredient();
    }

      return (
         <div>
            {props.quantity} {props.ingredient} <button onClick={this.deleteIngredient}><FontAwesomeIcon icon={faTimes}/></button>
         </div>
      );
   };

export default AddedIngredient;