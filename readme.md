# Sinhala Subtitle Maker
_Simple Library to translate English Srt Subtitles to Sinhala_


### Usage
Download node from nodejs.org and install it, if you haven't already.

Then install sinhala-sub-maker using npm or yarn.
```javascript
npm install @ipmanlk/sinhala-sub-maker --save
```

You can translate any English srt file by providing its path. 
```javascript
const { translate } = require("@ipmanlk/sinhala-sub-maker")

translate("English.srt").then(siSub => {
    //you can directly write siSub to a .srt file using fs
    console.log(siSub); 
});
```
