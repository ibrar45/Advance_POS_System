import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
 
  isCondensed: boolean = false;
  isGettingData: boolean = false;
  designationName: any;
  roleName: any;
  isAdmin: any;
  userName: any;
  fullName: any;
  email: any;

  isSalesToggle: boolean = false;
  isCustomerToggle: boolean = false;
  isInventoryToggle: boolean = false;
  isReportsToggle: boolean = false;


  isAssignAreaToggle: boolean = false;
  isBulUtilizationToggle: boolean = false;
  isTaxSetupToggle: boolean = false;
  isLocalityFactorToggle: boolean = false;
  ispropSelectionToggle: boolean = false;
  isSmallFontChecked: boolean = true;
  currentYear: any;


  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    debugger;
  

    this.changeSidebar("dark");

  }
  userMenu: boolean = false;
  changeSidebar(value: string) {
    switch (value) {
      case "light":
        document.body.setAttribute('data-sidebar', 'light');
        document.body.setAttribute('data-topbar', 'dark');
        document.body.removeAttribute('data-sidebar-size');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "compact":
        document.body.setAttribute('data-sidebar-size', 'small');
        document.body.setAttribute('data-sidebar', 'dark');
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "dark":
        document.body.setAttribute('data-sidebar', 'dark');
        break;
      case "icon":
        document.body.classList.add('vertical-collpsed');
        document.body.setAttribute('data-sidebar', 'dark');
        document.body.removeAttribute('data-layout-size');
        document.body.setAttribute('data-keep-enlarged', "true");
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "colored":
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.setAttribute('data-sidebar', 'colored');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-scrollable');
        document.body.removeAttribute('data-sidebar-size');
        break;
      default:
        document.body.setAttribute('data-sidebar', 'dark');
        break;
    }
  }

  onToggleMobileMenu() {
    document.body.classList.toggle('vertical-collpsed');
    document.body.classList.toggle('sidebar-enable');
  }





  //onToggleMobileMenu() {
  //  this.isCondensed = !this.isCondensed;
  //  if (this.isCondensed == true) {
  //    document.body.classList.add('sidebar-enable');
  //    document.body.classList.add('vertical-collpsed');
  //  }
  //  else {
  //    document.body.classList.remove('sidebar-enable');
  //    document.body.classList.remove('vertical-collpsed');
  //  }
  //}
  themeMenu: boolean = false;
  changeTheme() {
    this.themeMenu = !this.themeMenu;
    if (this.themeMenu == true) {
      document.body.setAttribute('data-bs-theme', 'dark');
      document.body.setAttribute('data-sidebar', 'dark');
    }
    else {
      document.body.setAttribute('data-bs-theme', 'light');
      document.body.setAttribute('data-sidebar', 'dark');
    }
  }
  logout() {
    //this.router.navigate(['/login']);
  }

  toggleSubMenu(subMenu: string): void {
    if (subMenu === 'sales') {
      this.isSalesToggle = !this.isSalesToggle;
   

    }
    else if (subMenu === 'customer') {
      this.isCustomerToggle = !this.isCustomerToggle;
      this.isSalesToggle = false;

    }
    else if (subMenu === 'Inventory') {
      this.isInventoryToggle = !this.isInventoryToggle;
      this.isCustomerToggle = false;
      this.isSalesToggle = false;

    }

    else if (subMenu === 'reports') {
      this.isReportsToggle = !this.isReportsToggle;
      this.isCustomerToggle = false;
      this.isSalesToggle = false;
      this.isInventoryToggle = false;
    }

  }
  toggleMenu(): void {
    this.isAssignAreaToggle = false;
    this.isSalesToggle = false;
    this.isTaxSetupToggle = false;
    this.isBulUtilizationToggle = false;
    this.ispropSelectionToggle = false;
    this.isLocalityFactorToggle = false;
  }
  isSalesActive() { }
  isCustomerActive() { }
  isInventoryActive() { }
  isReportsActive() { }

  toggleFont() {
    this.isSmallFontChecked = !this.isSmallFontChecked;
  }
}

