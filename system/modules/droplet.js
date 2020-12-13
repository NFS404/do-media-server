const axios = require("axios");

const token = process.env.DO_OAUTH_TOKEN;

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const type = req.params.action; // power_off or power_on
    
        if(type !== "power_on" && type !== "power_off") res.status(400).json({err: "Bad Request"});
        let url = `https://api.digitalocean.com/v2/droplets/${id}/actions`;
        let data = { type };
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
    
        let response = await axios.post(url, data, config);
        res.status(200).json(response.data);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json(e);
    }
};