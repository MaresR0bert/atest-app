import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monitor-test',
  templateUrl: './monitor-test.component.html',
  styleUrls: ['./monitor-test.component.css']
})
export class MonitorTestComponent implements OnInit{

  testCode: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testCode = params['testCode'];
    })
  }

}
