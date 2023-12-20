import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoTriangleDown } from 'react-icons/go';
import { BsArrowRightShort } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import { AdvertCreateHeader } from './components/AdvertCreateFilter';
import { AdvertCreateSteps } from './components/AdvertCreateSteps';
import { AdvertCreateChooseType } from './components/AdvertCreateChooseType';
import { AdvertCreateTunningBlock } from './components/AdvertCreateTunningBlock';

export function AdvertCreate({ currentUser }) {
  //TODO Must come from the outside
  const [currentGlobalPrice, setCurrentGlobalPrice] = useState(37.62);
  const [limitMin, setLimitMin] = useState(30.1);
  const [limitMax, setLimitMax] = useState(86.53);
  const [currentHighestOrderPrice, setCurrentHighestOrderPrice] = useState(41.74)

  const [cryptos, setCryptos] = useState(null);
  const [fiats, setFiats] = useState(null);
  const [paimentMethods, setPaimentMethods] = useState(null);
  const [regions, setRegions] = useState(null);
  const [advertTypes, setAdvertTypes] = useState(null);

  const [adsCurrentStep, setAdsCurrentStep] = useState(1);
  const [currentTypeAds, setCurentTypeAds] = useState(0);
  const [currentFiat, setCurrentFiat] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState(0);
  const [currentTypePrice, setCurrentTypePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(currentGlobalPrice);

  useEffect(() => {
    const getCryptos = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/cryptos`);
        setCryptos(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCryptos();
  }, []);

  useEffect(() => {
    const getFiats = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/fiats`);
        setFiats(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFiats();
  }, []);

  useEffect(() => {
    const getPaimentMethods = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/payment-methods`);
        setPaimentMethods(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPaimentMethods();
  }, []);

  useEffect(() => {
    const getRegions = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/regions`);
        setRegions(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRegions();
  }, []);

  useEffect(() => {
    const getAdvertTypes = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/test/advert-types`);
        setAdvertTypes(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdvertTypes();
  }, []);

  const handleRadioChecked = e => {
    console.log(e.target.checked);
  };

  const handleRadioCheckedLabel = e => {
    console.log(e.target);
  };

  const handleChangeCurrentTypeAds = value => {
    setCurentTypeAds(value);
  };

  const handleChangeCurrentFiat = value => {
    console.log('handleChangeCurrentFiat > ', value);
    setCurrentFiat(value);
  };

  const handlerChangeCurrentCrypto = value => {
    console.log('handlerChangeCurrentCrypto > ', value);
    setCurrentCrypto(value);
  };

  const handlerChangeCurrentTypePrice = value => {
    console.log('handlerChangeCurrentCrypto > ', value);
    setCurrentTypePrice(value);
  };
  const handleChangeCurrentPrice = value => {
    setCurrentPrice(value);
  };

  return (
    <>
      <div className="advert_create_body">
        <AdvertCreateHeader />
        <div className="advert_create_body_wrapper container">
          <AdvertCreateSteps adsCurrentStep={adsCurrentStep} />
          <AdvertCreateChooseType currentTypeAds={currentTypeAds} changeCurrentTypeAds={handleChangeCurrentTypeAds} />
          <AdvertCreateTunningBlock
            currentTypeAds={currentTypeAds}
            cryptos={cryptos}
            fiats={fiats}
            currentFiat={currentFiat}
            changeCurrentFiat={handleChangeCurrentFiat}
            currentCrypto={currentCrypto}
            changeCurrentCrypto={handlerChangeCurrentCrypto}
            currentTypePrice={currentTypePrice}
            changeCurrentTypePrice={handlerChangeCurrentTypePrice}
            currentGlobalPrice={currentGlobalPrice}
            currentPrice={currentPrice}
            changeCurrentPrice={handleChangeCurrentPrice}
            limitMin={limitMin}
            limitMax={limitMax}
            currentHighestOrderPrice={currentHighestOrderPrice}
          />
        </div>
      </div>

      {/* <br />
      <br />
      <br />

      <AdvertCreateHeader />
      <div className="advert_create_body">
        <div className="advert_create_body_wrapper container">
          <div className="advert_create_steps_wrapper">
            <div className="advert_create_steps_item_wrapper">
              <div className="advert_create_steps_item ">
                <p className="advert_create_steps_item_title">Set Type & Price</p>
                <div className="advert_create_steps_item_marker wait">
                  <span className="advert_create_steps_item_marker_text">1</span>
                </div>
              </div>

              <div className="advert_create_steps_item ">
                <p className="advert_create_steps_item_title">Set Total Amount & Payment Method</p>
                <div className="advert_create_steps_item_marker wait">
                  <span className="advert_create_steps_item_marker_text">2</span>
                </div>
              </div>

              <div className="advert_create_steps_item">
                <p className="advert_create_steps_item_title">Set Remarks & Automatic Response</p>
                <div className="advert_create_steps_item_marker">
                  <span className="advert_create_steps_item_marker_text">3</span>
                </div>
              </div>
            </div>
            <div className="advert_create_choose_type_ads_wrapper">
              <div className="advert_create_choose_type_ads advert_create_choose_type_ads_active">I want to buy</div>
              <div className="advert_create_choose_type_ads">I want to sell</div>
            </div>
            <div className="advert_create_tuning_ads_wrapper">
              <div className="advert_create_tuning_ads_asset_block">
                <div className="advert_create_tuning_ads_asset_block_item">
                  <label htmlFor="" className="advert_create_tuning_ads_asset_block_label">
                    Asset
                  </label>
                  <div className="advert_create_tuning_ads_asset_block_dropdown_select">
                    <input
                      type="text"
                      className="advert_create_tuning_ads_asset_block_dropdown_select_input"
                      value={'USDT'}
                    />
                    <div
                      className="table_header_filter_payment_methods_crypto_triangle"
                      // onClick={handleOpenPopUpFilterPaymentMethods}
                    >
                      <GoTriangleDown width="16" />
                    </div>
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
                      value={'UAH'}
                    />
                    <div
                      className="table_header_filter_payment_methods_crypto_triangle"
                      // onClick={handleOpenPopUpFilterPaymentMethods}
                    >
                      <GoTriangleDown width="16" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="advert_create_tuning_ads_asset_block_separator"></div>
              <div className="advert_create_tuning_ads_asset_block_price_type">
                <div className="advert_create_tuning_ads_asset_block_price_type">
                  <div className="advert_create_tuning_ads_asset_block_price_type_choose_block">
                    <label htmlFor="fait" className="advert_create_tuning_ads_asset_block_price_type_choose_label">
                      Price Type
                    </label>
                    <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box">
                      <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item">
                        <label
                          className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_label"
                          onClick={handleRadioCheckedLabel}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="none"
                            class="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo"
                          >
                            <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
                            <circle cx="8" cy="8" r="4" fill="currentColor"></circle>
                          </svg>

                          <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_title">
                            Fixed
                          </div>
                          <input
                            className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_input visually-hidden"
                            hidden=""
                            type="radio"
                            data-bn-type="radio"
                            name="fait"
                            value="1"
                            checked
                            // style="clip: rect(0px, 0px, 0px, 0px); position: absolute;"
                            onChange={handleRadioChecked}
                          />
                        </label>
                      </div>
                      <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item">
                        <label
                          className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_label"
                          onClick={handleRadioCheckedLabel}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="none"
                            class="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_logo"
                          >
                            <circle cx="8" cy="8" r="7.5" stroke="currentColor"></circle>
                            <circle cx="8" cy="8" r="4" fill="currentColor"></circle>
                          </svg>

                          <div className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_title">
                            Floating
                          </div>
                          <input
                            className="advert_create_tuning_ads_asset_block_price_type_choose_radio_box_item_input visually-hidden"
                            type="radio"
                            data-bn-type="radio"
                            name="fait"
                            value="2"
                            onChange={handleRadioChecked}
                            // style="clip: rect(0px, 0px, 0px, 0px); position: absolute;"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_wrapper">
                      <label className="advert_create_tuning_ads_asset_block_price_type_tuning_price_label">
                        Fixed
                      </label>
                      <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box">
                        <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_wrapper">
                          <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item">
                            <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_wrapper">
                              <button
                                className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button"
                                type="button"
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
                              value="37.62"
                            ></input>
                            <div className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button_wrapper">
                              <button
                                className="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_item_button"
                                type="button"
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
                        <div
                          data-bn-type="text"
                          class="advert_create_tuning_ads_asset_block_price_type_tuning_price_box_info"
                        >
                          The fixed price should be between 30.10 - 86.53
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
