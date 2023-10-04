/********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Varnita Panwar Student ID: 166484212 Date: 
*
********************************************************************************/
const express = require("express");
const app = express();
const port = 3000;
const legoData = require("./modules/legoSets");
app.use(express.static('public'));
legoData
    .initialize()
    .then(async () => {
        app.get("/", (req, res) => {
            res.send("Assignment 2: Varnita Panwar - 166484212");
        });
        app.get("/lego/sets", async (req, res) => {
            const allSets = await legoData.getAllSets();
            res.json(allSets);
        });
        app.get("/lego/sets/num-demo", (req, res) => {
            const setNum = "001-1";
            legoData
                .getSetByNum(setNum)
                .then((set) => {
                    res.json(set);
                })
                .catch((error) => {
                    res.status(404).send("Error: " + error);
                });
        });
        app.get("/lego/sets/theme-demo", (req, res) => {
            const theme = "tech";
            legoData
                .getSetsByTheme(theme)
                .then((sets) => {
                    res.json(sets);
                })
                .catch((error) => {
                    res.status(404).send("Error: " + error);
                });
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error initializing legoData:", error);
    });
