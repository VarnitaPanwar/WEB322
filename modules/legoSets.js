const setData = require('../data/setData.json');
const themeData = require("../data/themeData.json");
let sets = [];

function initialize() {
    return new Promise((resolve) => {
        sets = setData.map((set) => {
            const matchingTheme = themeData.find((theme) => theme.id === set.theme_id);
            return {
                ...set,
                theme: matchingTheme ? matchingTheme.name : "Unknown",
            };
        });
        resolve();
    });
}
function getAllSets() {
    return new Promise((resolve) => {
        resolve(sets);
    });
}
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const foundSet = sets.find((set) => set.set_num === setNum);
        if (foundSet) {
            resolve(foundSet);
        } else {
            reject("Unable to find requested set");
        }
    });
}
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const matchingSets = sets.filter(
            (set) =>
                set.theme.toLowerCase().includes(theme.toLowerCase()) ||
                theme.toLowerCase().includes(set.theme.toLowerCase())
        );
        if (matchingSets.length > 0) {
            resolve(matchingSets);
        } else {
            reject("Unable to find requested sets");
        }
    });
}
module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme,
};