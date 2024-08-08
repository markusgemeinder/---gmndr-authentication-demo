// /utils/db.js

import dbConnect from '@/db/connect'; // Verwenden Sie die korrekte Import-Pfad für Ihre dbConnect-Funktion
import User from '@/db/models/User';
import PasswordResetToken from '@/db/models/PasswordResetToken';

export async function getUserByEmail(email) {
  await dbConnect(); // Stellen Sie sicher, dass die Datenbankverbindung hergestellt wird
  return User.findOne({ email }).exec();
}

export async function savePasswordResetToken(userId, token) {
  await dbConnect(); // Stellen Sie sicher, dass die Datenbankverbindung hergestellt wird
  return PasswordResetToken.create({ userId, token });
}
