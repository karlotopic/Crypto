import { RefreshToken } from '~/config/gRPC';

export default async function handler(req, res) {
    const tokens = await RefreshToken(req.body.refreshToken);
    if (tokens == 16) {
        res.status(403).send({
            message: 'Unathorized!'
        })
    }
    else res.send(tokens);
}