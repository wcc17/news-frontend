import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  name: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmitClick() {
    console.log("submit");
  }

}
