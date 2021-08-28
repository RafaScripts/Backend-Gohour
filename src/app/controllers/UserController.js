import User from "../models/User";

class UserController {
    async store(req, res){

        const exceptionUser = await User.findOne({ where: { email: req.body.email } });


        if(exceptionUser){
            return res.status(400).json({ error: "Usuario já registrado" });
        }


        const { id, name, email, provider } = await User.create(req.body);
        return res.json({
            id,
            name,
            email,
            provider
        });
    }


    async update(req, res){
        return res.json({ ok: true });
    }
}

export default new UserController();