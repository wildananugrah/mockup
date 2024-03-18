```bash
# deploy
docker compose up --build -d

# undeploy
docker compose down
```

## JWT Testing

```bash
 PASS  src/test/jwt.service.test.ts
  JWT Service
    ✓ should create token (9 ms)
    ✓ should validate token (3 ms)
    ✓ should refresh token (3 ms)
    ✓ should validate token again (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.378 s
```

## User Testing

```bash
 PASS  src/test/user.test.ts
  User Service
    ✓ should be registered new user (11 ms)
    ✓ should be logged in a user (5 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.544 s
```

## Logic Layer

```bash
 PASS  tests/user.logic.test.js
  User
    ✓ should be registered a user (44 ms)
    ✓ should be logged in a user (8 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.406 s
```

## E2E Testing

```bash
 PASS  tests/user.e2e.test.js
  User
    ✓ should be registered a user (88 ms)
    ✓ should be logged in a user (13 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.974 s, estimated 1 s
```

## Spec

```bash
# fastify app
@host=http://localhost:14000
# bun app
# @host=http://localhost:24000
# express app
# @host=http://localhost:34000
# nest app
# @host=http://localhost:44000

POST {{host}}/api/users/register
Content-Type: application/json

{
    "username": "wildananugrah",
    "password": "p@ssw0rd"
}

# response
HTTP/1.1 200 OK
access-control-allow-origin: *
content-type: application/json; charset=utf-8
content-length: 2162
Date: Mon, 18 Mar 2024 03:00:16 GMT
Connection: close

{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwidXNlcm5hbWUiOiJ3aWxkYW5hbnVncmFoIiwicGFzc3dvcmQiOiJwQHNzdzByZCJ9LCJ1c2VyUm9sZSI6W3siaWQiOiI2MGI3YjNhMS03MDgwLTRhNmEtYjVmNS02ZWY1ODNmMDZkMTIiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcCIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI3YzgxYjMyZi04OGUxLTQ5YWEtYTkxNS03ZGQ3OTlkOGJjNjAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDEiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiYmZiMjBkYWQtODczOS00NmQzLTk3YzAtNDM2NmM1NDk5ZGVjIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAyIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjliYjk0NDhmLTAwNzYtNDRkNC1iNGE2LWRlODg3NTBkYzVlYyIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMyIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCJdfSx7ImlkIjoiMThjMDZjOTctOTEzMS00MzhkLTkyMzYtNjhmOTNkZDU0ZjIzIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiNDlmMWZjOGQtMWQwNi00MGNlLTlkNmUtNDU4ODdlOGJhNDRlIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAxIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjNmNDNmMzE4LWZkOGUtNDE1ZS1iZWEyLTEzNWYwOTRhOGE5YSIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMiIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI4ZTRlNjdlOS1kZDUwLTQ1MGYtYjliMC00NjhlYWI0ZDhhNTAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDMiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiXX1dLCJpYXQiOjE3MTA3MzA4MTYsImV4cCI6MTcxMDczNDQxNn0.jIia23iUAd7LMZD62ZyseUmW0hUbGnABbQ3EBOWaE4rvFB8vwqs1E9eQff2zBlxmrFil4tUnqUJsIit_TfUiH9GQ4dA7g4U7kaJQjDGgvH9MM8PHdXNpGfIvYv1Ijcky7cVRUjv8OdQHYel9hKC5wOFdW5_PMKW-uPCE7meSjfWnJK50p7RJwQzrdKxsd_c5K2qTMKUt5TKLr_0PtqNnxUEsf3Pob0YDb7WxuQ_K4QZB67h7DSlbBLSLiksSjiEFBK4wdJrbrBcGQHVjeWEhgTYUZXYlhTxj7eaHriIPJIZ1JAnRDqhhBDACwjc_ey2kBi2jkvODuf4wMlncBRyd6A",
  "expired": 3600
}


###
# @name Login
POST {{host}}/api/users/login
Content-Type: application/json

{
    "username": "wildananugrah",
    "password": "p@ssw0rd"
}

# response
HTTP/1.1 200 OK
access-control-allow-origin: *
content-type: application/json; charset=utf-8
content-length: 2162
Date: Mon, 18 Mar 2024 03:00:16 GMT
Connection: close

{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwidXNlcm5hbWUiOiJ3aWxkYW5hbnVncmFoIiwicGFzc3dvcmQiOiJwQHNzdzByZCJ9LCJ1c2VyUm9sZSI6W3siaWQiOiI2MGI3YjNhMS03MDgwLTRhNmEtYjVmNS02ZWY1ODNmMDZkMTIiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcCIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI3YzgxYjMyZi04OGUxLTQ5YWEtYTkxNS03ZGQ3OTlkOGJjNjAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDEiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiYmZiMjBkYWQtODczOS00NmQzLTk3YzAtNDM2NmM1NDk5ZGVjIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAyIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjliYjk0NDhmLTAwNzYtNDRkNC1iNGE2LWRlODg3NTBkYzVlYyIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMyIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCJdfSx7ImlkIjoiMThjMDZjOTctOTEzMS00MzhkLTkyMzYtNjhmOTNkZDU0ZjIzIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiNDlmMWZjOGQtMWQwNi00MGNlLTlkNmUtNDU4ODdlOGJhNDRlIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAxIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjNmNDNmMzE4LWZkOGUtNDE1ZS1iZWEyLTEzNWYwOTRhOGE5YSIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMiIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI4ZTRlNjdlOS1kZDUwLTQ1MGYtYjliMC00NjhlYWI0ZDhhNTAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDMiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiXX1dLCJpYXQiOjE3MTA3MzA4MTYsImV4cCI6MTcxMDczNDQxNn0.jIia23iUAd7LMZD62ZyseUmW0hUbGnABbQ3EBOWaE4rvFB8vwqs1E9eQff2zBlxmrFil4tUnqUJsIit_TfUiH9GQ4dA7g4U7kaJQjDGgvH9MM8PHdXNpGfIvYv1Ijcky7cVRUjv8OdQHYel9hKC5wOFdW5_PMKW-uPCE7meSjfWnJK50p7RJwQzrdKxsd_c5K2qTMKUt5TKLr_0PtqNnxUEsf3Pob0YDb7WxuQ_K4QZB67h7DSlbBLSLiksSjiEFBK4wdJrbrBcGQHVjeWEhgTYUZXYlhTxj7eaHriIPJIZ1JAnRDqhhBDACwjc_ey2kBi2jkvODuf4wMlncBRyd6A",
  "expired": 3600
}


###
@token={{Login.response.body.token}}
###
GET {{host}}/api/users/info
Content-Type: application/json
Authorization: Bearer {{token}}

# response
HTTP/1.1 200 OK
access-control-allow-origin: *
content-type: application/json; charset=utf-8
content-length: 1282
Date: Mon, 18 Mar 2024 03:00:40 GMT
Connection: close

{
  "user":
  {
    "id": "d713c087-3c20-43cf-9158-4bc67221b6fa",
    "username": "wildananugrah",
    "password": "p@ssw0rd"
  },
  "userRole": [
    {
      "id": "60b7b3a1-7080-4a6a-b5f5-6ef583f06d12",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "7c81b32f-88e1-49aa-a915-7dd799d8bc60",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp1",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "bfb20dad-8739-46d3-97c0-4366c5499dec",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp2",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "9bb9448f-0076-44d4-b4a6-de88750dc5ec",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp3",
      "attributeName": [
        "READ"
      ]
    },
    {
      "id": "18c06c97-9131-438d-9236-68f93dd54f23",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "49f1fc8d-1d06-40ce-9d6e-45887e8ba44e",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp1",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "3f43f318-fd8e-415e-bea2-135f094a8a9a",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp2",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "8e4e67e9-dd50-450f-b9b0-468eab4d8a50",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp3",
      "attributeName": [
        "READ"
      ]
    }
  ]
}


###
# @name RefreshToken
PUT {{host}}/api/token
Content-Type: application/json

{
    "token": "{{token}}",
    "expired": 7200
}

# response
HTTP/1.1 200 OK
access-control-allow-origin: *
content-type: application/json; charset=utf-8
content-length: 2162
Date: Mon, 18 Mar 2024 03:01:09 GMT
Connection: close

{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwidXNlcm5hbWUiOiJ3aWxkYW5hbnVncmFoIiwicGFzc3dvcmQiOiJwQHNzdzByZCJ9LCJ1c2VyUm9sZSI6W3siaWQiOiI2MGI3YjNhMS03MDgwLTRhNmEtYjVmNS02ZWY1ODNmMDZkMTIiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcCIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI3YzgxYjMyZi04OGUxLTQ5YWEtYTkxNS03ZGQ3OTlkOGJjNjAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDEiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiYmZiMjBkYWQtODczOS00NmQzLTk3YzAtNDM2NmM1NDk5ZGVjIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAyIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjliYjk0NDhmLTAwNzYtNDRkNC1iNGE2LWRlODg3NTBkYzVlYyIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMyIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCJdfSx7ImlkIjoiMThjMDZjOTctOTEzMS00MzhkLTkyMzYtNjhmOTNkZDU0ZjIzIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiLCJXUklURSJdfSx7ImlkIjoiNDlmMWZjOGQtMWQwNi00MGNlLTlkNmUtNDU4ODdlOGJhNDRlIiwidXNlcklkIjoiZDcxM2MwODctM2MyMC00M2NmLTkxNTgtNGJjNjcyMjFiNmZhIiwiYXBwTmFtZSI6InRlc3RBcHAxIiwiYXR0cmlidXRlTmFtZSI6WyJSRUFEIiwiV1JJVEUiXX0seyJpZCI6IjNmNDNmMzE4LWZkOGUtNDE1ZS1iZWEyLTEzNWYwOTRhOGE5YSIsInVzZXJJZCI6ImQ3MTNjMDg3LTNjMjAtNDNjZi05MTU4LTRiYzY3MjIxYjZmYSIsImFwcE5hbWUiOiJ0ZXN0QXBwMiIsImF0dHJpYnV0ZU5hbWUiOlsiUkVBRCIsIldSSVRFIl19LHsiaWQiOiI4ZTRlNjdlOS1kZDUwLTQ1MGYtYjliMC00NjhlYWI0ZDhhNTAiLCJ1c2VySWQiOiJkNzEzYzA4Ny0zYzIwLTQzY2YtOTE1OC00YmM2NzIyMWI2ZmEiLCJhcHBOYW1lIjoidGVzdEFwcDMiLCJhdHRyaWJ1dGVOYW1lIjpbIlJFQUQiXX1dLCJpYXQiOjE3MTA3MzA4NjksImV4cCI6MTcxMDczODA2OX0.DFl9EM5zxDzRYlnN11M2gXGSMB9yEQYBKRUu4CpFhdpGu7XO7u5FX-q0GBuUn_1GhhCRuVLIAbwGwWVr5FMt-5R7uaQlDxaAnpmcVV4pIS1jn4jPBoNCDYQ9_ATELqKKcPlqSbKuyQ1hiHFWY8eVLq0S5JYgwE3wDZD5jOzBJ0duO2tVoSLabAUt2XyEEuQDcGH1FZZifaQT3m-BFCod_HnN8fT20_yFGPOHoGOYokPBs8fvHfXJHyr_BLFjQwJVrSiMTNFvxyFjZK88AG9Jmj04JADoj4smrR7n76ld3xy75PzVzlXcLKEDYpU_Ku9WzK9KfQGzrKiOg5Qeg_C-Uw",
  "expired": 7200
}


###
@tokenRefreshed={{RefreshToken.response.body.token}}

###
GET {{host}}/api/users/info
Content-Type: application/json
Authorization: Bearer {{tokenRefreshed}}

# response
HTTP/1.1 200 OK
access-control-allow-origin: *
content-type: application/json; charset=utf-8
content-length: 1282
Date: Mon, 18 Mar 2024 03:01:19 GMT
Connection: close

{
  "user": {
    "id": "d713c087-3c20-43cf-9158-4bc67221b6fa",
    "username": "wildananugrah",
    "password": "p@ssw0rd"
  },
  "userRole": [
    {
      "id": "60b7b3a1-7080-4a6a-b5f5-6ef583f06d12",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "7c81b32f-88e1-49aa-a915-7dd799d8bc60",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp1",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "bfb20dad-8739-46d3-97c0-4366c5499dec",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp2",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "9bb9448f-0076-44d4-b4a6-de88750dc5ec",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp3",
      "attributeName": [
        "READ"
      ]
    },
    {
      "id": "18c06c97-9131-438d-9236-68f93dd54f23",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "49f1fc8d-1d06-40ce-9d6e-45887e8ba44e",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp1",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "3f43f318-fd8e-415e-bea2-135f094a8a9a",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp2",
      "attributeName": [
        "READ",
        "WRITE"
      ]
    },
    {
      "id": "8e4e67e9-dd50-450f-b9b0-468eab4d8a50",
      "userId": "d713c087-3c20-43cf-9158-4bc67221b6fa",
      "appName": "testApp3",
      "attributeName": [
        "READ"
      ]
    }
  ]
}

```
