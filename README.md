# Sign and Decode JWTs

1. Create a simple express app with 2 routes:

2. POST /sign-token. This will accept at least 3 required fields from the client: firstName,lastName,id. (You are to ensure that the client sends these fields before processing the request). Sign a payload with this information and send back the token as response

3. GET /decode-token. This will take a token in the authorization headers (required), and send back the decoded token as response

4. Submit a link to your repository
