import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

    name: string;
    email: string;
    password: string;
    session_id: number;

    cmdStatus: string;

    constructor(private httpClient: HttpClient, private router: Router) {

        this.name = localStorage.getItem('name');
        this.email = localStorage.getItem('email');
        this.password = localStorage.getItem('password');
        this.cmdStatus = "Please enter an email address"

        console.log("name: " + localStorage.getItem('name'));
        console.log("email: " + localStorage.getItem('email'));
        console.log("password: " + localStorage.getItem('password'));

    }

    attemptsignup(event) {

        console.log("received: " + event.target.id);

        var signupStatus = false;

        httpBase = "https://classreservation.azurewebsites.net/api/signup?user=";
        httpQuery = httpBase + this.name + "&password=" + this.password + "&group=Student&email=" + this.email;

        this.httpClient.get(httpQuery).subscribe((res) => {

            if (res["status"] == true) {

                if (res["status"]['info'] != null) {

                    this.name = res["info"]["name"]
                    this.session_id = res["info"]["sessionId"];
                    this.cmdStatus = 'Signed in successfully as user ' + res["info"]["name"];

                }

                signupStatus = true;

            }

        });

        if (!signupStatus) {

            this.cmdStatus = 'Username already taken!'

        }

    }

  ngOnInit() {
  }

}
