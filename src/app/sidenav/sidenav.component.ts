import { Component, ViewChild } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngAfterViewInit(): void {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');

    closeBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange() {
      if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }
}
