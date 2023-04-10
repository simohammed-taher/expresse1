const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const users =
    [{
        username: "test1",
        name: "simoo",
    },
    {
        username: "test2",
        name: "hamed",
    }, {
        username: "test3",
        name: "samhammed",
    }]

app.get('/', (req, res) => {
    res.send('<h1>Welcome express!</h1>');
});
// app.get('/admin', (req, res) => {
//     // res.send('Welcome admin!');
//     res.status(403).json({ OK: false });
// });
// app.get('/admin/dashboard', (req, res) => {
//     // res.send('<h1>Welcome to dashboard!</h1>');
//     res.status(200).json({ OK: true });
// });
app.get('/users', (req, res) => {
    // res.send('<h1>Welcome to user!</h1>');
    // console.log('Welcome to user')
    res.status(200)
    res.json({ users: users });
});
app.post('/users', (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
    };
    users.push(user);
    // console.log(user);
    res.status(200);
    res.json({ ok: 1 });
});
app.get('/users/:username', (req, res) => {
    // console.log(req.params)
    // res.send(`<h1>${req.params.username}</h1>`);
    const username = req.params.username;
    const user = users.find((obj) => (obj.username === username));
    console.log(user);
    if (user === undefined) {
        res.status(404).json({ message: "user not found" });
    } else {
        res.status(200).json({ user: user });
    }
})
app.delete('/users/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find((obj) => (obj.username === username));
    // username = username.filter((username) -> username.id!==id);
    if (user === undefined) {
        res.status(404).json({ message: "user not found" });
    } else {
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.status(200).json({ message: "user deleted successful" });
    }
});

app.patch('/users/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(obj => obj.username === username);
    if (user === undefined) {
        res.status(404).json({ message: "user not found" });
    } else {
        user.username = req.body.username ? req.body.username : username;
        user.name = req.body.name ? req.body.name : username;
        res.status(200).json({ message: "user update successful" });
    }
})
app.listen(3000, () => { console.log('listening on port 3000') })