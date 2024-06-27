class Home
{
    get temperature()
    {
        return $('#temperature').getText()
    }

    get pageName()
    {
        return $('//h2')
    }

    get buyMoisturizer()
    {
        return $('//button[text() = "Buy moisturizers"]')
    }

    get buySunscreen()
    {
        return $('//button[text() = "Buy sunscreens"]')
    }

    async convertTempText()
    {
        let text = await this.temperature
        let intText = parseFloat(await text.split(' ')[0])
        return intText
    }

    async shoppingSelection(temp)
    {        
        if(temp < 19)
            {
                await this.buyMoisturizer.waitForDisplayed()
                await this.buyMoisturizer.click()
                browser.pause(6000)
                console.log("Buying Moisturizer...")
                await this.pageName.waitForDisplayed()
                await expect(this.pageName).toHaveText('Moisturizers')
                browser.pause(6000)

            }
        else if( temp > 34)
            {
                await this.buySunscreen.waitForDisplayed()
                await this.buySunscreen.click()
                browser.pause(6000)
                console.log("Buying Sunscreen...")
                await this.pageName.waitForDisplayed()
                await expect(this.pageName).toHaveText('Sunscreens')
                browser.pause(6000)


            }
    }
}

module.exports = new Home();