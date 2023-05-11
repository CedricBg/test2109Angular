
import { Time } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { notEqual } from 'assert';
import { Subscription, Timestamp, Subject } from 'rxjs';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgZone } from '@angular/core';
import { Working } from 'src/app/models/Planning/working.models';
import { formCreateRapport } from 'src/app/models/customer/Rapport/FormCreateRapport.models';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() dataIsWorking: Working
  @Input() form: formCreateRapport
  firstName = sessionStorage.getItem('firstName')
  lastName = sessionStorage.getItem('surName')
  laDate: any = new Date().toLocaleDateString()
  htmlContent!: string
  customer: string
  idEmployee = Number(sessionStorage.getItem('id'))

  pdf: Pdf = {
    idPdf: 0,
    title: '',
    content: '',
    customer: '',
    idEmployee: this.idEmployee
  }

  constructor(private _employee: EmployeeService,) {}

  ngOnInit(): void {
    //2. Controle si un rapport est déjà ouvert on check si le chemin vers le pdf est null dans la table
    this._employee.CheckForRapport(this.idEmployee).subscribe({
      next :  (data: Pdf) =>{
        this.pdf =  data
        this.generateHtmlContent()
      }
    })
    this._employee.GetSavedData().subscribe({
      next : (data: Pdf) =>{
        this.pdf = data
      }
    })
  }

  //1. On  créé une ligne dans la table Pdf
  //un model pdf pour creer une ligne dans la table
  //et un model CreateRapport pour envoi vers text-editor via un @input
  Save()
  {
    this.pdf.customer = this.dataIsWorking.nameCustomer
    this.pdf.content = this.htmlContent
    this._employee.SaveRapport(this.pdf)
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

   generateHtmlContent(){
    //si pas d'objet pdf on crée un nouveau html pour le rapport
    if(this.pdf === null || this.pdf.content.length === 0)
    {
    this.htmlContent =
    '<h1 style="text-align: center;">Rapport de ' +this.firstName+' '+this.lastName+'</h1><p style="padding-left:2vw;"><b><u>Client</u>: '+this.dataIsWorking.nameCustomer+'</b><p style="padding-left:2vw;"><b><u>Nr° de carte ministérielle</u></b> : </p><br><p style="padding-left:2vw;"><b>'+ this.laDate +'</b></p><br>'+`
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
    `}
    else{
      this.htmlContent =  this.pdf.content
    }
    this.Save()
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

  ngOnDestroy()
  {

  }
}

