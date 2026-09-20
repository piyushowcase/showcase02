import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from './models/user.model.js';

const main = async () => {
  await mongoose.connect(process.env.MONGOOSE_URI);
  let user = await User.findOne({ email: 'test@site.com' });
  if (!user) {
    user = await User.create({
      name: 'Test User',
      email: 'test@site.com',
      avatar: 'https://example.com/avatar.png',
      credits: 100,
    });
  }

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const res = await fetch('http://localhost:5000/api/website/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'token=' + token,
    },
    body: JSON.stringify({ prompt: 'A premium coffee brand landing page' }),
  });

  const text = await res.text();
  console.log('status:', res.status);
  console.log(text);
  await mongoose.disconnect();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
