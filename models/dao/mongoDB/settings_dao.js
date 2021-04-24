const User = require('../../../database/users/mongoDB/user_schema')

class SettingsDAO {

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

    async updateProperty(settings) {
        const {id, enable} = settings
        return await User.updateOne(
            {"_id": id, "settings.settings": "property"},
            {
                "$set": {
                    "settings.$.darktheme": enable,
                }
            }
        )
    }

}

module.exports = SettingsDAO