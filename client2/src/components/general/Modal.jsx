import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.classList.add(modalStyle.modalWrapper);
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(<>{this.props.children}</>, this.el)
    }
}

export default Modal;
