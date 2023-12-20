import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPrice } from './AdvertCreateBlockPrice';

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
}) {
  useEffect(() => {
    console.log('AdvertCreateTunningBlock > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  return (
    <div className="advert_create_tuning_ads_wrapper">
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
      />
    </div>
  );
}
