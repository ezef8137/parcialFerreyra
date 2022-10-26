import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { numeroPrimo } from 'src/app/models/numeroPrimo';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  numeroIngresado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Ingresar Número';
  primo: boolean | undefined;
  motivo: string | undefined

  constructor(private fb: FormBuilder,
    private _numeroService: FirestoreService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.numeroIngresado = this.fb.group({
      numero: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarObjVentana();
  }

  agregarObjeto() {
    this.verificarNumeroPrimo(this.numeroIngresado.value.numero);
  }

  verificarNumeroPrimo(numero: number) {
    let cantDivisor=0
    let numerosDivisores=[]
    let divisor = 0
    let resto = 0
    for(let i=0; i<numero; i++){
        divisor =numero - i
        resto = (numero % divisor)
        if (resto===0){
            cantDivisor=cantDivisor+1
            numerosDivisores.push(divisor)
        }
    }
    if (cantDivisor<=2){
        this.primo = true;
        this.motivo = 'es divisible por 1 y por si mismo'
    }
    else{
        this.primo = false;
        this.motivo = `porque es divisible por: ${numerosDivisores} `
    }
    const numeroo: numeroPrimo = {
      numero: this.numeroIngresado.value.numero,
      primo: this.primo,
      motivo:  this.motivo,
    }

    if (this.id === null) {
      this._numeroService.addLibro(numeroo).then(()=> {
        this.toastr.success('se agrego el numero', 'numero agregado');
        this.router.navigate(["/list-objets"]);
      }, error => {
        console.log(error)
      })
    } else {
      this.editarObjFirestore(this.id);
    }
  }

  editarObjFirestore(id: string) {
    const numNuevo: any = {
      numero: this.numeroIngresado.value.numero,
      primo: this.primo,
      motivo: this.motivo,
    }
    console.log(numNuevo)
    this.loading = true;
    this._numeroService.updateLibro(id, numNuevo).then(() => {
      this.loading = false;
      this.toastr.info('El número fue modificado con exito', 'Número modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-objets']);
    })
  }

  editarObjVentana() {
    if (this.id !== null) {
      this.titulo = 'Editar Numero'
      this.loading = true;
      this._numeroService.getLibro(this.id).subscribe(data => {
        this.loading = false;
        this.numeroIngresado.setValue({
          numero: data.payload.data()['numero']
        })})}}
}

