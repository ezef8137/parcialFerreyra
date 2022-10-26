import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  addLibro(libro: any): Promise<any> {
    return this.firestore.collection('numeros').add(libro);
  }

  getLibrosTabla(): Observable<any> {
    return this.firestore.collection('numeros').snapshotChanges();
  }

  deleteLibro(id: string): Promise<any> {
    return this.firestore.collection('numeros').doc(id).delete();
  }

  getLibro(id: string): Observable<any> {
    return this.firestore.collection('numeros').doc(id).snapshotChanges();
  }

  updateLibro(id: string, data:any): Promise<any> {
    return this.firestore.collection('numeros').doc(id).update(data);
  }

}
