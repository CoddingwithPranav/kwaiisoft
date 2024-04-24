import { Timestamp } from "@angular/fire/firestore";
import { ProfileUser } from "./user";

export interface chat{
  id:string;
  lastMessage?:string;
  lastMessageDate?:Date & Timestamp;
  userIds:string[];
  users:ProfileUser[];


  //Not Stored , only for display
  chatpic?:string;
  chatName?:string;
}

export interface Message{
  text:string;
  senderId:string;
  sendDate:Date & Timestamp;
}
