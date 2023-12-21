import { useRef, useState, useEffect } from 'react';
import { AdvertCreatePopUp } from './AdvertCreatePopUp';
import { AdvertCreateModalPaymentMethod } from './AdvertCreateModalPaymentMethod';

export function AdvertCreatePaymentBlock({
  timesLimits,
  currentTimesLimit,
  changeCurrentTimesLimit,
  currentUser,
  paimentMethods,
  addCurrentPaymentsMethods,
  removeCurrentPaymentsMethods,
  currentPaymentsMethods,
}) {
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [visibleModalPayments, setVisibleModalPayments] = useState(false);
  const [visiblePaymentMethods, setVisiblePaymentMethods] = useState([]);

  const timesLimitInput = useRef();

  useEffect(() => {
    console.log('AdvertCreatePaymentBlock >>>>>> currentUser = ', currentUser);
    console.log('AdvertCreatePaymentBlock >>>>>> currentPaymentsMethods = ', currentPaymentsMethods);

    if (currentUser && currentPaymentsMethods) {
      setVisiblePaymentMethods(currentUser.payment_methods.filter(item => currentPaymentsMethods.includes(item.id)));
    }

    console.log(visiblePaymentMethods);

  }, [currentPaymentsMethods, currentUser]);

  const handlerOnVisible = () => {
    setVisiblePopUp(!visiblePopUp);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timesLimitInput.current) {
        timesLimitInput.current.value = timesLimits[currentTimesLimit].title;
        clearInterval(interval);
      }
    }, 100);
  }, [currentTimesLimit, timesLimits]);

  const handleOpenCloseModalPayments = () => {
    setVisibleModalPayments(!visibleModalPayments);
  };

  return (
    <>
      <div className="advert_create_tuning_ads_payment_block">
        <label class="advert_create_tuning_ads_payment_block_label">Payment Method</label>
        <div className="advert_create_tuning_ads_payment_block_add_payments_wrapper">
          {currentUser &&
            visiblePaymentMethods.map(item => (
              <div className="advert_create_tuning_ads_payment_block_add_payments_item_wrapper">
                <div className="advert_create_tuning_ads_payment_block_add_payments_item_bank_wrapper">
                  {paimentMethods && (
                    <div className="advert_create_tuning_ads_payment_block_add_payments_item_bank">
                      {' '}
                      {paimentMethods[item.bank_id].label}
                    </div>
                  )}
                  <div
                    className="advert_create_tuning_ads_payment_block_add_payments_item_del_wrapper"
                    onClick={() => removeCurrentPaymentsMethods(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="advert_create_tuning_ads_payment_block_add_payments_item_del_logo"
                    >
                      <path
                        d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="advert_create_tuning_ads_payment_block_add_payments_item_name_wrapper">
                  <div className="advert_create_tuning_ads_payment_block_add_payments_item_name_title">Name</div>
                  <div className="advert_create_tuning_ads_payment_block_add_payments_item_name">
                    {currentUser.email}
                  </div>
                </div>
                <div className="advert_create_tuning_ads_payment_block_add_payments_item_bank_wrapper">
                  <div className="advert_create_tuning_ads_payment_block_add_payments_item_bank_title">
                    Bank Account/Card Number
                  </div>
                  <div className="advert_create_tuning_ads_payment_block_add_payments_item_bank_num">
                    {item.card_num}
                  </div>
                </div>
              </div> )
            )}

          <button
            type="button"
            class="advert_create_tuning_ads_payment_block_add_payments_button"
            onClick={handleOpenCloseModalPayments}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              class="advert_create_tuning_ads_payment_block_add_payments_button_logo"
            >
              <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
            </svg>{' '}
            Add
          </button>
          <div data-bn-type="text" class="advert_create_tuning_ads_payment_block_add_payments_info">
            Select up to 5 methods
          </div>
        </div>
      </div>
      <div className="advert_create_tuning_ads_payment_block_payment_time_limit_block">
        <label class="advert_create_tuning_ads_payment_block_payment_time_limit_label">Payment Time Limit</label>
        <div className="advert_create_tuning_ads_payment_block_payment_time_limit_wrapper" onClick={handlerOnVisible}>
          <div className="advert_create_tuning_ads_payment_block_payment_time_limit_input_wrapper">
            <input
              class="advert_create_tuning_ads_payment_block_payment_time_limit_input"
              type="text"
              ref={timesLimitInput}
            />
            <div className="advert_create_tuning_ads_payment_block_payment_time_limit_logo_wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="advert_create_tuning_ads_payment_block_payment_time_limit_logo"
              >
                <path d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          {visiblePopUp && (
            <AdvertCreatePopUp
              data={timesLimits}
              onClose={handlerOnVisible}
              isSearch={false}
              onChangeValue={changeCurrentTimesLimit}
            />
          )}
        </div>
      </div>

      {visibleModalPayments && (
        <AdvertCreateModalPaymentMethod
          onClose={handleOpenCloseModalPayments}
          currentUser={currentUser}
          paimentMethods={paimentMethods}
          addCurrentPaymentsMethods={addCurrentPaymentsMethods}
          removeCurrentPaymentsMethods={removeCurrentPaymentsMethods}
          currentPaymentsMethods={currentPaymentsMethods}
        />
      )}
    </>
  );
}
