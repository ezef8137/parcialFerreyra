import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createLibro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Crear Libro';

  constructor(private fb: FormBuilder,
    private _libroService: LibroService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createLibro = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      edicion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarLibroVentana();
  }

  agregarEditarLibro() {
    this.submitted = true;

    if (this.createLibro.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarLibro();
    } else {
      this.editarLibroFirestore(this.id);
    }

  }

  agregarLibro() {
    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._libroService.addLibro(libro).then(() => {
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/listObjets']);
    }).catch(error => {
      this.loading = false;
    })
  }

  editarLibroFirestore(id: string) {
    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._libroService.updateLibro(id, libro).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/listObjets']);
    })
  }

  editarLibroVentana() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado'
      this.loading = true;
      this._libroService.getLibro(this.id).subscribe(data => {
        this.loading = false;
        this.createLibro.setValue({
          nombre: data.payload.data()['nombre'],
          autor: data.payload.data()['autor'],
          edicion: data.payload.data()['edicion']
        })})}}
}

