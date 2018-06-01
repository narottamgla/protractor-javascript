
/**
 * Utility class for commonly called Protractor.browser methods.
 */
var BrowserUtil =function(){
    /**
     * Returns true, if element displayed
     * Max timeout for wait: 1200000 second`.
     *
     * @memberof BrowserUtil
     */
     this.waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        }, 1200000);
        browser.wait(function () {
            return elm.isDisplayed();
        }, 1200000);
    };
    this.waitUntilNotInDom = function (locator) {
        var EC = protractor.ExpectedConditions;
        browser.wait(function () {
            return EC.stalenessOf(locator);
        }, 600000);
        browser.wait(function () {
            return EC.invisibilityOf(locator);
        }, 600000);
    };
}
module.exports = new BrowserUtil();
 