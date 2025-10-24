/* Разработать тест со следующими шагами:
- открыть https://the-internet.herokuapp.com/
- перейти на страницу Dynamic Controls
- Дождаться появления кнопки Remove
- Завалидировать текста в заголовке страницы
- Чекнуть чекбокс
- Кликнуть по кнопке Remove
- Дождаться исчезновения чекбокса
- Проверить наличие кнопки Add
- Завалидировать текст It's gone!
- Кликнуть на кнопку Add
- Дождаться появления чекбокса
- Завалидировать текст It's back!
*/

import test, { expect } from "@playwright/test";

test.describe('[Heroku App] [Dynamic Controls]', () => {
    test('hw-20', async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/";
        await page.goto(url);
        const link = page.getByRole('link', { name: "Dynamic Controls" });
        await link.click();

        // Дождаться появления кнопки Remove
        const removeButton = page.getByRole("button", { name: "Remove" });
        await expect(removeButton).toBeVisible();

        // Завалидировать текста в заголовке страницы

        const pageHeading = page.getByRole("heading", {
            name: 'Dynamic Controls',
        });
        const checkboxHeading = page.getByRole("heading", {
            name: 'Remove',
            exact: false,
        });
        const textInputHeading = page.getByRole("heading", {
            name: 'Enable',
            exact: false,
        });

        await expect(pageHeading).toHaveText("Dynamic Controls");
        await expect(checkboxHeading).toHaveText("Remove/add");
        await expect(textInputHeading).toHaveText("Enable/disable");

        // Чекнуть чекбокс
        const checkboxInput = page.locator("input[label='blah']");
        await checkboxInput.check();

        // Кликнуть по кнопке Remove
        await removeButton.click();

        // Дождаться исчезновения чекбокса
        await expect(checkboxInput, "Waiting for checkbox to disappear").toBeVisible({ visible: false, timeout: 20000 });

        // Проверить наличие кнопки Add
        const addButton = page.getByRole("button", { name: "Add" });
        await expect(addButton).toBeVisible();

        // Завалидировать текст It's gone!
        const checkboxForm = page.locator("form#checkbox-example");
        await expect(checkboxForm.locator("#message")).toHaveText("It's gone!");

        // Кликнуть на кнопку Add
        await addButton.click();

        // Дождаться появления чекбокса
        const addedCheckbox = page.locator("input#checkbox");
        await expect(addedCheckbox).toBeVisible({ timeout: 10000 });

        // Завалидировать текст It's back!
        await expect(checkboxForm.locator("#message")).toHaveText("It's back!");

    });
});