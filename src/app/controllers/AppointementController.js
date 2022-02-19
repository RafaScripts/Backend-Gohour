import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
import pt from "date-fns/locale/pt"
import User from "../models/User";
import File from "../models/File";
import * as yup from 'yup';
import Notification from "../schemas/notification";

class AppointementController {
    async index(req, res){

        const { page = 1 } = req.query

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId,  canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path','url'],
                        },
                    ],
                },
            ],
        });

        return res.json(appointments);
    }

    async store(req, res){

        const schema = yup.object().shape({
            provider_id: yup.number().required(),
            date: yup.date().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Validation Fails" });
        }

        const { provider_id, date } = req.body;

        const isProvider = await User.findOne({ where: {
            id: provider_id, provider: true
            } });

        if(!isProvider){
            return res
                .status(401)
                .json({ error: "You can only create appointments with providers" });
        }

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())){
            return res.status(400).json({ error: "Past dates are not permitted" });
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability){
            return res.status(400).json({ error: "appointment is not avaible" });
        }


        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        const user = await User.findByPk(req.userId);

        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
            );

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            user: provider_id,
        });

        return res.json(appointment);
    }

    async delete(req, res){
        const appointment = await Appointment.findByPk(req.params.id);

        if(appointment.user_id !== req.userId){
            return res.status(401)
                .json({ error: "you dont't have permission to cancel this appointment" });
        }

        const dateWhithsub = subHours(appointment.date, 3);

        if(isBefore(dateWhithsub, new Date())){
            return res.status(401)
                .json({ error: "You can only cancel appointiments 3 hours ind advance." });
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        return res.json(appointment);

    }
}

export default new AppointementController();