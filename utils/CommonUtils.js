var imaps = require("imap-simple");

var CommonUtils = function () {

    this.getConfirmationEmailByCredentials = async function (email, password, subject) {

        console.log("UserEmail: ", email);
        console.log("userPassword: ", password);

        let configEmail = {
            imap: {
                user: email,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000,
                keepAlive: false,
                tlsOptions: {
                    rejectUnauthorized: false
                }
            }
        };

        let connection = await imaps.connect(configEmail);
        let inbox = await connection.openBox('INBOX', false);

        var delay = 24 * 3600 * 1000;
        var yesterday = new Date();
        yesterday.setTime(Date.now() - delay);
        yesterday = yesterday.toISOString();
        var searchCriteria = [['UNSEEN'], ['subject', subject], ['SINCE', yesterday]];

        var fetchOptions = { bodies: ['TEXT'], struct: true };

        try {
            let messages = await connection.search(searchCriteria, fetchOptions);

            console.log("Message Size: " + messages.length)
            var message = messages[0];

            await connection.addFlags(message.attributes.uid, "\Seen");

            var parts = await imaps.getParts(message.attributes.struct);

            // await connection.addFlags(message.attributes.uid, "\Deleted")
        }
        catch (error) {
            console.error(error);

            /**  connection.imap.closeBox(true, (err) => { //Pass in false to avoid delete-flagged messages being removed
                  if (err){
                      console.log(err);
                  }
                  connection.end();
              })**/


            return await "No new message received";
        }

        const getData = async () => {
            return await Promise.all(parts.map(async part => {
                let partData = await connection.getPartData(message, part);
                let emailcontent;
                //Display e-mail body
                if (part.disposition == null && part.encoding != "base64") {
                    //  console.log(partData);
                    if (extractData(partData, "<a href", "style=").indexOf("https") > 0) {
                        emailcontent = await extractData(partData, "<a href=", "style=");
                        console.log("Email content::" + emailcontent);
                        return await emailcontent;
                    }
                }
            }));

        }
        return await getData();
    }


     var extractData = function (data1, startStr, endStr) {
        var data = data1.toString();
        console.log("Extracting URL")
        let subStrStart = data.indexOf(startStr) + 1 + startStr.length
        let url = data.substring(subStrStart,
            subStrStart + data.substring(subStrStart).indexOf(endStr) - 2);
        return url;
    }

    this.openPageInNewTab =async (url) => {
        await browser.executeScript('window.open()');
        var handles = await browser.getAllWindowHandles();
        const newWindowHandle = await handles[1];
        await browser.switchTo().window(newWindowHandle);
        await browser.get(url);
      }
}
module.exports = new CommonUtils();

