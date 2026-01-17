import React, { useState } from 'react';
import { ProgressEntry, LoggedExercise } from '../types';

interface LogFormProps {
  onSave: (entry: ProgressEntry) => void;
  onCancel: () => void;
  initialWeight?: number;
}

const LogForm: React.FC<LogFormProps> = ({ onSave, onCancel, initialWeight = 70 }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bodyWeight: initialWeight,
    waist: 0,
    chest: 0,
    arms: 0,
    workoutCompleted: true,
    notes: '',
  });

  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);
  const [currentExName, setCurrentExName] = useState('');
  const [currentSets, setCurrentSets] = useState<{reps: number, weight: number}[]>([{ reps: 10, weight: 0 }]);

  const handleAddExercise = () => {
    if (!currentExName) return;
    setLoggedExercises([...loggedExercises, { name: currentExName, sets: currentSets }]);
    setCurrentExName('');
    setCurrentSets([{ reps: 10, weight: 0 }]);
  };

  const updateSet = (index: number, field: 'reps' | 'weight', value: number) => {
    const newSets = [...currentSets];
    newSets[index][field] = value;
    setCurrentSets(newSets);
  };

  const addSet = () => setCurrentSets([...currentSets, { reps: 10, weight: 0 }]);
  const removeSet = (index: number) => {
    if (currentSets.length > 1) {
      setCurrentSets(currentSets.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: ProgressEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: formData.date,
      bodyWeight: formData.bodyWeight,
      measurements: {
        waist: formData.waist,
        chest: formData.chest,
        arms: formData.arms,
      },
      workoutCompleted: formData.workoutCompleted,
      notes: formData.notes,
      loggedExercises: loggedExercises,
      personalBests: loggedExercises.map(ex => ({
        exercise: ex.name,
        weight: Math.max(...ex.sets.map(s => s.weight))
      })).filter(pb => pb.weight > 0)
    };
    onSave(entry);
  };

  const inputClasses = "w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none focus:border-indigo-600 transition-all text-sm";
  const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl overflow-y-auto no-scrollbar">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[48px] shadow-2xl p-10 md:p-14 border-2 border-indigo-500/20 relative animate-in zoom-in-95 duration-200 my-8">
        <button 
          onClick={onCancel}
          className="absolute top-10 right-10 text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-black heading-font text-slate-900 dark:text-white uppercase leading-none italic">
            LOG <span className="text-indigo-600">INTEL</span>
          </h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
            Mission Deployment Statistics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className={inputClasses} required />
            </div>
            <div>
              <label className={labelClasses}>Body Weight (kg)</label>
              <input type="number" step="0.1" value={formData.bodyWeight} onChange={e => setFormData({...formData, bodyWeight: Number(e.target.value)})} className={inputClasses} required />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border-2 border-slate-100 dark:border-slate-800">
            <label className={labelClasses}>Body Measurements (cm)</label>
            <div className="grid grid-cols-3 gap-4">
              <input placeholder="Waist" type="number" step="0.1" onChange={e => setFormData({...formData, waist: Number(e.target.value)})} className={inputClasses} />
              <input placeholder="Chest" type="number" step="0.1" onChange={e => setFormData({...formData, chest: Number(e.target.value)})} className={inputClasses} />
              <input placeholder="Arms" type="number" step="0.1" onChange={e => setFormData({...formData, arms: Number(e.target.value)})} className={inputClasses} />
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[32px] border-2 border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 2C5.57 2 4 3.57 4 5.5s1.57 3.5 3.5 3.5c.36 0 .71-.05 1.05-.15L11.41 12l-2.86 3.15c-.34-.1-.69-.15-1.05-.15-1.93 0-3.5 1.57-3.5 3.5S5.57 22 7.5 22s3.5-1.57 3.5-3.5c0-.36-.05-.71-.15-1.05L14 14.59l3.15 2.86c-.1.34-.15.69-.15 1.05 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5c-.36 0-.71.05-1.05.15L16.59 12l2.86-3.15c.34.1.69.15 1.05.15 1.93 0 3.5-1.57 3.5-3.5S22.43 2 20.5 2s-3.5 1.57-3.5 3.5c0 .36.05.71.15 1.05L14 9.41 10.85 6.55c.1-.34.15-.69.15-1.05 0-1.93-1.57-3.5-3.5-3.5z"/></svg>
              Combat Logistics
            </h3>

            {loggedExercises.map((ex, i) => (
              <div key={i} className="mb-4 p-4 bg-white dark:bg-slate-900 rounded-2xl flex justify-between items-center shadow-sm">
                <div>
                  <span className="font-black text-slate-800 dark:text-white uppercase text-xs">{ex.name}</span>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                    {ex.sets.length} Sets • Max {Math.max(...ex.sets.map(s => s.weight))} kg
                  </div>
                </div>
                <button type="button" onClick={() => setLoggedExercises(loggedExercises.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 font-black">×</button>
              </div>
            ))}

            <div className="space-y-4 pt-4 border-t border-indigo-100 dark:border-indigo-900/50">
              <input 
                placeholder="Exercise Name (e.g. Bench Press)" 
                className={inputClasses}
                value={currentExName}
                onChange={e => setCurrentExName(e.target.value)}
              />
              <div className="space-y-2">
                {currentSets.map((set, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-[10px] font-black text-indigo-400 w-8">#{i+1}</span>
                    <input type="number" placeholder="Weight" className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-900 text-xs font-bold border border-indigo-100 dark:border-indigo-900" value={set.weight} onChange={e => updateSet(i, 'weight', Number(e.target.value))} />
                    <input type="number" placeholder="Reps" className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-900 text-xs font-bold border border-indigo-100 dark:border-indigo-900" value={set.reps} onChange={e => updateSet(i, 'reps', Number(e.target.value))} />
                    <button type="button" onClick={() => removeSet(i)} className="text-slate-300 hover:text-red-500 font-black px-2">×</button>
                  </div>
                ))}
                <button type="button" onClick={addSet} className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 transition-colors py-2 px-4 border-2 border-dashed border-indigo-200 dark:border-indigo-900 rounded-xl w-full">
                  + Add Set
                </button>
              </div>
              <button 
                type="button" 
                onClick={handleAddExercise}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-500/30 active:scale-95 transition-all"
              >
                Capture Exercise
              </button>
            </div>
          </div>

          <textarea 
            value={formData.notes} 
            onChange={e => setFormData({...formData, notes: e.target.value})} 
            placeholder="Field notes (mood, energy, pump...)" 
            className={`${inputClasses} h-28 resize-none`} 
          />

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onCancel} className="flex-1 py-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
              Abort
            </button>
            <button type="submit" className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-emerald-500/40 transition-all">
              Save Statistics
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogForm;
