const puppeteer = require('puppeteer');

(async () => {

    // open browser and navigate to page
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
    await page.goto("https://myaces.nus.edu.sg/htd")

    // login
    await page.$eval('#userNameInput', el => el.value = `nusstu\\E0535045`)
    await page.$eval('#passwordInput', el => el.value = `S99915041g!Y1S1`)   
    await page.click('#submitButton')
    await page.waitForNavigation()

    // fill up temperature form
    await page.click('[name="symptomsFlag"][value="N"]')
    await page.click('[name="familySymptomsFlag"][value="N"]')
    await page.$eval('input[type="text"][name="temperature"]', el => el.value = (Math.random() * (37.4 - 36.0) + 36.0).toFixed(1))
    await page.click('input[type="button"][name="Save"]')
    await page.waitForNavigation()

    // screenshot and close browser
    await page.screenshot({path: 'screenshot.png'})
})()
