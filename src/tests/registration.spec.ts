/* Разработайте смоук тест - сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

======== Требования: =======
    Страница регистрации:
Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные / постфиксные пробелы, как и имя состоящее из одних пробелов
Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    
    Страница логина:
Username: обязательное
Password: обязательное
*/

import test, { expect } from '@playwright/test';

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    SHORT_USERNAME_ERROR = "Username should contain at least 3 characters",
    USERNAME_SPACES_ERROR = "Prefix and postfix spaces are not allowed is username",
    USERNAME_IS_REQUIRED = "Username is required",
    PASSWORD_IS_REQUIRED = "Password is required",
    SHORT_PASSWORD_ERROR = "Password should contain at least 8 characters",
    UPPERCASE_ONLY_PASSWORD = "Password should contain at least one character in lower case",
}

test.describe("[Demo-login-form] [Register]", () => {

    const validCredentials: ICredentials = {
        username: "Ivan John",
        password: "HelloWorld",
    };

    const testCredentials: ICredentials[] = [
        // 0. username length is less than 3 characters:
        {
            username: "Iv",
            password: "HelloWorlds",
        },
        // 1. max length username (40):
        {
            username: "Ivan".repeat(10),
            password: "SuperPassword",
        },
        // 2. username with prefix spaces:
        {
            username: " Kate",
            password: "SimplePassword",
        },
        // 3. username with postfix spaces:
        {
            username: "Richard  ",
            password: "SecretPassw",
        },
        // 4. username with only spaces:
        {
            username: "     ",
            password: "MyNewPassword",
        },
        // 5. empty username:
        {
            username: "",
            password: "ValidPassword",
        },

        // ========== =========== =========== ========== ==========
        // 6. password length is less than 8 characters:
        {
            username: "Nick",
            password: "PassWor",
        },
        // 7. max length password (20):
        {
            username: "Sam",
            password: "World".repeat(4),
        },
        // 8. password without Uppercase letters
        {
            username: "Maria Rosa",
            password: "nouppercase",
        },
        // 9. password without Lowercase letters
        {
            username: "Robert",
            password: "NOLOWERCASE",
        },
        // 10. empty password:
        {
            username: "Michail",
            password: "",
        },
        // 11. password with only spaces:
        {
            username: "Vitaly",
            password: "          ",
        },
    ];

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url);
    });

    // ====================== Positive test ==========================
    // test 1.
    test("Should register with valid credentials", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    // ====================== Username tests ==========================
    // test 2.
    test("Should reject username with less than 3 characters", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter Username with less than 3 characters
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[0]!.username);
        await passwordInput.fill(testCredentials[0]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.SHORT_USERNAME_ERROR);
    });

    // test 3.
    test("Should register with 40 characters Username", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter Username with 40 characters
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[1]!.username);
        await passwordInput.fill(testCredentials[1]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    // test 4.
    test("Should reject Username with prefix spaces", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter Username with prefix spaces
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[2]!.username);
        await passwordInput.fill(testCredentials[2]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.USERNAME_SPACES_ERROR);
    });

    // test 5.
    test("Should reject Username with postfix spaces", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter Username with postfix spaces
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[3]!.username);
        await passwordInput.fill(testCredentials[3]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.USERNAME_SPACES_ERROR);
    });

    // test 6.
    test("Should reject Username with only spaces", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter Username with only spaces
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[4]!.username);
        await passwordInput.fill(testCredentials[4]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.USERNAME_SPACES_ERROR);
    });

    // test 7.
    test("Should require Username", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // do not enter Username (leave the Username input empty)
        // enter valid Password
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[5]!.username);
        await passwordInput.fill(testCredentials[5]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.USERNAME_IS_REQUIRED);
    });

    // ====================== Password tests ==========================
    // test 8.
    test("Should reject password with less than 8 characters", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter Password with less than 8 characters
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[6]!.username);
        await passwordInput.fill(testCredentials[6]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.SHORT_PASSWORD_ERROR);
    });

    // test 9.
    test("Should register with 20 characters password", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter Password with 20 characters
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[7]!.username);
        await passwordInput.fill(testCredentials[7]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    // test 10.
    test("Should reject password without uppercase letter", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter Password without uppercase letter
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[8]!.username);
        await passwordInput.fill(testCredentials[8]!.password);
        await registerButton2.click();
        await expect(notification).toContainText("Password should contain at least one character in upper case");
    });

    // test 11.
    test("Should reject password without lowercase letter", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter Password without lowercase letter
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[9]!.username);
        await passwordInput.fill(testCredentials[9]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.UPPERCASE_ONLY_PASSWORD);
    });

    // test 12.
    test("Should require password", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // do not enter Password (leave the Password input empty)
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[10]!.username);
        await passwordInput.fill(testCredentials[10]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.PASSWORD_IS_REQUIRED);
    });

    // test 13.
    test("Should reject password with only spaces", async ({ page }) => {
        // open demo-login-form page
        // click Register button (on Login form)
        // enter valid Username
        // enter Password with only spaces (from 8 to 20 spaces)
        // click Register button (on Register form)

        const registerButton = page.locator("#registerOnLogin");
        const userNameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton2 = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await registerButton.click();
        await userNameInput.fill(testCredentials[11]!.username);
        await passwordInput.fill(testCredentials[11]!.password);
        await registerButton2.click();
        await expect(notification).toContainText(NOTIFICATIONS.PASSWORD_IS_REQUIRED);
    });

});
