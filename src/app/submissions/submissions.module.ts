// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';

import { Routes, RouterModule } from '@angular/router';

// containers
import { SubmissionsDashboardComponent } from './containers/submissions-dashboard/submissions-dashboard.component';
import { SubmissionViewerComponent } from './containers/submission-viewer/submission-viewer.component';

// components
import { SubmissionMapViewComponent } from './components/submission-map-view.component';

// service
import { SubmissionsService } from './submissions.service';
import { QuestionsService } from './questions.service';

const routes: Routes = [
  {
    path: 'submissions',
    children: [
      { path: '', component: SubmissionsDashboardComponent },
      { path: ':id', component: SubmissionViewerComponent }
    ]
  }
];

@NgModule({
  declarations: [
    SubmissionsDashboardComponent,
    SubmissionViewerComponent,
    SubmissionMapViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [SubmissionsService, QuestionsService]
})
export class SubmissionsModule {}
