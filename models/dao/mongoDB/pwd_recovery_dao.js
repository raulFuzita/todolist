const User = require('../../../database/users/mongoDB/user_schema')

class PwdRecoveryDAO {

    async get(id) {
        const {settings} = await User.findById(id)
        return settings
    }

    async updatePwdRecovery(recoveryObject) {
        const {id, token, expirydate} = recoveryObject
        return await User.updateOne(
            {"_id": id, "settings.settings": "password_recovery"},
            {
                "$set": {
                    "settings.$.token": token,
                    "settings.$.expirydate": expirydate
                }
            }
        )
    }

}

module.exports = PwdRecoveryDAO