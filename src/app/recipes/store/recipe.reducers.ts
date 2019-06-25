import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Burger', 'A super-testy burger', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXaZot2UOI_x4V9ZK9rZyJ2avyq2bxzUJroddVoTFDmKEv2gg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe('Pizza', 'Chicago pizza', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsSXh-qMXFhbwxN1Z9SSP7M54QRwstiSNWjOnEqu6S80rTjyl',
            [
                new Ingredient('Cheese', 1),
                new Ingredient('Mushroom', 6)
            ])
    ]
}


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPES):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPES):
            const recipe = state.recipes[action.payload.index];
            const updateRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updateRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}