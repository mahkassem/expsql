import supertest from "supertest";
import app from "../app";
import { createTestUser, TestUser } from "../utils/auth.test.helper";

let testUser: TestUser;

describe("Users API", () => {
  beforeAll(async () => {
    testUser = await createTestUser();
  });

  it("Should return a list of users", async () => {
    const response = await supertest(app)
      .get("/api/users")
      .set({ Authorization: `Bearer ${testUser.token}` });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // test get user by id
  it("should return user info", async () => {
    const response = await supertest(app)
      .get(`/api/users/${testUser.user.id as number}`)
      .set({ Authorization: `Bearer ${testUser.token}` });

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(testUser.user.id);
  });
});
