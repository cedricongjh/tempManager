const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

puppeteer.launch({ headless: false }).then(async browser => {

    // open browser and navigate to page
    const page = await browser.newPage()
    await page.goto("https://myaces.nus.edu.sg/htd")

    // login
    await page.$eval('#userNameInput', el => el.value = `YOUR_USERNAME_HERE`)
    await page.$eval('#passwordInput', el => el.value = `YOUR_PASSWORD_HERE`)   
    await page.click('#submitButton')
    await page.waitForNavigation()

    // fill up temperature form
    await page.click('[name="symptomsFlag"][value="N"]')
    await page.click('[name="familySymptomsFlag"][value="N"]')
    await page.$eval('input[type="text"][name="temperature"]', el => el.value = (Math.random() * (37.4 - 36.0) + 36.0).toFixed(1))
    await page.click('input[type="button"][name="Save"]')
    await page.waitForNavigation()

    // screenshot and close browser
    await page.screenshot({path: 'example_screenshot.png'})
    await browser.close()
})