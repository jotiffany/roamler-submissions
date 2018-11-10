import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from './models/submission.interface';

const QUESTION_API = '/api/questions';

@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(QUESTION_API);
  }
}
