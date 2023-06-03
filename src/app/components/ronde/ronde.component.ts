import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-ronde',
    templateUrl: './ronde.component.html',
    styleUrls: ['./ronde.component.scss'],
    standalone: true,
    imports: [NgIf, RouterOutlet]
})
export class RondeComponent implements OnInit {
connected!: Boolean
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.connected = this.authService.isConnected
  }

}

