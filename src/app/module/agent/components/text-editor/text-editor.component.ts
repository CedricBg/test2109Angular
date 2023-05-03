
import { Time } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { notEqual } from 'assert';
import { Timestamp } from 'rxjs';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgZone } from '@angular/core';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() customer: string;
  laDate: any = new Date().toLocaleDateString()
  firstName: string = sessionStorage.getItem('firstName').toLowerCase()
  surName : string = sessionStorage.getItem('surMame').toLowerCase()
  agent : string = this.firstName+'_'+this.surName
  timeStamp: any = Date.now()
  title: string = this.agent+"_"+this.timeStamp
  htmlContent!: string

  pdf: Pdf = {
    intPdf: 0,
    title: '',
    content: ''
  }
  ngOnInit(): void {

  }

  editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '50vh',
      maxHeight: 'auto',
      width: '50vw',
      minWidth: '',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      defaultParagraphSeparator: '',

      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],

    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['link',
    'unlink',],['insertHorizontalRule','removeFormat','insertImage','fontSize','insertVideo']]
  }

  constructor(private _employee: EmployeeService) {
    this.htmlContent = ''
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generateHtmlContent();
    }, );


  }
  generateHtmlContent(){
    console.log(this.customer)
    this.htmlContent =
    '<h1 style="text-align: center;">Rapport de ' +this.firstName+' '+this.surName+'</h1><p style="padding-left:2vw;"><b><u>Client</u>: '+this.customer+'</b><p style="padding-left:2vw;"><b><u>Nr° de carte ministérielle</u></b> : </p><br><p style="padding-left:2vw;"><b>'+ this.laDate +'</b></p><br>'+`
  <br>

    <table style="width:100%;">
      <thead>
        <tr style="display: table-row;">
          <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 15%; background-color:#00468C;color:#F5DEB3;">Heure de début</th>
          <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 15%; background-color:#00468C;color:#F5DEB3;">Heure de fin</th>
          <th style="border-bottom:1px black solid; width:70%;height:30px; background-color: #00468C; color:#F5DEB3;">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"><br></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid; vertical-align: top; height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>
        <tr style="display: table-row;" >
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
          <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
          <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
        </tr>

      </tbody>
    </table>
    `
  }

  addRow() {

    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const newRow = `
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid; vertical-align: top; text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', newRow);

  }

  SendRapport()
  {
      this.pdf.content = this.htmlContent
      this.pdf.title =  this.title,
      this._employee.SendRapport(this.pdf)

  }
}

