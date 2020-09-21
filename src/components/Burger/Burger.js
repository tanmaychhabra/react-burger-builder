import React from 'react'
import './Burger.css'
import BurgerIngredient from '../BurgerIngredients/BurgerIngredient.js'
//import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'

const Burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return[...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key = {igKey + i} type = {igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        },[]);

        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please add Ingredients</p>
        }
        console.log(transformedIngredients)
    
    return(
        <div className = "Burger">
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>

    )
}

export default Burger;