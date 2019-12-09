import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';

baseURL = 'https://classreservation.azurewebsites.net/api/login?';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  // need a set of text fields for username/password, pass those to userLogin

  userLogin(user, password) { // submits a login attempt

    return this.http.get(baseURL + 'user=' + user + '&password=' + password)

  }

  // should provide the HTTP response with the new name + session ID

  /* example:
  <script>
    <div ng-switch=this.status>
      <div ng-switch-when="true">
        <p>
          Logged in successfully!
        </p>
      </div>
      <div ng-switch-default>
        <p>
          Failed to login, username/password invalid.
        </p>
      </div>
    </div>
  </script>
  */

  ngOnInit() {
  }

}
