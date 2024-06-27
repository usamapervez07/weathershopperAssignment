const assert = require('assert')
class Checkout
{
    get itemPrices()
    {
        return $$('//tr//td[2]')
    }

    get itemNames()
    {
        return $$('//tr//td[1]')
    }

    get totalAmount()
    {
        return $('#total')
    }

    get payButton()
    {
        return $('//button[@class ="stripe-button-el"]')
    }
    
    get iFrame()
    {
        return $('//iframe[@class = "stripe_checkout_app"]')
    }
    
    async verifyNames()
    {
        await this.itemNames.forEach(async element => {
            await expect(element).toHaveTextContaining(['SPF-50', 'SPF-30', 'Aloe', 'Almond', 'almond', 'aloe'])
        });
    }

    async verifyTotal()
    {
        console.log("Verifying total!")
        var total = 0;
        await this.itemPrices.forEach(async element => {
            let price =  parseFloat(await element.getText())
            total = total+price
        })
        let amount = await this.totalAmount.getText()
        let splitAmount = parseFloat(amount.substr(amount.length-3))
        assert.equal(splitAmount,total)
    }

    async proceedToPayment()
    {   
        console.log("Total verified! Proceeding to make payment!")
        await this.payButton.waitForDisplayed()
        await this.payButton.click()
    }
}

module.exports = new Checkout()