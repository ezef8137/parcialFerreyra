import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  personal: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Ingreso Personal';

  constructor(private fb: FormBuilder,
    private _personalService: FirestoreService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.personal = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      nombreyapellido: ['', Validators.required],
      temperatura: ['', Validators.required],
      tos: ['', Validators.required],
      insuficiencia: ['', Validators.required],
      dolorgarganta: ['', Validators.required],
      perdidaolfato: ['', Validators.required],
      perdidagusto: ['', Validators.required],
      otros: ['', Validators.required],
      contactoaislamiento: ['', Validators.required],
      contactoviaje: ['', Validators.required],
      lugar: ['', Validators.required],
      observaciones: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarPersonalVentana();
  }

  agregarEditarPersonal() {
    this.submitted = true;

    if (this.id === null) {
      this.agregarPersonal();
    } else {
      this.editarPersonalFirestore(this.id);
    }

  }

  agregarPersonal() {
    const mensajeError = "Debe ingresar - o si en el campo: "
    if(this.personal.value.temperatura == "si" || this.personal.value.temperatura == "-"){
      if(this.personal.value.tos == "si" || this.personal.value.tos == "-"){
        if(this.personal.value.insuficiencia == "si" || this.personal.value.insuficiencia == "-"){
          if(this.personal.value.dolorgarganta == "si" || this.personal.value.dolorgarganta == "-"){
            if(this.personal.value.perdidaolfato == "si" || this.personal.value.perdidaolfato == "-"){
              if(this.personal.value.perdidagusto == "si" || this.personal.value.perdidagusto == "-"){
                if(this.personal.value.otros == "si" || this.personal.value.otros == "-"){
                  const personal: any = {
                    fecha: this.personal.value.fecha,
                    hora: this.personal.value.hora,
                    nombreyapellido: this.personal.value.nombreyapellido,
                    temperatura: this.personal.value.temperatura,
                    tos: this.personal.value.tos,
                    insuficiencia: this.personal.value.insuficiencia,
                    dolorgarganta: this.personal.value.dolorgarganta,
                    perdidaolfato: this.personal.value.perdidaolfato,
                    perdidagusto: this.personal.value.perdidagusto,
                    otros: this.personal.value.otros,
                    contactoaislamiento: this.personal.value.contactoaislamiento,
                    contactoviaje: this.personal.value.contactoviaje,
                    lugar: this.personal.value.lugar,
                    observaciones: this.personal.value.observaciones,
                  }
                  this.loading = true;
                  this._personalService.agregarPersonal(personal).then(() => {
                    this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
                      positionClass: 'toast-bottom-right'
                    });
                    this.loading = false;
                    this.router.navigate(['/list-objets']);
                  }).catch(error => {
                    this.loading = false;
                  })
                } else {
                  this.toastr.error(`Debe ingresar - o si en el campo: Otros`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
                }
              } else {
                this.toastr.error(`Debe ingresar - o si en el campo: Perdida de Gusto`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
              }
            } else {
              this.toastr.error(`Debe ingresar - o si en el campo: Perdida de Olfato`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
            }
          } else {
            this.toastr.error(`Debe ingresar - o si en el campo: Dolor de Garganta`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
          }
        } else {
          this.toastr.error(`Debe ingresar - o si en el campo: Insuficiencia Respiratoria`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
        }
      } else {
        this.toastr.error(`Debe ingresar - o si en el campo: Tos`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
      }
    } else {
      this.toastr.error(`Debe ingresar - o si en el campo: Temperatura`, 'Dato Invalido', {positionClass: 'toast-bottom-right'})
    }


  }

  editarPersonalFirestore(id: string) {
    const personal: any = {
      fecha: this.personal.value.fecha,
      hora: this.personal.value.hora,
      nombreyapellido: this.personal.value.nombreyapellido,
      temperatura: this.personal.value.temperatura,
      tos: this.personal.value.tos,
      insuficiencia: this.personal.value.insuficiencia,
      dolorgarganta: this.personal.value.dolorgarganta,
      perdidaolfato: this.personal.value.perdidaolfato,
      perdidagusto: this.personal.value.perdidagusto,
      otros: this.personal.value.otros,
      contactoaislamiento: this.personal.value.contactoaislamiento,
      contactoviaje: this.personal.value.contactoviaje,
      lugar: this.personal.value.lugar,
      observaciones: this.personal.value.observaciones,
    }

    this.loading = true;
    this._personalService.updatePersonal(id, personal).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-libros']);
    })
  }

  editarPersonalVentana() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado'
      this.loading = true;
      this._personalService.getPersonal(this.id).subscribe(data => {
        this.loading = false;
        this.personal.setValue({
          fecha: data.payload.data()['fecha'],
          hora: data.payload.data()['hora'],
          nombreyapellido: data.payload.data()['nombreyapellido'],
          temperatura: data.payload.data()['temperatura'],
          tos: data.payload.data()['tos'],
          insuficiencia: data.payload.data()['insuficiencia'],
          dolorgarganta: data.payload.data()['dolorgarganta'],
          perdidaolfato: data.payload.data()['perdidaolfato'],
          perdidagusto: data.payload.data()['perdidagusto'],
          otros: data.payload.data()['otros'],
          contactoaislamiento: data.payload.data()['contactoaislamiento'],
          contactoviaje: data.payload.data()['contactoviaje'],
          lugar: data.payload.data()['lugar'],
          observaciones: data.payload.data()['observaciones'],
        })})}}
}