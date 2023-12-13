import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalForm, Image, Close, Separator, WrapperHalf, Wrapper } from './Modal.styled';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';
import users from '../../json/user.json';
import arverts_type from '../../json/arverts_type.json';
import cryptos from '../../json/cryptos.json';
import axios from 'axios';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idAdvert: -1,
      orderData: null,
      advertData: null,
      amount: 0,
      recievAmount: 0,
      idClient: 0,
      timer: 0,
      timeoutID: null,
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

  componentDidMount() {
    window.addEventListener('keydown', this.keydownListener);
    console.log(this.props);
    this.setState({ idAdvert: this.props.id_arvert });
  }

  handlerUpdate = e => {
    const amount = Number(e.target.value);
    this.setState({ recievAmount: amount * this.state.advertData.price });
    this.setState({ amount });
  };

  handleOnChangeUser = e => {
    this.setState({ idClient: e.target.value });
  };

  handleCreateOrder = async () => {
    try {
      const data = {
        id_advert: this.state.advertData.id,
        id_user_client: Number(this.state.idClient),
        amount: this.state.amount,
        payment_method: 0,
      };
      console.log(data);
      const res = await axios.post(`http://localhost:3001/api/orders`, data);
      console.log(res);

      this.setState({ orderData: res.data });

      const awaitAprove = async () => {
        this.setState({ timer: this.state.timer + 1 });

        try {
          const order = await axios.get(`http://localhost:3001/api/orders/${this.state.orderData.id}`);
          if (order.data.status === 1) {
            this.setState({ orderData: order.data });
            clearInterval(this.state.timeoutID);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const timeoutID = setInterval(awaitAprove, 1000);

      this.setState({ timeoutID });
    } catch (error) {
      console.log(error);
    }
  };

  handlePaymentAccepted = async () => {
    try {
      // const id = this.state.orderData.id;
      console.log(this.state.orderData.id);
      const res = await axios.post(`http://localhost:3001/api/orders/status-advert-paid/${this.state.orderData.id}`);
      if (res.data.status === 2) {
        this.setState({
          idAdvert: -1,
          orderData: null,
          advertData: null,
          amount: 0,
          recievAmount: 0,
          idClient: 0,
          timer: 0,
          timeoutID: null,
        });
        this.props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidUpdate() {
    if (!this.state.advertData) {
      const getAdvert = async () => {
        try {
          const advert = await axios.get(`http://localhost:3001/api/adverts/${this.state.idAdvert}`);
          this.setState({ advertData: advert.data });
        } catch (error) {
          console.log(error);
        }
      };

      await getAdvert();
    }

    console.log(this.state);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownListener);
  }

  render() {
    return createPortal(
      <Overlay className="overlay" onClick={this.clickBackDrop}>
        <Close type="button" onClick={this.props.onClose}>
          <IconContext.Provider value={{ size: 32 }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </Close>
        <ModalForm className="modal">
          {this.state.advertData && !this.state.orderData && (
            <Wrapper>
              <WrapperHalf>
                <div>
                  <img src={users[this.state.advertData.id_user_advert].avatar} alt="" width="64" />
                  <p>{users[this.state.advertData.id_user_advert].email}</p>
                </div>
                <div>
                  <p>Maker's Terms and Conditions (please read carefully)</p>
                  <p>
                    Payment only from vaisa to vaisa, with a card of any bank of Ukraine to pay is not possible, I take
                    on a trusted person, as I have limits
                  </p>
                </div>
              </WrapperHalf>
              <Separator />
              <WrapperHalf>
                <select name="selectUser" onChange={this.handleOnChangeUser}>
                  {users.map(item => (
                    <option value={item.id}>{item.email}</option>
                  ))}
                </select>
                <div>
                  <p>Price: {this.state.advertData.price}</p>
                </div>
                <div>
                  <p>I want to sell [{cryptos[this.state.advertData.crypto_to].mnemo}]: </p>
                  <input type="number" onChange={this.handlerUpdate} />
                </div>
                <div>
                  <p>I will receive [{cryptos[this.state.advertData.crypto_from].mnemo}]: </p>
                  <p>{this.state.recievAmount}</p>
                </div>
                {this.state.recievAmount > 0 && (
                  <button onClick={this.handleCreateOrder}>
                    Sell {cryptos[this.state.advertData.crypto_to].mnemo}
                  </button>
                )}
              </WrapperHalf>
            </Wrapper>
          )}
          {this.state.orderData && this.state.orderData.status === 0 && (
            <Wrapper>
              <WrapperHalf>
                <div>
                  <img src={users[this.state.advertData.id_user_advert].avatar} alt="" width="64" />
                  <p>{users[this.state.advertData.id_user_advert].email}</p>
                </div>
                <div>
                  <p>Maker's Terms and Conditions (please read carefully)</p>
                  <p>
                    Payment only from vaisa to vaisa, with a card of any bank of Ukraine to pay is not possible, I take
                    on a trusted person, as I have limits
                  </p>
                </div>
              </WrapperHalf>
              <Separator />
              <WrapperHalf>
                <p>Wait for the {users[this.state.advertData.id_user_advert].email} to approve the transaction</p>
                <p>[{this.state.timer}]</p>
              </WrapperHalf>
            </Wrapper>
          )}
          {this.state.orderData && this.state.orderData.status === 1 && (
            <Wrapper>
              <WrapperHalf>
                <div>
                  <img src={users[this.state.advertData.id_user_advert].avatar} alt="" width="64" />
                  <p>{users[this.state.advertData.id_user_advert].email}</p>
                </div>
                <div>
                  <p>Maker's Terms and Conditions (please read carefully)</p>
                  <p>
                    Payment only from vaisa to vaisa, with a card of any bank of Ukraine to pay is not possible, I take
                    on a trusted person, as I have limits
                  </p>
                </div>
              </WrapperHalf>
              <Separator />
              <WrapperHalf>
                <p>
                  Wait until the {users[this.state.advertData.id_user_advert].email} transfers the{' '}
                  {this.state.orderData.amount * this.state.orderData.price}{' '}
                  {cryptos[this.state.orderData.crypto_from].mnemo} to you, then click payment accepted
                </p>
                <button onClick={this.handlePaymentAccepted}>Payment accepted</button>
              </WrapperHalf>
            </Wrapper>
          )}
        </ModalForm>
      </Overlay>,
      modalRoot
    );
  }
}
