import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAmountTotalBlock } from './AdvertCreateAmountTotalBlock';
import { AdvertCreateOrderLimitBlock } from './AdvertCreateOrderLimitBlock';

export function AdvertCreateAmountBlock({
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
  useEffect(() => {
    console.log('AdvertCreateBlockPrice > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  return (
    <div className="advert_create_tuning_ads_amount_block">
      <AdvertCreateAmountTotalBlock
        cryptos={cryptos}
        fiats={fiats}
        currentFiat={currentFiat}
        currentCrypto={currentCrypto}
        currentUser={currentUser}
        currentAvailable={currentAvailable}
        changeCurrentAvailable={changeCurrentAvailable}
        currentPrice={currentPrice}
        currentMinAvailable={currentMinAvailable}
        currentTypeAds={currentTypeAds}
      />
      <AdvertCreateOrderLimitBlock
        currentOrderLimitMin={currentOrderLimitMin}
        currentOrderLimitMax={currentOrderLimitMax}
        changeCurrentOrderLimitMin={changeCurrentOrderLimitMin}
        changeCurrentOrderLimitMax={changeCurrentOrderLimitMax}
        cryptos={cryptos}
        fiats={fiats}
        currentFiat={currentFiat}
        currentCrypto={currentCrypto}
        currentUser={currentUser}
        currentPrice={currentPrice}
      />
    </div>
  );
}
