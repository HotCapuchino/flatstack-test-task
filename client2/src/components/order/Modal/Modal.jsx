import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          visible: false,
          message: null
      }
      this.el = document.createElement('div');
      this.setMessage.bind(this);
    }

    setMessage(msg) {;
        this.setState({
            visible: true,
            message: msg
        });
    }

    immediatelyCloseModal() {
        this.setState({
            visible: false,
            message: ''
        });
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        modalRoot.addEventListener('modal_message', (event) => {
            this.setMessage(event.detail.message);
        });
    }

    componentDidUpdate() {
        if (this.state.visible) {
            setTimeout(() => {
                this.setState({
                    visible: false, 
                    message: ''
                });
            }, 2000);
        }
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <div className={this.state.visible ? modalStyles.modalWrapper : modalStyles.none}>
                <div className={modalStyles.modalBlock}>
                    <div className={modalStyles.modalBlock__modalMessage}>{this.state.message}</div>
                    <button className={modalStyles.modalBlock__closeModal} onClick={this.immediatelyCloseModal.bind(this)}>Close</button>
                </div>
            </div>,
            this.el
        );
    }

}

export default Modal;
