import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Submission, SubmissionAnswer } from './models/submission.interface';

const SUBMISSION_API = '/api/submissions';
const ANSWERS_API = '/api/submission_answers';

@Injectable()
export class SubmissionsService {
  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  getSubmissions(): Observable<Submission[]> {
    return this.http.get<Submission[]>(SUBMISSION_API);
  }

  getSubmission(id: number): Observable<Submission> {
    return this.http.get<Submission>(`${SUBMISSION_API}/${id}`);
  }

  searchAndFilterSubmissions(query: string, date: Date | undefined) {
    let submissions: Observable<Submission[]> = this.getSubmissions();
    submissions = this.filterAddresses(submissions, query);
    submissions = this.filterSubmissionDates(submissions, date);
    return submissions;
  }

  filterSubmissionDates(submissions: Observable<Submission[]>, date: Date) {
    if (!date) {
      return submissions;
    }
    const queryDateString = this.transformDate(date);
    return submissions.pipe(
      map((data: Submission[]) =>
        data.filter((submission: Submission) => {
          const dateString = this.transformDate(submission.date);
          return queryDateString === dateString;
        })
      )
    );
  }

  transformDate(date) {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  filterAddresses(
    submissions: Observable<Submission[]>,
    query: string
  ): Observable<Submission[]> {
    if (!query) {
      return submissions;
    }
    return submissions.pipe(
      map((data: Submission[]) => {
        return data.filter(
          (submission: Submission) =>
            submission.address.toLowerCase().search(query.toLowerCase()) > 0
        );
      })
    );
  }

  getSubmissionAnswers(submission: Submission): Observable<SubmissionAnswer[]> {
    return this.http.get<SubmissionAnswer[]>(
      `${ANSWERS_API}?submissionId=${submission.id}`
    );
  }
}
