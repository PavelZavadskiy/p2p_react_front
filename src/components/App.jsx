import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from './Table';
import users from '../json/user.json';
import arverts_type from '../json/arverts_type.json';
import cryptos from '../json/cryptos.json';
import { CreateAdvert } from './CreateAdvert/CreateAdvert';
import { Modal } from './Modal/Modal';
import { TableOrders } from './TableOrders';

export function App() {
  const [adverts, setAdverts] = useState([]);
  const [displayAdverts, setDisplayAdverts] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [advertType, setAdvertType] = useState(-1);
  const [cryptoFrom, setCryptoFrom] = useState(-1);
  const [cryptoTo, setCryptoTo] = useState(-1);
  const [idAdvert, setIdAdvert] = useState(-1);

  useEffect(() => {
    const getAll = async () => {
      try {
        const list = await axios.get(`http://localhost:3001/api/adverts`);

        setAdverts(list.data);

        let dataset = list.data.map(item => ({
          ...item,
          id_user_advert: users[item.id_user_advert].email,
          advert_type: arverts_type[item.advert_type].type,
          crypto_from: cryptos[item.crypto_from].mnemo,
          crypto_to: cryptos[item.crypto_to].mnemo,
        }));

        // setAdverts(dataset);
        setDisplayAdverts(dataset);

        const orders = await axios.get(`http://localhost:3001/api/orders`);
        setDisplayOrders(orders.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAll();
  }, []);

  useEffect(() => {
    let filterData = adverts;
    if (advertType >= 0) {
      filterData = filterData.filter(item => item.advert_type === advertType);
    }
    if (cryptoFrom >= 0) {
      filterData = filterData.filter(item => item.crypto_from === cryptoFrom);
    }

    if (cryptoTo >= 0) {
      filterData = filterData.filter(item => item.crypto_to === cryptoTo);
    }
    const dataset = filterData.map(item => ({
      ...item,
      id_user_advert: users[item.id_user_advert].email,
      advert_type: arverts_type[item.advert_type].type,
      crypto_from: cryptos[item.crypto_from].mnemo,
      crypto_to: cryptos[item.crypto_to].mnemo,
    }));
    setDisplayAdverts(dataset);
  }, [advertType, adverts, cryptoFrom, cryptoTo]);

  const handleOnChangeAdvertType = e => {
    setAdvertType(Number(e.target.value));
  };

  const handleOnChangeCryptoFrom = e => {
    setCryptoFrom(Number(e.target.value));
  };

  const handleOnChangeCryptoTo = e => {
    setCryptoTo(Number(e.target.value));
  };

  const handleCreateAdvert = data => {
    const create = async data => {
      console.log('handleCreateAdvert', data);
      try {
        await axios.post(`http://localhost:3001/api/adverts`, data);

        const list = await axios.get(`http://localhost:3001/api/adverts`);

        setAdverts(list.data);

        // setAdverts(list.data);

        // let dataset = list.data.map(item => ({
        //   ...item,
        //   id_user_advert: users[item.id_user_advert].email,
        //   advert_type: arverts_type[item.advert_type].type,
        //   crypto_from: cryptos[item.crypto_from].mnemo,
        //   crypto_to: cryptos[item.crypto_to].mnemo,
        // }));

        // // setAdverts(dataset);
        // setDisplayAdverts(dataset);
      } catch (error) {
        console.log(error);
      }
    };

    create(data);
  };

  const handleCloseModal = () => {
    // setShowModal(false);
    setIdAdvert(-1);
    axios.get(`http://localhost:3001/api/orders`).then(response => setDisplayOrders(response.data));
  };

  const handleCreateOrder = id => {
    setIdAdvert(id);
    console.log(id);
  };

  return (
    <div>
      <div className="wrapper">
        <div>
          <label htmlFor="select"> Advert type :</label>
          <select name="select" onChange={handleOnChangeAdvertType}>
            <option value="-1" selected>
              All
            </option>
            <option value="0">Selling</option>
            <option value="1">Buying</option>
          </select>
        </div>
        <div>
          <label htmlFor="selectCurrency"> Crypto currency from :</label>
          <select name="selectCurrency" onChange={handleOnChangeCryptoFrom}>
            <option value="-1" selected>
              All
            </option>
            {cryptos.map(item => (
              <option value={item.id}>{item.mnemo}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="selectCurrency"> Crypto currency to :</label>
          <select name="selectCurrency" onChange={handleOnChangeCryptoTo}>
            <option value="-1" selected>
              All
            </option>
            {cryptos.map(item => (
              <option value={item.id}>{item.mnemo}</option>
            ))}
          </select>
        </div>
      </div>
      <Table dataset={displayAdverts} createOrder={handleCreateOrder} />
      <div className="wrapper">
        <CreateAdvert onClickCreate={handleCreateAdvert} />
      </div>
      {displayOrders.length > 0 && <TableOrders dataset={displayOrders} />}

      {idAdvert > 0 && <Modal onClose={handleCloseModal} id_arvert={idAdvert} />}
    </div>
  );
}
