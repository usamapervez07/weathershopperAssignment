class CardDetails
{
    get emailAddress()
    {
        return $('//input[@id = "email"]')
    }

    get cardNumber()
    {
        return $('//input[@id = "card_number"]')
    }

    get expiryDate()
    {
        return $('//input[@id = "cc-exp"]')
    }

    get cvc()
    {
        return $('//input[@id = "cc-csc"]')
    }

    get zipCode()
    {
        return $('//input[@id = "billing-zip"]')
    }

    get confirmPayment()
    {
        return $('//button[@id= "submitButton"]')
    }  

    get paymentSuccessfull()
    {
        return $('//h2')
    }
    

    async setEmailAddress(text){
        console.log("Entering email address!")
        await this.emailAddress.waitForDisplayed()
        await this.emailAddress.click()
        await this.emailAddress.setValue(text)
        await browser.pause(2000)
    }

    async setCardNumber(text){
        console.log("Entering card number")
        await this.cardNumber.waitForDisplayed()
        await this.cardNumber.click()
        await browser.keys(text)
        await browser.pause(2000)
    }

    async setExpiry(text){
        console.log("Entering expiry date")
        await this.expiryDate.waitForDisplayed()
        await this.expiryDate.click()
        await browser.keys(text)
        await browser.pause(2000)
    }

    async setCVC(text){
        console.log("Entering CVC")
        await this.cvc.waitForDisplayed()
        await this.cvc.click()
        await this.cvc.setValue(text)
        await browser.pause(2000)
    }

    async setZip(text){
        console.log("Entering ZIP Code")
        await this.zipCode.waitForDisplayed()
        await this.zipCode.click()
        await this.zipCode.setValue(text)
        await browser.pause(2000)
    }

    async makePayment()
    {
        console.log("Confirming payment!")
        await this.confirmPayment.waitForDisplayed()
        await this.confirmPayment.click()
    }

    async verifyPayment()
    {
        console.log("Verifying Payment!!")
        await browser.pause(5000)
        await this.paymentSuccessfull.waitForDisplayed()
        await expect(await this.paymentSuccessfull).toHaveTextContaining("PAYMENT SUCCESS")
    }
}

module.exports = new CardDetails()