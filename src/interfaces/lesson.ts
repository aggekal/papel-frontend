import { LESSON_CATEGORIES } from "../types/selectionTypes";

export interface LessonProps {
  _id: string;
  name: string;
  category: LESSON_CATEGORIES;
}

export interface LessonState {
  lessons: LessonProps[];
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  errorMessage: string;
  selectedLesson: string;
}

export interface LessonResponse extends Array<LessonProps> {}

export interface LessonButtonProps {
  id: string;
  name: string;
  color: string;
}

export interface LessonListProps {
  onClick: (e: any) => void;
}

export interface CreateLessonProps {
  cancel: () => void;
}
