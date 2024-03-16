import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PlanningService } from 'src/app/services/planning.service';
import { ActiveWorkingInfo } from 'src/app/models/Planning/activeWorkingInfo.models';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {
  activeWorkers : ActiveWorkingInfo[] = []
  subscription : Subscription[] = []
  constructor(private _activatdedRoute: ActivatedRoute,private _spinnerService : SpinnerService, private _planningService : PlanningService) { }

  ngOnInit(): void {
    this.subscription.push(this._activatdedRoute.data.subscribe({
      next : (data : any) => {
        this.activeWorkers = data
        console.log(data)
  }}));
    this._spinnerService.setActive(false);
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin],
  };

}
