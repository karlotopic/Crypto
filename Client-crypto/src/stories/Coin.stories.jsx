import React from 'react';
import Coin from '~/components/coin';
import "~/styles/coins.css";

export default {
    title: 'Coin',
    component: Coin
}

export const TestCoin = (args) => <Coin item={args} />
   
TestCoin.args = {
    id: "bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    market_cap: 1014906271452,
    name: "Bitcoin",
    price_change_percentage_24h: 2.68178,
    symbol: "btc",
    total_volume: 24997603815
}
