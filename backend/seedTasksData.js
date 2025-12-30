// server/seedStudentsData.js
const mongoose = require('mongoose');

const MONGO_URL =
  process.env.MONGO_URI || 'mongodb://localhost:27017/studentdb';

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

async function seedStudents() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log('✅ Connected to MongoDB');

    // Clear existing students
    await Student.deleteMany({});

    // Insert mock student data
    await Student.insertMany([
      {
        name: 'Arun Kumar*',
        age: 23,
        grade: 'A',
      },
      {
        name: 'Priya Sharma*',     
        age: 22,
       grade: 'B',
      },
      {
        name: 'Rahul Verma*',
        age: 21,
        grade: 'K',
      },
      {
        name: 'Sneha Iyer',
        age: 21,
       grade: 'A+',
      },
    ]);

    console.log(' Student data seeded successfully');
  } catch (err) {
    console.error(' Seeding failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedStudents();
