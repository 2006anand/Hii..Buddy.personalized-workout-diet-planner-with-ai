import React, { useState, useMemo } from 'react';
import { FitnessPlan, Meal, DayWorkout, WorkoutExercise } from '../types';

interface PlanDisplayProps {
  plan: FitnessPlan;
  onReset: () => void;
}

const ExerciseCard: React.FC<{ exercise: WorkoutExercise }> = ({ exercise }) => {
  return (
    <div className="bg-zinc-900/50 rounded-2xl p-5 border border-white/5 flex flex-col h-full group">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h5 className="text-[12px] font-bold text-white uppercase tracking-tight leading-snug group-hover:text-indigo-400 transition-colors">
          {exercise.name}
        </h5>
        <div className="text-right shrink-0">
          <div className="text-[12px] font-black text-indigo-400 leading-none">{exercise.sets}x{exercise.reps}</div>
          <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">REST: {exercise.rest}</div>
        </div>
      </div>
      <p className="text-[10px] text-zinc-500 leading-relaxed mb-4 italic opacity-80 flex-1">
        {exercise.description}
      </p>
      {exercise.videoUrl && (
        <a 
          href={exercise.videoUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-[8px] font-bold uppercase text-white bg-indigo-600/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all w-fit"
        >
          Form Video
        </a>
      )}
    </div>
  );
};

const MealCard: React.FC<{ meal: Meal; label: string }> = ({ meal, label }) => {
  return (
    <div className="glass-dark p-6 rounded-3xl border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div>
          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">{label}</span>
          <h4 className="text-[14px] font-bold text-white uppercase tracking-tight">{meal.name}</h4>
        </div>
        <div className="text-right shrink-0">
          <div className="bg-emerald-600/10 text-emerald-400 px-2 py-1 rounded-lg text-[9px] font-bold border border-emerald-500/20 mb-1">₹{meal.approxPrice}</div>
          <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{meal.calories} kcal</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {meal.items.map((item, i) => (
          <span key={i} className="px-2 py-1 bg-white/5 rounded-md text-[9px] font-medium text-zinc-400 border border-white/5">{item}</span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded-xl border border-white/5 mb-4">
        <div className="text-center">
          <span className="block text-[7px] font-bold text-zinc-600 uppercase">P</span>
          <span className="text-[10px] font-bold text-indigo-400">{meal.macros.protein}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] font-bold text-zinc-600 uppercase">C</span>
          <span className="text-[10px] font-bold text-emerald-400">{meal.macros.carbs}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] font-bold text-zinc-600 uppercase">F</span>
          <span className="text-[10px] font-bold text-amber-400">{meal.macros.fats}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5">
        <span className="text-[8px] font-bold text-zinc-700 uppercase block mb-1">Budget Alternative</span>
        <p className="text-[10px] text-zinc-500 italic leading-relaxed">{meal.budgetAlternative}</p>
      </div>
    </div>
  );
};

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onReset }) => {
  const [activeSection, setActiveSection] = useState<'meal' | 'lift' | 'tips'>('lift');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">Hii <span className="text-indigo-500">Buddy</span></h2>
          <p className="text-[11px] text-zinc-500 mt-2 font-medium tracking-tight">Your personalized fitness and nutrition protocol is ready.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={onReset} className="px-5 py-2 rounded-xl text-[9px] font-bold text-zinc-500 border border-white/10 hover:text-white hover:border-white/20 transition-all uppercase tracking-widest">Restart</button>
        </div>
      </div>

      <div className="flex justify-center md:justify-start gap-8 border-b border-white/5">
        {(['lift', 'meal', 'tips'] as const).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${
              activeSection === section ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {section === 'lift' ? 'Workout' : section === 'meal' ? 'Diet' : 'Subhchintak'}
            {activeSection === section && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500"></div>}
          </button>
        ))}
      </div>

      <div className="min-h-[500px] animate-in">
        {activeSection === 'lift' && (
          <div className="space-y-16">
            {plan.weeklyWorkoutPlan.map((day, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">{day.day}</h3>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">{day.title}</p>
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600 uppercase bg-white/5 px-3 py-1 rounded-lg">Duration: {day.duration}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {day.exercises.map((ex, i) => (
                    <ExerciseCard key={i} exercise={ex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'meal' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MealCard meal={plan.dailyDietPlan.breakfast} label="BREAKFAST" />
              <MealCard meal={plan.dailyDietPlan.lunch} label="LUNCH" />
              <MealCard meal={plan.dailyDietPlan.dinner} label="DINNER" />
              {plan.dailyDietPlan.snacks.map((snack, i) => (
                <MealCard key={i} meal={snack} label={`REFUEL ${i+1}`} />
              ))}
            </div>
            
            <div className="glass-dark p-8 rounded-3xl">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-6 border-l-2 border-emerald-500 pl-4">Budget Intelligence</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.budgetOptimizationTips.map((tip, i) => (
                  <p key={i} className="text-[10px] text-zinc-400 leading-relaxed font-medium bg-white/5 p-4 rounded-xl border border-white/5">
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="max-w-3xl mx-auto space-y-10 py-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                "{plan.subhchintakAdvice.mindsetQuote}"
              </h3>
              <div className="h-px w-16 bg-indigo-500/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {plan.subhchintakAdvice.tips.map((tip, i) => (
                <div key={i} className="p-5 glass-dark rounded-2xl flex gap-4 items-start">
                  <span className="text-indigo-500 font-bold text-[12px]">0{i+1}</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{tip}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">Recovery Directive</span>
              <p className="text-[11px] text-zinc-300 italic leading-relaxed">{plan.subhchintakAdvice.recoveryAdvice}</p>
            </div>

            <div className="text-center py-6 border-t border-white/5">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Hydration: {plan.hydrationGuidance.dailyTarget} Daily</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDisplay;
