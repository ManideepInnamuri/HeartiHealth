import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval , Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import { LivePrediction } from '../../../../@core/data/live-prediction';
import { symptomPrediction } from '../../../../@core/data/symptomPrediction';
import { SymptomPredictonMapper } from '../../../../@core/data/symptomPredictionMapper';
import { EarningService } from '../../../../@core/mock/earning.service';

@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  @Input() selectedCurrency: string = 'Chest Pain';

  intervalSubscription: Subscription;
  currencies: string[] = ['Chest Pain', 'Blood Pressure', 'Cholesterol'];
  currentTheme: string;
  predictionLiveUpdateCardData : LivePrediction;
  liveUpdateChartData : SymptomPredictonMapper[] =[];
 

  


  constructor(private themeService: NbThemeService,
              private earningService: EarningData,
              private earningDataService : EarningService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit() {
    this.getEarningCardData(this.selectedCurrency);
  }

  changeCurrency(currency) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;
     this. getEarningCardData(currency);  
    }
  }


  private getEarningCardData(currency) {

       this.earningDataService.GetLiveRecords()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.predictionLiveUpdateCardData = res.filter((value) => value.symptomType.toLowerCase().includes(currency.toLowerCase()))[0];
      this.mapSymptomPredictionMapper(this.predictionLiveUpdateCardData.symptomPrediction);
     
      
      });
 
  }

   private mapSymptomPredictionMapper(symptomPredictions :symptomPrediction[])
   {

    for(let i=0;i<symptomPredictions.length;i++)
     {     
     this.liveUpdateChartData.push({value: [symptomPredictions[i].timeStamp,
      symptomPredictions[i].symptomValue]});  
    }
  
  }

  startReceivingLiveData(currency) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency)),
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
