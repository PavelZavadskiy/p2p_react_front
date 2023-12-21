import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPriceRadioBox } from './AdvertCreateBlockPriceRadioBox';
import { AdvertCreateBlockPriceTypeFixed } from './AdvertCreateBlockPriceTypeFixed';
import { AdvertCreateBlockPriceFinalInfo } from './AdvertCreateBlockPriceFinalInfo';
import { AdvertCreateBlockPriceTypeFloating } from './AdvertCreateBlockPriceTypeFloating';

export function AdvertCreateAmountTotalBlock({
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
}) {
  const [placeholder, setPlaceholder] = useState('Max 0');
  const [approximateTotal, setApproximateTotal] = useState(0);

  const inputAmount = useRef();

  useEffect(() => {
    if (currentUser) setPlaceholder('Max ' + currentUser.balance_usdt);
  }, [currentUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (inputAmount.current) {
        inputAmount.current.value = currentAvailable;
        clearInterval(interval);
      }
    }, 100);
  }, [currentAvailable]);

  useEffect(() => {
    setApproximateTotal(Math.round(currentAvailable * currentPrice * 100) / 100);
  }, [currentAvailable, currentPrice]);

  useEffect(() => {
    console.log(
      'AdvertCreateAmountTotalBlock > currentFiat = ',
      currentFiat,
      ', currentCrypto = ',
      currentCrypto,
      'currentPrice = ',
      currentPrice
    );
    console.log('AdvertCreateAmountTotalBlock > currentUser = ', currentUser);
  }, [currentCrypto, currentFiat, currentPrice, currentUser]);

  const handlerChangeCurrentAvailable = e => {
    changeCurrentAvailable(Number(e.target.value));
  };

  const handlerClickAll = () => {
    changeCurrentAvailable(currentUser.balance_usdt);
  };

  return (
    <div className="advert_create_tuning_ads_amount_total_block">
      <label className="advert_create_tuning_ads_amount_total_label">Total Amount</label>
      <div className="advert_create_tuning_ads_amount_total_input_wrapper">
        {currentUser && (
          <input
            placeholder={placeholder}
            name="initAmount"
            type="text"
            class="advert_create_tuning_ads_amount_total_input"
            ref={inputAmount}
            onChange={handlerChangeCurrentAvailable}
            // value="1,000"
          />
        )}
        <div className="advert_create_tuning_ads_amount_total_mnemo_wrapper">
          {cryptos && <div className="advert_create_tuning_ads_amount_total_mnemo">{cryptos[currentCrypto].mnemo}</div>}
        </div>
      </div>
      {fiats && (
        <div className="advert_create_tuning_ads_amount_total_approximate_total">
          &#8776; {approximateTotal} {fiats[currentFiat].mnemo}
        </div>
      )}

      {currentTypeAds === 1 && (
        <>
          {currentAvailable <= 0 && (
            <div className="advert_create_tuning_ads_amount_total_input_warning">Enter trading amount</div>
          )}
          {currentAvailable < currentMinAvailable && currentAvailable > 0 && (
            <div className="advert_create_tuning_ads_amount_total_input_warning">
              Total amount should not be less than {currentMinAvailable}
            </div>
          )}

          {currentAvailable >= currentMinAvailable && (
            <div className="advert_create_tuning_ads_amount_total_input_info_wrapper">
              Available:
              <div className="advert_create_tuning_ads_amount_total_input_info_available">currentUser.balance_usdt</div>
              <div className="advert_create_tuning_ads_amount_total_input_info_available_all" onClick={handlerClickAll}>
                All
              </div>
              <div className="advert_create_tuning_ads_amount_total_input_info_add_funds">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="advert_create_tuning_ads_amount_total_input_info_add_funds_logo"
                >
                  <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                </svg>
                Add Funds
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
