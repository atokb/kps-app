import {Component, OnInit} from '@angular/core';
import {NgSurveysService, NgSurveyState, INgSurvey, IPageMap, IElementsMaps, IOptionAnswersMaps} from 'ng-surveys';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KPS';
  ngSurveyState: NgSurveyState;
  survey: INgSurvey;
  pages: IPageMap;
  elements: IElementsMaps;
  optionAnswers: IOptionAnswersMaps;

  constructor(
    private ngSurveys$: NgSurveysService, private auth: AuthService
  ) {}

  logout() {
    this.auth.doLogout();
  }

  ngOnInit() {
    this.ngSurveys$.getNgSurveyState().subscribe(res => {
      // console.log('ngSurveyStateRes: ', res);
      this.ngSurveyState = res;
    });

    this.ngSurveys$.getSurveyChanges().subscribe(resSurvey => {
      // console.log('resSurvey: ', resSurvey);
      this.survey = resSurvey;
    });

    this.ngSurveys$.getPagesChanges().subscribe(pagesRes => {
      // console.log('pagesRes: ', pagesRes);
      this.pages = pagesRes;
    });

    this.ngSurveys$.getElementsChanges().subscribe(elementsRes => {
      // console.log('elementsRes: ', elementsRes);
      this.elements = elementsRes;
    });

    this.ngSurveys$.getOptionAnswersChanges().subscribe(optionAnswersRes => {
      // console.log('optionAnswersRes: ', optionAnswersRes);
      this.optionAnswers = optionAnswersRes;
    });
  }
}
