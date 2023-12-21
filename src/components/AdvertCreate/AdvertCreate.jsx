import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoTriangleDown } from 'react-icons/go';
import { BsArrowRightShort } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import { AdvertCreateHeader } from './components/AdvertCreateFilter';
import { AdvertCreateSteps } from './components/AdvertCreateSteps';
import { AdvertCreateChooseType } from './components/AdvertCreateChooseType';
import { AdvertCreateTunningBlock } from './components/AdvertCreateTunningBlock';
import { AdvertCreateHelp } from './components/AdvertCreateHelp';
import { AdvertCreateNextPrewBlock } from './components/AdvertCreateNextPrewBlock';

export function AdvertCreate({ currentUser }) {
  //TODO Must come from the outside
  const [currentGlobalPrice, setCurrentGlobalPrice] = useState(37.62);
  const [limitMin, setLimitMin] = useState(30.1);
  const [limitMax, setLimitMax] = useState(86.53);
  const [currentHighestOrderPrice, setCurrentHighestOrderPrice] = useState(41.74);
  const [timesLimits, setTimesLimits] = useState([
    { id: 0, title: '15 min' },
    { id: 1, title: '30 min' },
    { id: 2, title: '45 min' },
    { id: 3, title: '1 hr' },
    { id: 4, title: '2 hr' },
    { id: 5, title: '3 hr' },
  ]);

  const [cryptos, setCryptos] = useState(null);
  const [fiats, setFiats] = useState(null);
  const [paimentMethods, setPaimentMethods] = useState(null);
  const [regions, setRegions] = useState(null);
  const [advertTypes, setAdvertTypes] = useState(null);

  const [adsCurrentStep, setAdsCurrentStep] = useState(1);
  const [currentTypeAds, setCurentTypeAds] = useState(0);
  const [currentFiat, setCurrentFiat] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState(0);
  const [currentTypePrice, setCurrentTypePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(currentGlobalPrice);
  const [currentPercentPrice, setCurrentPercentPrice] = useState(100);
  const [currentAvailable, setCurrentAvailable] = useState(1000);
  const [currentMinAvailable, setCurrentMinAvailable] = useState(100);
  const [currentOrderLimitMin, setCurrentOrderLimitMin] = useState(400);
  const [currentOrderLimitMax, setCurrentOrderLimitMax] = useState(735750);
  const [currentTimesLimit, setCurrentTimesLimit] = useState(0);
  const [currentPaymentsMethods, setCurrentPaymentsMethods] = useState([]);

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

  useEffect(() => {
    // IF TYPE PRICE FLOATING
    if (currentTypePrice === 1) {
      setCurrentPrice(Math.round(currentGlobalPrice * currentPercentPrice) / 100);
    }
  }, [currentGlobalPrice, currentPercentPrice, currentTypePrice]);

  const handleRadioChecked = e => {
    console.log(e.target.checked);
  };

  const handleRadioCheckedLabel = e => {
    console.log(e.target);
  };

  const handleChangeCurrentTypeAds = value => {
    setCurentTypeAds(value);
  };

  const handleChangeCurrentFiat = value => {
    console.log('handleChangeCurrentFiat > ', value);
    setCurrentFiat(value);
  };

  const handlerChangeCurrentCrypto = value => {
    console.log('handlerChangeCurrentCrypto > ', value);
    setCurrentCrypto(value);
  };

  const handlerChangeCurrentTypePrice = value => {
    console.log('handlerChangeCurrentCrypto > ', value);
    setCurrentTypePrice(value);
  };

  const handleChangeCurrentPrice = value => {
    setCurrentPrice(value);
  };

  const handleChangeCurrentPercentPrice = value => {
    setCurrentPercentPrice(value);
  };

  const handleChangeCurrentStepIncrease = () => {
    setAdsCurrentStep(adsCurrentStep + 1);
  };

  const handleChangeCurrentStepReduce = () => {
    setAdsCurrentStep(adsCurrentStep - 1);
  };

  const handleChangeCurrentAvailable = value => {
    setCurrentAvailable(value);
  };

  const handlerChangeCurrentOrderLimitMin = value => {
    setCurrentOrderLimitMin(value);
  };

  const handlerChangeCurrentOrderLimitMax = value => {
    setCurrentOrderLimitMax(value);
  };

  const handlerChangeCurrentTimesLimit = value => {
    setCurrentTimesLimit(value);
  };

  const handlerAddCurrentPaymentsMethods = id => {
    console.log('handlerAddCurrentPaymentsMethods >> id ', id);
    console.log('handlerAddCurrentPaymentsMethods >> currentPaymentsMethods = ', currentPaymentsMethods);
    setCurrentPaymentsMethods([...currentPaymentsMethods, id]);
  };

  const handlerRemoveCurrentPaymentsMethods = id => {
    console.log( "handlerRemoveCurrentPaymentsMethods >> ", id );
    setCurrentPaymentsMethods(currentPaymentsMethods.filter(item => item !== id));
  };

  return (
    <>
      <div className="advert_create_body">
        <AdvertCreateHeader />
        <div className="advert_create_body_wrapper container">
          <AdvertCreateSteps adsCurrentStep={adsCurrentStep} />
          <AdvertCreateChooseType currentTypeAds={currentTypeAds} changeCurrentTypeAds={handleChangeCurrentTypeAds} />
          <AdvertCreateTunningBlock
            currentTypeAds={currentTypeAds}
            cryptos={cryptos}
            fiats={fiats}
            currentFiat={currentFiat}
            changeCurrentFiat={handleChangeCurrentFiat}
            currentCrypto={currentCrypto}
            changeCurrentCrypto={handlerChangeCurrentCrypto}
            currentTypePrice={currentTypePrice}
            changeCurrentTypePrice={handlerChangeCurrentTypePrice}
            currentGlobalPrice={currentGlobalPrice}
            currentPrice={currentPrice}
            changeCurrentPrice={handleChangeCurrentPrice}
            limitMin={limitMin}
            limitMax={limitMax}
            currentHighestOrderPrice={currentHighestOrderPrice}
            currentPercentPrice={currentPercentPrice}
            changeCurrentPercentPrice={handleChangeCurrentPercentPrice}
            adsCurrentStep={adsCurrentStep}
            currentUser={currentUser}
            currentAvailable={currentAvailable}
            changeCurrentAvailable={handleChangeCurrentAvailable}
            currentMinAvailable={currentMinAvailable}
            currentOrderLimitMin={currentOrderLimitMin}
            currentOrderLimitMax={currentOrderLimitMax}
            changeCurrentOrderLimitMin={handlerChangeCurrentOrderLimitMin}
            changeCurrentOrderLimitMax={handlerChangeCurrentOrderLimitMax}
            timesLimits={timesLimits}
            currentTimesLimit={currentTimesLimit}
            changeCurrentTimesLimit={handlerChangeCurrentTimesLimit}
            paimentMethods={paimentMethods}
            addCurrentPaymentsMethods={handlerAddCurrentPaymentsMethods}
            removeCurrentPaymentsMethods={handlerRemoveCurrentPaymentsMethods}
            currentPaymentsMethods={currentPaymentsMethods}
          />
          <AdvertCreateHelp />
          <AdvertCreateNextPrewBlock
            changeCurrentStepIncrease={handleChangeCurrentStepIncrease}
            adsCurrentStep={adsCurrentStep}
            changeCurrentStepReduce={handleChangeCurrentStepReduce}
          />
        </div>
      </div>
    </>
  );
}
