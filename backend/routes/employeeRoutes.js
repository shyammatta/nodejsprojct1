const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1616161616161.jpg
  }
});

// File Filter for Image Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only (jpeg, jpg, png)!');
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Create Employee
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: typeof courses === 'string' ? [courses] : courses,
      image: req.file ? req.file.filename : null,
    });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee', details: error.message });
  }
});

// Get All Employees
router.get('/list', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees', details: error.message });
  }
});

// Update Employee
// Update Employee
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    
    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses: typeof courses === 'string' ? [courses] : courses,
    };

    // Check if there's a new image file
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Update employee by ID
    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Check if employee was found and updated
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Return the updated employee
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee', details: error.message });
  }
});



// Delete Employee
router.delete('/delete/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    // Check if employee was found and deleted
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee', details: error.message });
  }
});

module.exports = router;
