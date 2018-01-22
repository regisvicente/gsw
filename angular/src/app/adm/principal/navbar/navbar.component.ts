import {Component, OnInit, DoCheck} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from '../../../shared/services/login.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  titulo = '';
  
  constructor(
    private loginService: LoginService,
    private titleService: Title) {}

  ngOnInit() {  

    $('.button-collapse').sideNav();

    this.titulo = this.titleService.getTitle();   
  }

  ngDoCheck() {
    this.titulo = this.titleService.getTitle();
  }

  logout() {
    this.loginService.logout();
  }

}
