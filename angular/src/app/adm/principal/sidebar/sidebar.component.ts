import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  fullImagePath = '/assets/images/user-bg.jpg';
  user = '/assets/images/user-regis.jpg';

  constructor() { }

  ngOnInit() {

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, 
      hover: true, 
      gutter: 0, 
      belowOrigin: false,
      alignment: 'left', 
      stopPropagation: false 
    }
    );

    $('.collapsible').collapsible();

  }

}
