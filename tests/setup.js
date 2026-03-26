import { jest } from "@jest/globals";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.test", override: true  });

jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});