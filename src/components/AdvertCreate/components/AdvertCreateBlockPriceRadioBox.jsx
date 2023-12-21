import { useEffect, useState, useRef } from 'react';

export function AdvertCreateBlockPriceRadioBox({
  currentFiat,
  currentCrypto,
  currentTypePrice,
  changeCurrentTypePrice,
}) {
  const [priceType, setPriceType] = useState(0);

  const typeFixed = useRef();
  const typeFloating = useRef();

  useEffect(() => {
    console.log('AdvertCreateBlockPrice > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeFixed.current && typeFloating.current) {
        if (currentTypePrice === 0) {
          typeFixed.current.checked = true;
          typeFloating.current.checked = false;
          setPriceType(currentTypePrice);
        } else if (currentTypePrice === 1) {
          typeFixed.current.checked = false;
          typeFloating.current.checked = true;
          setPriceType(currentTypePrice);
        }
        clearInterval(interval);
      }
    }, 100);
  });

  const handleChange = e => {
    const { value } = e.target;
    setPriceType(Number(value));
    changeCurrentTypePrice(Number(value));
  };

  // visually-hidden
  // style="clip: rect(0px, 0px, 0px, 0px); position: absolute;"

  return (
    <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box">
      <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item">
        <label className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_label">
          {priceType === 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo_active"
            >
              <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
              <circle cx="8" cy="8" r="4" fill="currentColor"></circle>
            </svg>
          )}

          {priceType === 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo"
            >
              <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
            </svg>
          )}

          <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_title">Fixed</div>
          <input
            className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_input visually-hidden"
            type="radio"
            name="fait"
            value="0"
            onChange={handleChange}
            ref={typeFixed}
            // checked
          />
        </label>
      </div>
      <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item">
        <label className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_label">
          {priceType === 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo_active"
            >
              <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
              <circle cx="8" cy="8" r="4" fill="currentColor"></circle>
            </svg>
          )}

          {priceType === 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo"
            >
              <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
            </svg>
          )}
          <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_title">Floating</div>
          <input
            className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_input visually-hidden "
            type="radio"
            name="fait"
            value="1"
            onChange={handleChange}
            ref={typeFloating}
          />
        </label>
      </div>
    </div>
  );
}
