import { Routes } from '@angular/router';
import { ActiveWorkersResolver } from 'src/app/resolvers/planning-resolver.resolver';


export default [
  {
    path : '', title:'Agents en service',loadComponent : ()=> import('./planning.component').then(module => module.PlanningComponent),resolve: { ActiveWorkersResolver},children: [
      { path : 'DayPlanning', title : 'Planning du jour', loadComponent : () => import('./components/full-planning/full-planning.component').then(module => module.FullPlanningComponent),
      },
    ]
  }
] as Routes;
