
import { Component, OnInit, } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { EmployeeService } from 'src/app/services/employee.service';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  laDate: any = new Date().toLocaleDateString()
  agent : string = sessionStorage.getItem('firstName').toLowerCase()+' '+sessionStorage.getItem('surMame').toLowerCase()

  title: string = this.agent+"laDate"
  pdf: Pdf = {
    intPdf: 0,
    title: this.title,
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
      defaultParagraphSeparator: 'th',

      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],

    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [[],['fontSize','insertImage','insertVideo']]
  }

  constructor(private _employee: EmployeeService) {}

  htmlContent: string =
  '<h1 style="text-align: center;">Rapport de ' +this.agent+'</h1><p style="padding-left:2vw;"><b><u>Nr° de carte ministérielle</u></b> : </p><br><p style="padding-left:2vw;"><b>'+ this.laDate +'</b></p><br>'+`
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
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"><br></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>

    </tbody>
  </table>
  `


  addRow() {

    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const newRow = `
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
      <tr style="display: table-row;" >
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all;"></td>
        <td style="border-bottom:1px black solid;  text-align:center; word-break: break-all; "></td>
        <td style="border-bottom:1px black solid;  height: 20px; word-break: break-all;"></td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', newRow);

  }


  SendRapport()
  {
    this.pdf.content = this.htmlContent
    this._employee.SendRapport(this.pdf)
  }
}

