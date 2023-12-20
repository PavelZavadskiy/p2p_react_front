import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableAdverts } from '../TableAdverts/TableAdverts';
import { TableMenu } from '../TableMenu/TableMenu';
import { TableFilter } from '../TableFilter/TableFilter';

export function Advert() {
  const [users, setUsers] = useState(null);
  const [adverts, setAdverts] = useState(null);
  const [cryptos, setCryptos] = useState(null);
  const [fiats, setFiats] = useState(null);
  const [paimentMethods, setPaimentMethods] = useState(null);
  const [regions, setRegions] = useState(null);
  const [advertTypes, setAdvertTypes] = useState(null);

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

  const handleCreateOrder = id => {
    console.log('handleCreateOrder > ', id);
    // setIdAdvert(id);
    // console.log(id);
  };

  return (
    <>
      {cryptos && (
        <TableMenu
          cryptos={cryptos}
          changeAdvertType={handleOnChangeCurrentAdvertType}
          changeCrypto={handleOnChangeCurrenCrypto}
        />
      )}
      {cryptos && (
        <TableFilter
          currentFiat={currentFiat}
          cryptos={cryptos}
          fiats={fiats}
          paimentMethods={paimentMethods}
          regions={regions}
          currentRegion={currentRegion}
          changeFiat={handleOnChangeCurrentFiat}
          currentPaimentMethod={currentPaimentMethod}
          changePaimentMethod={handleOnChangeCurrentPaimentMethod}
          changeRegion={handleOnChangeCurrentRegion}
          changeAmount={handleOnChangeCurrentAmount}
          filterTypes={filterTypes}
          currentFilterType={currentFilterType}
          changeFilterType={handleOnChangeFilterType}
          changeIsOnlyMerchantAds={handleOnChangeIsOnlyMerchantAds}
          isOnlyMerchantAds={isOnlyMerchantAds}
        />
      )}
      <TableAdverts
        dataset={adverts}
        cryptos={cryptos}
        fiats={fiats}
        users={users}
        paimentMethods={paimentMethods}
        regions={regions}
        advertTypes={advertTypes}
        createOrder={handleCreateOrder}
        currentAdvertType={currentAdvertType}
        currentCrypto={currentCrypto}
        currentFiat={currentFiat}
        currentPaimentMethod={currentPaimentMethod}
        currentRegion={currentRegion}
        currentAmount={currentAmount}
        currentFilterType={currentFilterType}
      />
    </>
  );
}
