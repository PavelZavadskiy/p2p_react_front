import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPriceRadioBox } from './AdvertCreateBlockPriceRadioBox';
import { AdvertCreateBlockPriceTypeFixed } from './AdvertCreateBlockPriceTypeFixed';
import { AdvertCreateBlockPriceFinalInfo } from './AdvertCreateBlockPriceFinalInfo';
import { AdvertCreateBlockPriceTypeFloating } from './AdvertCreateBlockPriceTypeFloating';

export function AdvertCreateOrderLimitBlock({
  currentTypeAds,
  cryptos,
  fiats,
  currentFiat,
  changeCurrentFiat,
  currentCrypto,
  changeCurrentCrypto,
  currentTypePrice,
  changeCurrentTypePrice,
  currentGlobalPrice,
  currentPrice,
  changeCurrentPrice,
  limitMin,
  limitMax,
  currentHighestOrderPrice,
  currentPercentPrice,
  changeCurrentPercentPrice,
  currentUser,
  currentAvailable,
  changeCurrentAvailable,
  currentMinAvailable,
  currentOrderLimitMin,
  currentOrderLimitMax,
  changeCurrentOrderLimitMin,
  changeCurrentOrderLimitMax,
}) {
  const [orderLimitMinUsdt, setOrderLimitMinUsdt] = useState(0);
  const [orderLimitMaxUsdt, setOrderLimitMaxUsdt] = useState(0);

  const orderLimitMinInput = useRef();
  const orderLimitMaxInput = useRef();

  useEffect(() => {
    setOrderLimitMinUsdt(Math.round(currentOrderLimitMin * (1 / currentPrice) * 100) / 100);
  }, [currentOrderLimitMin, currentPrice]);

  useEffect(() => {
    setOrderLimitMaxUsdt(Math.round(currentOrderLimitMax * (1 / currentPrice) * 100) / 100);
  }, [currentOrderLimitMax, currentPrice]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (orderLimitMinInput.current) {
        orderLimitMinInput.current.value = currentOrderLimitMin;
        clearInterval(interval);
      }
    }, 100);
  }, [currentOrderLimitMin]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (orderLimitMaxInput.current) {
        orderLimitMaxInput.current.value = currentOrderLimitMax;
        clearInterval(interval);
      }
    }, 100);
  }, [currentOrderLimitMax]);

  const handlerChangeOrderLimitMin = e => {
    changeCurrentOrderLimitMin(e.target.value);
  };
  const handlerChangeOrderLimitMax = e => {
    changeCurrentOrderLimitMax(e.target.value);
  };

  return (
    <div className="advert_create_tuning_ads_order_limit_block">
      <div className="advert_create_tuning_ads_order_limit_item_wrapper">
        <label className="advert_create_tuning_ads_order_limit_item_label">Order Limit</label>
        <div className="advert_create_tuning_ads_order_limit_item_input_wrapper">
          <input
            data-bn-type="input"
            name="minOrderPrice"
            type="text"
            className="advert_create_tuning_ads_order_limit_item_input"
            ref={orderLimitMinInput}
            onChange={handlerChangeOrderLimitMin}
          />
          <div className="advert_create_tuning_ads_order_limit_item_mnemo_wrapper">
            <div className="advert_create_tuning_ads_order_limit_item_mnemo">UAH</div>
          </div>
          {cryptos && (
            <div data-bn-type="text" class="advert_create_tuning_ads_order_limit_item_calculate">
              ≈ {orderLimitMinUsdt.toFixed(2)} {cryptos[currentCrypto].mnemo}
            </div>
          )}
        </div>
      </div>
      <div data-bn-type="text" class="advert_create_tuning_ads_order_limit_item_separator">
        ~
      </div>
      <div className="advert_create_tuning_ads_order_limit_item_wrapper">
        <label className="advert_create_tuning_ads_order_limit_item_label"> </label>
        <div className="advert_create_tuning_ads_order_limit_item_input_wrapper">
          <input
            data-bn-type="input"
            name="minOrderPrice"
            type="text"
            className="advert_create_tuning_ads_order_limit_item_input"
            ref={orderLimitMaxInput}
            onChange={handlerChangeOrderLimitMax}
          />
          <div className="advert_create_tuning_ads_order_limit_item_mnemo_wrapper">
            <div className="advert_create_tuning_ads_order_limit_item_mnemo">UAH</div>
          </div>
          {cryptos && (
            <div data-bn-type="text" class="advert_create_tuning_ads_order_limit_item_calculate">
              ≈ {orderLimitMaxUsdt.toFixed(2)} {cryptos[currentCrypto].mnemo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
