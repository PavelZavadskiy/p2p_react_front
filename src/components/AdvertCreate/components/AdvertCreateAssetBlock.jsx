import { useEffect, useState, useRef } from 'react';
import { AdvertCreatePopUp } from './AdvertCreatePopUp';

export function AdvertCreateAssetBlock({
  currentTypeAds,
  cryptos,
  fiats,
  currentFiat,
  changeCurrentFiat,
  currentCrypto,
  changeCurrentCrypto,
}) {
  const [visibleSelectorCryptos, setVisibleSelectorCryptos] = useState(false);
  const [visibleSelectorFiats, setVisibleSelectorFiats] = useState(false);

  useEffect(() => {
    console.log('AdvertCreateAssetBlock > currentFiat = ', currentFiat, ', currentCrypto = ', currentCrypto);
  }, [currentCrypto, currentFiat]);

  const handlerOnVisibleCryptos = () => {
    setVisibleSelectorCryptos(!visibleSelectorCryptos);
  };

  const handlerOnVisibleFiats = () => {
    setVisibleSelectorFiats(!visibleSelectorFiats);
  };

  return (
    cryptos &&
    fiats && (
      <div className="advert_create_tuning_ads_asset_block">
        <div className="advert_create_tuning_ads_asset_block_item">
          <label htmlFor="" className="advert_create_tuning_ads_asset_block_label">
            Asset
          </label>
          <div className="advert_create_tuning_ads_asset_block_dropdown_select">
            <input
              type="text"
              className="advert_create_tuning_ads_asset_block_dropdown_select_input"
              value={cryptos[currentCrypto].mnemo}
              disabled
            />
            <div className="table_header_filter_payment_methods_crypto_triangle" onClick={handlerOnVisibleCryptos}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="table_header_filter_payment_methods_crypto_triangle_logo"
              >
                <path d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z" fill="currentColor"></path>
              </svg>
            </div>
            {visibleSelectorCryptos && (
              <AdvertCreatePopUp
                data={cryptos.map(item => ({ id: item.id, title: item.mnemo }))}
                onClose={handlerOnVisibleCryptos}
                isSearch={true}
                onChangeValue={changeCurrentCrypto}
              />
            )}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="advert_create_tuning_ads_arrow"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="advert_create_tuning_ads_asset_block_item">
          <label htmlFor="" className="advert_create_tuning_ads_asset_block_label">
            With Fiat
          </label>
          <div className="advert_create_tuning_ads_asset_block_dropdown_select">
            <input
              type="text"
              className="advert_create_tuning_ads_asset_block_dropdown_select_input"
              value={fiats[currentFiat].mnemo}
              disabled
            />
            <div className="table_header_filter_payment_methods_crypto_triangle" onClick={handlerOnVisibleFiats}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="table_header_filter_payment_methods_crypto_triangle_logo"
              >
                <path d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z" fill="currentColor"></path>
              </svg>
            </div>
            {visibleSelectorFiats && (
              <AdvertCreatePopUp
                data={fiats.map(item => ({ id: item.id, title: item.mnemo }))}
                onClose={handlerOnVisibleFiats}
                isSearch={true}
                onChangeValue={changeCurrentFiat}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}
