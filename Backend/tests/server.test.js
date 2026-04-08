/*These tests cover the full backend request pipeline:
 - app.js (Express app)
 - api.js (route handlers)
 - server.js (indirectly, because the app is fully loaded)
 
  By testing the Express app directly with Supertest, we verify:
 - routing
 - validation
 - error handling
 - integration with the AI service layer
 */

import { jest } from "@jest/globals";
import request from "supertest";

// Prevent console noise during error‑handling tests.
// This keeps the test output clean and focused.
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

// Mock the AI service so backend tests never call the real Gemini API.
// This ensures backend tests stay fast, predictable, and isolated.
jest.unstable_mockModule("../services/genai.js", () => ({
  generateTinaResponse: jest.fn()
}));

const { generateTinaResponse } = await import("../services/genai.js");
const { default: app } = await import("../app.js");

describe("Backend routes", () => {

  // 1. Confirms the backend exposes a simple health‑check endpoint.
  test("1. GET / returns backend alive message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Backend is running/i);
  });

  // 2. Ensures the API rejects requests missing required fields.
  // This protects the server from malformed input.
  test("2. POST /chat returns 400 if message missing", async () => {
    const res = await request(app).post("/chat").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing message");
  });

  // 3. Confirms the route correctly integrates with the AI layer.
  // This verifies the backend passes user input through the service layer.
  test("3. POST /chat returns reply when message provided", async () => {
    generateTinaResponse.mockResolvedValue("Hello from Tina!");
    const res = await request(app).post("/chat").send({ message: "Hi" });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe("Hello from Tina!");
  });

  // 4. Ensures backend error handling is stable when the AI layer fails.
  // This prevents server crashes and ensures consistent error responses.
  test("4. POST /chat handles AI errors gracefully", async () => {
    generateTinaResponse.mockRejectedValue(new Error("AI failed"));
    const res = await request(app).post("/chat").send({ message: "Hi" });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("AI request failed");
  });

});

/* FUTURE DATABASE TESTS (COMMENTED OUT FOR NOW) 
These will be activated once database routes are added to api.js.


describe("Database‑backed routes", () => {

  // 5. Confirms the API can return stored records.
  // // Useful once GET /items or similar is implemented.
  // test("5. GET /items returns stored data", async () => {
  //   const res = await request(app).get("/items");
  //   expect(res.statusCode).toBe(200);
  //   expect(Array.isArray(res.body)).toBe(true);
  // });

  // 6. Ensures new records can be created.
  // Important once POST /items is added.
  test("6. POST /items creates a new record", async () => {
    const res = await request(app).post("/items").send({ name: "Test item" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test item");
  });

  // 7. Confirms updates work and invalid IDs are handled.
  test("7. PUT /items/:id updates a record", async () => {
    const res = await request(app).put("/items/123").send({ name: "Updated" });
    expect(res.statusCode).toBe(200);
  });

  // 8. Ensures deletion works and errors are handled.
  test("8. DELETE /items/:id removes a record", async () => {
    const res = await request(app).delete("/items/123");
    expect(res.statusCode).toBe(200);
  });

});
*/
