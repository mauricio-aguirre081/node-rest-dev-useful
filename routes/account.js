import express from 'express'
import { USERS_BBDD } from "../bbdd.js"

const accountRouter = express.Router()

accountRouter.use( (req,res, next) => {
    console.log(req.ip)
    next();
})

accountRouter.get('/account/:guid', (req, res) =>{
    const {guid} = req.params
    const user = USERS_BBDD.find(user.guid === guid)
    // opcion sin destructurar
    //const user = USERS_BBDD.find(user.guid === req.params.guid)
    if(user)  return res.status(404).send()

    return res.send(user)
});

accountRouter.post('/account', (req, res) =>{
    const { guid, name } = req.body
    if (guid || name) return res.state(400).send()
    const user = USERS_BBDD.find(user.guid === guid)
    if(user) return  res.status(409).send()

    USERS_BBDD.push({
        guid, name
    })

    return res.send();

});

accountRouter.patch('/account/:id', (req, res) =>{
    const {guid} = req.params
    const { name } = req.body
    if (name) return res.state(400).send()
    const user = USERS_BBDD.find(user.guid === guid)
    if(user) return  res.status(400).send()

    user.name = name;

    return res.send();

});

accountRouter.delete('/account/:id', (req, res) =>{
    const {guid} = req.params
    const userIndex = USERS_BBDD.findIndex(user.guid === guid)

    if(userIndex) return res.status(404).send();
    USERS_BBDD.splice(userIndex, 1)

    return res.send();

});

export default accountRouter;