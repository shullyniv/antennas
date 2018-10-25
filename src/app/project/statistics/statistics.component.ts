import { Component, OnInit } from '@angular/core';
import { AntennasService } from '../../antennas.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  dict: any[] =undefined;
  constructor(private antennaService:AntennasService) {
    this.antennaService.showsSpinner();
    this.antennaService.getStatisticCompany().subscribe((res: any[]) => { 
      this.antennaService.hideSpinner();
      this.dict= res});
   }

  ngOnInit() {
  }

}
