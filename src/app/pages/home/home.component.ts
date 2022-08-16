import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavbarService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private localStore: LocalStorageService, private router: Router,private navbar:NavbarService) { }

  ngOnInit(): void {
    this.navbar.show();
    if(this.localStore.getData("token") == null){
      this.router.navigateByUrl('/login');
    }
  }


}
