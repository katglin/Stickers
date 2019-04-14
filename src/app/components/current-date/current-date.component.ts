import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-date',
  templateUrl: './current-date.component.html',
  styleUrls: ['./current-date.component.css'],
  providers: [DatePipe]
})
export class CurrentDateComponent implements OnInit {

  myDate : Date;
  currentDate : string;

  constructor(private datePipe: DatePipe) {
    setInterval(() => {
      this.myDate = new Date();
      this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    }, 1);
  }

  ngOnInit() {
  }

}
