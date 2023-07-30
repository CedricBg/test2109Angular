import { DialogConfig } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Site } from 'src/app/models/customer/site.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-site',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit {
  siteSelected: Site;
  subscriptions: Subscription[] = []

  constructor( private dialogRef: MatDialogRef<ViewSiteComponent>,
    @Inject(MAT_DIALOG_DATA) data: Site)
    {
      this.siteSelected = data
    }

  ngOnInit(): void {
    this.subscriptions.push(

    );
  }

  CloseWindow()
  {
    this.dialogRef.close();
  }

ngOnDestroy(){
    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe()
    })
  }
}
