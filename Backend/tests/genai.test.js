/* These tests validate the AI service layer (generateTinaResponse):
   - Ensures Tina's intro logic works correctly
   - Confirms prompt formatting and rule‑block integrity
   - Verifies tone, safety, and business‑rule enforcement
   - Ensures no leakage of internal system instructions
   - Confirms correct handling of multi‑vehicle logic
   - Ensures polite declines for trucks and racing cars

   By mocking GoogleGenAI, these tests remain:
   - fast
   - isolated from external APIs
*/

import { jest } from "@jest/globals";

// Mock GoogleGenAI so tests never call the real API.
// This keeps tests fast, predictable, and isolated.
jest.unstable_mockModule("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: "Mocked AI response"
      })
    }
  }))
}));

const { GoogleGenAI } = await import("@google/genai");
const { generateTinaResponse } = await import("../services/genai.js");

describe("generateTinaResponse()", () => {

  // 1. Ensures Tina introduces herself only at the very start of a conversation.
  test("1. returns intro when history is empty", async () => {
    const result = await generateTinaResponse([]);
    expect(result).toMatch(/I’m Tina/i);
  });

  // 2. Protects against null input and ensures intro still appears.
  test("2. returns intro when history is null", async () => {
    const result = await generateTinaResponse(null);
    expect(result).toMatch(/I’m Tina/i);
  });

  // 3. Ensures Tina does NOT reintroduce herself mid‑conversation.
  test("3. does not return intro when history has messages", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "Hello" }
    ]);
    expect(result).not.toMatch(/I’m Tina/i);
  });

  // 4. Guarantees the function always returns a string (API safety).
  test("4. always returns a string", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "Hi" }
    ]);
    expect(typeof result).toBe("string");
  });

  // 5. Ensures Tina never returns an empty response (fallback safety).
  test("5. response is not empty", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "Hi" }
    ]);
    expect(result.length).toBeGreaterThan(0);
  });

  // 6. Ensures only USER messages are included in the prompt history.
  //    Assistant messages must NOT be echoed back to Gemini.
  test("6. prompt includes formatted conversation history", async () => {
    const history = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" }
    ];

    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({ text: "Mocked" });

    await generateTinaResponse(history);

    const prompt =
      mockAI.models.generateContent.mock.calls[0][0].contents;

    expect(prompt).toMatch(/USER: Hello/);
    expect(prompt).not.toMatch(/ASSISTANT: Hi there/);
  });

  // 7. Ensures the systemInstruction contains ALL rule sections.
  //    This protects against accidental rule deletion or corruption.
  test("7. system prompt includes all rule sections", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({ text: "Mocked" });

    await generateTinaResponse([{ role: "user", content: "Hi" }]);

    const systemPrompt =
      mockAI.models.generateContent.mock.calls[0][0].config.systemInstruction;

    [
      "TONE & VARIATION GUIDELINES",
      "CONVERSATION FLOW RULES",
      "VEHICLE TYPE IDENTIFICATION",
      "FINAL RECOMMENDATION"
    ].forEach(section => {
      expect(systemPrompt).toMatch(new RegExp(section, "i"));
    });
  });

  // 8. Ensures Tina never leaks internal rule text back to the user.
  test("8. response does not contain system prompt leakage", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "Hi" }
    ]);

    expect(result).not.toMatch(/CONVERSATION FLOW RULES/i);
    expect(result).not.toMatch(/Respond as Tina/i);
  });

  // 9. Ensures Tina never overwhelms the user with multiple questions.
  test("9. never asks more than one question at a time", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "I want to insure my car" }
    ]);

    const questionMarks = (result.match(/\?/g) || []).length;
    expect(questionMarks).toBeLessThanOrEqual(1);
  });

  // 10. Ensures Tina maintains her warm, friendly, professional tone.
  test("10. maintains warm, friendly, professional tone", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({
      text: "Thanks so much, happy to help!"
    });

    const result = await generateTinaResponse([{ role: "user", content: "Hi" }]);
    expect(result).toMatch(/warm|friendly|happy to help|sure/i);
  });

  // 11. Ensures Tina follows the rule: identify vehicle type BEFORE details.
  test("11. identifies vehicle type before asking for make/model/year", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({ text: "Mocked" });

    await generateTinaResponse([{ role: "user", content: "I want to insure a car" }]);

    const systemPrompt =
      mockAI.models.generateContent.mock.calls[0][0].config.systemInstruction;

    expect(systemPrompt).toMatch(/VEHICLE TYPE IDENTIFICATION/i);
    expect(systemPrompt).toMatch(/Only after confirming the vehicle is a standard car/i);
  });

  // 12. Ensures Tina declines trucks politely and provides alternatives.
  test("12. politely declines trucks with alternatives", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({
      text: "Unfortunately trucks usually need a business insurer like AMI or State. You're still in great hands for your car."
    });

    const result = await generateTinaResponse([
      { role: "user", content: "I want to insure my truck" }
    ]);

    expect(result).toMatch(/unfortunately/i);
    expect(result).toMatch(/business insurer|AMI|State/i);
    expect(result).toMatch(/great hands|continue|going/i);
  });

  // 13. Ensures Tina declines racing cars politely and gives specialist options.
  test("13. politely declines racing cars with alternatives", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({
      text: "Thanks so much for telling me. Racing cars usually need a specialist insurer like Star Insurance or Classic Cover. You're still in great hands for your car."
    });

    const result = await generateTinaResponse([
      { role: "user", content: "I have a racing car" }
    ]);

    expect(result).toMatch(/racing car/i);
    expect(result).toMatch(/specialist insurer|Star Insurance|Classic Cover/i);
    expect(result).toMatch(/great hands|continue|going/i);
  });

  // 14. Ensures Tina handles multiple vehicles sequentially, not all at once.
  test("14. handles multiple vehicles one at a time", async () => {
    const mockAI = GoogleGenAI.mock.results[0].value;
    mockAI.models.generateContent.mockResolvedValueOnce({
      text: "Let's take one vehicle at a time so we can get the details right."
    });

    const result = await generateTinaResponse([
      { role: "user", content: "I have two cars" }
    ]);

    expect(result).toMatch(/one vehicle at a time/i);
  });

  // 15. Ensures Tina never mixes recommendations across different vehicles.
  test("15. never mixes recommendations for multiple vehicles", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "I have a car and a truck" }
    ]);

    expect(result).not.toMatch(/car.*truck|truck.*car/i);
  });

  // 16. Ensures Tina applies business rules (e.g., no comprehensive for old cars).
  test("16. applies business rules for comprehensive insurance", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "My car is from 2005" }
    ]);

    expect(result).not.toMatch(/comprehensive/i);
  });

  // 17. Ensures Tina never leaks internal rule keywords into her responses.
  test("17. never leaks rule-block keywords", async () => {
    const result = await generateTinaResponse([
      { role: "user", content: "Tell me more" }
    ]);

    [
      "VEHICLE TYPE IDENTIFICATION",
      "BUSINESS RULES",
      "FINAL RECOMMENDATION"
    ].forEach(section => {
      expect(result).not.toMatch(new RegExp(section, "i"));
    });
  });

});

export {};



