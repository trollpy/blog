const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Category = require('./models/Category');

dotenv.config({ path: './.env' });

const categories = [
  { name: 'Technology', description: 'Posts related to technology and coding.' },
  { name: 'Lifestyle', description: 'Posts about lifestyle and daily life.' },
  { name: 'Health', description: 'Health, wellness, and fitness topics.' },
  { name: 'Travel', description: 'Travel experiences and tips.' },
  { name: 'Education', description: 'Educational resources and tutorials.' },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log('Categories seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
