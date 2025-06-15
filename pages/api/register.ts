
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, lastName, middleName, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Обов’язкові поля: ім’я, email, пароль" });
  }

  await connectToDatabase();

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Користувач з таким email вже існує" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    lastName,
    middleName,
    email,
    password: hashedPassword,
    subscriptionLevel: "гість",
  });

  res.status(201).json({ message: "Користувача створено", userId: newUser._id });
}
