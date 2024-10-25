require('dotenv').config(); 


const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const evenimenteRoutes = require('./routes/evenimente');
const authRoutes = require('./routes/auth');
const rezervariRoutes = require('./routes/rezervari');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(express.json());


app.use('/evenimente', evenimenteRoutes);
app.use('/auth', authRoutes);
app.use('/rezervari', rezervariRoutes);





sequelize.sync().then(() => {
    console.log('Baza de date sincronizată.');
}).catch((error) => {
    console.error('Eroare la sincronizarea bazei de date:', error);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});

