import { AsyncPipe, NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initFlowbite } from 'flowbite';
import { combineLatest, startWith, map, Observable } from 'rxjs';
import { ProfileUser } from '../../../models/user';
import { ChatsService } from '../../../services/chats.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { ChartAreaComponent } from '../chart-area/chart-area.component';
import { SortByDatePipe } from '../../../pipes/date-displaypipe.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [ MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    RouterLink,
    ChartAreaComponent,
    DropdownModule,
    AutoCompleteModule
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss'
})
export class FriendListComponent {

  router = inject(Router)
  userServce = inject(UserService);
  chatService = inject(ChatsService);

  flag:boolean=false;
  user$ = this.userServce.currentUser$;
  searchControl = new FormControl('');
  users$ = combineLatest([
    this.userServce.allUsers$,
    this.user$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, user, searchString]) => {

      if (searchString && user) {
        return users.filter(
          (u:any) =>
           u.uid.toLowerCase() != user.uid.toLowerCase() && u.displayName?.toLowerCase().includes(searchString.toLowerCase())

        );
      }

      // If no searchString or user, return the original users array
      return users;
    })
  );

  mychats$ = this.chatService.myChats$;
  sortedChats$ = this.mychats$.pipe(
    map(chats => chats.slice().sort((a: any, b: any) => {
      const dateA = new Date(a.lastMessageDate);
      const dateB = new Date(b.lastMessageDate);
      return  dateB.getTime() -dateA.getTime()
    }))
  );

  changeOtherId(chatId: string): void {
    if(chatId !='' || chatId !=null){

      this.chatService.selectedChatIdSubject.next(chatId);
      this.flag = true;
    }

  }
  backToList(){
    this.flag = false;
  }



  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }

  }

  createChat(otherUser:ProfileUser){
   this.chatService.createChat(otherUser).subscribe();
  }



}
