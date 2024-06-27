var splitSPF50Prices = []
var splitSPF30Prices = []

class Sunscreen
{
    get SPF50ProductName()
    {
        return $('//p[contains(text() , "'+splitSPF50Prices[0]+'")]/preceding-sibling::p')

    }

    get SPF30ProductName()
    {
        return $('//p[contains(text() , "'+splitSPF30Prices[0]+'")]/preceding-sibling::p')       
    }

    get SPF50Prices()
    {
        return $$('//p[contains(text() , "SPF-50")]/following-sibling::p')
    }

    get SPF30Prices()
    {
        return $$('//p[contains(text() , "SPF-30")]/following-sibling::p')
    }
    
    get cart()
    {
        return $('//button[@class = "thin-text nav-link"]')
    }

    get LeastExpensiveSPF50()
    {
        return $('//p[contains(text() , "'+splitSPF50Prices[0]+'")]/following-sibling::button')
    }

    get LeastExpensiveSPF30()
    {
        return $('//p[contains(text() , "'+splitSPF30Prices[0]+'")]/following-sibling::button')
    }

    get checkOut()
    {
        return $('//h2')
    }
    async scanPrices()
    {   
        console.log("Scanning Prices....")
        await this.SPF50Prices.forEach(async element => {
            let price = await element.getText()
            let splitPrice = parseFloat(price.substr(price.length-3))
            splitSPF50Prices.push(splitPrice)
        });

        await this.SPF30Prices.forEach(async element => {
            let price = await element.getText()
            let splitPrice = parseFloat(price.substr(price.length-3))
            splitSPF30Prices.push(splitPrice)
        });
        splitSPF50Prices.sort()
        splitSPF30Prices.sort()
    }

    async addSPF50ToCart()
    {   
        await this.LeastExpensiveSPF50.waitForDisplayed()
        await this.LeastExpensiveSPF50.click()
        await browser.pause(5000)
        console.log("Adding " +await this.SPF50ProductName.getText()+" to cart" )
    }

    async addSPF30ToCart()
    {
        await this.LeastExpensiveSPF30.waitForDisplayed()
        await this.LeastExpensiveSPF30.click()
        await browser.pause(8000)
        console.log("Adding " +await this.SPF30ProductName.getText()+" to cart" )
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

module.exports = new Sunscreen()