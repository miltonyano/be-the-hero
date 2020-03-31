const dbConnection = require('../database/dbConnection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ngo = await dbConnection('ngos')
            .where('id', id)
            .select('name')
            .first();

        //check if exists
        if (!ngo){
            return response.status(400).json({ error: "No NGO found with this ID." });
        }

        return response.json(ngo);
    }
}