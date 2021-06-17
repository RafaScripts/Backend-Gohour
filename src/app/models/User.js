const { Sequelize,Model } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            whatsapp: Sequelize.STRING,
        },
        {
            sequelize,
        }
        );
    }
}

//export default User;

module.exports = User;
