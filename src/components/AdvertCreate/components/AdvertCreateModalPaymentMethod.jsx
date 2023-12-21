import { useEffect, useState } from 'react';

export function AdvertCreateModalPaymentMethod({
  onClose,
  currentUser,
  paimentMethods,
  addCurrentPaymentsMethods,
  removeCurrentPaymentsMethods,
  currentPaymentsMethods,
}) {
  const [visiblePaymentMethods, setVisiblePaymentMethods] = useState([]);

  useEffect(() => {
    if (currentUser && currentPaymentsMethods) {
      setVisiblePaymentMethods(currentUser.payment_methods.filter(item => !currentPaymentsMethods.includes(item.id)));
    }
  }, [currentPaymentsMethods, currentUser]);

  useEffect(() => {
    console.log('AdvertCreateModalPaymentMethod >>> currentUser = ', currentUser);
    console.log('AdvertCreateModalPaymentMethod >>> paimentMethods = ', paimentMethods);

    // if (currentUser && currentUser.payment_methods?.length > 0) {
    //   console.log(
    //     'AdvertCreateModalPaymentMethod >>>  currentUser.payment_methods = ',
    //     currentUser.payment_methods.map(item => console.log(item))
    //   );
    // }
  }, [currentUser, paimentMethods]);

  const clickBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const keydownListener = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', keydownListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [onClose]);

  return (
    <div className="advert_create_modal_payment_method_overlay" onClick={clickBackDrop}>
      <div className="advert_create_modal_payment_method_form">
        <div className="advert_create_modal_payment_method_content_wrapper">
          <div className="advert_create_modal_payment_method_content">
            <div className="advert_create_modal_payment_method_content_header">
              <div data-bn-type="text" class="advert_create_modal_payment_method_content_header_text">
                Select payment method
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="advert_create_modal_payment_method_content_header_text_close"
                onClick={onClose}
              >
                <path
                  d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="advert_create_modal_payment_method_content_body">
              <div className="advert_create_modal_payment_method_content_body_content">
                {currentUser &&
                  visiblePaymentMethods.map(item => (
                    <div
                      className="advert_create_modal_payment_method_content_body_item"
                      onClick={() => addCurrentPaymentsMethods(item.id)}
                    >
                      <div className="advert_create_modal_payment_method_content_body_item_header">
                        {paimentMethods && (
                          <div class="advert_create_modal_payment_method_content_body_item_header_title">
                            {paimentMethods[item.bank_id].label}
                          </div>
                        )}
                        <div class="advert_create_modal_payment_method_content_body_item_header_edit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            class="advert_create_modal_payment_method_content_body_item_header_edit_logo"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.879 3.293l2.828 2.828-2.12 2.121-2.83-2.828 2.122-2.121zm-3.183 3.182l2.829 2.829-4.667 4.666H10.03v-2.828l4.666-4.667zM7 4h4v3H7v10h10v-4h3v7H4V4h3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="advert_create_modal_payment_method_content_body_item_name_block">
                        <div className="advert_create_modal_payment_method_content_body_item_name_title">Name</div>
                        <div className="advert_create_modal_payment_method_content_body_item_name">
                          {currentUser.email}
                        </div>
                      </div>
                      <div className="advert_create_modal_payment_method_content_body_item_bank_block">
                        <div className="advert_create_modal_payment_method_content_body_item_bank_title">
                          Bank Account/Card Number
                        </div>
                        <div className="advert_create_modal_payment_method_content_body_item_bank_info">
                          {item.card_num}
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div className="advert_create_modal_payment_method_content_body_item">
                  <div className="advert_create_modal_payment_method_content_body_item_header">
                    <div class="advert_create_modal_payment_method_content_body_item_header_title">Monobank</div>
                    <div class="advert_create_modal_payment_method_content_body_item_header_edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="advert_create_modal_payment_method_content_body_item_header_edit_logo"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.879 3.293l2.828 2.828-2.12 2.121-2.83-2.828 2.122-2.121zm-3.183 3.182l2.829 2.829-4.667 4.666H10.03v-2.828l4.666-4.667zM7 4h4v3H7v10h10v-4h3v7H4V4h3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="advert_create_modal_payment_method_content_body_item_name_block">
                    <div className="advert_create_modal_payment_method_content_body_item_name_title">Name</div>
                    <div className="advert_create_modal_payment_method_content_body_item_name">Gosha</div>
                  </div>
                  <div className="advert_create_modal_payment_method_content_body_item_bank_block">
                    <div className="advert_create_modal_payment_method_content_body_item_bank_title">
                      Bank Account/Card Number
                    </div>
                    <div className="advert_create_modal_payment_method_content_body_item_bank_info">
                      5555555555555555
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="advert_create_modal_payment_method_content_footer">
                <button
                  data-bn-type="button"
                  type="button"
                  class="advert_create_modal_payment_method_content_footer_btn advert_create_modal_payment_method_content_footer_btn_add"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="advert_create_modal_payment_method_content_footer_btn_add_logo"
                  >
                    <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                  </svg>{' '}
                  Add new
                </button>
                <button
                  data-bn-type="button"
                  class="advert_create_modal_payment_method_content_footer_btn advert_create_modal_payment_method_content_footer_btn_refresh"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="advert_create_modal_payment_method_content_footer_btn_add_logo"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.997 12.21a8.161 8.161 0 000-.42v.42zm-4.463 3.327l-2.608-2.608h7.07V20l-2.341-2.342A8.003 8.003 0 014.252 14h3.164a5.001 5.001 0 008.118 1.537zM19.747 10A8.003 8.003 0 006.343 6.343L4.001 4v7.071h7.07L8.466 8.464A5.001 5.001 0 0116.585 10h3.162zM4 12L4 11.845v.31A8.126 8.126 0 014 12z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
