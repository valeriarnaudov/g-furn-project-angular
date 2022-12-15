import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  doc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import IPost from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private firestore: Firestore) {}

  addPost(post: IPost) {
    const postRef = collection(this.firestore, 'posts');
    return addDoc(postRef, post);
  }

  getPosts(): Observable<IPost[]> {
    const postRef = collection(this.firestore, 'posts');
    return collectionData(postRef, { idField: 'id' }) as Observable<IPost[]>;
  }

  deletePost(id: string) {
    const postRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postRef);
  }

  getSinglePost(id: string) {
    const postRef = doc(this.firestore, `posts/${id}`);
    return getDoc(postRef);
  }
}
