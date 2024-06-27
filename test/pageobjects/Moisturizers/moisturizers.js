var splitAloePrices = []
var splitAlmondPrices= []

class Moisturizer
{
    get aloeProductName()
    {
        return $('//p[contains(text() , "'+splitAloePrices[0]+'")]/preceding-sibling::p')
    }

    get almondProductName()
    {
        return $('//p[contains(text() , "'+splitAlmondPrices[0]+'")]/preceding-sibling::p')
    }

    get aloePrices()
    {
        return $$('//p[contains(text(),"Aloe") or contains(text(),"aloe")]/following-sibling::p')
    }

    get almondPrices()
    {
        return $$('//p[contains(text(),"Almond") or contains(text(),"almond")]/following-sibling::p')
    }
    
    get cart()
    {
        return $('//button[@class = "thin-text nav-link"]')
    }

    get LeastExpensiveAloe()
    {
        return $('//p[contains(text() , "'+splitAloePrices[0]+'")]/following-sibling::button')
    }

    get LeastExpensiveAlmond()
    {
        return $('//p[contains(text() , "'+splitAlmondPrices[0]+'")]/following-sibling::button')
    }

    get checkOut()
    {
        return $('//h2')
    }

    async scanPrices()
    {   
        console.log("Scanning Prices....")
        await this.aloePrices.forEach(async element => {
            let price = await element.getText()
            let splitPrice = parseFloat(price.substr(price.length-3))
            splitAloePrices.push(splitPrice)
        });

        await this.almondPrices.forEach(async element => {
            let price = await element.getText()
            let splitPrice = parseFloat(price.substr(price.length-3))
            splitAlmondPrices.push(splitPrice)
        });
        splitAlmondPrices.sort()
        splitAloePrices.sort()
    }

    async addAloeToCart()
    {
        await this.LeastExpensiveAloe.waitForDisplayed()
        await this.LeastExpensiveAloe.click()
        await browser.pause(5000)
        console.log("Adding " +await this.aloeProductName.getText()+" to cart" )
    }

    async addAlmondToCart()
    {
        await this.LeastExpensiveAlmond.waitForDisplayed()
        await this.LeastExpensiveAlmond.click()
        await browser.pause(8000)
        console.log("Adding " +await this.almondProductName.getText()+" to cart" )
    }

    async proceedToCheckOut()
    {
        console.log("Proceeding to checkout!!!")
        await this.cart.waitForDisplayed()
        await this.cart.click()
        await browser.pause(5000)
        await expect(await this.checkOut).toHaveText('Checkout')
    }
}

module.exports = new Moisturizer()