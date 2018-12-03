import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

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
