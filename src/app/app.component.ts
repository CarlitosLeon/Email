import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { envioEmail } from './Email';
import { MessageService } from './message.service';
declare var $;
export interface Correos {
  correo: string,
  checked: boolean,
  id: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  datos: Correos[] = [

    {correo:"linaresalberto1998@gmail.com", checked: false, id: "0"},
    {correo:"2517360000clinaresl@gmail.com", checked: false, id: "1"},
    {correo:"oscar_saga01@hotmail.com", checked: false, id: "2"},
    {correo:"heras1373@gmail.com", checked: false, id: "3"},
  ]


formEmail: FormGroup;
newEmail: envioEmail = new envioEmail();

/**Email */
config: any = {
  placeholder:'Escriba Aqui',
  tabsize:2,
  height:'100px',
  width:'860px',
  airMode: false,
  tabDisable: true,
  popover: {
    table: [
      ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
      ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
    ],
    image: [
      ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
      ['float', ['floatLeft', 'floatRight', 'floatNone']],
      ['remove', ['removeMedia']]
    ],
    link: [
      ['link', ['linkDialogShow', 'unlink']]
    ],
    air: [
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear'
        ]
      ],
    ]
  },
  uploadImagePath: 'canvas/uploadimg',
  toolbar: [
    ['misc', ['undo', 'redo']],
    [
      'font',
      [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        'clear'
      ]
    ],
    ['fontsize', ['fontname', 'fontsize', 'color']],
    ['para', ['style0', 'ul', 'ol', 'paragraph']],
    ['insert', ['picture', 'link']],
    ['customButtons', ['testBtn']]
  ],
  buttons: {
    testBtn: this.customButton
  },
  codeviewFilter: true,
  codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
  codeviewIframeFilter: true
};


/**Fin Email */

  constructor(
    private sanitizer: DomSanitizer,
    public _MessageService: MessageService,
    private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.validaEmail();
    
  }

private validaEmail(){
  this.formEmail = this.fb.group({
    nombre:['',Validators.required],
    asunto:['',Validators.required],
    email:['',Validators.required],
    mensaje:['',Validators.required]
  })
}

public enviarE(){
  this.datos.forEach(element => {
  this.newEmail.nombre = this.formEmail.controls.nombre.value;
  this.newEmail.asunto = this.formEmail.controls.asunto.value;
  this.newEmail.email = element.correo;
  this.newEmail.mensaje = this.formEmail.controls.mensaje.value;
  if(element.checked){
    this._MessageService.sendMessage(this.newEmail).subscribe(() =>{
      this.formEmail.reset();
    })
    console.log(this.newEmail);
  }
})
alert("Email Enviado");
}
/**sumernote */

onBlur() {
  console.log('Blur');
}

onDelete(file) {
  console.log('Delete file', file.url);
}

summernoteInit(event) {
  console.log(event)
}
public customButton(context) {
    
    
  const ui = $.summernote.ui;
  console.log(ui);
  const button = ui.button({
    contents: '<i class="note-icon-magic"></i> test',
    tooltip: 'Custom button',
    container: '.note-editor',
    className: 'note-btn',
    click: function() {
      context.invoke('editor.insertText', 'Hola desde el test !!!');
    }
  });
  
  return button.render();
}
public chTrue: Array<Correos> = new Array<Correos>();
getAlbumId(x: Correos) 
{
  console.log(x);

  this.datos.forEach(element =>{
    if(element.correo === x.correo){
      element.checked =! element.checked;
    }
  });
  this.Envio();
}
vCAll: boolean = false;
seleccionarTodo(e){
  if(e){
    this.datos.forEach(x => {
      x.checked = true;
    });
  }else {
    this.datos.forEach(x => {
      x.checked = false;
    })
  } 

}
eCheckedAll(): boolean{
  let veri = 0;
  this.datos.forEach(x => {
    if(x.checked){
      veri += 1;
    }
  });
  if(veri === this.datos.length){
    return true;
  }
  return false;

}
public Envio(){
  let n: number =0;
  this.datos.forEach(element => {
    if(element.checked){
      n +=1;
    }
  });
  if(n>1){
    return true;
  }
  return false;
}
}
