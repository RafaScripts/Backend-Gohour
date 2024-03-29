import Appointment from "../models/Appointment";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import { Op } from "sequelize";
import User from "../models/User";
import {parseSpread} from "sucrase/dist/parser/traverser/lval";

class shceduleController {
    async index(req, res){

        const checkUserProvider = User.findOne({
            where: { id: req.userId, provider: true },
        });


        if(!checkUserProvider){
            return res.status(401).json({ error: "User is not a provider" });
        }

        const { date } = req.query;
        const parseDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
            },
            order: ['date'],
        });

        return res.json(appointments);
    }
}

export default new shceduleController;