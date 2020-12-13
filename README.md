# DigitalOcean Media Server API
## Usage:
* git clone
* npm i
* Enter your API Key in the .env file.
* Set the Spaces bucket name and region in the .env file.
* Optional: To use a remote MongoDB server, update the Mongo URI in the .env file.

## Endpoints
| Type | Endpoint | Description
| --- | --- | ---
| GET | /api/files | Display all files in the bucket
| POST | /api/files?path=filePath | Upload a file to the bucket at the specified path.
| DELETE | /api/files?path=filePath | Delete File with the specified path
| GET | /api/droplet/:id/:action | Power On or Power Off the droplet with the specified ID.
| POST | /api/login | Login & generate a JWT Token
| POST | /api/register | Create a new account