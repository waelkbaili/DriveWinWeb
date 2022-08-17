import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatConfirmDialogComponent } from '../pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { ApiServices } from './api-services.service';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;
  progressSpinner:boolean;


  constructor(private localStore: LocalStorageService, private router: Router,private dialog: MatDialog,
    public apiService: ApiServices,private toastr: ToastrService) {
    this.visible = false;
    this.progressSpinner=false;
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  logout(){
    const dialogRef=this.dialog.open(MatConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result === 'true'){
        this.progressSpinner=true;
        this.apiService.logout_API().subscribe((res: any) => {
          this.progressSpinner=false;
          this.localStore.clearData();
          this.router.navigateByUrl('/login');
        },(error: any) => {
          this.progressSpinner=false;
          console.log('error',error);
          this.showSuccess("Something went wrong");
        });
      }
    })

  }

  profil(){
    this.router.navigateByUrl('/profil');
  }
  historique(){
    this.router.navigateByUrl('/historique');
  }
  lastTrip(){
    this.router.navigateByUrl('/lastTrip');
  }
  controller(){
    this.router.navigateByUrl('/controller');
  }
  settings(){
    this.router.navigateByUrl('/settings');
  }
  showSuccess(msg: string) {
    this.toastr.error(msg);
  }
}
