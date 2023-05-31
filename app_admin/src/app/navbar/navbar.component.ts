import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "services/authentication.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public onLogout(): void {
    return this.authService.logout();
  }
}
