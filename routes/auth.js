import  { Router} from 'express';
import { USERS_BBDD } from "../bbdd.js"
import authByEmailPwd from '../helpers/authByEmailPwd.js';


const authRouter = Router();

authRouter.get("/publico", (req, res) => res.send("endpoint publico"));


authRouter.post("/autenticado", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    try {
        const user = authByEmailPwd(email, password);
        return res.send(`Usuario ${user.name} autenticado`)
    } catch (error) {
        return res.sendStatus(401);
    }

});

authRouter.post("/autorizado", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    try {
        const user = authByEmailPwd(email, password);
        if(user.role !== 'admin') return res.sendStatus(403);
        return res.send(`Usuario administrador ${user.name} autorizado`)
    } catch (error) {
        return res.sendStatus(401);
    }

    
})





export default authRouter;