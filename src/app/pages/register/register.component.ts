import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServices } from 'src/app/services/api-services.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submit:boolean;
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
    this.registerForm=formBuilder.group({
      email_value: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      password_value: ['', Validators.required],
      name_value: ['', Validators.required],
      address_value: ['', Validators.required],
      username_value: ['', Validators.required],
      birthDate_value: ['', Validators.required],
      permis_value: ['', Validators.required],
      gender_value: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.navbar.hide();
  }

  onSubmit(){
    this.submit=true;
    if(this.registerForm.valid){
      const data = {
        email:this.registerForm.value.email_value,
        password:this.registerForm.value.password_value,
        name:this.registerForm.value.name_value,
        gender:this.registerForm.value.gender_value,
        dateBirth:this.registerForm.value.birthDate_value,
        address:this.registerForm.value.address_value,
        username:this.registerForm.value.username_value,
        permis:this.registerForm.value.permis_value
      };
      this.progressSpinner=true;
      this.apiService.register_API(data).subscribe((res: any) => {
        this.progressSpinner=false;
        if(res.status === 'succes'){
          //this.localStore.saveData("token",res.token);
          //this.localStore.saveData("id",res.id);
          this.router.navigateByUrl('/login');
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
    return this.registerForm.controls;
  }

}
