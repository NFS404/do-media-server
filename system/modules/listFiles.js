const bucket = process.env.DO_BUCKET_NAME;
const region = process.env.DO_SPACES_REGION;
const genAuthHeader = require('./genAuthHeader');
const axios = require('axios');
const xmlParser = require("xml2js");

module.exports = async (req, res) => {
    try {
        let url = `https://${bucket}.${region}.digitaloceanspaces.com`;
        let host = `${bucket}.${region}.digitaloceanspaces.com`;

        let auth = genAuthHeader(host);
        let headers1 = {'Access-Control-Allow-Origin': true};

        let headers = {...headers1, ...auth};

        let response = await axios.get(url, {
            headers,
            mode: 'cors'
        });
        xmlParser.parseString(response.data, (err, data) => {
            if(data.ListBucketResult.Contents) {
                let respData = data.ListBucketResult.Contents.map((element) => {
                    return element.Key[0];
                });
                res.status(200).json(respData);
            }
            else {
                res.status(200).json([]);
            }
        });
        
    }
    catch(e) {
        console.log(e);
        res.status(500).json({error: e});
    }
};