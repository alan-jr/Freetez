import mongoose from 'mongoose';
import User from '../src/models/User'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';

const createUser = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://joyelimmanuel27csa:9Cxi3v1E1F4bFkfr@cluster0.hj4jk.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Sample user data
    const sampleUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "SecurePassword123!",
      role: "HIRING",
      about: "Experienced freelancer with a background in web development.",
      ratings: 4.5,
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    sampleUser.password = await bcrypt.hash(sampleUser.password, salt);

    // Create the user
    const user = new User(sampleUser);
    await user.save();

    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
};

createUser();