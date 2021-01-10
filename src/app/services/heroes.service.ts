import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://angular-crud-f3336-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http:HttpClient) { }

  crearHeroe(heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,heroe)
    .pipe(
      map( (resp:any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  actualizarHeroe(heroe:HeroeModel){
    const temp_heroe = {
      ...heroe
    } 
    delete temp_heroe.id;

    return this.http.put( `${this.url}/heroes/${heroe.id}.json`, temp_heroe);
  }

  getHeroes(){
    return this.http.get( `${this.url}/heroes.json`)
      .pipe(
        map( this.creaHeroesArray ),
        delay(1500)
      );
  }

  private creaHeroesArray( heroesObj:object){
    
    const heroes:HeroeModel[] = [];
    
    if( heroesObj === null) { return []; }
    
    Object.keys(heroesObj).forEach( key => {
      const heroe:HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    
    return heroes;
  }
}
