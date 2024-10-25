
const express = require('express');
const Eveniment = require('../models/Eveniment');
const router = express.Router();

// Listare evenimente
router.get('/', async (req, res) => {
    try {
        const evenimente = await Eveniment.findAll();
        res.json(evenimente);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la recuperarea evenimentelor', error });
    }
});

// Creare eveniment
router.post('/', async (req, res) => {
    const { nume_eveniment, data_eveniment, locatie } = req.body; 

    try {
        const nouEveniment = await Eveniment.create({
            nume_eveniment,
            data_eveniment,
            locatie
        });
        res.status(201).json(nouEveniment);
    } catch (error) {
        res.status(400).json({ message: 'Eroare la crearea evenimentului', error });
    }
});

module.exports = router;
