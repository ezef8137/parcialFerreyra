export class numeroPrimo {
  id?: string;
  numero: number;
  primo: boolean;
  motivo: string

  constructor(numero: number, primo: boolean,motivo: string){
      this.numero = numero;
      this.primo = primo;
      this.motivo = motivo;
  }
}
