import React, {Component} from 'react'
import Auxilliary from '../../hoc/Auxilliary.js'
import Burger from '../../components/Burger/Burger.js'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    //constructor(props){
      //  super(props);
        //this.state = {...}

        
    //}

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el
                    }, 0)
                    this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })  
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState({
            loading: true
        })
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Tanmay Chhabra',
                address: {
                    street: '905-B',
                    zipCode: 440004,
                    country:'India'
                },
                email: 'chhabra.tanmay8@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', orders)
             .then(response => this.setState({ loading: false, purchasing: false }))
             .catch(error => this.setState({ loading: false , purchasing: false}))
    }

    render(){

        const disabledInfo ={
            ...this.state.ingredients
        }

        for(let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key]<=0

            let orderSummary =  <OrderSummary ingredients = {this.state.ingredients} 
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice} />

            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }
        return(
            <Auxilliary>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients} /> 
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}/>
            </Auxilliary>

        )
    }
}

export default BurgerBuilder