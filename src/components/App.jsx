import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableAdverts } from './TableAdverts/TableAdverts';
// import users from '../json/user.json';
import arverts_type from '../json/arverts_type.json';
import cryptos from '../json/cryptos.json';
import { CreateAdvert } from './CreateAdvert/CreateAdvert';
import { Modal } from './Modal/Modal';
import { ModalCameOrder } from './ModalCameOrder/ModalCameOrder';
import { TableOrders } from './TableOrders';
// import { UserBlock } from './App.styled';
import { TableMenu } from './TableMenu/TableMenu';
import { TableFilter } from './TableFilter/TableFilter';
import { Advert } from './Advert/Advert';
import { AdvertCreate } from './AdvertCreate/AdvertCreate';

import { ChooseCurrentUser } from './ChooseCurrentUser/ChooseCurrentUser';
import { ProfileCurrentUser } from './ProfileCurrentUser/ProfileCurrentUser';
import { ModalCreateAdvert } from './ModalCreateAdvert/ModalCreateAdvert';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:3001');

export function App() {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUsers] = useState(null);
  const [adverts, setAdverts] = useState(null);
  const [cryptos, setCryptos] = useState(null);
  const [fiats, setFiats] = useState(null);
  const [paimentMethods, setPaimentMethods] = useState(null);
  const [regions, setRegions] = useState(null);
  const [advertTypes, setAdvertTypes] = useState(null);
  const [idAdvert, setIdAdvert] = useState(null);
  const [isPushhCreateAdvert, setIsPushhCreateAdvert] = useState(false);
  const [isCameMessage, setIsCameMessage] = useState(false);
  const [cameOrderId, setCameOrderId] = useState(null);

  const [displayAdverts, setDisplayAdverts] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [cryptoFrom, setCryptoFrom] = useState(-1);
  const [cryptoTo, setCryptoTo] = useState(-1);

  const [currentAdvertType, setCurrentAdvertType] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState(0);
  const [currentFiat, setCurrentFiat] = useState(0);
  const [currentPaimentMethod, setCurrentPaimentMethod] = useState(-1);
  const [currentRegion, setCurrentRegion] = useState(-1);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [isOnlyMerchantAds, setIsOnlyMerchantAds] = useState(false);
  // filterType - 0: Ціна, 1: Угоди, 2: Рівень завершення
  const filterTypes = [
    { id: 0, title: 'Price' },
    { id: 1, title: 'Trades' },
    { id: 2, title: 'Rate Completion' },
  ];
  const [currentFilterType, setCurrentFilterType] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await axios.get(`http://localhost:3001/api/test/users`);
        console.log(usersList.data);
        setUsers(usersList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getAdverts = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/adverts`);
        setAdverts(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdverts();
  }, []);

  useEffect(() => {
    const getAdverts = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/adverts`);
        setAdverts(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdverts();
  }, []);

  useEffect(() => {
    const getCryptos = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/cryptos`);
        setCryptos(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCryptos();
  }, []);

  useEffect(() => {
    const getFiats = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/fiats`);
        setFiats(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFiats();
  }, []);

  useEffect(() => {
    const getPaimentMethods = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/payment-methods`);
        setPaimentMethods(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPaimentMethods();
  }, []);

  useEffect(() => {
    const getRegions = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/regions`);
        setRegions(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRegions();
  }, []);

  useEffect(() => {
    const getAdvertTypes = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/advert-types`);
        setAdvertTypes(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdvertTypes();
  }, []);

  const handleOnChangeCurrentUser = user => {
    console.log(user);
    setCurrentUsers(user);
  };

  const handleCreateOrder = id => {
    console.log('handleCreateOrder > ', id);
    setIdAdvert(id);
    console.log(id);
  };

  useEffect(() => {
    function onConnect() {
      console.log('onConnect >>> ');
    }

    function onDisconnect() {
      console.log('onDisconnect >>> ');
    }

    function onMessageEvent(value) {
      console.log('onFooEvent >>> value: ', value);
      const data = value.split('-');
      console.log(currentUser);
      if (currentUser) {
        if (currentUser.id === Number(data[0])) {
          console.log('setIsCameMessage(true)');
          setIsCameMessage(true);
          setCameOrderId(Number(data[2]));
        }
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, [currentUser]);

  // useEffect(() => {
  //   const getAll = async () => {
  //     try {
  //       const list = await axios.get(`http://localhost:3001/api/adverts`);
  //       setAdverts(list.data);

  //       console.log('=====> ', users);

  //       let dataset = list.data.map(item => ({
  //         ...item,
  //         id_user_advert: users[item.id_user_advert].email,
  //         advert_type: arverts_type[item.advert_type].type,
  //         crypto_from: cryptos[item.crypto_from].mnemo,
  //         crypto_to: cryptos[item.crypto_to].mnemo,
  //       }));

  //       // setAdverts(dataset);
  //       setDisplayAdverts(dataset);

  //       const orders = await axios.get(`http://localhost:3001/api/orders`);
  //       setDisplayOrders(orders.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAll();
  // }, [users]);

  // useEffect(() => {
  //   let filterData = adverts;
  //   if (advertType >= 0) {
  //     filterData = filterData.filter(item => item.advert_type === advertType);
  //   }
  //   if (cryptoFrom >= 0) {
  //     filterData = filterData.filter(item => item.crypto_from === cryptoFrom);
  //   }

  //   if (cryptoTo >= 0) {
  //     filterData = filterData.filter(item => item.crypto_to === cryptoTo);
  //   }
  //   const dataset = filterData.map(item => ({
  //     ...item,
  //     id_user_advert: users[item.id_user_advert].email,
  //     advert_type: arverts_type[item.advert_type].type,
  //     crypto_from: cryptos[item.crypto_from].mnemo,
  //     crypto_to: cryptos[item.crypto_to].mnemo,
  //   }));
  //   setDisplayAdverts(dataset);
  // }, [advertType, adverts, cryptoFrom, cryptoTo, users]);

  const handleOnChangeCurrentAdvertType = value => {
    setCurrentAdvertType(value);
  };

  const handleOnChangeCurrenCrypto = value => {
    setCurrentCrypto(value);
  };

  const handleOnChangeCurrentFiat = value => {
    console.log('handleOnChangeCurrentFiat >>> ', value);
    setCurrentFiat(value);
  };

  const handleOnChangeCurrentPaimentMethod = value => {
    console.log('handleOnChangeCurrentPaimentMethod >>> ', value);
    setCurrentPaimentMethod(value);
  };

  const handleOnChangeCurrentRegion = value => {
    console.log('handleOnChangeCurrentRegion >>> ', value);
    setCurrentRegion(value);
  };

  const handleOnChangeCurrentAmount = value => {
    console.log('handleOnChangeCurrentAmount >>> ', value);
    setCurrentAmount(value);
  };

  const handleOnChangeFilterType = value => {
    console.log('handleOnChangeCurrentAmount >>> ', value);
    setCurrentFilterType(value);
  };

  const handleOnChangeIsOnlyMerchantAds = value => {
    setIsOnlyMerchantAds(value);
  };

  // const handleOnChangeCryptoFrom = e => {
  //   setCryptoFrom(Number(e.target.value));
  // };

  // const handleOnChangeCryptoTo = e => {
  //   setCryptoTo(Number(e.target.value));
  // };

  // const handleCreateAdvert = data => {
  //   const create = async data => {
  //     console.log('handleCreateAdvert', data);
  //     try {
  //       await axios.post(`http://localhost:3001/api/adverts`, data);

  //       const list = await axios.get(`http://localhost:3001/api/adverts`);

  //       setAdverts(list.data);

  //       // setAdverts(list.data);

  //       // let dataset = list.data.map(item => ({
  //       //   ...item,
  //       //   id_user_advert: users[item.id_user_advert].email,
  //       //   advert_type: arverts_type[item.advert_type].type,
  //       //   crypto_from: cryptos[item.crypto_from].mnemo,
  //       //   crypto_to: cryptos[item.crypto_to].mnemo,
  //       // }));

  //       // // setAdverts(dataset);
  //       // setDisplayAdverts(dataset);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   create(data);
  // };

  const handleCloseModal = () => {
    // setShowModal(false);
    setIsPushhCreateAdvert(false);
    setIdAdvert(null);
    axios.get(`http://localhost:3001/api/adverts`).then(response => setAdverts(response.data));
    axios.get(`http://localhost:3001/api/orders`).then(response => setDisplayOrders(response.data));
    axios.get(`http://localhost:3001/api/test/users`).then(response => {
      setUsers(response.data);
      setCurrentUsers(response.data[currentUser.id]);
    });
    setIsCameMessage(false);
  };

  // const handleCreateOrder = id => {
  //   setIdAdvert(id);
  //   console.log(id);
  // };

  const handleOnClickCreateAdvert = () => {
    setIsPushhCreateAdvert(true);
  };

  const handleSendMessageCreateOrder = (user_id, order_id) => {
    socket.timeout(5000).emit('message', `${user_id}-order-${order_id}`, () => {});
  };

  return (
    <>
      <div className="wrapper">
        <ChooseCurrentUser users={users} handleOnChangeCurrentUser={handleOnChangeCurrentUser} />
      </div>
      <div className="wrapper_user_block">
        <ProfileCurrentUser user={currentUser} />
        {currentUser && (
          <button type="button" onClick={handleOnClickCreateAdvert}>
            Create advert
          </button>
        )}
      </div>
      {/* <Advert /> */}
      <AdvertCreate currentUser={currentUser}/>



      <div className="container">
        <div className="wrapper"></div>
        {isPushhCreateAdvert && currentUser && (
          <ModalCreateAdvert
            onClose={handleCloseModal}
            currentUser={currentUser}
            advertTypes={advertTypes}
            cryptos={cryptos}
            fiats={fiats}
            paimentMethods={paimentMethods}
            regions={regions}
          />
        )}
        {idAdvert && users && currentUser && fiats && cryptos && paimentMethods && (
          <Modal
            onClose={handleCloseModal}
            id_arvert={idAdvert}
            users={users}
            currentUser={currentUser}
            fiats={fiats}
            cryptos={cryptos}
            paimentMethods={paimentMethods}
            createOrderMessage={handleSendMessageCreateOrder}
          />
        )}

        {isCameMessage && users && currentUser && fiats && cryptos && paimentMethods && cameOrderId >= 0 && (
          <ModalCameOrder
            onClose={handleCloseModal}
            users={users}
            currentUser={currentUser}
            fiats={fiats}
            cryptos={cryptos}
            paimentMethods={paimentMethods}
            order_id={cameOrderId}
          />
        )}

        {/* {users && (
        <div className="wrapper">
          <select name="selectUser" onChange={handleOnChangeCurrentUser}>
            <option value={-1}>Choose Current user</option>
            {users.map(item => (
              <option value={item.id}>{item.email}</option>
            ))}
          </select>
          {currentUser && (
            <UserBlock>
              <img src={currentUser.avatar} alt="" width="32" />
              <p>{currentUser.email}</p>
              <p>Balance USDT: {currentUser.balance_usdt}</p>
              <p>Balance BTC: {currentUser.balance_btc}</p>
            </UserBlock>
          )}
        </div>
      )} */}
        {/* <div className="wrapper">
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
      <TableAdverts dataset={displayAdverts} createOrder={handleCreateOrder} users={users} />
      <div className="wrapper">
        <CreateAdvert onClickCreate={handleCreateAdvert} users={users} />
      </div>
      <div className="wrapper">{displayOrders.length > 0 && <TableOrders dataset={displayOrders} users={users} />}</div>*/}
      </div>
    </>
  );
}
