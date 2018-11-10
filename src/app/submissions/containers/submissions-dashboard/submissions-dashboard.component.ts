import {
  Component,
  OnInit,
  Inject,
  LOCALE_ID,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { SubmissionsService } from '../../submissions.service';
import { Submission } from '../../models/submission.interface';
@Component({
  selector: 'app-submissions-dashboard',
  styleUrls: ['submissions-dashboard.component.scss'],
  templateUrl: './submissions-dashboard.component.html'
})
export class SubmissionsDashboardComponent implements OnInit {
  @ViewChild('dateFilter') dateFilter: ElementRef;
  @ViewChild('searchQuery') searchQuery: ElementRef;
  submissions: Observable<Submission[]>;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private submissionsService: SubmissionsService
  ) {}

  ngOnInit() {
    this.submissions = this.submissionsService.getSubmissions();
  }

  handleSearch(event) {
    const query: string = event.target.value.trim();
    this.submissions = this.submissionsService.searchAndFilterSubmissions(
      query,
      this.getDateFilterValue()
    );
  }

  getDateFilterValue(): Date | undefined {
    if (this.dateFilter.nativeElement.value) {
      return new Date(this.dateFilter.nativeElement.value);
    }
    return undefined;
  }

  handleDateChange(event) {
    this.submissions = this.submissionsService.searchAndFilterSubmissions(
      this.searchQuery.nativeElement.value,
      event.value ? new Date(event.value) : undefined
    );
  }
}
