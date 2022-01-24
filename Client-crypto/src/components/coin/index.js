/* eslint-disable @next/next/no-img-element */
const Coin = ({item}) => {
  return (
    <div>
      <a>
        <div className="coin_container">
          <div className="coin_row">
            <div className="coin">
              <img
                src={item.image}
                alt={item.name}
                className="coin_img"
              />
              <h1 className="coin_h1">{item.name}</h1>
              <p className="coin_symbol">{item.symbol}</p>
            </div>
            <div className="coin_data">
              <p className="coin_price">${item.current_price}</p>
              <p className="coin_volume">
                ${item.market_cap.toLocaleString()}
              </p>

              {item.price_change_percentage_24h < 0 ? (
                <p className="coin_percent red">
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : (
                <p className="coin_percent green">
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}

              <p className="coin_marketcap">
                Mkt Cap: ${item.total_volume.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Coin;
