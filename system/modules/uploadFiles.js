const key = process.env.DO_ACCESS_ID;
const secret = process.env.DO_KEY_SECRET;
const bucket = process.env.DO_BUCKET_NAME;
const region = process.env.DO_SPACES_REGION;

const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint(`https://${region}.digitaloceanspaces.com/`);

const s3Client = new AWS.S3({
    accessKeyId: key,
    secretAccessKey: secret,
	endpoint
});

module.exports = (req, res) => {console.log(req.file);
    try {
        let objKey = req.query.path;
        
        const params = {
            Bucket: bucket, 
            Key: objKey,
            Body: req.file.buffer
       };

       s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({err: "Something went wrong."});
		}
		else {res.status(201).json({'success' : true})}
	});
    }
    catch (e)
    {
        console.log(e);
        res.status(500).json({error: e});
    }
};