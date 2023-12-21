import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPriceRadioBox } from './AdvertCreateBlockPriceRadioBox';
import { AdvertCreateBlockPriceTypeFixed } from './AdvertCreateBlockPriceTypeFixed';
import { AdvertCreateBlockPriceFinalInfo } from './AdvertCreateBlockPriceFinalInfo';
import { AdvertCreateBlockPriceTypeFloating } from './AdvertCreateBlockPriceTypeFloating';
import { AdvertCreateAmountBlock } from './AdvertCreateAmountBlock';
import { AdvertCreatePaymentBlock } from './AdvertCreatePaymentBlock';
export function AdvertCreateAmountPaymentBlock({
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
  timesLimits,
  currentTimesLimit,
  changeCurrentTimesLimit,
  paimentMethods,
  addCurrentPaymentsMethods,
  removeCurrentPaymentsMethods,
  currentPaymentsMethods,
}) {
  useEffect(() => {
    console.log('AdvertCreateBlockPrice > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  return (
    <div className="advert_create_tuning_ads_asset_block_price_type">
      <AdvertCreateAmountBlock
        currentTypeAds={currentTypeAds}
        cryptos={cryptos}
        fiats={fiats}
        currentFiat={currentFiat}
        currentCrypto={currentCrypto}
        currentUser={currentUser}
        currentAvailable={currentAvailable}
        changeCurrentAvailable={changeCurrentAvailable}
        currentPrice={currentPrice}
        currentMinAvailable={currentMinAvailable}
        currentOrderLimitMin={currentOrderLimitMin}
        currentOrderLimitMax={currentOrderLimitMax}
        changeCurrentOrderLimitMin={changeCurrentOrderLimitMin}
        changeCurrentOrderLimitMax={changeCurrentOrderLimitMax}
      />
      <div className="advert_create_tuning_ads_amount_payment_block_separator"></div>
      <AdvertCreatePaymentBlock
        timesLimits={timesLimits}
        currentTimesLimit={currentTimesLimit}
        changeCurrentTimesLimit={changeCurrentTimesLimit}
        currentUser={currentUser}
        paimentMethods={paimentMethods}
        addCurrentPaymentsMethods={addCurrentPaymentsMethods}
        removeCurrentPaymentsMethods={removeCurrentPaymentsMethods}
        currentPaymentsMethods={currentPaymentsMethods}
      />
    </div>
  );
}
