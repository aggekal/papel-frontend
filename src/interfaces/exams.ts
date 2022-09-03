import { EXAM_STATUS } from "../types/examTypes";

export interface ExamState {
  availableExams: Exam[];
  questions: string[];
  start: string;
  maxScore: string;
  status: EXAM_STATUS;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string[];
  isReady: boolean;
}

export interface ExamInput {
  lessonId: string;
}

export interface CreateExamResponse {
  status: number;
}

export interface ValidationErrors {
  data: string[];
  field_errors: Record<string, string>;
}

export interface Exam {
  startDate: Date;
  questions: string[];
  maxScore: number;
  status: string;
}
