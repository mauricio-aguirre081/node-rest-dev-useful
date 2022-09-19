import authByEmailPwd from "../helpers/authByEmailPwd";
import { SignJWT, jwtVerify } from 'jose';
import { USERS_BBDD } from "../bbdd";

const authTokenRouter = Router();

authTokenRouter.post('/login', async (req, res) => {
    const { email, password} = req.body

    if(!email || !password) return res.sendStatus(400);

    try {
        const { guid } = authByEmailPwd(email, passsword);

        const jwtConstructor = new SignJWT({ guid })

        const encoder = new TextEncoder();

        const jwt = await jwtConstructor
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setIssuedAt()
        .setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

        return res.send({ jwt })

    } catch (error) {
        return res.sendStatus(401);
    }
})

authTokenRouter.get('/profile', async (req, res) =>{
    const { authorization } = req.headers

    if(!authorization) return res.sendStatus(401);

    try {
        const encoder = new TextEncoder();
        
        const { payload } = await jwtVerify(
        authorization, encoder.encode(process.env.JWT_PRIVATE_KEY )
        );

        const user = USERS_BBDD.find((user) => user.guid === payload.guid);

        if(!user) return res.sendStatus(401);
    
        delete user.password;
    
        return res.send(user);

    } catch (error) {
        return res.sendStatus(401);
    }
})

export default authTokenRouter;