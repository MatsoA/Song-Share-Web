import raw from './.env.local';

const regexYt  = /^"ytKey": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb1 = /^"apiKey": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb2 = /^"authDomain": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb3 = /^"projectId": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb4 = /^"storageBucket": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb5 = /^"messagingSenderId": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb6 = /^"appId": ?"((?:[^"]|(?:\\"))+)",?$/gm
const regexFb7 = /^"measurementId": ?"((?:[^"]|(?:\\"))+)",?$/gm

var keyObj = null;
var promise = fetch(raw).then(r => r.text()).then(contents => {
    var yt = regexYt.exec(contents)[1].replace("\\\"", "\""); //group 1 is the key
    var fbApi = regexFb1.exec(contents)[1].replace("\\\"", "\""); //the replace replaces \" with "
    var fbAuth = regexFb2.exec(contents)[1].replace("\\\"", "\"");
    var fbProject = regexFb3.exec(contents)[1].replace("\\\"", "\"");
    var fbStorage = regexFb4.exec(contents)[1].replace("\\\"", "\"");
    var fbMessaging = regexFb5.exec(contents)[1].replace("\\\"", "\"");
    var fbAppId = regexFb6.exec(contents)[1].replace("\\\"", "\"");
    var fbMeasurement = regexFb7.exec(contents)[1].replace("\\\"", "\"");
    keyObj = {
        "ytApiKey": yt,
        "firebaseConfig": {
            "apiKey": fbApi,
            "authDomain": fbAuth,
            "projectId": fbProject,
            "storageBucket": fbStorage,
            "messagingSenderId": fbMessaging,
            "appId": fbAppId,
            "measurement": fbMeasurement
        }
    };
    return keyObj;
})

export default function getKeys(){
    return promise;
}