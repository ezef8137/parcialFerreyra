import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  numeros: any[] = [];

  constructor(
    private _libroService: FirestoreService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLibrosTablaMostrar()
  }

  getLibrosTablaMostrar() {
    this._libroService.getLibrosTabla().subscribe(data => {
      this.numeros = [];
      data.forEach((element: any) => {
        this.numeros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteLibroTabla(id: string) {
    this._libroService.deleteLibro(id).then(() => {
      this.toastr.error('El número fue eliminado con exito', 'Número eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(() => {})
  }

}

