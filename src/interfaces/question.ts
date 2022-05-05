import { QUESTION_DIFFICULTIES, QUESTION_TYPES } from "../types/questionTypes";

export interface QuestionProps {
  _id?: string;
  lessonId?: string;
  category: QUESTION_TYPES;
  description: string;
  time: string;
  difficulty: QUESTION_DIFFICULTIES;
  penalty: boolean;
  chapter: string;
  score: string;
  correctAnswers: string[];
  availableAnswers: string[];
}

export interface QuestionRequestBody extends QuestionProps {
  lessonId: string;
}

export interface QuestionDeleteDetails {
  id: string;
}

export interface QuestionDeleteResponse {
  status: number;
}

export interface QuestionsState {
  questions: QuestionProps[];
  question: QuestionProps;
  questionToEdit: string;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isCreateSuccess: boolean;
  isDeleteSuccess: boolean;
  errorMessage: string;
}

export interface QuestionsQuery {
  lessonId: string;
}

export interface QuestionSuccessResponse {
  data: QuestionRequestBody;
  status: number;
}

export interface QuestionsResponse extends Array<QuestionProps> {}

export interface CreateQuestionProps {
  edit: boolean;
  cancel: () => void;
}
