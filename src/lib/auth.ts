import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth, db } from './firebase';
import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Menyimpan user ke Firestore setelah registrasi atau login
 */
const saveUserToFirestore = async (user: User) => {
  if (!user) return;
  
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    displayName: user.displayName || "",
    email: user.email,
    emailVerified: user.emailVerified,
    lastLoginTime: new Date().toISOString(),
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    }
  }, { merge: true });
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan user ke Firestore setelah registrasi
    await saveUserToFirestore(user);
    
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred');
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Perbarui lastLoginTime user di Firestore setelah login
    await saveUserToFirestore(user);
    
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred');
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred');
    }
    throw error;
  }
};
