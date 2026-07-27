const { test, expect } = require('@playwright/test')

//java script is asynchronous so we need to write await to avoid parallel execution of code, so we need to wirite async function and await for the code to execute before moving to next line of code
//note becose of wait we write async before function 
test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); // it waits for the network to be idle, meaning that there are no more network requests being made. This is useful when you want to ensure that the page has fully loaded before proceeding with further actions.
    await page.locator(".card-body b").first().waitFor(); // waitFor() is used to wait for the element to be visible on the page, it will wait for the element to be visible on the page before proceeding with further actions.
    //allTextContents() asynchronous function, so we need to write await before it to avoid parallel execution of code, so we need to wirite async function and await for the code to execute before moving to next line of code
    const titles = await page.locator(".card-body b").allTextContents(); //allTextContents() is used to get the text of all the elements, it will return the text of all the elements as an array of strings
    console.log(titles);

})

test('TestID002', async ({ page }) => {
    //   const context = await browser.newContext();
    //   const page = context.newPage();
    await page.goto("https://www.redbus.in/");
    console.log(await page.title());

    //await page.locator("#srcinput").first().fill("Bangalore");
    //await page.locator("#destinput").first().fill("Chennai");
    //await page.locator("button[aria-label='Search for Today']").click();
    await page.locator("button[aria-label='Search buses']").first().click();

    //textContent() is used to get the text of the element, 
    // it will return the text of the element as a string
    console.log(await page.locator('[class^="message___"]').textContent());

    //assertions are used to verify the expected result with the actual result,
    await expect(await page.locator('[class^="message___"]').textContent()).toContain("Please enter source and destination");
});


//below test is for handale new page elements
test.only('@Child windows hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),

        ])//new page is opened


    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

})