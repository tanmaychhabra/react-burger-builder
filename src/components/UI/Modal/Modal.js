import React, {Component} from 'react'
import './Modal.css'
import Auxilliary from '../../../hoc/Auxilliary.js'
import Backdrop from '../Backdrop/Backdrop.js'
import backdrop from '../Backdrop/Backdrop.js'

class Modal extends Component{ 

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }

    render(){
        return(
    <Auxilliary>
        <Backdrop show = {this.props.show} clicked = {this.props.modalClosed} />
    <div className = "Modal"
    style = {{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: this.props.show ? '1' : '0'
    }}>
        {this.props.children}
    </div>
    </Auxilliary>
    )
    }

}

export default Modal