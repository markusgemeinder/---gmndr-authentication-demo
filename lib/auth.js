// /lib/auth.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import PasswordResetToken from '@/db/models/PasswordResetToken';
import bcrypt from 'bcryptjs';

export async function resetUserPassword(token, newPassword) {
  await dbConnect();

  try {
    // Suchen Sie das Passwort-Reset-Token in der Datenbank
    const passwordResetToken = await PasswordResetToken.findOne({ token }).exec();
    if (!passwordResetToken) {
      // Token ist ungültig oder abgelaufen
      return false;
    }

    // Suchen Sie den Benutzer anhand der userId, die im Passwort-Reset-Token gespeichert ist
    const user = await User.findById(passwordResetToken.userId).exec();
    if (!user) {
      // Benutzer wurde nicht gefunden
      return false;
    }

    // Das neue Passwort hashen
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Setzen Sie das Passwort des Benutzers zurück
    user.password = hashedPassword;
    await user.save();

    // Löschen Sie das Passwort-Reset-Token, um sicherzustellen, dass es nur einmal verwendet werden kann
    await PasswordResetToken.deleteOne({ token });

    return true;
  } catch (error) {
    console.error('Error resetting user password:', error);
    return false;
  }
}
