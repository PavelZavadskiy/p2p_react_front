import { useEffect, useState, useRef } from 'react';

export function AdvertCreateBlockPriceTypeFixed({
  currentGlobalPrice,
  currentPrice,
  changeCurrentPrice,
  limitMin,
  limitMax,
  currentHighestOrderPrice,
}) {
  const handlerOnReduce = () => {
    if (limitMin < currentPrice) changeCurrentPrice(Math.round((currentPrice - 0.01) * 100) / 100);
  };

  const handlerOnIncrease = () => {
    if (limitMax > currentPrice) changeCurrentPrice(Math.round((currentPrice + 0.01) * 100) / 100);
  };

  return (
    <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_wrapper">
      <label className="advert_create_tuning_ads_asset_block_price_type_tuning_price_label">Fixed</label>
      <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box">
        <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_wrapper">
          <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item">
            <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_wrapper">
              <button
                className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button"
                type="button"
                onClick={handlerOnReduce}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_logo"
                >
                  <path d="M3 10.5v3h18v-3H3z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
            <input
              data-bn-type="input"
              id="C2C_p2pPost_step1_price_input"
              type="text"
              class="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_input"
              value={currentPrice}
            ></input>
            <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_wrapper">
              <button
                className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button"
                type="button"
                onClick={handlerOnIncrease}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_logo"
                >
                  <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div data-bn-type="text" class="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_info">
          The fixed price should be between {limitMin} - {limitMax}
        </div>
      </div>
    </div>
  );
}
