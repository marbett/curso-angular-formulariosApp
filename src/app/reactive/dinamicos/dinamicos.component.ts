import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)] ],
    favoritos: this.formBuilder.array([
      ['Metal Gear'],
      ['Death Stranding']
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  constructor(private formBuilder: FormBuilder) { }

  get favoritosArr () {
   return this.miFormulario.get('favoritos') as FormArray; 
  }
  hayError(campo: string) {
    return this.miFormulario.controls[campo].errors
          && this.miFormulario.controls[campo].touched;

  }

  guardar () {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    console.log(this.nuevoFavorito.value);
  }

  agregarFavorito () {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    //this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.favoritosArr.push(this.formBuilder.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  eliminar (i: number) {    
    this.favoritosArr.removeAt(i);
  }
  
}
