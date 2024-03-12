import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {

  constructor(private _spinnerService : SpinnerService) { }

  ngOnInit(): void {
    this._spinnerService.setActive(false);
  }

}
