import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken()

        return this.http.put('https://my-app-b2f59.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            params: new HttpParams().set('auth', token)
        });
        // const req = new HttpRequest('PUT', 'https://my-app-b2f59.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
        // return this.http.request(req);
    }

    getRecipes() {
        const token = this.authService.getToken()

        this.http.get<Recipe[]>('https://my-app-b2f59.firebaseio.com/recipes.json', {
            params: new HttpParams().set('auth', token)
        })
                .pipe(map(
                    (recipes) => { //httpClient will automatically extract the body of response by default
                        for ( let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                ))
        // this.http.get('https://my-app-b2f59.firebaseio.com/recipes.json?auth=' + token)
        // .pipe(map(
        //     (response: Response) => {
        //         const recipes: Recipe[] = response.json();
        //         for ( let recipe of recipes) {
        //             if (!recipe['ingredients']) {
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //         return recipes;
        //     }
        // ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
    }
}