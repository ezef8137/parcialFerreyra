import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  agregarPersonal(libro: any): Promise<any> {
    return this.firestore.collection('personal').add(libro);
  }

  getPersonalTabla(): Observable<any> {
    return this.firestore.collection('personal').snapshotChanges();
  }

  deletePerso(id: string): Promise<any> {
    return this.firestore.collection('personal').doc(id).delete();
  }

  getPersonal(id: string): Observable<any> {
    return this.firestore.collection('personal').doc(id).snapshotChanges();
  }

  updatePersonal(id: string, data:any): Promise<any> {
    return this.firestore.collection('personal').doc(id).update(data);
  }

}
