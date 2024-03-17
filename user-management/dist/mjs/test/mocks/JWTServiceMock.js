export class JWTServiceMock {
    async create(data, expired) {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            expired: 3600,
        };
    }
    async refresh(token, expired) {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            expired: 3600,
        };
    }
    async validate(token) {
        return {
            user: {
                id: "1234567890123456",
                username: "wildananugrah",
                password: "p@ssw0rd",
            },
            userRole: [
                {
                    id: "8e8a4c28-70db-416d-8f2c-1013d5b7dbe6",
                    userId: "54817805-d127-4655-adee-ec376f274979",
                    appName: "testApp",
                    attributeName: ["READ", "WRITE"],
                },
                {
                    id: "79ab83ca-46ac-4369-a6fd-4e193f693018",
                    userId: "54817805-d127-4655-adee-ec376f274979",
                    appName: "testApp1",
                    attributeName: ["READ", "WRITE"],
                },
                {
                    id: "5aa4665b-bdc1-419e-9d85-563316cefcdb",
                    userId: "54817805-d127-4655-adee-ec376f274979",
                    appName: "testApp2",
                    attributeName: ["READ", "WRITE"],
                },
                {
                    id: "429a884c-49d0-4f39-9100-247073054d3f",
                    userId: "54817805-d127-4655-adee-ec376f274979",
                    appName: "testApp3",
                    attributeName: ["READ"],
                },
            ],
        };
    }
}
