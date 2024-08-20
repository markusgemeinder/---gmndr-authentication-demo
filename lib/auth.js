// /lib/auth.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import PasswordResetToken from '@/db/models/PasswordResetToken';
import bcrypt from 'bcryptjs';

export async function resetUserPassword(token, newPassword) {
  // Datenbankverbindung herstellen
  await dbConnect();

  try {
    console.log('Resetting Password');
    console.log('Token:', token);

    // Token in der Datenbank suchen
    const passwordResetToken = await PasswordResetToken.findOne({ token }).exec();
    if (!passwordResetToken) {
      console.log('Token not found or expired');
      return false;
    }

    // Benutzer anhand der userId des Tokens suchen
    const user = await User.findById(passwordResetToken.userId).exec();
    if (!user) {
      console.log('User not found');
      return false;
    }

    // Neues Passwort hashen und aktualisieren
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Token nach erfolgreichem Passwort-Reset löschen
    await PasswordResetToken.deleteOne({ token });

    console.log('Password reset successfully');
    return true;
  } catch (error) {
    console.error('Error resetting user password:', error);
    return false;
  }
}
