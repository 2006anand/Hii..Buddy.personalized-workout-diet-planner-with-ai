
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FitnessPlan } from "../types";

export const generateFitnessPlan = async (profile: UserProfile): Promise<FitnessPlan> => {
  // Always initialize with fresh key from environment directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Role: Elite AI Fitness & Nutrition Coach ("Subhchintak") for Indian students.
    Task: Create a high-performance, budget-conscious plan.
    
    Context:
    - User: ${profile.age}y, ${profile.gender}, ${profile.height}cm, ${profile.weight}kg
    - Objective: ${profile.fitnessGoal} (Level: ${profile.experienceLevel})
    - Constraints: ${profile.dailySchedule} sessions, ${profile.workoutResources.join(', ')} available.
    - Nutrition: ${profile.dietaryPreference} (${profile.culturalFoodHabit}), Budget: ${profile.monthlyBudget}
    - Commitment: ${profile.workoutDays} days/week

    Strict Directives:
    1. EXERCISES: 5-7 moves per session with descriptive YouTube links.
    2. MEALS: Indian-centric, calorie-counted, with "Student-Budget" alternatives.
    3. ADVICE: Mindset and recovery focus.
    
    Output in strictly JSON format according to the schema.
  `;

  const mealSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      items: { type: Type.ARRAY, items: { type: Type.STRING } },
      portionSizes: { type: Type.STRING },
      approxPrice: { type: Type.STRING },
      calories: { type: Type.STRING },
      cookingInstructions: { type: Type.ARRAY, items: { type: Type.STRING } },
      macros: {
        type: Type.OBJECT,
        properties: {
          protein: { type: Type.STRING },
          carbs: { type: Type.STRING },
          fats: { type: Type.STRING }
        },
        required: ["protein", "carbs", "fats"]
      },
      budgetAlternative: { type: Type.STRING }
    },
    required: ["name", "items", "portionSizes", "approxPrice", "calories", "cookingInstructions", "macros", "budgetAlternative"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          userProfileSummary: { type: Type.STRING },
          fitnessGoalAnalysis: { type: Type.STRING },
          weeklyWorkoutPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                title: { type: Type.STRING },
                duration: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      description: { type: Type.STRING },
                      videoUrl: { type: Type.STRING }
                    },
                    required: ["name", "sets", "reps", "rest", "description", "videoUrl"]
                  }
                }
              },
              required: ["day", "title", "exercises", "duration"]
            }
          },
          dailyDietPlan: {
            type: Type.OBJECT,
            properties: {
              breakfast: mealSchema,
              lunch: mealSchema,
              dinner: mealSchema,
              snacks: { type: Type.ARRAY, items: mealSchema }
            },
            required: ["breakfast", "lunch", "dinner", "snacks"]
          },
          hydrationGuidance: {
            type: Type.OBJECT,
            properties: {
              dailyTarget: { type: Type.STRING },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["dailyTarget", "tips"]
          },
          subhchintakAdvice: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } },
              recoveryAdvice: { type: Type.STRING },
              mindsetQuote: { type: Type.STRING }
            },
            required: ["title", "tips", "recoveryAdvice", "mindsetQuote"]
          },
          budgetOptimizationTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          progressTrackingAdvice: { type: Type.STRING },
          studentMotivationNote: { type: Type.STRING }
        },
        required: [
          "userProfileSummary", "fitnessGoalAnalysis", "weeklyWorkoutPlan", 
          "dailyDietPlan", "hydrationGuidance", "subhchintakAdvice", 
          "budgetOptimizationTips", "progressTrackingAdvice", "studentMotivationNote"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("Empty response from AI engine");
  }

  return JSON.parse(response.text);
};
