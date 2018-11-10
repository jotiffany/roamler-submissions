/// <reference types="@types/googlemaps" />

import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  Submission,
  SubmissionAnswer,
  Question
} from '../models/submission.interface';
import { SubmissionsService } from '../submissions.service';
import { QuestionsService } from '../questions.service';
import { Router } from '@angular/router';
import { zip } from 'rxjs';

@Component({
  selector: 'app-submission-map-view',
  styleUrls: ['submission-map-view.component.scss'],
  templateUrl: './submission-map-view.component.html'
})
export class SubmissionMapViewComponent implements OnInit, OnChanges {
  @Input()
  submission: Submission;
  answers: SubmissionAnswer[] = [];
  questions: { [id: number]: Question } = {};

  @ViewChild('gmap') gmapElement: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor(
    private router: Router,
    private submissionService: SubmissionsService,
    private questionsService: QuestionsService
  ) {}

  ngOnInit() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 15,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  ngOnChanges() {
    if (this.submission) {
      this.loadQnA();
      const latlng = new google.maps.LatLng(
        this.submission.latitude,
        this.submission.longitude
      );
      this.map.setCenter(latlng);
      this.marker = new google.maps.Marker({
        position: latlng,
        map: this.map
      });
    }
  }

  loadQnA() {
    zip(
      this.questionsService.getQuestions(),
      this.submissionService.getSubmissionAnswers(this.submission)
    ).subscribe(results => {
      results[0].forEach(
        (question: Question) => (this.questions[question.id] = question)
      );
      this.answers = results[1]
        .map((answer: SubmissionAnswer) => {
          answer.question = this.questions[answer.questionId];
          return answer;
        })
        .sort((a, b) => a.question.index - b.question.index);
    });
  }

  goBack() {
    this.router.navigate(['/submissions']);
  }
}
