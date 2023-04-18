import { WeekDay } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';




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
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [[]]
  }

  constructor() {}
  laDate: any = new Date().toLocaleDateString()
  agent : string = sessionStorage.getItem('firstName')+' '+sessionStorage.getItem('surMame')
  htmlContent: string =
  '<h1 style="text-align: center;">Rapport</h1><p style="padding-left:2vw;"><b>'+ this.laDate +'</b></p><br>'+`

  <table>
    <thead>
      <tr>
        <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 10vw;background-color:#b9bfbf;"><u>Heure de début</u></th>
        <th style="border-bottom:1px black solid; border-bottom:1px black solid; width: 7vw;background-color:#b9bfbf;"><u>Heure de fin</u></th>
        <th style="border-bottom:1px black solid; width: 90vw; height: 3vh; background-color:#b9bfbf;"><u>Message</u></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;">07:30</td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;">08:00</td>
        <td style="border-bottom:1px black solid; height: 3vh;">Ronde d'ouverture</td>
      </tr>
      <tr>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;">08:00</td>
        <td style="border-bottom:1px black solid; height: 3vh;text-align:center;">09:00</td>
        <td style="border-bottom:1px black solid; height: 3vh;">Ronde de fermeture</td>
      </tr>
    </tbody>
  </table>
  `


  addRow() {
    console.log('test')
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
  }

  ngOnInit(): void {

  }
  ngAfterViewinit(): void
  {

  }

}

