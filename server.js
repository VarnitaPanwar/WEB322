/********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Varnita Panwar Student ID: 166484212 Date: 09/10/2023
*
* Published URL: https://kind-teal-nightingale-cap.cyclic.app/
*
********************************************************************************/
const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = 3000;
const legoData = require("./modules/legoSets");
app.use(express.static('public'));
legoData
    .initialize()
    .then(async () => {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "/views/home.html"))
        });
        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, "/views/about.html"))
        });
        app.get("/lego/sets", async (req, res) => {
            const theme = req.query.theme;
            if (!theme) {
                legoData.getAllSets()
                    .then((sets) => {
                        res.json(sets);
                    })
                    .catch((error) => {
                        res.status(404).json({ error: "Error retrieving Lego sets." });
                    });
            } else {
                legoData.getSetsByTheme(theme)
                    .then((sets) => {
                        res.json(sets);
                    })
                    .catch((error) => {
                        res.status(404).json({ error: "Error retrieving Lego sets for the specified theme." });
                    });
            }
        });
        app.get("/lego/sets/:setNum", (req, res) => {
            const setNum = req.params.setNum; 
            legoData
                .getSetByNum(setNum)
                .then((set) => {
                    res.json(set);
                })
                .catch((error) => {
                    res.status(404).json({ error: error });
                });
        });
        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
        });
        app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
    })
    .catch((error) => {
        console.error("Error initializing legoData:", error);
    });
