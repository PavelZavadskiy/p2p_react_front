import { Component } from 'react';
import { createPortal } from 'react-dom';
import {
  Overlay,
  ModalForm,
  Close,
  Wrapper,
  WrapperCheckBox,
  WrapperCheckBoxItem,
  Button,
} from './ModalCameOrder.styled';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ProfileCurrentUser } from 'components/ProfileCurrentUser/ProfileCurrentUser';
import axios from 'axios';

const modalRoot = document.querySelector('#modal-root');

// users currentUser fiats cryptos paimentMethods
export class ModalCameOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null,
      // id_advert_type: -1,
      // id_crypto: -1,
      // id_fiat: -1,
      // id_payment_methods: [],
      // id_region: -1,
      // price: 0,
      // limit: 0,
      // available: 0,
    };
  }

  keydownListener = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  clickBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  async componentDidMount() {
    try {
      console.log('props : ', this.props);
      const order = await axios.get(`http://localhost:3001/api/orders/${this.props.order_id}`);
      console.log(order);
      this.setState({ orderData: order.data });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate() {
    console.log('STATE >>> ', this.state);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownListener);
  }

  handlerConfirm = async () => {
    await axios.post(`http://localhost:3001/api/orders/status-approved/${this.state.orderData.id}`);
    const order = await axios.get(`http://localhost:3001/api/orders/${this.props.order_id}`);
    console.log(order);
    this.setState({ orderData: order.data });
  };

  handlerConfirmPaiment = async () => {
    await axios.post(`http://localhost:3001/api/orders/status-owner-paid/${this.state.orderData.id}`);
    const order = await axios.get(`http://localhost:3001/api/orders/${this.props.order_id}`);
    console.log(order);
    this.setState({ orderData: order.data });
  };

  handlerConfirmUserPaiment = async () => {
    await axios.post(`http://localhost:3001/api/orders/status-client-paid/${this.state.orderData.id}`);
    const order = await axios.get(`http://localhost:3001/api/orders/${this.props.order_id}`);
    console.log(order);
    this.setState({ orderData: order.data });
  };

  render() {
    return createPortal(
      <Overlay className="overlay" onClick={this.clickBackDrop}>
        <Close type="button" onClick={this.props.onClose}>
          <IconContext.Provider value={{ size: 32 }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </Close>
        <ModalForm className="modal">
          <ProfileCurrentUser user={this.props.currentUser} />

          {this.state.orderData && this.state.orderData.status === 0 && (
            <Wrapper>
              {this.state.orderData.id_advert_type === 0 && (
                <div>
                  <p>
                    A request for an order has been received from a{' '}
                    {this.props.users[this.state.orderData.id_client].email} to buy a{' '}
                    {this.state.orderData.amount_crypto} {this.props.cryptos[this.state.orderData.id_crypto].mnemo} at a
                    price {this.state.orderData.price} for the amount of {this.state.orderData.amount_fiat}{' '}
                    {this.props.fiats[this.state.orderData.id_fiat].mnemo}. If you confirm the order, click on the
                    "Confirm".
                  </p>

                  <button type="button" onClick={this.handlerConfirm}>
                    Confirm
                  </button>
                </div>
              )}

              {this.state.orderData.id_advert_type === 1 && (
                <div>
                  <p>
                    A request has been received from a {this.props.users[this.state.orderData.id_client].email} to sell{' '}
                    {this.state.orderData.amount_crypto} {this.props.cryptos[this.state.orderData.id_crypto].mnemo} at
                    price {this.state.orderData.price} for the amount of {this.state.orderData.amount_fiat}{' '}
                    {this.props.fiats[this.state.orderData.id_fiat].mnemo}. If you confirm the order, click on the
                    "Confirm"
                  </p>

                  <button type="button" onClick={this.handlerConfirm}>
                    Confirm
                  </button>
                </div>
              )}
            </Wrapper>
          )}

          {this.state.orderData && this.state.orderData.status === 1 && (
            <Wrapper>
              {this.state.orderData.id_advert_type === 0 && (
                <div>
                  <p>
                    Transfer money to the {this.props.users[this.state.orderData.id_client].email} account and click
                    Confirm
                  </p>

                  <button type="button" onClick={this.handlerConfirmPaiment}>
                    Confirm
                  </button>
                </div>
              )}

              {this.state.orderData.id_advert_type === 1 && (
                <div>
                  <p>
                    Wait for the {this.props.users[this.state.orderData.id_client].email} to transfer money to you and
                    click Confirm
                  </p>

                  <button type="button" onClick={this.handlerConfirmUserPaiment}>
                    Confirm
                  </button>
                </div>
              )}
            </Wrapper>
          )}
        </ModalForm>
      </Overlay>,
      modalRoot
    );
  }
}
