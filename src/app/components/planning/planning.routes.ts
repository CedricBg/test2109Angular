import { Routes } from "@angular/router";

export default [
{
  path : '',loadComponent : ()=> import('./planning.component').then(module => module.PlanningComponent),children: [

  ]
}
]
