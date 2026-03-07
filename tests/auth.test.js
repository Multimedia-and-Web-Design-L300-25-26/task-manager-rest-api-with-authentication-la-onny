import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

describe("Auth Routes", () => {

  let token;

  // Clean up test user before each test
  beforeAll(async () => {
    await User.deleteMany({ email: /^test/ });
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
  // Register fresh user specifically for login test
  await request(app)
    .post("/api/auth/register")
    .send({ name: "Login User", email: "testlogin@example.com", password: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "testlogin@example.com", password: "123456" });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();
  token = res.body.token;
});

});