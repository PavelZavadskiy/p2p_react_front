import { Table, TableRow, TableCell, Button } from './TableAdverts.styled';
import { UserProfileTable } from '../UserProfileTable/UserProfileTable';
import { IoMdThumbsUp } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { useState, useEffect } from 'react';

export const TableAdverts = ({
  dataset,
  createOrder,
  cryptos,
  fiats,
  users,
  paimentMethods,
  regions,
  advertTypes,
  currentAdvertType,
  currentCrypto,
  currentFiat,
  currentPaimentMethod,
  currentRegion,
  currentAmount,
  currentFilterType,
}) => {
  const [dataTable, setDataTable] = useState(null);

  useEffect(() => {
    console.log(
      'currentAdvertType = ',
      currentAdvertType,
      ' currentCrypto = ',
      currentCrypto,
      ' currentPaimentMethod = ',
      currentPaimentMethod,
      ' currentAmount = ',
      currentAmount
    );
    if (dataset) {
      let datasetFiltered = dataset.filter(
        item =>
          item.id_advert_type === currentAdvertType && item.id_crypto === currentCrypto && item.id_fiat === currentFiat
      );
      if (currentPaimentMethod >= 0) {
        datasetFiltered = datasetFiltered.filter(item => item.id_payment_methods.includes(currentPaimentMethod));
      }
      if (currentRegion >= 0) {
        datasetFiltered = datasetFiltered.filter(item => item.id_region === currentRegion);
      }

      if (currentAmount > 0) {
        datasetFiltered = datasetFiltered.filter(
          item => item.limit <= currentAmount && currentAmount <= item.available
        );
      }

      if (currentFilterType === 0) {
        datasetFiltered = datasetFiltered.sort((a, b) => b.price - a.price);
      }

      if (currentFilterType === 1) {
        datasetFiltered = datasetFiltered.sort(
          (a, b) => users[b.id_owner].order_counts - users[a.id_owner].order_counts + b.price - a.price
        );
      }

      if (currentFilterType === 2) {
        datasetFiltered = datasetFiltered.sort(
          (a, b) => users[b.id_owner].execution - users[a.id_owner].execution + b.price - a.price
        );
      }

      setDataTable(datasetFiltered);
    }
  }, [
    currentAdvertType,
    currentAmount,
    currentCrypto,
    currentFiat,
    currentFilterType,
    currentPaimentMethod,
    currentRegion,
    dataset,
    users,
  ]);

  // useEffect(() => {
  //   setDataTable(dataset);
  // },[dataset]);

  const handleOnClick = e => {
    console.log(e);
    createOrder(e);
  };

  return (
    dataTable &&
    cryptos &&
    fiats &&
    users &&
    paimentMethods &&
    regions &&
    advertTypes && (
      <div className="container">
        <table className="table_advert">
          <colgroup>
            <col width="292" />
            <col width="252" />
            <col width="252" />
            <col width="192" />
            <col width="148" />
          </colgroup>
          <thead className="">
            <tr>
              <th className="table_advert_tread_th">Advertiser</th>
              <th className="table_advert_tread_th">
                <div className="table_advert_tread_th_price_wrapper">
                  <div data-bn-type="text" className="">
                    Price
                  </div>
                  <div className="table_advert_tread_th_price_value">highest to lowest</div>
                </div>
              </th>
              <th className="table_advert_tread_th">
                <div className="">Limit/Available</div>
              </th>
              <th className="table_advert_tread_th">Payment</th>
              <th className="table_advert_tread_th">
                <div className="table_advert_tread_th_commision_wrapper">
                  <div data-bn-type="text" className="">
                    Trade
                  </div>
                  <div className="table_advert_tread_th_commision_text">0 Fee</div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {dataTable.map(item => (
              <tr>
                <td className="table_advert_tread_td">
                  <div className="table_advert_tread_td_partber_info">
                    <div className="table_advert_tread_td_partner_info_logo_email">
                      <div className="table_advert_tread_td_partner_info_logo">{users[item.id_owner].email[0]}</div>
                      <a href="http://localhost:3000/p2p" className="table_advert_tread_td_partner_info_logo_text">
                        {users[item.id_owner].email}
                      </a>
                    </div>
                    <div className="table_advert_tread_td_partber_info_orders">
                      <div className="table_advert_tread_td_partber_info_orders_count">
                        {users[item.id_owner].order_counts} orders
                      </div>
                      <hr className="table_advert_tread_td_partber_info_orders_separator"></hr>
                      <div className="table_advert_tread_td_partber_info_orders_count">
                        {users[item.id_owner].execution}% completion
                      </div>
                    </div>
                    <div className="table_advert_tread_td_partber_info_rating">
                      <IconContext.Provider value={{ color: 'rgb(14, 203, 129)', size: '16px' }}>
                        <IoMdThumbsUp />
                      </IconContext.Provider>
                      <div>100%</div>
                    </div>
                  </div>
                </td>
                <td className="table_advert_tread_td">
                  <div className="table_advert_tread_td_price">
                    <div className="table_advert_tread_td_price_amount">{item.price}</div>
                    <div className="table_advert_tread_td_price_mnemo">{fiats[item.id_fiat].mnemo}</div>
                  </div>
                </td>
                <td className="table_advert_tread_td">
                  <div className="table_advert_tread_td_price_limit">
                    <div className="table_advert_tread_td_price_limit_on_account">
                      {users[item.id_owner].balance_usdt} {cryptos[item.id_crypto].mnemo}
                    </div>
                    <div className="table_advert_tread_td_price_mnemo">
                      {String.fromCharCode(fiats[item.id_fiat].symbol)}
                      {new Intl.NumberFormat('en-US').format(item.limit)} -{' '}
                      {String.fromCharCode(fiats[item.id_fiat].symbol)}
                      {new Intl.NumberFormat('en-US').format(item.available)}
                    </div>
                  </div>
                </td>
                <td className="table_advert_tread_td">
                  <div className="table_advert_tread_td_payment_method">
                    {item.id_payment_methods.map(methods => (
                      <div className="table_advert_tread_td_payment_method_item_mark_wrapper">
                        <div
                          className="table_advert_tread_td_payment_method_item_mark"
                          style={{ backgroundColor: paimentMethods[methods].color }}
                        ></div>
                        <div className="table_advert_tread_td_payment_method_item">{paimentMethods[methods].label}</div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="table_advert_tread_td">
                  {item.id_advert_type === 0 && (
                    <button
                      type="button"
                      className="table_advert_tread_td_make_order table_advert_tread_td_make_order_buy"
                      onClick={() => {
                        handleOnClick(item.id);
                      }}
                    >
                      Buy {cryptos[item.id_crypto].mnemo}
                    </button>
                  )}
                  {item.id_advert_type === 1 && (
                    <button
                      type="button"
                      className="table_advert_tread_td_make_order table_advert_tread_td_make_order_sale"
                      onClick={() => {
                        handleOnClick(item.id);
                      }}
                    >
                      Sell {cryptos[item.id_crypto].mnemo}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};
