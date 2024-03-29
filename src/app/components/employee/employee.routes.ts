import { Routes } from "@angular/router";

export default [
    { path : '' , loadComponent : () =>  import('./employee.component').then(module => module.EmployeeComponent), children :[
    { path : 'addEmployee', title : 'Ajout employée', loadComponent : () => import('./components/add-employee/add-employee.component').then(module =>module.AddEmployeeComponent)},
    { path : 'AllEmployees' ,title : 'Administration employée', loadComponent : ()=> import('./components/listemployee/listemployee.component').then(module =>module.ListemployeeComponent)},
    { path : 'UserProfile' , loadComponent : ()=> import('./components/user-profile/user-profile.component').then(module=>module.UserProfileComponent)},
    { path : 'UpdateEmployee', title : 'Mise à jour employée',loadComponent : ()=> import('./components/update-employee/update-employee.component').then(module => module.UpdateEmployeeComponent)},
    { path : 'Admin', loadComponent : () => import('./components/admin/admin.component').then(module=>module.AdminComponent)},
  ]
},

] as Routes;
