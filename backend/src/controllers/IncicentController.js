const dbConnection = require('../database/dbConnection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const incidents = await dbConnection('incidents')
        .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ngos.name', 
            'ngos.email', 
            'ngos.whatsapp', 
            'ngos.city', 
            'ngos.state'
        ]);
        
        //total incidents: return [{count(*): #}]
        const [count] = await dbConnection('incidents').count();
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ngo_id = request.headers.authorization;

        const [id] = await dbConnection('incidents').insert({
            title,
            description,
            value,
            ngo_id
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ngo_id = request.headers.authorization;

        //check if the ngo has the incident
        const incident = await dbConnection('incidents')
            .where('id', id)
            .select('ngo_id')
            .first();

        if (incident.ngo_id !== ngo_id) {
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await dbConnection('incidents').where('id', id).delete();

        //204: no content
        return response.status(204).send();
    }
}