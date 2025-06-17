const { test, expect } = require("@playwright/test");

test('Pressing "Fetch message" shows message.', async ({ page }) => {
  await page.goto("/");

  // hydration hack, more on this later on in the course
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "Fetch message" }).click();
  await expect(page.getByText("Message is: Hello world!")).toBeVisible();
});