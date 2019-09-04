import Meetup from '../models/Meetup';

class MeetupUserController {
  async index(req, res) {
    /**
     * Lista todas as inscrições do usuário
     *
     * */
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }
}

export default new MeetupUserController();
