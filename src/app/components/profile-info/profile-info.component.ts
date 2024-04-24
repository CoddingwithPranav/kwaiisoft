import { Component, Inject, inject } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { FormBuilder,  FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators  } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileUser } from '../../models/user';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BootomNavigationComponent } from '../../shared/bootom-navigation/bootom-navigation.component';
import { UserStore } from '../../store/user.store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [ProfileComponent,FormsModule, ReactiveFormsModule,NgOptimizedImage,  NgIf, AsyncPipe, BootomNavigationComponent],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  UserStore =inject(UserStore);
  authService = inject(AuthService);
  imgSrc:any ='';
  profileForm!:FormGroup;
  selectedImg:any;
  router = inject(Router)

  logout(){
    this.router.navigate(['auth/login']);
    this.authService.logout().subscribe((res)=>{
  
    })
  }

  constructor( ){

    this.loadForm();
 
  }


  showPreview($event:any){
    const reader = new FileReader();
    reader.onload= (e)=>{
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  loadForm(){
    this.profileForm = this.fb.group({
      uid: [''],
      displayName: ['', Validators.required],
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profileImg: [''],
    });
  }
  get fs(){
    return this.profileForm.controls;
  }



  saveProfile() {
   if(this.profileForm.invalid){
    this.profileForm.markAllAsTouched();
    return;
   }

    const postData:ProfileUser = {

      uid: this.UserStore.user().uid,
      displayName : this.profileForm.value.displayName,
      name : this.profileForm.value.name,
      email : this.profileForm.value.email,
      profileImg : this.UserStore.user().profileImg,
      phone : this.profileForm.value.phone,
      updateAt: new Date()
    }
    this.userService.uplaoadProfileImg(this.selectedImg, postData  )

  }

}
