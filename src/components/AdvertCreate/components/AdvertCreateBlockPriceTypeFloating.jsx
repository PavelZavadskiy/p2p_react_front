import { useEffect, useState, useRef } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export function AdvertCreateBlockPriceTypeFloating({
  currentGlobalPrice,
  currentPrice,
  changeCurrentPrice,
  limitMin,
  limitMax,
  currentHighestOrderPrice,
  currentPercentPrice,
  changeCurrentPercentPrice,
  currentFiat,
  fiats,
}) {
  const handlerOnReduce = () => {
    if (limitMin < currentPrice) changeCurrentPercentPrice(Math.round((currentPercentPrice - 0.01) * 100) / 100);
  };

  const handlerOnIncrease = () => {
    if (limitMax > currentPrice) changeCurrentPercentPrice(Math.round((currentPercentPrice + 0.01) * 100) / 100);
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
                  className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_logo"
                >
                  <path d="M3 10.5v3h18v-3H3z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
            <input
              data-bn-type="input"
              id="C2C_p2pPost_step1_price_input"
              type="text"
              className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_input"
              value={currentPercentPrice.toFixed(2) + ' %'}
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
                  className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_logo"
                >
                  <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div data-bn-type="text" className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_info">
          <Tooltip title="Floating price = Market price x exchange rate  x price margin" arrow>
            <span  className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_info_formula">Pricing formula</span>
          </Tooltip>{' '}
          {currentGlobalPrice.toFixed(2)} * {currentPercentPrice.toFixed(2)} &#8776;{' '}
          <span className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_info_span">
            {currentPrice.toFixed(2)} {fiats[currentFiat].mnemo}
          </span>
        </div>
      </div>
    </div>
  );
}
