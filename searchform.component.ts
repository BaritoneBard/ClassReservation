import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';

baseURL = 'https://classreservation.azurewebsites.net/api/ClassLookup?'; // the base URL, extended by adding the lookup type

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  constructor() { }

  // need a text field or dropdown for the user to input the type requested

  classLookup(type) { // queries the database with the Class Lookup request
    
    return this.http.get(baseURL + '&type=' + type)

  }

  // table should use data from classLookup(), but data returned is of variable type based on the type field, so I'm not certain how to display it
  
  // could use ternary operators in adding columns? not certain whether that's supported here or not, though

  getselectValue = function (){
    var selectedValue = (<HTMLInputElement>document.getElementById("list")).value;
    var selectedValue = (<HTMLInputElement>document.getElementById("list2")).value;
    console.log(selectedValue);    
  }
  ngOnInit() {
  }

}
