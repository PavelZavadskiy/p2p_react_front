import { useEffect, useState } from 'react';

import uah_logo from '../../images/UAH.png';
import { IconContext } from 'react-icons';
import { GoTriangleDown } from 'react-icons/go';
import { FaGlobe } from 'react-icons/fa';
import { HiFilter } from 'react-icons/hi';
import { HiRefresh } from 'react-icons/hi';
import { TableFilterPopUp } from './TableFilterPopUp';
import { TableFilterPopUpCheckBox } from './TableFilterPopUpCheckBox';

export const TableFilter = ({
  currentFiat,
  cryptos,
  fiats,
  paimentMethods,
  regions,
  changeFiat,
  changePaimentMethod,
  currentPaimentMethod,
  changeRegion,
  currentRegion,
  changeAmount,
  filterTypes,
  currentFilterType,
  changeFilterType,
  isOnlyMerchantAds,
  changeIsOnlyMerchantAds,
}) => {
  const [fiat, setFiat] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('');
  const [region, setRegion] = useState('');
  // const [prices, setPrices] = useState('Ціна');
  // const [fiat, setFiat] = useState(0);
  const [visiblePopUpCurrency, setVisiblePopUpCurrency] = useState(false);
  const [visiblePopUpPaymentMethods, setVisiblePopUpPaymentMethods] = useState(false);
  const [visiblePopUpRegions, setVisiblePopUpRegions] = useState(false);
  const [visiblePopUpTypeSort, setVisiblePopUpTypeSort] = useState(false);
  const [visiblePopUpMerchant, setVisiblePopUpMerchant] = useState(false);

  useEffect(() => {
    console.log('Filter useEffect currentFiat = ', currentFiat);
    console.log(fiats[currentFiat].mnemo);
    if (fiats) {
      setFiat(fiats[currentFiat].mnemo);
    }
  }, [currentFiat, fiats]);

  useEffect(() => {
    if (currentPaimentMethod === -1) {
      setPaymentMethods('All payments');
    } else {
      setPaymentMethods(paimentMethods[currentPaimentMethod].label);
    }
  }, [currentPaimentMethod, paimentMethods]);

  useEffect(() => {
    console.log('Filter useEffect currentFiat = ', currentFiat);
    console.log(fiats[currentFiat].mnemo);
    if (fiats) {
      setFiat(fiats[currentFiat].mnemo);
    }
  }, [currentFiat, fiats]);

  useEffect(() => {
    if (currentRegion === -1) {
      setRegion('All Regions');
    } else {
      setRegion(regions[currentRegion].label);
    }
  }, [currentRegion, region, regions]);

  const handleOpenPopUpFilterCurrency = () => {
    console.log('handleOpenPopUpFilter');
    setVisiblePopUpCurrency(!visiblePopUpCurrency);
  };

  const handleOpenPopUpFilterPaymentMethods = () => {
    console.log('handleOpenPopUpFilterPaymentMethods');
    setVisiblePopUpPaymentMethods(!visiblePopUpPaymentMethods);
  };

  const handleOpenPopUpFilterRegions = () => {
    setVisiblePopUpRegions(!visiblePopUpRegions);
  };

  const handleOpenPopUpTypeSort = () => {
    console.log('handleOpenPopUpTypeSort');
    setVisiblePopUpTypeSort(!visiblePopUpTypeSort);
  };

  const handleOpenPopUpMerchant = () => {
    console.log('handleOpenPopUpMerchant');
    setVisiblePopUpMerchant(!visiblePopUpMerchant);
  };

  const handleChangeAmount = e => {
    changeAmount(e.target.value);
  };

  return (
    <div className="section_table_filter">
      <div className="table_header_filter container">
        <div className="table_header_filter_amount_currency">
          <input
            type="number"
            placeholder="Enter amount"
            className="table_header_filter_payment_methods_amount"
            onChange={handleChangeAmount}
          />
          <div className="table_header_filter_payment_methods_crypto">
            <img src={uah_logo} alt="UAH" className="table_header_filter_payment_methods_crypto_img" />
            <div data-bn-type="text" className="table_header_filter_payment_methods_crypto_text">
              {fiat}
            </div>
            <div
              className="table_header_filter_payment_methods_crypto_triangle"
              onClick={handleOpenPopUpFilterCurrency}
            >
              <GoTriangleDown width="16" />
            </div>
          </div>
          {visiblePopUpCurrency && (
            <TableFilterPopUp
              data={fiats.map(item => ({ id: item.id, title: item.mnemo }))}
              onClose={handleOpenPopUpFilterCurrency}
              onChangeValue={changeFiat}
              isSearch={true}
            />
          )}
        </div>

        <div className="table_header_filter_payment_methods">
          <input type="text" className="table_header_filter_payment_methods_input" value={paymentMethods} />
          <div
            className="table_header_filter_payment_methods_crypto_triangle"
            onClick={handleOpenPopUpFilterPaymentMethods}
          >
            <GoTriangleDown width="16" />
          </div>
          {visiblePopUpPaymentMethods && (
            <TableFilterPopUp
              data={[{ id: -1, title: 'All payments' }].concat(
                paimentMethods.map(item => ({ id: item.id, title: item.label }))
              )}
              onClose={handleOpenPopUpFilterPaymentMethods}
              onChangeValue={changePaimentMethod}
              isSearch={true}
            />
          )}
        </div>
        <div className="table_header_filter_regions">
          <IconContext.Provider value={{ color: 'rgb(146, 154, 165)' }}>
            <div>
              <FaGlobe width="1em" height="1em" />
            </div>
          </IconContext.Provider>
          <input type="text" className="table_header_filter_payment_regions_input" value={region} />
          <div className="table_header_filter_payment_methods_crypto_triangle" onClick={handleOpenPopUpFilterRegions}>
            <GoTriangleDown width="16" />
          </div>
          {visiblePopUpRegions && (
            <TableFilterPopUp
              data={[{ id: -1, title: 'All Regions' }].concat(
                regions.map(item => ({ id: item.id, title: item.label }))
              )}
              onClose={handleOpenPopUpFilterRegions}
              onChangeValue={changeRegion}
              isSearch={true}
            />
          )}
        </div>
        <div className="table_header_filter_price">
          <input
            type="text"
            className="table_header_filter_payment_price_input"
            value={filterTypes[currentFilterType].title}
          />
          <div className="table_header_filter_payment_methods_crypto_triangle" onClick={handleOpenPopUpTypeSort}>
            <GoTriangleDown width="16" />
          </div>
          {visiblePopUpTypeSort && (
            <TableFilterPopUp
              data={filterTypes}
              onClose={handleOpenPopUpTypeSort}
              onChangeValue={changeFilterType}
              isSearch={false}
            />
          )}
        </div>
        <div className="table_header_filter_filter">
          <IconContext.Provider value={{ color: 'rgb(146, 154, 165)', size: '20px' }}>
            <div  className="table_header_filter_filter" onClick={handleOpenPopUpMerchant}>
              <HiFilter />
            </div>
          </IconContext.Provider>
          {visiblePopUpMerchant && <TableFilterPopUpCheckBox onClose={handleOpenPopUpMerchant} onChangeValue={changeIsOnlyMerchantAds} isOnlyMerchantAds={isOnlyMerchantAds}/>}
        </div>
        <div className="table_header_filter_update">
          <button type="button" className="table_header_filter_update_btn">
            <HiRefresh width="1em" height="1em" />
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};
