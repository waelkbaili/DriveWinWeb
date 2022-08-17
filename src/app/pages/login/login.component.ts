import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/api-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submit:boolean;
  loginForm: FormGroup;
  public isValid: boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;
  progressSpinner:boolean;

  constructor(public apiService: ApiServices,private formBuilder: FormBuilder,private navbar:NavbarService,
    private toastr: ToastrService,public router: Router,private localStore: LocalStorageService) {
    this.submit=false;
    this.isValid=false;
    this.progressSpinner=false;
    this.loginForm=formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      email_value: ['', Validators.required],
      password_value: ['', Validators.required],
   });
   }

  ngOnInit(): void {
    this.navbar.hide();
    if(this.localStore.getData("token") !== null){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(){
   this.submit=true;
    if(this.loginForm.valid){
      const data = {
        email:this.loginForm.value.email_value,
        password:this.loginForm.value.password_value
      };
      this.progressSpinner=true;
      this.apiService.login_API(data).subscribe((res: any) => {
        this.progressSpinner=false;
        if(res.status === 'succes'){
          this.localStore.saveData("token",res.token);
          this.localStore.saveData("id",res.id);
          this.router.navigateByUrl('/home');
        }
        else{
          this.navbar.showSuccess(res.status);
        }
      },(error: any) => {
        this.progressSpinner=false;
        console.log('error',error);
        this.navbar.showSuccess("Something went wrong");
      });
    }
  }

  get errorCtr() {
    return this.loginForm.controls;
  }

  tryRegister(){

    this.router.navigate(['/register']);
  }

}
