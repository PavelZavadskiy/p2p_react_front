import { useEffect, useState, useRef } from 'react';

export function AdvertCreateChooseType({ currentTypeAds, changeCurrentTypeAds }) {
  const typeBuy = useRef();
  const typeSale = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeBuy.current && typeBuy.current) {
        if (currentTypeAds === 0) {
          typeBuy.current.classList.add('advert_create_choose_type_ads_active');
          typeSale.current.classList.remove('advert_create_choose_type_ads_active');
        } else if (currentTypeAds === 1) {
          typeSale.current.classList.add('advert_create_choose_type_ads_active');
          typeBuy.current.classList.remove('advert_create_choose_type_ads_active');
        }
        clearInterval(interval);
      }
    }, 100);
  }, [currentTypeAds]);

  return (
    <div className="advert_create_choose_type_ads_wrapper">
      <div className="advert_create_choose_type_ads" ref={typeBuy} onClick={() => changeCurrentTypeAds(0)}>
        I want to buy
      </div>
      <div className="advert_create_choose_type_ads" ref={typeSale} onClick={() => changeCurrentTypeAds(1)}>
        I want to sell
      </div>
    </div>
  );
}
