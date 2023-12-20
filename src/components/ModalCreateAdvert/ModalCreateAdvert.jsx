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
} from './ModalCreateAdvert.styled';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ProfileCurrentUser } from 'components/ProfileCurrentUser/ProfileCurrentUser';
import axios from 'axios';

const modalRoot = document.querySelector('#modal-root');

// users currentUser fiats cryptos paimentMethods
export class ModalCreateAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_advert_type: -1,
      id_crypto: -1,
      id_fiat: -1,
      id_payment_methods: [],
      id_region: -1,
      price: 0,
      limit: 0,
      available: 0,
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

  async componentDidMount() {}

  handlerUpdate = e => {};

  async componentDidUpdate() {
    console.log('STATE >>> ', this.state);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownListener);
  }

  handleCreateAdvert = async () => {
    if (
      this.props.currentUser.id >= 0 &&
      this.state.id_advert_type >= 0 &&
      this.state.id_crypto >= 0 &&
      this.state.id_fiat >= 0 &&
      this.state.id_payment_methods.length > 0 &&
      this.state.id_region >= 0
    ) {
      const data = {
        id_owner: this.props.currentUser.id,
        id_advert_type: this.state.id_advert_type,
        id_crypto: this.state.id_crypto,
        id_fiat: this.state.id_fiat,
        id_payment_methods: this.state.id_payment_methods,
        id_region: this.state.id_region,
        commision: 0,
        price: this.state.price,
        limit: this.state.limit,
        available: this.state.available,

      };
      console.log('handleCreateAdvert > ', data);

      try {
        await axios.post(`http://localhost:3001/api/adverts`, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleSelectAdvertType = e => {
    this.setState({ id_advert_type: Number(e.target.value) });
  };

  handleSelectCrypto = e => {
    this.setState({ id_crypto: Number(e.target.value) });
  };

  handleSelectFiat = e => {
    this.setState({ id_fiat: Number(e.target.value) });
  };

  handleChangePrice = e => {
    this.setState({ price: Number(e.target.value) });
  };

  handleChangeLimit = e => {
    this.setState({ limit: Number(e.target.value) });
  };

  handleChangeAvailable = e => {
    this.setState({ available: Number(e.target.value) });
  };

  handleCheckedPaimentMethod = e => {
    const value = Number(e.target.id);
    const paymentMethods = this.state.id_payment_methods;
    const index = paymentMethods.indexOf(value);
    if (index === -1) paymentMethods.push(value);
    else paymentMethods.splice(index, 1);
    this.setState({ id_payment_methods: paymentMethods });
  };

  handleSelectRegion = e => {
    this.setState({ id_region: Number(e.target.value) });
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

          <Wrapper>
            <select name="selectAdvertType" onChange={this.handleSelectAdvertType}>
              <option value={-1}>Choose Advert Type</option>
              {this.props.advertTypes.map(item => (
                <option value={item.id}>{item.label}</option>
              ))}
            </select>

            <select name="selectCrypto" onChange={this.handleSelectCrypto}>
              <option value={-1}>Choose Crypto</option>
              {this.props.cryptos.map(item => (
                <option value={item.id}>{item.mnemo}</option>
              ))}
            </select>

            <select name="selectFiat" onChange={this.handleSelectFiat}>
              <option value={null}>Choose Fiat</option>
              {this.props.fiats.map(item => (
                <option value={item.id}>{item.mnemo}</option>
              ))}
            </select>
            <input type="number" placeholder="Price" onChange={this.handleChangePrice} />
            <input type="number" placeholder="Limit" onChange={this.handleChangeLimit} />
            <input type="number" placeholder="Available" onChange={this.handleChangeAvailable} />
            <WrapperCheckBox>
              {this.props.paimentMethods.map(item => (
                <WrapperCheckBoxItem>
                  <input type="checkbox" id={item.id} name={item.label} onChange={this.handleCheckedPaimentMethod} />
                  <label for="item.label">{item.label}</label>
                </WrapperCheckBoxItem>
              ))}
            </WrapperCheckBox>

            <select name="regions" onChange={this.handleSelectRegion}>
              <option value={null}>Choose Region</option>
              {this.props.regions.map(item => (
                <option value={item.id}>{item.label}</option>
              ))}
            </select>

            <Button type="button" onClick={this.handleCreateAdvert}>
              Create
            </Button>
          </Wrapper>
        </ModalForm>
      </Overlay>,
      modalRoot
    );
  }
}
