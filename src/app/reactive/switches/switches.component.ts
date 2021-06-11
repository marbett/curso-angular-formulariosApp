import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['F', [Validators.required] ],
    notificaciones: [true, [Validators.required] ],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'M',
    notificaciones: true
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    //this.miFormulario.setValue(this.persona) //se podria usar si persona tuviera todos los campos del form, mejor usar el reset
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    //subscribirnos para ver cambios de todo el form
    /*this.miFormulario.valueChanges.subscribe(form => {
      console.log(form);
      delete form.condiciones;
      this.persona = form;
      console.log(form);
    });*/

    //otra forma 
    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) => {
      
      //delete form.condiciones;
      this.persona = rest;
      console.log(this.persona);
    });

    //subscribirnos para ver cambios de las condiciones
    this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue => {
      console.log(newValue);
    });
  }

  guardar () {
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciiones;
    this.persona = formValue;
  }

}
