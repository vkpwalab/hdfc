import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hdfc-loan';
  login: string;
  ans: string;
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  constructor(private router: Router, private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "YOU ARE ONLINE";
      } else {
        this.status = "YOU ARE OFFLINE"
      }
      alert(this.status);
    });
  }


ngOnInit(): void {

}
hasRoute(route: string) {
  return this.router.url.includes(route);
  // return this.router.url;
}
  
  }

