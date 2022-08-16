import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatConfirmDialogComponent } from '../pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;


  constructor(private localStore: LocalStorageService, private router: Router,private dialog: MatDialog) {
    this.visible = false;
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  logout(){
    const dialogRef=this.dialog.open(MatConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result === 'true'){
        this.localStore.clearData();
        this.router.navigateByUrl('/login');
      }
    })
  }
}
