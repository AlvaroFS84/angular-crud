import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService:HeroesService) { }

  borrarHeroe(heroe:HeroeModel, i:number){
    Swal.fire({
      title: `Borrar ${heroe.nombre}?`,
      text: "Este proceso no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    })
  }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( resp =>{
        this.heroes = resp;  
        this.cargando = false;  
    });
  }

}
