import { useEffect } from 'react';

export function AdvertCreateBlockPriceFinalInfo({ currentPrice, currentHighestOrderPrice, fiats, currentFiat }) {
  useEffect(() => {
    console.log(
      `AdvertCreateBlockPriceFinalInfo currentPrice=${currentPrice}, currentHighestOrderPrice=${currentHighestOrderPrice}, currentFiat=${currentFiat}`
    );
    console.log(fiats);
  }, [currentFiat, currentHighestOrderPrice, currentPrice, fiats]);

  return (
    <div className="advert_create_tuning_ads_asset_block_price_final_info_wrapper">
      <div className="advert_create_tuning_ads_asset_block_price_final_item_wrapper">
        <div className="advert_create_tuning_ads_asset_block_price_final_item_title">YourPrice</div>
        <div className="advert_create_tuning_ads_asset_block_price_final_item_value">
          {String.fromCharCode(fiats[currentFiat].symbol)} {currentPrice}
        </div>
      </div>
      <div className="advert_create_tuning_ads_asset_block_price_final_item_wrapper">
        <div className="advert_create_tuning_ads_asset_block_price_final_item_title">Highest Order Price</div>
        <div className="advert_create_tuning_ads_asset_block_price_final_item_value">
          {String.fromCharCode(fiats[currentFiat].symbol)} {currentHighestOrderPrice}
        </div>
      </div>
    </div>
  );
}
