const aws4 = require("aws4");

module.exports = (host, method="GET", path="/") => {
    let sign = aws4.sign({
        host,
        service: 's3',
        method,
        path,
        region: process.env.DO_SPACES_REGION
    },
    {
        accessKeyId: process.env.DO_ACCESS_ID,
        secretAccessKey: process.env.DO_KEY_SECRET
    });
    return sign.headers;
}