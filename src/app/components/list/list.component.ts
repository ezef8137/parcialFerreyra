import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  libros: any[] = [];

  constructor(
    private _libroService: LibroService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLibrosTablaMostrar()
  }

  getLibrosTablaMostrar() {
    this._libroService.getLibrosTabla().subscribe(data => {
      this.libros = [];
      data.forEach((element: any) => {
        this.libros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteLibroTabla(id: string) {
    this._libroService.deleteLibro(id).then(() => {
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(() => {})
  }

}

