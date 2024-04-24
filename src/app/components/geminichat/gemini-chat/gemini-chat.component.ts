import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { initFlowbite } from 'flowbite';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AiService } from '../../../services/ai.service';
import { ChartModule } from 'primeng/chart';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-gemini-chat',
  standalone: true,
  imports: [FormsModule,AsyncPipe, NgIf, BootomNavigationComponent, ChartModule,NgFor, NgClass],
  templateUrl: './gemini-chat.component.html',
  styleUrl: './gemini-chat.component.scss'
})
export class GeminiChatComponent {
  aiService = inject(AiService);
  ImgSrc!:any ;
  // messages: { user: string, text: string, img?:any }[] = [
  //   // { user: 'User1', text: 'Hello there!' },
  //   // { user: 'User2', text: 'Hi! How can I help?' },
  // ];
  private messagesSubject = new BehaviorSubject<{ user: string; text: string; img?: any }[]>([]);
  messages$ = this.messagesSubject.asObservable();
  @ViewChild('endofChat') endofChat!:ElementRef;
  @ViewChild('input') input!:ElementRef;

  query:string ='';
  data: any;
  selectedImg:any = ''
  options: any;
  ngOnInit(): void {
    if (typeof document !== 'undefined') {

      initFlowbite();
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
        ]
    };


    this.options = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
}




// showPreview($event:any){
//   const reader = new FileReader();
//   reader.onload= (e)=>{
//     this.ImgSrc = e.target?.result;
//   }
//   reader.readAsDataURL($event?.target.files[0]);
//   // this.ImgSrc = $event.target.files[0];
//   debugger;
// }

// async getdata(data:string){
//   if(data){
//     this.addMessage('User1', data);
//   this.aiService.fetch(data).subscribe(async (res)=>{
//     let response = await res.response
//     let text = response.text()
//     this.addMessage('User2', text);

//   });
//   this.input.nativeElement.value = '';
//   this.scrollToBottom();
//   }
// }
// addMessage(user: string, text: string, img?:any): void {
//   if(img){
//     this.messages.push({ user, text, img });
//   }
//   else{
//     this.messages.push({ user, text });
//   }

// }
addMessage(message: { user: string; text: string; img?: any }): void {
  const currentMessages = this.messagesSubject.value;
  const updatedMessages = [...currentMessages, message];
  this.messagesSubject.next(updatedMessages);
}

scrollToBottom(){
  setTimeout(()=>{

    if(this.endofChat){
       this.endofChat.nativeElement.scrollIntoView({behavior:'smooth'});
    }
  },1000)
}


async getdata(data: string): Promise<void> {
  if (data ) {
    const obj = this.ImgSrc ? { user: 'User1', text:data, img:this.ImgSrc } : { user: 'User1', text:data } ;
    debugger;
    this.addMessage(obj );
    const imagePart = this.selectedImg
    ? await this.fileToGenerativePart( this.selectedImg, 'image/jpeg') // Adjust the MIME type as needed
    : undefined;


    this.aiService.fetch(data, imagePart).subscribe(async (res) => {
      const response = await res.response;
      const text = await response.text();
      debugger;
      const obj = { user: 'User2', text:text};
       this.addMessage(obj );
    });

    this.input.nativeElement.value = '';
    this.scrollToBottom();
  }
}

async fileToGenerativePart(file: File, mimeType: string): Promise<any> {
  return {
    inlineData: {
      data: await this.readFileAsBase64(file),
      mimeType,
    },
  };
}

async readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


showPreview($event: any): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    this.ImgSrc = e.target?.result;
  };
  this.selectedImg = $event?.target.files[0]
}


}
