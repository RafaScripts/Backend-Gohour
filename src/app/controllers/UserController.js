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


    async update(req, res) {
        //buscar email e senha que serão alterados
        const { email, oldPassword } = req.body;

        //buscar usuario por ID no banco de dados
        const user = await User.findByPk(req.userId);

        //verifica se o email da requisição é o mesmo que consta no banco de dados
        if (email !== user.email ){
            //faz a busca pelo email
            const userExists = await User.findOne({ where: { email: req.body.email } });

            //se a busca retornar verdadeiro indicar que usuario ja foi cadastrado
            if(userExists){
                return res.status(400).json({ error: "Email already exist." });
            }
        }

    }
    
}

export default new UserController();