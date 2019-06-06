import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();  //ovo je za refresh array of recipes ???

    private recipes: Recipe[] = [
        new Recipe('Burger', 'A super-testy burger','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXaZot2UOI_x4V9ZK9rZyJ2avyq2bxzUJroddVoTFDmKEv2gg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Pizza', 'Chicago pizza','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsSXh-qMXFhbwxN1Z9SSP7M54QRwstiSNWjOnEqu6S80rTjyl', [
            new Ingredient('Cheese', 1),
            new Ingredient('Mushroom', 6)
        ])
      ];

    constructor(private shoppingService: ShoppingService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe (index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}