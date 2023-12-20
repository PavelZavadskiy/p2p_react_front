import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalForm, UserBlock, Close, Separator, WrapperHalf, Wrapper } from './Modal.styled';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { UserProfileTable } from '../UserProfileTable/UserProfileTable';
import { ProfileCurrentUser } from 'components/ProfileCurrentUser/ProfileCurrentUser';

const modalRoot = document.querySelector('#modal-root');

// users currentUser fiats cryptos paimentMethods
export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idAdvert: -1,
      orderData: null,
      advertData: null,
      amount_crypto: 0,
      amount_fiat: 0,
      id_payment_method: -1,
      // idClient: 0,
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

  async componentDidMount() {
    console.log('componentDidMount >');
    window.addEventListener('keydown', this.keydownListener);
    this.setState({ idAdvert: this.props.id_arvert });
    console.log('this.props = ', this.props);

    if (!this.state.advertData) {
      const getAdvert = async () => {
        try {
          const advert = await axios.get(`http://localhost:3001/api/adverts/${this.props.id_arvert}`);
          this.setState({ advertData: advert.data });
        } catch (error) {
          console.log(error);
        }
      };

      await getAdvert();
    }

    console.log(this.state);
  }

  handlerUpdateBuy = e => {
    const amount = Number(e.target.value);
    this.setState({ amount_crypto: Number(((amount * 1) / this.state.advertData.price).toFixed(2)) });
    this.setState({ amount_fiat: amount });
  };

  handlerUpdateSale = e => {
    const amount = Number(e.target.value);
    this.setState({ amount_fiat: Number((amount * this.state.advertData.price).toFixed(2)) });
    this.setState({ amount_crypto: amount });
  };

  handleSelectPaimentMethod = e => {
    this.setState({ id_payment_method: Number(e.target.value) });
  };

  // handleOnChangeUser = e => {
  //   this.setState({ idClient: e.target.value });
  // };

  handleCreateOrder = async () => {
    if (this.state.amount_crypto <= 0 && this.state.amount_fiat <= 0 && this.state.id_payment_method <= 0) return;

    try {
      const data = {
        id_advert: this.state.advertData.id,
        id_client: Number(this.props.currentUser.id),
        amount_crypto: this.state.amount_crypto,
        amount_fiat: this.state.amount_fiat,
        id_payment_method: this.state.id_payment_method,
      };
      console.log(data);
      const res = await axios.post(`http://localhost:3001/api/orders`, data);
      console.log(res);
      this.setState({ orderData: res.data });

      this.props.createOrderMessage(this.state.advertData.id_owner, res.data.id);

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
      const res = await axios.post(`http://localhost:3001/api/orders/status-owner-paid/${this.state.orderData.id}`);

      if (this.state.advertData.id_advert_type === 0) {
        await axios.post(`http://localhost:3001/api/test/users/minus-balance-usdt/`, {
          id: this.state.orderData.id_client,
          amount: this.state.orderData.amount_crypto,
        });

        await axios.post(`http://localhost:3001/api/test/users/plus-balance-usdt/`, {
          id: this.state.orderData.id_owner,
          amount: this.state.orderData.amount_crypto,
        });
      } else {
        await axios.post(`http://localhost:3001/api/test/users/minus-balance-usdt/`, {
          id: this.state.orderData.id_owner,
          amount: this.state.orderData.amount_crypto,
        });

        await axios.post(`http://localhost:3001/api/test/users/plus-balance-usdt/`, {
          id: this.state.orderData.id_client,
          amount: this.state.orderData.amount_crypto,
        });
      }

      if (res.data.status === 3) {
        this.setState({
          idAdvert: -1,
          orderData: null,
          advertData: null,
          amount: 0,
          recievAmount: 0,
          // idClient: 0,
          timer: 0,
          timeoutID: null,
        });

        this.props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <UserProfileTable user={this.props.users[this.state.advertData.id_owner]} />
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
                <ProfileCurrentUser user={this.props.currentUser} />
                {this.state.advertData.id_advert_type === 1 && (
                  <>
                    <div>
                      <p>I want to pay [{this.props.fiats[this.state.advertData.id_fiat].mnemo}]: </p>
                      <input type="number" onChange={this.handlerUpdateBuy} />
                    </div>
                    <div>
                      <p>Price: {this.state.advertData.price}</p>
                    </div>
                    <div>
                      <p>I will receive: </p>
                      <p>
                        {this.state.amount_crypto} {this.props.cryptos[this.state.advertData.id_crypto].mnemo}
                      </p>
                    </div>
                    <div>
                      <select name="selectPaimentMethod" onChange={this.handleSelectPaimentMethod}>
                        <option value={-1}>Choose Paiment Method</option>
                        {this.state.advertData.id_payment_methods.map(item => (
                          <option value={item}>{this.props.paimentMethods[item].label}</option>
                        ))}
                      </select>
                    </div>
                    {this.state.amount_crypto > 0 && (
                      <button onClick={this.handleCreateOrder}>
                        Buy {this.props.cryptos[this.state.advertData.id_crypto].mnemo}
                      </button>
                    )}
                  </>
                )}
                {this.state.advertData.id_advert_type === 0 && (
                  <>
                    <div>
                      <p>I want to sell [{this.props.cryptos[this.state.advertData.id_crypto].mnemo}]: </p>
                      <input type="number" onChange={this.handlerUpdateSale} />
                    </div>
                    <div>
                      <p>Price: {this.state.advertData.price}</p>
                    </div>
                    <div>
                      <p>I will receive [{this.props.fiats[this.state.advertData.id_fiat].mnemo}]: </p>
                      <p>{this.state.amount_fiat}</p>
                    </div>
                    <div>
                      <select name="selectPaimentMethod" onChange={this.handleSelectPaimentMethod}>
                        <option value={-1}>Choose Paiment Method</option>
                        {this.state.advertData.id_payment_methods.map(item => (
                          <option value={item}>{this.props.paimentMethods[item].label}</option>
                        ))}
                      </select>
                    </div>
                    {this.state.amount_fiat > 0 && (
                      <button onClick={this.handleCreateOrder}>
                        Sale {this.props.cryptos[this.state.advertData.id_crypto].mnemo}
                      </button>
                    )}
                  </>
                )}
              </WrapperHalf>
            </Wrapper>
          )}
          {this.state.orderData && this.state.orderData.status === 0 && (
            <Wrapper>
              <WrapperHalf>
                <UserProfileTable user={this.props.users[this.state.advertData.id_owner]} />
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
                <ProfileCurrentUser user={this.props.currentUser} />
                <p>Wait for the {this.props.users[this.state.advertData.id_owner].email} to approve the transaction</p>
                <p>[{this.state.timer}]</p>
              </WrapperHalf>
            </Wrapper>
          )}
          {this.state.orderData && this.state.orderData.status === 1 && (
            <Wrapper>
              {this.state.advertData.id_advert_type === 0 && (
                <>
                  <WrapperHalf>
                    <UserProfileTable user={this.props.users[this.state.advertData.id_owner]} />
                    <div>
                      <p>Maker's Terms and Conditions (please read carefully)</p>
                      <p>
                        Payment only from vaisa to vaisa, with a card of any bank of Ukraine to pay is not possible, I
                        take on a trusted person, as I have limits
                      </p>
                    </div>
                  </WrapperHalf>
                  <Separator />
                  <WrapperHalf>
                    <ProfileCurrentUser user={this.props.currentUser} />
                    <p>
                      Wait until the {this.props.users[this.state.advertData.id_owner].email} transfers the{' '}
                      {this.state.orderData.amount_fiat} {this.props.fiats[this.state.orderData.id_fiat].mnemo} to you,
                      then click payment accepted
                    </p>
                    <button onClick={this.handlePaymentAccepted}>Payment accepted</button>
                  </WrapperHalf>
                </>
              )}
              {this.state.advertData.id_advert_type === 1 && (
                <>
                  <WrapperHalf>
                    <UserProfileTable user={this.props.users[this.state.advertData.id_owner]} />
                    <div>
                      <p>Maker's Terms and Conditions (please read carefully)</p>
                      <p>
                        Payment only from vaisa to vaisa, with a card of any bank of Ukraine to pay is not possible, I
                        take on a trusted person, as I have limits
                      </p>
                    </div>
                  </WrapperHalf>
                  <Separator />
                  <WrapperHalf>
                    <ProfileCurrentUser user={this.props.currentUser} />
                    <p>
                      You need to transfer {this.state.orderData.amount_fiat}{' '}
                      {this.props.fiats[this.state.orderData.id_fiat].mnemo} to the{' '}
                      {this.props.users[this.state.advertData.id_owner].email}. After payment, click the button 'Payment
                      success'
                    </p>
                    <button onClick={this.handlePaymentAccepted}>Payment success</button>
                  </WrapperHalf>
                </>
              )}
            </Wrapper>
          )}
        </ModalForm>
      </Overlay>,
      modalRoot
    );
  }
}
