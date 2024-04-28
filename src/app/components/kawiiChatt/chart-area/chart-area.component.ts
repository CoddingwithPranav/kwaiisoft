import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChatsService } from '../../../services/chats.service';
@Component({
  selector: 'app-chart-area',
  standalone: true,
  imports: [DatePipe,NgOptimizedImage, AsyncPipe, NgClass, NgFor, AvatarModule,AvatarGroupModule, ReactiveFormsModule, NgIf, TieredMenuModule  ],
  templateUrl: './chart-area.component.html',
  styleUrl: './chart-area.component.scss'
})
export class ChartAreaComponent {

  userServce = inject(UserService);
  chatService = inject(ChatsService);

  user$ = this.userServce.currentUser$;
  @ViewChild('endofChat') endofChat!:ElementRef;


  messageControl= new FormControl('');

  profilePopup:boolean=true;


  
  mychats$ = this.chatService.myChats$;
  message$ = this.chatService.selectedChatId$.pipe(
    switchMap(chatId => (chatId ? this.chatService.getChatMessage$(chatId) : of(null)))
  );
  selectedChat$ = combineLatest([this.chatService.selectedChatId$, this.mychats$]).pipe(
    map(([selectedChatId, chats]) => chats.find(c => c.id === selectedChatId)),
    tap(()=>{
      this.scrollToBottom();
    })
  );

  sendMessage(){
    const message = this.messageControl.value;
    let  selectedChatId ;
    this.chatService.selectedChatId$.subscribe((res)=> selectedChatId = res);

    if(message && selectedChatId){
     this.chatService.addChatMessage(message, selectedChatId).subscribe(()=>{
        this.scrollToBottom();
     });
    }
    this.messageControl.setValue('');
  }


  scrollToBottom(){
    setTimeout(()=>{

      if(this.endofChat){
         this.endofChat.nativeElement.scrollIntoView({behavior:'smooth'});
      }
    },1000)
  }

  viewProfile(){
    this.profilePopup = !this.profilePopup;
    debugger;
  }
}
