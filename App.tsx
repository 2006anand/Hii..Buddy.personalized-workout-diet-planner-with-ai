import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkoutForm from './components/WorkoutForm';
import PlanDisplay from './components/PlanDisplay';
import AlphaAccess from './components/AlphaAccess';
import ProgressTracker from './components/ProgressTracker';
import { generateFitnessPlan } from './services/geminiService';
import { UserProfile, FitnessPlan, ProgressEntry } from './types';

const App: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'history'>('plan');
  const [logs, setLogs] = useState<ProgressEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Sync dark mode
    document.documentElement.classList.add('dark');
    
    // Load local storage
    const savedLogs = localStorage.getItem('alpha_gym_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    const savedName = localStorage.getItem('alpha_user_name');
    if (savedName) {
      setUserName(savedName);
      setIsAuthorized(true);
    }

    const savedProfile = localStorage.getItem('alpha_user_profile');
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => {
    localStorage.setItem('alpha_gym_logs', JSON.stringify(logs));
  }, [logs]);

  const handleGenerate = async (profile: UserProfile) => {
    if (!isAuthorized) {
      setShowAccessModal(true);
      return;
    }
    setLoading(true);
    setUserProfile(profile);
    localStorage.setItem('alpha_user_profile', JSON.stringify(profile));
    
    try {
      const result = await generateFitnessPlan(profile);
      setPlan(result);
      setActiveTab('plan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Plan Generation Error:", err);
      alert("System Pulse Failure: Could not generate plan. Please verify your API Key configuration in the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = (name: string) => {
    setIsAuthorized(true);
    setUserName(name);
    setShowAccessModal(false);
    localStorage.setItem('alpha_user_name', name);
  };

  const handleAddLog = (entry: ProgressEntry) => {
    setLogs(prev => [...prev, entry]);
  };

  const handleEnterGym = () => {
    if (!isAuthorized) {
      setShowAccessModal(true);
    } else {
      setPlan(null);
      setActiveTab('plan');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <Header 
        onHistoryClick={() => setActiveTab('history')}
        onEnterGym={handleEnterGym}
        userName={userName}
      />

      <main className="relative z-10">
        {!plan && activeTab === 'plan' && (
          <div className="animate-in">
            <Hero />
            <div className="pb-24 px-4">
              <WorkoutForm onSubmit={handleGenerate} loading={loading} />
            </div>
          </div>
        )}

        {plan && activeTab === 'plan' && (
          <div className="py-12 px-4 animate-in">
            <PlanDisplay plan={plan} onReset={() => setPlan(null)} />
          </div>
        )}

        {activeTab === 'history' && (
            <div className="py-12 px-4 animate-in">
                <ProgressTracker 
                  logs={logs} 
                  onAddLog={handleAddLog} 
                  userProfile={userProfile} 
                />
            </div>
        )}
      </main>

      {showAccessModal && (
        <AlphaAccess 
          onClose={() => setShowAccessModal(false)} 
          onAuthorize={handleAuthorize} 
        />
      )}

      {/* Modern Background Decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden select-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L6.28 3.43L4.86 2L3.43 3.43L2 4.86L3.43 6.28L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L17.72 20.57L19.15 22L20.57 20.57L22 19.14L20.57 17.71L22 16.28L20.57 14.86Z"/>
            </svg>
        </div>
      </div>
    </div>
  );
};

export default App;
