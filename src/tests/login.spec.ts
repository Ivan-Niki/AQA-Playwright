// import test, { expect } from "@playwright/test";

// interface ICredentials {
//     username: string;
//     password: string;
// }

// enum NOTIFICATIONS {
//     LOGIN_SUCCESS = "You logged into a secure area!",
//     LOGOUT_SUCCESS = "You logged out of the secure area!",
//     INVALID_PASSWORD = "Your password is invalid!",
//     INVALID_USERNAME = "Your username is invalid!",
// }

// test.describe("[HerokuApp] [Form Authentication]", () => {
//     const validCredentials: ICredentials = {
//         username: "tomsmith",
//         password: "SuperSecretPassword!",
//     }

//     const invalidCredentials: ICredentials[] = [
//         {
//             username: "Vasya Pupkin",
//             password: validCredentials.password,
//         },
//         {
//             username: validCredentials.username,
//             password: "srofijjwpofjpojoubf",
//         },
//         {
//             username: "",
//             password: validCredentials.password,
//         },
//         {
//             username: validCredentials.username,
//             password: "",
//         },
//         {
//             username: "",
//             password: "",
//         },
//     ];

    

//     test.beforeEach(async ({ page }) => {
//         const url = "https://the-internet.herokuapp.com/";
//         const loginLink = page.locator('a[href="/login"]');
//         await page.goto(url);
//         await loginLink.click();
//     })

//     test("Should login with valid credentials", async ({ page }) => {
//         // open site
//         // navigate to login page
//         // enter login
//         // enter password
//         // click login button
//         // =================
//         // AAA (triple A подход)
//         // Arrange
//         // Act
//         // Assert

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");

//         await userNameInput.fill(validCredentials.username);
//         await passwordInput.fill(validCredentials.password);
//         await loginButton.click();
//         // await page.waitForTimeout(1000);
//         await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);
//         await expect(securePageTitle).toHaveText("Secure Area");

//     });

//     test("Should logout", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");
//         //pre-condition
//         await userNameInput.fill(validCredentials.username);
//         await passwordInput.fill(validCredentials.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);

//         // act
//         await logoutButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.LOGOUT_SUCCESS);
//         await expect(pageTitle).toHaveText("Login Page");
//     });

//     test("Should NOT login with invalid username and valid password", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");

//         await userNameInput.fill(invalidCredentials[0]!.username);
//         await passwordInput.fill(invalidCredentials[0]!.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);

//     });

//     test("Should NOT login with invalid password and valid username", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");

//         await userNameInput.fill(invalidCredentials[1]!.username);
//         await passwordInput.fill(invalidCredentials[1]!.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
//     });

//     test("Should NOT login with blank username and valid password", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");

//         await userNameInput.fill(invalidCredentials[2]!.username);
//         await passwordInput.fill(invalidCredentials[2]!.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
//     });

//     test("Should NOT login with blank password and valid username", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");

//         await userNameInput.fill(invalidCredentials[3]!.username);
//         await passwordInput.fill(invalidCredentials[3]!.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
//     });

//     test("Should NOT login with blank credentials", async ({ page }) => {

//         const userNameInput = page.locator("#username");
//         const passwordInput = page.locator("#password");
//         const loginButton = page.locator("//button[@type='submit']");
//         const notification = page.locator("#flash");
//         const securePageTitle = page.locator("h2");
//         const logoutButton = page.locator("a[href='/logout']");
//         const pageTitle = page.locator("h2");

//         await userNameInput.fill(invalidCredentials[4]!.username);
//         await passwordInput.fill(invalidCredentials[4]!.password);
//         await loginButton.click();
//         await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
//     });

// });