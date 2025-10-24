/* Разработайте смоук тест - сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

======== Требования: =======
    Страница логина:
Username: обязательное
Password: обязательное
*/

import test, { expect } from '@playwright/test';

interface ICredentials {
    username: string;
    password: string;
}

test.describe("[Demo-login-form] [Login]", () => {

    const validCredentials: ICredentials = {
        username: "Anthony",
        password: "HelloWorldG",
    };

    enum NOTIFICATIONS {
        REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
        LOGIN_ERROR = "Invalid credentials",
        USERNAME_IS_REQUIRED = "Username is required",
        PASSWORD_IS_REQUIRED = "Password is required",
        CREDS_ARE_REQUIRED = "Credentials are required",
    }

    const testCredentials: ICredentials[] = [
        // 0. valid Username and invalid Password:
        {
            username: "Anthony",
            password: "HelloMyWorld",
        },
        // 1. invalid Username and valid Password:
        {
            username: "IvanJohn",
            password: "HelloWorld",
        },
        // 2. invalid Username and invalid Password:
        {
            username: " theTerminator  ",
            password: "Simple",
        },
        // 3. empty Username and valid Password:
        {
            username: "",
            password: "HelloWorldG",
        },
        // 4. empty Password and valid Username:
        {
            username: "Anthony",
            password: "",
        },
        // 5. empty Password and empty Username:
        {
            username: "",
            password: "",
        },

    ];

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url);
        const loginForm = page.locator('.loginForm');
        await expect(loginForm).toBeVisible();
    });

    // test 1.
    test("Should login with valid credentials", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // enter valid Username (on Login form)
        // enter invalid Password (on Login form)
        // click Submit button (on Login form)
        // check the greeting message (`Hello, ${username}!`)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const backToLoginPageButton = page.locator("#backButton");
        const successMessage = page.locator("h4[id='successMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(validCredentials.username);
        await passwordInputOnLogin.fill(validCredentials.password);
        await submitButton.click();
        await expect(successMessage).toContainText(`Hello, ${validCredentials.username}!`);
        await expect(backToLoginPageButton).toBeVisible();
    });

    // test 2.
    test("Should NOT login with invalid Password and invalid Username", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // enter valid Username (on Login form)
        // enter invalid Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[0]!.username);
        await passwordInputOnLogin.fill(testCredentials[0]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.LOGIN_ERROR);
    });

    // test 3.
    test("Should NOT login with invalid Username and valid Password", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // enter invalid Username (on Login form)
        // enter valid Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[1]!.username);
        await passwordInputOnLogin.fill(testCredentials[1]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.LOGIN_ERROR);
    });

    // test 4.
    test("Should NOT login with invalid Username and invalid Password", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // enter invalid Username (on Login form)
        // enter invalid Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[2]!.username);
        await passwordInputOnLogin.fill(testCredentials[2]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.LOGIN_ERROR);
    });

    // test 5.
    test("Should require Username (blank Username input)", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // do not enter Username (on Login form)
        // enter valid Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[3]!.username);
        await passwordInputOnLogin.fill(testCredentials[3]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.USERNAME_IS_REQUIRED);
    });

    // test 6.
    test("Should require Password", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // enter valid Username (on Login form)
        // do not enter Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[4]!.username);
        await passwordInputOnLogin.fill(testCredentials[4]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.PASSWORD_IS_REQUIRED);
    });

    // test 7.
    test("Should reject submitting with blank Username and blank Password", async ({ page }) => {
        // open demo-login-form page
        // click Register button
        // enter Username
        // enter Password
        // click Register button (on Registration form)
        // check the successMessage
        // click Back button
        // do not enter Username (on Login form)
        // do not enter Password (on Login form)
        // click Submit button (on Login form)
        // check the error message

        const registerButton = page.locator("#registerOnLogin");
        const userNameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backButton = page.locator("#backOnRegister");
        const submitButton = page.locator("#submit");
        const errorMessage = page.locator("h4[id='errorMessage']");

        const userNameInputOnLogin = page.locator("#userName");
        const passwordInputOnLogin = page.locator("#password");

        await registerButton.click();
        await userNameInputOnRegister.fill(validCredentials.username);
        await passwordInputOnRegister.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButton.click();

        await userNameInputOnLogin.fill(testCredentials[5]!.username);
        await passwordInputOnLogin.fill(testCredentials[5]!.password);
        await submitButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.CREDS_ARE_REQUIRED);
    });

});
