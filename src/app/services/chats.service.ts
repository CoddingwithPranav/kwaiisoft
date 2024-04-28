import { Injectable, inject } from '@angular/core';
import { Firestore,  addDoc, collection, collectionData, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user';
import { BehaviorSubject, Observable, ObservedValueOf, concatMap, map, of, take } from 'rxjs';
import { UserService } from './user.service';
import { Message, chat } from '../models/chat';
import { UserStore } from '../store/user.store';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {
 firestore = inject(Firestore);
 userService = inject(UserService);
userstore = inject(UserStore)
 public selectedChatIdSubject = new BehaviorSubject<string | null>(null);
 selectedChatId$ = this.selectedChatIdSubject.asObservable();
 user$!:Observable<ProfileUser>
constructor(){
 
}


 createChat(otherUser:ProfileUser):Observable<string>{
   const ref = collection(this.firestore, 'chats');
   const {displayName , profileImg} =  this.userstore.user;
   return this.userService.currentUser$.pipe(
    take(1),
    concatMap((user:any) => addDoc(ref, {
      userIds:[user?.uid, otherUser?.uid],
      users:[
        {
          displayName:displayName?? '',
          profileImg:profileImg ?? ''
        },
        {
          displayName:otherUser?.displayName ?? '',
          profileImg:otherUser?.profileImg ?? ''
        },
      ]
    })),
    map(ref =>{
    return  ref.id;
    })
   )
 }

 get myChats$():Observable<chat[]>{
  const ref = collection(this.firestore, 'chats');
  return this.userService.currentUser$.pipe(
    concatMap((user:any)=>{
      const myQuery = query(ref, where('userIds', 'array-contains', user?.uid));
      return collectionData(myQuery, {idField:'id'}).pipe(
        map(chats => this.addChatNameAndPic(user?.uid ?? '', chats as chat[] ))
      ) as Observable<chat[]>;
    })
  )
 }

 addChatNameAndPic(currentUserId:string, chats:chat[]):chat[]{
   chats.forEach(chat =>{
    const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
    const {displayName, profileImg} = chat.users[otherIndex];
    chat.chatName = displayName;
    chat.chatpic= profileImg;

   })

   return chats;
 }


 addChatMessage(message:string, chatId:string):Observable<any>{
   const ref = collection(this.firestore, 'chats', chatId, 'messages');
   const chatRef = doc(this.firestore, 'chats', chatId);
   const today = new Date();
   return this.userService.currentUser$.pipe(
    take(1),
    concatMap((user:any) => addDoc(ref, {
      text:message,
      senderId: user?.uid,
      sentDate: today.toString(),
    })),
    concatMap((user:any) => updateDoc(chatRef, {
      lastMessage:message,
      lastMessageDate:today.toString(),
    })),

   )
  // return of([1,2])
  }


  getChatMessage$(chatId:string):Observable<Message[]>{
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const queryAll= query(ref, orderBy('sentDate', 'asc'));
    collectionData(queryAll).subscribe((res)=>{
      console.log(res);
    })

    return collectionData(queryAll) as Observable<Message[]>;
  }
}
