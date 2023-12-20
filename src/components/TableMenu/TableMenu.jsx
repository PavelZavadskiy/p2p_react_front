import { useState } from 'react';

export const TableMenu = ({ cryptos, changeAdvertType, changeCrypto }) => {
  const [tradeFilter, setTradeFilter] = useState(true);
  const [activeCripto, setActiveCripto] = useState(0);

  const handleOnClickBuy = () => {
    setTradeFilter(true);
    changeAdvertType(0);
  };

  const handleOnClickSale = () => {
    setTradeFilter(false);
    changeAdvertType(1);
  };

  const handleOnClickCryptoMenuItem = id => {
    setActiveCripto(id);
    changeCrypto(id);
  };


  return (
    <div className="section_table_menu">
      <div className="table_menu container">
        <div className={tradeFilter ? 'trade_filter_buy' : 'trade_filter_buy trade_filter_sale'}>
          <div
            className={tradeFilter ? 'trade_filter_item trade_filter_item_buy' : 'trade_filter_item'}
            onClick={handleOnClickBuy}
          >
            Buy
          </div>
          <div
            className={tradeFilter ? 'trade_filter_item' : 'trade_filter_item trade_filter_item_sale'}
            onClick={handleOnClickSale}
          >
            Sell
          </div>
        </div>
        <div className="crypto_menu">
          {cryptos.map(item => (
            <button
              className={item.id === activeCripto ? 'crypto_item crypto_item_active' : 'crypto_item'}
              type="button"
              onClick={() => handleOnClickCryptoMenuItem(item.id)}
              key={item.id}
            >
              {item.mnemo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
