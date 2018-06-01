var pluginPg = require('./../pages/pluginPage.po');
//var dataProvider= require ("./../data/dataProvider");
var  BrowserUtil = require("./../utils/browser.util");

describe('OasisDex-MetaMask Block & Unblock', () => {
    
   // var pluginPg = new pluginPage();
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    it('should able to access link using metamask extension', (done) => {
        
        browser.getAllWindowHandles().then(function (handles) {
            console.log("Verifying OasisdexBlocked page");
            browser.driver.switchTo().window(handles[1]);
            browser.driver.close();
            browser.driver.switchTo().window(handles[0]);
            pluginPg.navigateTo('/');
        
            BrowserUtil.waitUntilReady(pluginPg.getNoEthereumSection());
            pluginPg.getNoEthereumSection().isDisplayed().then(function(noEenthert) {
				expect(noEenthert).toBe(true, "Oasisdex Home page is not displaying with block");
                console.log('Opening metamask extension.');
                browser.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html').then(function() {
                    BrowserUtil.waitUntilReady(pluginPg.acceptButton());
                    console.log('Accepting metamask terms and conditions.');
                    pluginPg.acceptButton().click().then(function() {
                        browser.executeScript("arguments[0].scrollIntoView();", pluginPg.termsOfUse().getWebElement()).then(function() {
                            pluginPg.acceptButton().click().then(function() {
                                console.log('Adding password to metamask extension.');
                                pluginPg.password().sendKeys("UpworkTest@123");
                                pluginPg.confirmPassword().sendKeys("UpworkTest@123");
                                pluginPg.metamaskCreateButton().click().then(function() {
                                    console.log('Verifying OasisdexUnBlocked page');
                                    pluginPg.navigateTo('');
                                    BrowserUtil.waitUntilReady(pluginPg.successText());
                                    pluginPg.successText().isDisplayed().then(function(dis) {
										expect(dis).toBe(true, "Oasisdex Home page is not displaying with unblock");
                                        console.log('success text displayed.');
                                        done();
                                    });
                                });
                            });                
                        });
                    });
                });
            });
        });
    });
});