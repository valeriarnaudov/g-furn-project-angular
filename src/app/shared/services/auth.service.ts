import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: string[];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async register({
    email,
    pass: { password, rePassword },
    img,
    name,
    years,
  }: any) {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const newUserRef = doc(this.firestore, 'users', createdUser.user.uid);
      await setDoc(newUserRef, { email, img, name, years });
      this.login({ email, password });
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }: any) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      localStorage.setItem('user', JSON.stringify(userCredentials.user));
      this.router.navigate(['/collection']);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('user');
      await signOut(this.auth);
      this.router.navigate(['/']);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserData(uid: string) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const userC = await getDoc(userRef);
      const user = userC.data();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async editUserData(id: string, userData: any) {
    try {
      const docRef = doc(this.firestore, 'users', id);
      return await updateDoc(docRef, {
        name: userData.name,
        img: userData.img,
        years: userData.years,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
