import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Submission } from '../../models/submission.interface';
import { switchMap } from 'rxjs/operators';
import { SubmissionsService } from '../../submissions.service';

@Component({
  selector: 'app-submission-viewer',
  styleUrls: ['submission-viewer.component.scss'],
  templateUrl: './submission-viewer.component.html'
})
export class SubmissionViewerComponent implements OnInit {
  submission: Submission;
  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionsService
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((data: Submission) =>
          this.submissionService.getSubmission(data.id)
        )
      )
      .subscribe((data: Submission) => (this.submission = data));
  }
}
