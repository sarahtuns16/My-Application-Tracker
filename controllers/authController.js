import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ 
        message: 'Account created successfully', 
        token,
        user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ 
        message: 'Login successful', 
        token,
        user: { id: user._id, fullName: user.fullName, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // The Google ID token sent from the frontend

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });
    
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = await User.create({
        fullName: name,
        email,
        googleId,
      });
    }

    const appToken = generateToken(user._id);

    res.status(200).json({
      message: 'Google login successful',
      token: appToken,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });

  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token', error: error.message });
  }
};