const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authenticateUser = require('../middleware/authenticate');


router.get('/', async (req, res) => {
  try {
      const utilizatori = await User.findAll();
      res.json(utilizatori);
  } catch (error) {
      res.status(500).json({ message: 'Eroare la recuperarea evenimentelor', error });
  }
});



// Înregistrare utilizator
router.post('/register', async (req, res) => {
  const { email, parola } = req.body;

  try {
      const existent = await User.findOne({ where: { email } });
      if (existent) {
          return res.status(400).json({ message: 'Utilizatorul există deja.' });
      }

   
      const user = await User.create({ email, parola }); 
      res.status(201).json({ message: 'Utilizator creat cu succes!' });
  } catch (error) {
      res.status(500).json({ error: 'Eroare la crearea utilizatorului' });
  }
});


// Autentificare utilizator
router.post('/login',  async (req, res) => {
  const { email, parola } = req.body;

  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(400).json({ message: 'Email sau parolă incorectă.' });
      }

      if (user.parola !== parola) { // Fără bcrypt
          return res.status(400).json({ message: 'Email sau parolă incorectă.' });
      }
      const token = jwt.sign({ userId: user.user_id, rol: user.rol, email:user.email}, process.env.JWT_SECRET, { expiresIn: '5h' });
      res.json({ token, userId: user.user_id, email:user.email ,message: 'Autentificare reușită!' });
  } catch (error) {
      res.status(500).json({ error: 'Eroare la autentificare.' });
  }
});



router.put('/change-password', authenticateUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; 

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please check your credentials or sign up if you don\'t have an account.' });
    }

    const passwordMatch = (oldPassword === user.parola); 
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    
    user.parola = newPassword; 
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


  router.delete('/delete-account', authenticateUser, async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });





module.exports = router;
