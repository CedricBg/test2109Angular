import { Routes } from "@angular/router";
import { listAllCustomerResolver } from "src/app/resolvers/Customer-resolver.resolver";
import { ListRfidResolver, ListRoundsResolver } from "src/app/resolvers/ronde-resolver.resolver";



export default [
  { path : '' , loadComponent : ()=> import('./ronde.component').then(module=>module.RondeComponent) , children :[
    { path : 'admin' ,title:'Administration rondes', loadComponent :()=> import ('./components/admin/admin.component').then(module=>module.AdminComponent),
    resolve :{ AllCustomers : listAllCustomerResolver}, children:[
      { path: 'AddRfid/:id',    title:'Ajouter une pastille',   loadComponent: ()=> import('./components/add-rfid/add-rfid.component').then(module=>module.AddRfidComponent)},
      { path: 'ModifyRfid/:id', title:'Modification pastilles', loadComponent: ()=> import('./components/modif-rfid/modif-rfid.component').then(module=>module.ModifRfidComponent)},
      { path: 'AddRonde/:id' , title:'Ajouter une ronde',loadComponent: ()=> import('./components/add-ronde/add-ronde.component').then(module =>module.AddRondeComponent)},
      { path: 'ModifRonde/:id' , title: 'Modification des rondes', loadComponent: ()=> import('./components/modif-ronde/modif-ronde.component').then(module =>module.ModifRondeComponent),
      resolve: {ListRoundsResolver}},
    ]},
  ]}
] as Routes;
