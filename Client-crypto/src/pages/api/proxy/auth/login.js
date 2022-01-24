import { Auth } from '~/config/gRPC';

export default async function handler(req, res) {
    const tokens = await Auth(req.body.username, req.body.password);
    if (tokens == 16) {
        res.status(403).send({
            message: 'Unathorized!'
        })
    }
    else res.send(tokens); 
    
}