import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore: AngularFirestore) { }

  addLibro(libro: any): Promise<any> {
    return this.firestore.collection('libros').add(libro);
  }

  getLibrosTabla(): Observable<any> {
    return this.firestore.collection('libros', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  deleteLibro(id: string): Promise<any> {
    return this.firestore.collection('libros').doc(id).delete();
  }

  getLibro(id: string): Observable<any> {
    return this.firestore.collection('libros').doc(id).snapshotChanges();
  }

  updateLibro(id: string, data:any): Promise<any> {
    return this.firestore.collection('libros').doc(id).update(data);
  }

}
