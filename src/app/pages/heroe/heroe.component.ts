import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService} from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModel();
  form_submitted:boolean = false;

  constructor(private heroesService: HeroesService, private route:ActivatedRoute) { }
  

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if(id !== 'nuevo'){
      this.heroesService.getHeroe(id)
      .subscribe( (resp:HeroeModel) =>{
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form:NgForm){

    this.form_submitted = true;
    
    if(form.invalid){
      console.log("formulario invalido");
      //return;
    }
    Swal.fire({
      title:'Espere',
      text:'Guardando información',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();
    
    if(this.heroe.id){
      this.heroesService.actualizarHeroe( this.heroe)
      .subscribe( (resp:any) => { 
        Swal.fire({
          title:resp.nombre,
          text: 'Se almacenó correctamente',
          allowOutsideClick: false,
          icon: 'success'
        });
      });
    }else{
      this.heroesService.crearHeroe( this.heroe)
      .subscribe( (resp:any) => {
        Swal.fire({
          title:resp.nombre,
          text: 'Se actualizó correctamente',
          allowOutsideClick: false,
          icon: 'success'
        });
      });
    }
  }

}
