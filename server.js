const express = require('express');
const app = express();
const router = express.Router();
const sendMail = require('./mail');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.use(express.urlencoded({
    extend: false
}));

app.use(express.json());

app.listen(8080);

app.post('/', (req, res) => {
    //Send an email here but currently dummy email
    const { name, subject, email, text } = req.body;
    console.log('Data:', req.body);
    // res.json({message: 'Message received!'})
    sendMail(name, email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status({ message: 'Email sent!!!' });
        }
    });
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'pages', 'index.ejs'));
    //__dirname : It will resolve to your project folder.
});

console.log('Server is listening on port 8080');
