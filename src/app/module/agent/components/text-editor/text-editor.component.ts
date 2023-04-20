import { TitleCasePipe, UpperCasePipe, WeekDay } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { cwd } from 'process';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '50vh',
      maxHeight: 'auto',
      width: '0',
      minWidth: '70vw',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],

    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [[],['insertImage','insertVideo']]
  }

  constructor() {}
  laDate: any = new Date().toLocaleDateString()
  agent : string = sessionStorage.getItem('firstName').toLowerCase()+' '+sessionStorage.getItem('surMame').toLowerCase()
  htmlContent: string =
  '<h1 style="text-align: center;">Rapport de ' +this.agent+'</h1><p style="padding-left:2vw;"><b><u>Nr° de carte ministérielle</u></b> : </p><br><p style="padding-left:2vw;"><b>'+ this.laDate +'</b></p><br>'+`
<br>

  <table style="width:100%;">
    <thead>
      <tr>
        <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 10%;background-color:#00468C;color:#F5DEB3;">Heure de début</th>
        <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 10%;background-color:#00468C;color:#F5DEB3;">Heure de fin</th>
        <th style="border-bottom:1px black solid; width: 100%; height: 3vh; background-color:#00468C; color:#F5DEB3;">Message</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
        <td style="border-bottom:1px black solid; height: 3vh;"></td>
      </tr>
    </tbody>
  </table>
  `


  addRow() {

    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const newRow = `
    <tr>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;"></td>
    </tr>
    <tr>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;"></td>
    </tr>
    <tr>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;"></td>
    </tr>
    <tr>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;"></td>
    </tr>
    <tr>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;text-align:center;"></td>
      <td style="border-bottom:1px black solid; height: 3vh;"></td>
    </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', newRow);
    console.log(this.htmlContent)
  }

  ngOnInit(): void {

  }
  ngAfterViewinit(): void
  {

  }

}

