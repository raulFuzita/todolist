const db = require('../../../database/mongoDB/connector')
const User = require('../../../database/users/mongoDB/user_schema')

class SettingsDAO {

    constructor(){
        db.conn()
    }

    async get(id) {
        const {settings} = await User.findById(id)
        return settings
    }

    async updateImage(settings) {
        const {id, filename, originalname} = settings
        return await User.updateOne(
            {"_id": id, "settings.settings": "image"},
            {
                "$set": {
                    "settings.$.filename": filename,
                    "settings.$.originalname": originalname,
                }
            }
        )
    }

    async updateAuth(settings) {
        const {id, enable, token} = settings
        return await User.updateOne(
            {"_id": id, "settings.settings": "auth"},
            {
                "$set": {
                    "settings.$.enable": enable,
                    "settings.$.token": token
                }
            }
        )
    }

}

module.exports = SettingsDAO