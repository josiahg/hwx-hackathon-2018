import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //uri = 'http://backend:4000';

  constructor(private http: HttpClient) { }

  getAbsoluteDomainUrl(): string {
    if (window
        && "location" in window
        && "protocol" in window.location
        && "host" in window.location) {
        return window.location.protocol + "//" + window.location.hostname;
    }
    return null;
  }

  uri = this.getAbsoluteDomainUrl() + ':4000';

  getRecipes() {
    return this.http.get(`${this.uri}/recipes`);
  }

  getRecipeById(id) {
    return this.http.get(`${this.uri}/recipes/${id}`);
  }

  addRecipe(name, description, code){
    const recipe = {
      name: name,
      description: description,
      code: code
    };
    return this.http.post(`${this.uri}/recipes/add`, recipe);
  }
}
