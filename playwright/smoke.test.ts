import { test, expect } from '@playwright/test';

test.setTimeout(35e3);

test('test submitting exterior change application', async ({ page }) => {
  await page.goto('/');

  // fill form
  await page.getByPlaceholder('Enter a work order title').click();
  await page
    .getByPlaceholder('Enter a work order title')
    .fill('Test E2E Test Title - Exterior');
  await page.getByPlaceholder('Enter a work order description').click();
  await page
    .getByPlaceholder('Enter a work order description')
    .fill('Test Description');
  await page.getByLabel('Exterior').click();
  await page.getByLabel('Work on exterior doors').click();
  await page.getByLabel('Re-roofing').click();
  await page.getByLabel('Other').click();

  await page.getByRole('button', { name: 'Submit' }).click();

  // expect result
  await expect(
    page.locator(`h3:has-text('Test E2E Test Title - Exterior')`).first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article > div > div')
      .filter({ hasText: /^Exterior$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  h4')
      .filter({ hasText: /^In-House Review Process$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article label')
      .filter({ hasText: /^Re-roofing$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article label')
      .filter({ hasText: /^Work on exterior doors$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  ul > li')
      .filter({ hasText: /^A building permit is required.$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  ul > li')
      .filter({ hasText: /^Include plan sets.$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  ul > li')
      .filter({ hasText: /^Submit application for in-house review.$/ })
      .first(),
  ).toBeVisible();
});

test('test submitting interior change application', async ({ page }) => {
  await page.goto('/');

  // fill form
  await page.getByPlaceholder('Enter a work order title').click();
  await page.getByPlaceholder('Enter a work order title').fill('Test E2E Test Title - Interior');
  await page.getByPlaceholder('Enter a work order description').click();
  await page.getByPlaceholder('Enter a work order description').fill('Test Description');
  await page.getByLabel('Interior').click();
  await page.getByLabel('Other').click();
  await page.getByRole('button', { name: 'Submit' }).click();
 
  // expect result
  await expect(
    page.locator(`h3:has-text('Test E2E Test Title - Interior')`).first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article > div > div')
      .filter({ hasText: /^Interior$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  h4')
      .filter({ hasText: /^Over-the-Counter Submission Process$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article label')
      .filter({ hasText: /^Other$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  ul > li')
      .filter({ hasText: /^A building permit is required.$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('article  ul > li')
      .filter({ hasText: /^Submit application for OTC review.$/ })
      .first(),
  ).toBeVisible();
});
