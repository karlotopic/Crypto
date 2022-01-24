import { Register } from '~/config/gRPC';

export default async function handler(req, res) {
    const tokens = await Register(req.body.username, req.body.password);
    if(tokens == 6) {
        res.status(400).send({
            message: 'User already exists!'
        })
    }
    else res.send(tokens);
}