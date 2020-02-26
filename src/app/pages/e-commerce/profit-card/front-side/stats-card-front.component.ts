import { Component } from '@angular/core';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { ProfitBarAnimationChartService } from '../../../../@core/mock/profit-bar-animation-chart.service'
import { HeartAttackCounter } from '../../../../@core/data/heart-attack-counter';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent {

  private alive = true;

  linesData: { firstLine: number[]; secondLine: number[] };

  constructor(private ProfitBarAnimationChartData: ProfitBarAnimationChartData,private ProfitBarAnimationChartService: ProfitBarAnimationChartService ) {

    
         this.ProfitBarAnimationChartService.getDataForHeartAttackCounter()
         .pipe(takeWhile(() => this.alive))
         .subscribe((res)=>
         {
          this.linesData=this.getDataForLine(res);
           
         
         });
  }
  public getDataForLine(HeartAttackCounter: HeartAttackCounter[]): { firstLine: number[]; secondLine: number[] } {  
  
    let data = { firstLine, secondLine};
    data.firstLine = [];
    data.secondLine = [];
    var firstLine: number[]=[];
    var secondLine: number[]=[];

    for (let i = 0; i < HeartAttackCounter.length; i++) {  

      firstLine.push(HeartAttackCounter[i].predicted);
      secondLine.push(HeartAttackCounter[i].cured);
    }
    data.firstLine = firstLine;
    data.secondLine = secondLine;
 
    return data; 
  }

public getDataForFirstLine(HeartAttackCounter: HeartAttackCounter[]):  number[] {  
    
  let firstLinedata: number[] = [];
  for (let i = 0; i < HeartAttackCounter.length; i++) {    
    firstLinedata.push(HeartAttackCounter[i].predicted);
  }

  return firstLinedata; 
}

private getDataForSecondLine(HeartAttackCounter : HeartAttackCounter[]): number[] {
  let secondLinedata: number[] = [];
  for (let i = 0; i < HeartAttackCounter.length; i++) {
    
    secondLinedata.push(HeartAttackCounter[i].cured);
  }

  return secondLinedata; 
}   

}
