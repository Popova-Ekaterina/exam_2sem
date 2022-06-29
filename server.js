const express = require('express');
const app = express();
const db = require("./db.js");

app.use(express.static(`public`));

app.use(express.json());

app.get("/get-data", async (req, res) => {
    try {

        const {data, error} = await db
            .from('Datas')
            .select();

        if (!error) {
            res.statusCode = 200;

            let json = {
                status: 'ок',
                messages: data
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

app.post("/form", async (req, res) => {
    let message = req.body["message"];

    if (message == null || message.length == 0){
        res.statusCode = 400;

            let json = {
                status: 'ошибка',
                message: 'неправильные данные'
            }

            res.send(json);
    }

    try {
        let body = {
            message
        }

        const {data, error} = await db
            .from('Datas')
            .insert(body)

        if (!error) {
            res.statusCode = 200;

            let json = {
                status: 'ок',
                messages: data
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

app.delete("/delete/:id", async (req, res) =>  {
    let id = req.params["id"];

    // id некорректный
    if (!Number(id)){
        res.statusCode = 400;

        let json = {
            status: 'ошибка',
            message: 'неправильный id'
        }
        
        res.send(json);

        return;
    }

    try {
        const {data, error} = await db
            .from('Datas')
            .delete()
            .match({id});

        if (!error) {
            res.statusCode = 200;

            let json = {
                status: 'ок',
                data
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