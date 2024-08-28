const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/loginDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});



app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.error('Error occurred while saving user data:', err);
        res.status(500).send('Error occurred while saving user data.');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const foundUser = await User.findOne({ username: username });

        if (!foundUser) {
            return res.status(400).send('User not registered.');
        }

        
        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            res.send('Login successful!');
        } else {
            res.status(400).send('Invalid username or password.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred during login.');
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
