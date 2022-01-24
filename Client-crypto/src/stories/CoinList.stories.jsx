import React from 'react';
import CoinsList from '~/components/coinsList';

export default {
    title: 'Coins List',
    component: CoinsList
}

export const List = (args) => <CoinsList filteredCoins={args.items} />

List.args = {
    items: [
        {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            "current_price": 53720,
            "market_cap": 1013447474262,
            "market_cap_rank": 1,
            "fully_diluted_valuation": 1128052625334,
            "total_volume": 23927201124,
            "high_24h": 54170,
            "low_24h": 52501,
            "price_change_24h": 990.34,
            "price_change_percentage_24h": 1.87815,
            "market_cap_change_24h": 18393428404,
            "market_cap_change_percentage_24h": 1.84849,
            "circulating_supply": 18866493,
            "total_supply": 21000000,
            "max_supply": 21000000,
            "ath": 57767,
            "ath_change_percentage": -7.08837,
            "ath_date": "2021-10-20T14:54:17.702Z",
            "atl": 51.3,
            "atl_change_percentage": 104526.85422,
            "atl_date": "2013-07-05T00:00:00.000Z",
            "roi": null,
            "last_updated": "2021-11-07T15:10:47.021Z"
        },
        {
            "id": "ethereum",
            "symbol": "eth",
            "name": "Ethereum",
            "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
            "current_price": 3999.17,
            "market_cap": 472924123797,
            "market_cap_rank": 2,
            "fully_diluted_valuation": null,
            "total_volume": 14720942160,
            "high_24h": 4011.69,
            "low_24h": 3801.64,
            "price_change_24h": 172.35,
            "price_change_percentage_24h": 4.50384,
            "market_cap_change_24h": 20925923811,
            "market_cap_change_percentage_24h": 4.62965,
            "circulating_supply": 118246050.374,
            "total_supply": null,
            "max_supply": null,
            "ath": 4026.62,
            "ath_change_percentage": -0.57937,
            "ath_date": "2021-11-03T19:05:08.044Z",
            "atl": 0.381455,
            "atl_change_percentage": 1049377.36063,
            "atl_date": "2015-10-20T00:00:00.000Z",
            "roi": {
                "times": 98.55835117393676,
                "currency": "btc",
                "percentage": 9855.835117393675
            },
            "last_updated": "2021-11-07T15:10:38.188Z"
        },
        {
            "id": "binancecoin",
            "symbol": "bnb",
            "name": "Binance Coin",
            "image": "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
            "current_price": 574.97,
            "market_cap": 96702270780,
            "market_cap_rank": 3,
            "fully_diluted_valuation": 96702270780,
            "total_volume": 2139060799,
            "high_24h": 580.96,
            "low_24h": 528.64,
            "price_change_24h": 45.34,
            "price_change_percentage_24h": 8.56061,
            "market_cap_change_24h": 8598140633,
            "market_cap_change_percentage_24h": 9.75907,
            "circulating_supply": 168137035.9,
            "total_supply": 168137035.9,
            "max_supply": 168137035.9,
            "ath": 580.96,
            "ath_change_percentage": -0.939,
            "ath_date": "2021-11-07T10:13:53.906Z",
            "atl": 0.03359941,
            "atl_change_percentage": 1712731.43836,
            "atl_date": "2017-10-19T00:00:00.000Z",
            "roi": null,
            "last_updated": "2021-11-07T15:10:24.199Z"
        }
    ]
}


