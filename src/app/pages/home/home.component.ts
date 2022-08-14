import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private localStore: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.localStore.getData("token") == null){
      this.router.navigateByUrl('/login');
    }
  }
  logout(){
    this.localStore.clearData();
    this.router.navigateByUrl('/login');
  }

}
