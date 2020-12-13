const bucket = process.env.DO_BUCKET_NAME;
const region = process.env.DO_SPACES_REGION;
const genAuthHeader = require('./genAuthHeader');
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        let objKey = req.query.path;
        if(!objKey) res.status(400).json({err: "Path is missing."});
        let url = `https://${bucket}.${region}.digitaloceanspaces.com/${objKey}`;console.log(url);
        let host = `${bucket}.${region}.digitaloceanspaces.com`;

        let auth = genAuthHeader(host, 'DELETE', `/${objKey}`);

        let headers1 = {'Access-Control-Allow-Origin': true };

        let headers = {...headers1, ...auth};

        await axios.delete(url, {
            headers,
            mode: 'cors'
        });

        res.status(200).json({'success': true});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({error: e});
    }
};