/* 
Создайте ОДИН смоук тест со следующими шагами:
1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован
*/

import test, { expect } from '@playwright/test';

interface ICredentials {
    fullname: {
        firstname: string;
        lastname: string;
    };
    address: string;
    email: string;
    phone: string;
    country: string;
    gender: string;
    hobbies: string;
    language: string;
    skills: string;
    dateOfBirth: {
        year: string;
        month: string;
        day: string;
    },
    password: string;
    confirmPassword: string;
};

// enum NOTIFICATIONS {
//     REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
//     SHORT_USERNAME_ERROR = "Username should contain at least 3 characters",
//     USERNAME_SPACES_ERROR = "Prefix and postfix spaces are not allowed is username",
//     USERNAME_IS_REQUIRED = "Username is required",
//     PASSWORD_IS_REQUIRED = "Password is required",
//     SHORT_PASSWORD_ERROR = "Password should contain at least 8 characters",
//     UPPERCASE_ONLY_PASSWORD = "Password should contain at least one character in lower case",
// }

test.describe("[Demo-login-form] [Register]", () => {

    const validCredentials: ICredentials = {
        fullname: {
            firstname: "Vladimir",
            lastname: "Ivanov",
        },
        address: "Kalvariyskaya Street 53-187, Minsk, Belarus",
        email: "Ivanov-Vl@mail.ru",
        phone: "+375293334455",
        country: "Canada",
        gender: "male",
        hobbies: "Sports",
        language: "Russian",
        skills: "JavaScript",
        dateOfBirth: {
            year: "1999",
            month: "September",
            day: "12",
        },
        password: "MySecretPassword",
        confirmPassword: "MySecretPassword",
    };

    const testCredentials: ICredentials[] = [

    ];


    // ====================== Positive test ==========================
    // test 1.
    test("Should register with valid data", async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
        await page.goto(url);

        const firstNameInput = page.locator("#firstName");
        const lastNameInput = page.locator("#lastName");
        const addressTextarea = page.locator("#address");
        const emailInput = page.locator("#email");
        const phoneInput = page.locator("#phone");
        const countryDropdown = page.locator("#country");

        const maleRadio = page.locator('input[type="radio"][value="male"]');
        const femaleRadio = page.locator('input[type="radio"][value="female"]');

        const hobbieSportsCheckbox = page.locator('input[value="Sports"]');

        const languageInput = page.locator('#language');
        const skillsSelect = page.locator('#skills');
        const yearDropdown = page.locator('#year');
        const monthDropdown = page.locator('#month');
        const dayDropdown = page.locator('#day');
        const passwordInput = page.locator('#password');
        const confirmPasswordInput = page.locator('#password-confirm');
        const submitButton = page.locator('button[type="submit"]');


        // Registration Details
        const regDetailsHeader = page.locator('//h2[contains(text(), "Registration Details")]');
        const regDetailsFullnameValue = page.locator('span[id="fullName"]');
        const regDetailsAddressValue = page.locator('span[id="address"]');
        const regDetailsEmailValue = page.locator('span[id="email"]');
        const regDetailsPhoneValue = page.locator('span[id="phone"]');
        const regDetailsCountryValue = page.locator('span[id="country"]');
        const regDetailsGenderValue = page.locator('span[id="gender"]');
        const regDetailsLanguageValue = page.locator('span[id="language"]');
        const regDetailsSkillsValue = page.locator('span[id="skills"]');
        const regDetailsHobbiesValue = page.locator('span[id="hobbies"]');
        const regDetailsDateOfBirthValue = page.locator('span[id="dateOfBirth"]');
        const regDetailsPasswordValue = page.locator('span[id="password"]');
        // const backtoFormButton = page.locator('//button[@onclick="renderRegistrationForm()")]');

        await firstNameInput.fill(validCredentials.fullname.firstname);
        await lastNameInput.fill(validCredentials.fullname.lastname);
        await addressTextarea.fill(validCredentials.address);
        await emailInput.fill(validCredentials.email);
        await phoneInput.fill(validCredentials.phone);
        await countryDropdown.selectOption(validCredentials.country);

        await maleRadio.check();
        await expect(maleRadio).toBeChecked();
        await expect(femaleRadio).not.toBeChecked();

        await hobbieSportsCheckbox.check();
        await languageInput.fill(validCredentials.language);
        await skillsSelect.selectOption(validCredentials.skills);
        await yearDropdown.selectOption(validCredentials.dateOfBirth.year);
        await monthDropdown.selectOption(validCredentials.dateOfBirth.month);
        await dayDropdown.selectOption(validCredentials.dateOfBirth.day);
        await passwordInput.fill(validCredentials.password);
        await confirmPasswordInput.fill(validCredentials.confirmPassword);

        await submitButton.click();
        expect(regDetailsHeader).toBeVisible;
        await expect(regDetailsFullnameValue).toContainText(validCredentials.fullname.firstname + " " + validCredentials.fullname.lastname);
        await expect(regDetailsAddressValue).toHaveText(validCredentials.address);
        await expect(regDetailsEmailValue).toHaveText(validCredentials.email);
        await expect(regDetailsPhoneValue).toHaveText(validCredentials.phone);
        await expect(regDetailsCountryValue).toHaveText(validCredentials.country);
        await expect(regDetailsGenderValue).toHaveText(validCredentials.gender);

        await expect(regDetailsLanguageValue).toHaveText(validCredentials.language);
        await expect(regDetailsSkillsValue).toHaveText(validCredentials.skills);
        await expect(regDetailsHobbiesValue).toContainText(validCredentials.hobbies);
        await expect(regDetailsDateOfBirthValue).toHaveText(validCredentials.dateOfBirth.day + " " + validCredentials.dateOfBirth.month + " " + validCredentials.dateOfBirth.year);

    });

});
