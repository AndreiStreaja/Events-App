const express = require('express');
const Reservation = require('../models/Rezervare');
const router = express.Router();

// Endpoint pentru a face o rezervare
router.post('/all_reservations', async (req, res) => {
    const { Data_rezervarii, Ora_rezervarii, Eveniment_rezervat, email} = req.body;

    try {
      const reservation = await Reservation.create({ 
        Data_rezervarii, 
        Ora_rezervarii, 
        Eveniment_rezervat, 
        Utilizator:email
    }); 
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: 'Eroare la crearea utilizatorului' });
    }
  });



router.get('/utilizator/:email', async (req, res) => {
    const email = req.params.email; 

    try {
        const rezervari = await Reservation.findAll({
            where: {
                Utilizator: email 
            }
        });
        
        if (rezervari.length === 0) {
            return res.status(404).json({ message: 'Nu au fost găsite rezervări pentru acest utilizator.' });
        }
        
        res.json(rezervari);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la recuperarea rezervărilor.', error });
    }
});



module.exports = router;
