import User from "../models/User";
import * as Yup from "yup";

class UserController {
    async store(req, res){

        //Validação de dados
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Validation fails" });
        }

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


    async update(req, res) {

        //Validação de dados
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            oldPassword: Yup.string().required().min(8),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Validation fails" });
        }

        //buscar email e senha que serão alterados
        const { email, oldPassword } = req.body;

        //buscar usuario por ID no banco de dados
        const user = await User.findByPk(req.userId);

        //verifica se o email da requisição é o mesmo que consta no banco de dados
        if (email !== user.email ){
            //faz a busca pelo email
            const userExists = await User.findOne({ where: { email } });

            //se a busca retornar verdadeiro indicar que usuario ja foi cadastrado
            if(userExists){
                return res.status(400).json({ error: "Email already exist." });
            }
        }

        if(oldPassword && !(await user.checkPassowrd(oldPassword))){
            return res.status(401).json({ error: "passwrod does not match." });
        }

        const {id, name, provider} = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });

    }
    
}

export default new UserController();