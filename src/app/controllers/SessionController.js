import jwt from 'jsonwebtoken';
import User from "../models/User";
import authConfig from "../../config/auth";
import * as Yup from "yup";

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        //Validação de dados
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Validation fails" });
        }

        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }

        if(!(await user.checkPassowrd(password))){
            return res.status(401).json('Password does not match');
        }


        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            }, //token de sessão dos usuarios, com chave secreta e 7 dias de duração
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        });
    }

}

export default new SessionController();