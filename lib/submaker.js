const fs = require("fs");
const { parse, stringify } = require('subtitle');
const gtranslate = require('@vitalets/google-translate-api');

const translate = (srtPath, delay = 5000) => {
    return new Promise((resolve, reject) => {
        // read the given srt file
        let enSub = fs.readFileSync(srtPath, "utf8");
        
        // generate Sinhala subtitle
        genSiSub(enSub, delay).then(siSub => {
            resolve(siSub);
        }).catch(error => {
            reject(error);
        });
    });
};

const genSiSub = async (enSub, delay) => {
    // parse subtitle to JSON using subtitle
    const parsedEnSub = parse(enSub);
    // get total number of lines in this subtitle
    const totalLines = parsedEnSub.length;
    // wait time to prevent api abuse (in ms)
    const waitTime = delay;
    // store current line to show in console log
    let currentLine = 1;
    // loop through each line of parsed srt
    for (let line of parsedEnSub) {
        console.log(`Translating ${currentLine} of ${totalLines} Lines....`);
        // increment current line number
        currentLine++;
        // translate current line using google translate
        let siText = await gtranslate(line.text, { to: "si" });
        // replace english text with translated sinhala text
        line.text = siText.text;

        if (currentLine !== totalLines) {
            console.log(`Waiting ${waitTime}ms....`);
            await wait(waitTime);
        }
    }

    return (stringify(parsedEnSub));
};

// pause for some time
const wait = ms => new Promise(res => setTimeout(res, ms));

module.exports = { translate };