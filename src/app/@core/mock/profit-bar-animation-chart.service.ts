import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProfitBarAnimationChartData } from '../data/profit-bar-animation-chart';
import { HeartAttackCounter } from '../data/heart-attack-counter';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import *  as  HeartAttackPredictor from '../../../assets/mock/heartAttackCounter.json';


@Injectable()
export class ProfitBarAnimationChartService extends ProfitBarAnimationChartData {

  private HeartAttackCounter: HeartAttackCounter[]=[];
  private data: any;

  constructor(private http: HttpClient) {
    super();
   
  }
  ngOnInit() {
   
  }
  getDataForHeartAttackCounter(): Observable<HeartAttackCounter[]> {


  // return observableOf((HeartAttackPredictor as any).default); 

   return this.http.get<HeartAttackCounter[]>(environment.heartiAttackCounterUrl);
    
  }

  getDataForFirstLine(): number[] {   

    //Write the code to get predicted value from our object
    let firstLinedata: number[] = [];
    for (let i = 0; i < this.HeartAttackCounter.length; i++) {
     //var a= HeartAttackCounter[0].cured;
      firstLinedata.push(this.HeartAttackCounter[i].predicted);
    }

    return firstLinedata;
      
  }

  getDataForSecondLine(): number[] {

    //Write the code to get predicted value from our object
    let secondLinedata: number[] = [];
    for (let i = 0; i < this.HeartAttackCounter.length; i++) {
      
      secondLinedata.push(this.HeartAttackCounter[i].cured);
    }

    return secondLinedata;

  }

  createEmptyArray(nPoints: number) {
    return Array.from(Array(nPoints));
  }

  getChartData(): Observable<{ firstLine: number[]; secondLine: number[]; }> {
    return observableOf(this.data);
  }
}
