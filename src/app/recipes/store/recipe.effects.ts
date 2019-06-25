import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as RecipeActions from './recipe.actions';
import { Recipe } from "../recipe.model";
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {

    @Effect()  
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://my-app-b2f59.firebaseio.com/recipes.json');
        }),
        map(
            (recipes) => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        )
    )


    @Effect({ dispatch: false })
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => { 
            return this.httpClient.put('https://my-app-b2f59.firebaseio.com/recipes.json', state.recipes);
        })
    )

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>) { }
}
