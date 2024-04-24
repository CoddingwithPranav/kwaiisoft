import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
@Injectable({
  providedIn: 'root'
})
export class AiService {


  API_KEY:string = 'AIzaSyDUrKNYpgg4A71A8Aq3cY-HXihBvscryrg';
 // Access your API key (see "Set up your API key" above)
  genAI = new GoogleGenerativeAI(this.API_KEY);

  constructor() { }

  //  fetch(query:string):Observable<any>{
  //    console.log(query);

  //    const model = this.genAI.getGenerativeModel({ model: "gemini-pro"});

  //    return from(model.generateContent(query))

  //  }
   fetch(query: string, imagePart: any): Observable<any> {

   let queryData
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    if(imagePart){

     queryData = [query, ...imagePart ? [imagePart] : []];
    }
    debugger

    queryData = query;

    return from(model.generateContent(queryData));
  }




}
