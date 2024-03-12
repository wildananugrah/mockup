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
