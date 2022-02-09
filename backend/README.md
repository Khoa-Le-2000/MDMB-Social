# API route

API Endpoint |  HTTP Verb | Descrpition | Parmameter In | Return
------------ | ---------- | ----------- | ------------- | ------
/account/login | POST     | Check login | Username, Password | refreshToken, accessToken
/auth/refresh-token | POST | Create new access token | refreshToken | accessToken