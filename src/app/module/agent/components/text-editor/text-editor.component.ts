
import { Pdf } from './../../../../models/customer/Pdf.models';
import { Component, OnInit,} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription, first } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessagesService } from 'src/app/services/messages.service';
import { GenerateHtml } from 'src/app/Utilities/GenerateHtml';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})

export class TextEditorComponent implements OnInit {
  laDate: any = new Date().toLocaleDateString()
  htmlContent!: string
  subscriptions: Subscription[] = []
  idEmployee = Number(sessionStorage.getItem('id'))
  html: GenerateHtml = new GenerateHtml()
  messages: string[] = []
  pdf: Pdf = {
    idPdf: 0,
    title: '',
    content: '',
    siteId: 0,
    idEmployee: this.idEmployee,
    dateCreate: null
  }

  constructor(private _employee: EmployeeService, private message : MessagesService) { }

  ngOnInit(): void
  {
    setTimeout(() => {this.subscriptions.push(this._employee.CheckForRapport(this.idEmployee).pipe(first()).subscribe({
        next: (data: Pdf)=> {
          this.pdf = data
          this.subscriptions.push(this.message.MessagesForASite(this.pdf.siteId).subscribe({
            next : (data : string[]) =>{
              this.messages = data
              console.log(this.messages)
            }
          }))

          //Récupère le contenu html à affiché
          this.htmlContent = data.content
          //sauvegarde pour avoir les bonnes donnèes sauvegardé si la page est rechargé par l'utilisateur ou c'est déconnecté
          if(!(data == null)){
            this.Saves(data)
          }
        }
      }))},500)
  }


  Saves(pdf: Pdf)
  {
    this.pdf.content = this.htmlContent
    this._employee.SaveRapport(pdf)
  }


   editorConfig: AngularEditorConfig =  {
      editable: true,
      height: 'auto',
      minHeight: '50vh',
      maxHeight: 'auto',
      width: '100%',
      minWidth: '',
      showToolbar: false,
      defaultParagraphSeparator: '',


    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['link','unlink',],
      ['fontsList','insertHorizontalRule','removeFormat','insertImage','fontSize','insertVideo','superscript','subscript','striketroughe']]
  }


  addRow() {
    this.html.AddLines()
  }

  Send()
  {

  }

  ngOnDestroy()
  {
    this.subscriptions.forEach(element => {
      element.unsubscribe()
    });
    this.pdf.content = this.htmlContent
    this.Saves(this.pdf)
  }
}

