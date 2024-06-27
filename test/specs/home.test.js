const homePage = require ('../pageobjects/homePage/home')

describe('Choose shopping category based on temperature', () => {
    it('should get and display the temperature', async () => {
        await browser.url('/')
        console.log("The temperature is: " + await homePage.temperature)
    })

    it('should go to Moisturizers if the temperature is below 19 and Sunscreens if it is above 34', async () => {
        let temp = await homePage.convertTempText()
        await homePage.shoppingSelection(temp)
    })
})

