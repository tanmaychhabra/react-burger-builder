import React, {Component} from 'react'
import Auxilliary from '../../hoc/Auxilliary.js'
import Toolbar from '../Navigation/Toolbar/Toolbar.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js'

class Layout extends Component{

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () =>{
        this.setState( (prevState) => {
            return{
                showSideDrawer : !prevState.showSideDrawer
         }
         })
    }
    render(){   
        return(
            <Auxilliary>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler} />
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler} />
        <main style = {{margin: '72px'}}>{this.props.children}</main>
        </Auxilliary>
        )
    }
   
};

export default Layout;