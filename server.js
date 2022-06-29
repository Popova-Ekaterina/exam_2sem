const express = require('express');
const app = express();
const db = require("./db.js");

app.use(express.static(`public`));

app.get("/get-data", (req, res) => {
    res.statusCode = 200;

    let json = {
        status: "ok",
        data: [
            "data1",
            "data2",
            "data3",
            "data4",
            "data5"
        ]
    }

    res.send(json);
})

app.post("/form", async (req, res) => {
    let data = req.body["data"];

    if (data == null || data.length == 0){
        res.statusCode = 400;

            let json = {
                status: 'ошибка',
                message: 'неправильные данные'
            }

            res.send(json);
    }

    try {
        let {answer, error} = await supabase
            .from('datas')
            .insert(model)

        if (error) {
            res.statusCode = 200;

            let json = {
                status: 'ок',
                data: answer
            }

            res.send(json);
        }
        else {
            res.statusCode = 400;

            let json = {
                status: 'ошибка',
                message: error
            }

            res.send(json);
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
})

app.listen(5501, () => { console.log("Сервер запущен по адресу http://localhost:5501");
console.log ("Номер порта 5501")});