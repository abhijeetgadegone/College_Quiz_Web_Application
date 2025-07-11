import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { SharedModule } from './module/shared/shared.module';
import { UserStorageService } from './module/auth/services/user-storage.service';
import { NavbarService } from './module/user/sevices/shared/navbar.service';
 // ✅ Import NavbarService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'QuizApp';

  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  navbarVisible: boolean = true; // ✅ Track navbar visibility

  constructor(
    private router: Router,
    private navbarService: NavbarService // ✅ Inject NavbarService
  ) {}

  ngOnInit() {
    this.updateLoginStatus();

    // ✅ Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });

    // ✅ Subscribe to NavbarService visibility state
    this.navbarService.visible$.subscribe((visible) => {
      this.navbarVisible = visible;
    });
  }

  updateLoginStatus(): void {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
  }

  logout(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
