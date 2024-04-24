import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ChatsService } from '../../../services/chats.service';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-chart-area',
  standalone: true,
  imports: [DatePipe, AsyncPipe, NgClass, NgFor, AvatarModule,AvatarGroupModule, ReactiveFormsModule, NgIf, TieredMenuModule  ],
  templateUrl: './chart-area.component.html',
  styleUrl: './chart-area.component.scss'
})
export class ChartAreaComponent implements OnInit{

  userServce = inject(UserService);
  chatService = inject(ChatsService);

  user$ = this.userServce.currentUser$;
  @ViewChild('endofChat') endofChat!:ElementRef;


  messageControl= new FormControl('');

  profilePopup:boolean=true;


  items: any;
  ngOnInit(): void {

    this.items = [
      {
          label: 'File',
          icon: 'pi pi-file',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-plus',
                  items: [
                      {
                          label: 'Document',
                          icon: 'pi pi-file'
                      },
                      {
                          label: 'Image',
                          icon: 'pi pi-image'
                      },
                      {
                          label: 'Video',
                          icon: 'pi pi-video'
                      }
                  ]
              },
              {
                  label: 'Open',
                  icon: 'pi pi-folder-open'
              },
              {
                  label: 'Print',
                  icon: 'pi pi-print'
              }
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-file-edit',
          items: [
              {
                  label: 'Copy',
                  icon: 'pi pi-copy'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-times'
              }
          ]
      },
      {
          label: 'Search',
          icon: 'pi pi-search'
      },
      {
          separator: true
      },
      {
          label: 'Share',
          icon: 'pi pi-share-alt',
          items: [
              {
                  label: 'Slack',
                  icon: 'pi pi-slack'
              },
              {
                  label: 'Whatsapp',
                  icon: 'pi pi-whatsapp'
              }
          ]
      }
  ]


  };
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
