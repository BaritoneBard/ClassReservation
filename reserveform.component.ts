import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';

baseURL = 'https://classreservation.azurewebsites.net/api/ClassReserve?'

@Component({
  selector: 'app-reserveform',
  templateUrl: './reserveform.component.html',
  styleUrls: ['./reserveform.component.css']
})

export class ReserveformComponent implements OnInit {

  constructor() { }

  // need a text field for the website user to enter the values below

  classReserve(user, sessionid, campus, building, date, start, end) { // reserves a class in the database

    return this.http.get(baseURL + 'user=' + user + '&sessionid=' + sessionid + '&campus=' + campus + '&building=' + building + '&room=' + room + '&date=' + date + '&start=' + start + '&end=' + end)

  }

  // construct a text response using <p ng-bind ><\p> to bind the data to the display

  /* an example below (this.status would store the status returned by classReserve):

  <script>
    <p>
      {{this.status == "true" ? "Class reserved successfully!" : "Class reservation failed, try again."}}
    </p>
  </script>

  */

  ngOnInit() {
  }

}
