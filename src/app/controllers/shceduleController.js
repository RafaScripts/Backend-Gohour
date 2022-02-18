import Appointment from "../models/Appointment";
import User from "../models/User";

class shceduleController {
    async index(req, res){

        const checkUserProvider = User.findOne({
            where: { id: req.userId, provider: true },
        });

        return res.json(checkUserProvider)

        /*
        if(checkUserProvider){
            return res.status(401).json({ error: "User is not a provider" });
        }*/



        return res.json();
    }
}

export default new shceduleController;