import authByEmailPwd from "../helpers/authByEmailPwd";

const authTokenRouter = Router();

authTokenRouter.post('/login', (req, res) => {
    const { email, password} = req.body

    if(!email || !password) return res.sendStatus(400);

    try {
        const user = authByEmailPwd(email, passsword);
        return res.send(`Usuario ${user.name} auenticado`);

    } catch (error) {
        return res.sendStatus(401);
    }
})

export default authTokenRouter;