const dbConnection = require('../database/dbConnection');

module.exports = {
    async index(request, response){
        const ngo_id = request.headers.authorization;

        const incidents = await dbConnection('incidents')
            .where('ngo_id', ngo_id)
            .select('*');

        return response.json(incidents);
    }
}