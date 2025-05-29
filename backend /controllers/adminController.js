const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin bulunamadı.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Hatalı şifre.' });
    }

    res.json({ message: 'Giriş başarılı' }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin oluşturuldu.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
