
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class EmployeeComponent implements OnInit {

  name! : string

  ngOnInit(): void {
    this.name = sessionStorage.getItem('surName')
  }
}
