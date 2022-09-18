import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../../shared/infra/http/app";
import createConnection from "../../../../../shared/infra/typeorm";

let connection: Connection;
let token: string;

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXXX')
      `
    );

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    token = responseToken.body.token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Categories Test",
        description: "Categories Description",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a duplicated category", async () => {
    const duplicatedCategory = {
      name: "Categories Test",
      description: "Categories Description",
    };

    await request(app)
      .post("/categories")
      .send(duplicatedCategory)
      .set({ Authorization: `Bearer ${token}` });
    const response = await request(app)
      .post("/categories")
      .send(duplicatedCategory)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});
