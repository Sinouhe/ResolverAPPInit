import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from './Car';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  public cars: Car[];

  constructor(private activatedReoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedReoute.data.subscribe(data => console.log(data['cars']));
  }

}
