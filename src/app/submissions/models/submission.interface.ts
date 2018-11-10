export interface Question {
  id: number;
  index: number;
  text: string;
}

export interface Submission {
  id: number;
  date: Date;
  latitude: number;
  longitude: number;
  address: string;
}

export interface SubmissionAnswer {
  id: number;
  submissionId: number;
  questionId: number;
  text: string;
  question?: Question;
}
