
export interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  fitnessGoal: string;
  experienceLevel: string;
  dailySchedule: string;
  workoutResources: string[];
  healthConditions: string;
  dietaryPreference: string;
  culturalFoodHabit: string;
  monthlyBudget: string;
  workoutDays: number;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
  videoUrl: string;
}

export interface DayWorkout {
  day: string;
  title: string;
  exercises: WorkoutExercise[];
  duration: string;
}

export interface Meal {
  name: string;
  items: string[];
  portionSizes: string;
  approxPrice: string;
  calories: string; // New field
  cookingInstructions: string[]; // New field
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  budgetAlternative: string;
}

export interface HydrationGuidance {
  dailyTarget: string;
  tips: string[];
}

export interface FitnessPlan {
  userProfileSummary: string;
  fitnessGoalAnalysis: string;
  weeklyWorkoutPlan: DayWorkout[];
  dailyDietPlan: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
  hydrationGuidance: HydrationGuidance;
  budgetOptimizationTips: string[];
  progressTrackingAdvice: string;
  studentMotivationNote: string;
  subhchintakAdvice: {
    title: string;
    tips: string[];
    recoveryAdvice: string;
    mindsetQuote: string;
  };
}

export interface LoggedExercise {
  name: string;
  sets: {
    reps: number;
    weight: number;
  }[];
}

export interface ProgressEntry {
  id: string;
  date: string;
  bodyWeight: number;
  measurements?: {
    waist?: number;
    chest?: number;
    arms?: number;
  };
  workoutCompleted: boolean;
  notes?: string;
  loggedExercises?: LoggedExercise[];
  personalBests?: {
    exercise: string;
    weight: number;
  }[];
}
