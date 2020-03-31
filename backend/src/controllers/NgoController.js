const dbConnection = require('../database/dbConnection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ngos = await dbConnection('ngos').select('*');

        return response.json(ngos);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, state } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await dbConnection('ngos').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            state
        })

        return response.json({ id });
        }
}