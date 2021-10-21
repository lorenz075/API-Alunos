const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123456',
    database: 'info_aluno',
})

app.post('/create', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const ra = req.body.ra;

    db.query(
    "INSERT INTO alunos (nome, email, ra) VALUES (?, ?, ?)", 
    [nome, email, ra],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Valores inseridos")
        }
    })
})

app.get('/alunos', (req, res) => {
    db.query(
        "SELECT * FROM alunos",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.put('/update', (req, res) => {
    const ra = req.body.ra
    const nome =req.body.nome
    const email = req.body.email
    const id = req.body.id
    db.query("UPDATE alunos SET nome = ?, email = ?, ra = ? WHERE id = ?",
    [nome, email, ra, id],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//app.delete()
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM alunos WHERE id = ?",
    id,
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("Server rodando na porta 3001")
})