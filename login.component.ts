import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    name: string;
    password: string;
    session_id: number;

    cmdStatus: string;

    constructor(private httpClient: HttpClient, private router: Router) {

        this.name = localStorage.getItem('name');
        this.password = localStorage.getItem('password');
        this.hashed_password = 0;
        this.cmdStatus = 'Please enter your username and password.';

        console.log("name: " + localStorage.getItem('name'));
        console.log("password: " + localStorage.getItem('password'));

    }

    attemptlogin(event) {

        console.log("received: " + event.target.id);

        var loginStatus = false;

        var httpBase = "https://classreservation.azurewebsites.net/api/signup?user=";
        var httpQuery = httpBase + this.name + "&password=" + this.password;

        this.httpClient.get(httpQuery).subscribe((res) => {

            if (res["status"] == true) {

                if (res["status"]['info'] != null) {

                    this.session_id = res["info"]["sessionId"];
                    this.cmdStatus = 'Logged in successfully as user ' + res["info"]["name"];

                }

                loginStatus = true;

            }

        });

        if (!loginStatus) {
            this.cmdStatus = "Failed to log in."
        }
    }

  ngOnInit() {
  }

}
