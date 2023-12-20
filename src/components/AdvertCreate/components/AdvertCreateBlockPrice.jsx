import { useEffect, useState, useRef } from 'react';
import { AdvertCreateAssetBlock } from './AdvertCreateAssetBlock';
import { AdvertCreateBlockPriceRadioBox } from './AdvertCreateBlockPriceRadioBox';
import { AdvertCreateBlockPriceTypeFixed } from './AdvertCreateBlockPriceTypeFixed';
import { AdvertCreateBlockPriceFinalInfo } from './AdvertCreateBlockPriceFinalInfo';

export function AdvertCreateBlockPrice({
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
    console.log('AdvertCreateBlockPrice > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  return (
    <div className="advert_create_tuning_ads_asset_block_price_type">
      <div className="advert_create_tuning_ads_asset_block_price_type_choose_block">
        <label htmlFor="fait" className="advert_create_tuning_ads_asset_block_price_type_choose_label">
          Price Type
        </label>

        <AdvertCreateBlockPriceRadioBox
          currentTypeAds={currentTypeAds}
          cryptos={cryptos}
          fiats={fiats}
          currentFiat={currentFiat}
          currentCrypto={currentCrypto}
          currentTypePrice={currentTypePrice}
          changeCurrentTypePrice={changeCurrentTypePrice}
        />
      </div>
      {currentTypePrice === 0 && (
        <AdvertCreateBlockPriceTypeFixed
          cryptos={cryptos}
          fiats={fiats}
          currentFiat={currentFiat}
          currentCrypto={currentCrypto}
          currentGlobalPrice={currentGlobalPrice}
          currentPrice={currentPrice}
          changeCurrentPrice={changeCurrentPrice}
          limitMin={limitMin}
          limitMax={limitMax}
          currentHighestOrderPrice={currentHighestOrderPrice}
        />
      )}
      <AdvertCreateBlockPriceFinalInfo
        currentPrice={currentPrice}
        currentHighestOrderPrice={currentHighestOrderPrice}
        fiats={fiats}
        currentFiat={currentFiat}
      />
    </div>
  );
}
