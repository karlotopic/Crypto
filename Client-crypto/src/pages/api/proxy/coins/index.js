import { Coins } from '~/config/gRPC';

export default async function handler(req, res) {
    const coins = await Coins(req.headers.authorization);

    if (coins == 7) {
        res.status(403).send({
            message: 'Unathorized!'
        })
    }
    else res.send(coins.coins);
}
