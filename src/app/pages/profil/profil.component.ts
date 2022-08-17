import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServices } from 'src/app/services/api-services.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;
  progressSpinner:boolean=true;
  id: string;
  users:any=[];
  imageUrl:string='';
  getData:boolean=true;

  constructor(public apiService: ApiServices,private navbar:NavbarService,
    private toastr: ToastrService,public router: Router,private localStore: LocalStorageService) {
      this.id=localStore.getData('id')  as string;
     }
  ngOnInit(): void {
    this.navbar.show();
   this.apiService.getUserData_API(this.id).subscribe((res: any) => {
    console.log(res);
    if(res.status==='succes'){
      this.users.push(res.data);
      this.imageUrl='http://localhost/driveWin/laravel-api/'+this.users[0].image;
      this.progressSpinner=false;
      this.getData=true;
    }
  },(error: any) => {
    this.getData=true;
    this.progressSpinner=false;
    console.log('error',error);
    this.navbar.showSuccess("Something went wrong");
  });

  }

}
