import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPrice } from './AdvertCreateBlockPrice';
import { AdvertCreateAmountPaymentBlock } from './AdvertCreateAmountPaymentBlock';

export function AdvertCreateTunningBlock({
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
  adsCurrentStep,
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
    console.log('AdvertCreateTunningBlock > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  return (
    <div className="advert_create_tuning_ads_wrapper">
      {adsCurrentStep === 1 && (
        <>
          <AdvertCreateAssetBlock
            cryptos={cryptos}
            fiats={fiats}
            currentFiat={currentFiat}
            changeCurrentFiat={changeCurrentFiat}
            currentCrypto={currentCrypto}
            changeCurrentCrypto={changeCurrentCrypto}
          />
          <div className="advert_create_tuning_ads_asset_block_separator"></div>

          <AdvertCreateBlockPrice
            cryptos={cryptos}
            fiats={fiats}
            currentFiat={currentFiat}
            changeCurrentFiat={changeCurrentFiat}
            currentCrypto={currentCrypto}
            changeCurrentCrypto={changeCurrentCrypto}
            currentTypePrice={currentTypePrice}
            changeCurrentTypePrice={changeCurrentTypePrice}
            currentGlobalPrice={currentGlobalPrice}
            currentPrice={currentPrice}
            changeCurrentPrice={changeCurrentPrice}
            limitMin={limitMin}
            limitMax={limitMax}
            currentHighestOrderPrice={currentHighestOrderPrice}
            currentPercentPrice={currentPercentPrice}
            changeCurrentPercentPrice={changeCurrentPercentPrice}
          />
        </>
      )}
      {adsCurrentStep === 2 && (
        <AdvertCreateAmountPaymentBlock
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
          timesLimits={timesLimits}
          currentTimesLimit={currentTimesLimit}
          changeCurrentTimesLimit={changeCurrentTimesLimit}
          paimentMethods={paimentMethods}
          addCurrentPaymentsMethods={addCurrentPaymentsMethods}
          removeCurrentPaymentsMethods={removeCurrentPaymentsMethods}
          currentPaymentsMethods={currentPaymentsMethods}
        />
      )}
    </div>
  );
}
