// Shared content shapes for visible, localized AEO/GEO guidance blocks.

export interface QuestionAnswerViewModel {
  question: string;
  answer: string;
}

export interface QuickFactViewModel {
  label: string;
  value: string;
}

export interface ProductGuidanceViewModel {
  shortAnswer: string;
  bestFor: string[];
  benefits: string[];
  routineTips: string[];
  ingredientHighlights: string[];
  goodToKnow: string[];
  questionAnswers: QuestionAnswerViewModel[];
}
