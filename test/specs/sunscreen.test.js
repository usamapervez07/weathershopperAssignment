const sunscreenPage = require ('../pageobjects/Sunscreen/sunscreen')
const checkoutPage = require ('../pageobjects/Checkout/checkout')
const cardData = require ('../../stripeTestCards.json')
const CardDetailsPage = require('../../test/pageobjects/Checkout/cardDetails')

describe('Should choose suncreens, add to card and make payment by entering card detials', () => {
    it('should wait for the products to be displayed and then scan prices', async () => {
        await browser.url('/sunscreen')
        browser.pause(5000)
        await sunscreenPage.scanPrices()
    })
    it('should add moisturizer with Aloe to cart', async () => {
        await sunscreenPage.addSPF50ToCart()
    })
    it('should add moisturizer with Almond to cart', async () => {
        await sunscreenPage.addSPF30ToCart()
    })
    it('should proceed to checkout', async () => {
        await sunscreenPage.proceedToCheckOut()
    })
    it('should verify that the products are correct', async () => {
        await checkoutPage.verifyNames()
    })
    it('should verify the total price and proceed to payment', async () => {
        await checkoutPage.verifyTotal()
        await checkoutPage.proceedToPayment()

    })
    it('should enter card details', async ()=> {
        await browser.switchToFrame(await checkoutPage.iFrame)
        await CardDetailsPage.setEmailAddress(cardData.email)
        await CardDetailsPage.setCardNumber(cardData.cardNnumber)
        await CardDetailsPage.setExpiry(cardData.expiry)
        await CardDetailsPage.setCVC(cardData.cvc)
        await CardDetailsPage.setZip(cardData.zipCode)
    })

    it('should verify that the payment is successful!', async ()=> {
        await CardDetailsPage.makePayment()
        await browser.switchToParentFrame()
        await CardDetailsPage.verifyPayment()

    })
})