/**
 * Class representing generic page.
 * Methods/properties for pluginPage page elements should go here.
 *
 */
var pluginPage = function(){

    this.getNoEthereumSection = function() {
        return element(by.css('.no-ethereum-section'));
    }

    this.acceptButton= function() {
        return element(by.xpath(".//button[text()='Accept']"));
    }

    this.termsOfUse= function() {
        return element(by.linkText("Terms of Use"));
    }

    this.password = function(){
        return element(by.id("password-box"));
    }

    this.confirmPassword= function() {
        return element(by.id("password-box-confirm"));
    }

    this.metamaskCreateButton= function() {
        return element(by.xpath(".//button[text()='Create']"));
    }

    this.copySafeButton = function(){
        return element(by.xpath("//button[contains(text(),'copied it somewhere safe')]"));
    }

    this.accountName= function() {
        return element(by.name("edit"));
    }

    this.successText= function() {
        return element(by.css(".text-success"));
    }

    this.navigateTo= function(relativeUrl) {
        browser.get(browser.params.baseUrl + relativeUrl);
    }
}
module.exports = new pluginPage();
