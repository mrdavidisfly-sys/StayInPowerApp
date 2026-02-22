import React, { useState, useMemo, useEffect } from 'react';
import {
  Shield,
  Zap,
  Heart,
  Users,
  Target,
  Award,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  Share2,
  Trophy,
  Activity,
  User,
  Combine
} from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

// --- Constants & Config ---
const APP_COLOR = {
  primary: '#3B82F6', // Blue
  secondary: '#EF4444', // Red
  accent: '#F59E0B', // Amber/Gold
  fusion: '#8B5CF6', // Purple
  bg: '#F3F4F6'
};

const GIFT_CATEGORIES = [
  { id: 'admin', name: 'Administrator', icon: Shield, desc: 'The Architect of the mission.' },
  { id: 'mercy', name: 'Mercy-Shower', icon: Heart, desc: 'The Healer and empathetic heart.' },
  { id: 'teacher', name: 'Teacher', icon: Target, desc: 'The Guide and clarity provider.' },
  { id: 'servant', name: 'Servant', icon: Activity, desc: 'The Hands-on First Responder.' },
  { id: 'exhorter', name: 'Exhorter', icon: Zap, desc: 'The Catalyst for movement.' },
  { id: 'giver', name: 'Giver', icon: Trophy, desc: 'The Strategic Resource Fueler.' },
  { id: 'evangelist', name: 'Evangelist', icon: Users, desc: 'The Outreach Scout.' }
];

const QUESTIONS = [
  { id: 1, text: "I enjoy organizing details to make events run smoothly.", category: 'admin' },
  { id: 2, text: "I feel a deep urge to help people who are hurting or in crisis.", category: 'mercy' },
  { id: 3, text: "I find it easy to explain complex Bible truths to others.", category: 'teacher' },
  { id: 4, text: "I am quick to notice physical needs (cleaning, fixing, setting up).", category: 'servant' },
  { id: 5, text: "I love encouraging people to take the next step in their faith.", category: 'exhorter' },
  { id: 6, text: "I look for opportunities to give money or resources strategically.", category: 'giver' },
  { id: 7, text: "I am comfortable starting conversations with strangers about God.", category: 'evangelist' },
  { id: 8, text: "I tend to see the 'big picture' and the steps needed to get there.", category: 'admin' },
  { id: 9, text: "I am very sensitive to the emotional atmosphere of a room.", category: 'mercy' },
  { id: 10, text: "I spend a lot of time researching to ensure I have the facts right.", category: 'teacher' },
  { id: 11, text: "I’d rather work behind the scenes than be in the spotlight.", category: 'servant' },
  { id: 12, text: "I enjoy challenging people to live up to their full potential.", category: 'exhorter' },
  { id: 13, text: "I am willing to lower my standard of living to give more away.", category: 'giver' },
  { id: 14, text: "I feel a 'burden' for people who don't know Jesus yet.", category: 'evangelist' },
  { id: 15, text: "I enjoy creating systems or schedules that help others.", category: 'admin' },
  { id: 16, text: "I find myself attracted to people who are lonely or overlooked.", category: 'mercy' },
  { id: 17, text: "I get excited when I see 'the lightbulb go on' for someone else.", category: 'teacher' },
  { id: 18, text: "I see 'to-do' lists as opportunities to serve the body of Christ.", category: 'servant' },
  { id: 19, text: "People often come to me when they need a 'pep talk' or advice.", category: 'exhorter' },
  { id: 20, text: "I manage my finances specifically so I can be a blessing to others.", category: 'giver' },
  { id: 21, text: "I am always thinking about how to reach our community/city.", category: 'evangelist' }
];

// --- Components ---

const ProgressBar = ({ current, total }) => (
  <div className="w-full h-3 bg-gray-100/50 backdrop-blur-sm rounded-full overflow-hidden mb-8 ring-1 ring-gray-200/50 shadow-inner">
    <div
      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out relative"
      style={{ width: `${(current / total) * 100}%` }}
    >
      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
    </div>
  </div>
);

const AssessmentView = ({ title, scores, setScores, onComplete }) => {
  const [qIndex, setQIndex] = useState(0);

  const handleScore = (val) => {
    const question = QUESTIONS[qIndex];
    setScores(prev => ({
      ...prev,
      [question.category]: (prev[question.category] || 0) + val
    }));

    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 md:p-10 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/60">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">{title}</h2>
        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide">
          {qIndex + 1} / {QUESTIONS.length}
        </span>
      </div>
      <ProgressBar current={qIndex + 1} total={QUESTIONS.length} />

      <div className="min-h-[140px] mb-10 flex items-center justify-center text-center">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight tracking-tight">
          "{QUESTIONS[qIndex].text}"
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3 md:gap-5">
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            onClick={() => handleScore(val)}
            className="group relative flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 bg-white hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${val <= 2 ? 'from-red-400 to-red-600' : val === 3 ? 'from-yellow-400 to-yellow-600' : 'from-blue-400 to-indigo-600'}`}></div>
            <span className={`text-2xl md:text-3xl font-black mb-1 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300 bg-gradient-to-br ${val <= 2 ? 'from-red-500 to-red-700' : val === 3 ? 'from-yellow-500 to-yellow-700' : 'from-blue-500 to-indigo-700'} text-gray-400`}>
              {val}
            </span>
            <span className="text-[9px] md:text-[11px] uppercase font-extrabold tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
              {val === 1 ? 'Never' : val === 5 ? 'Always' : ' '}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const BrandDashboard = ({ spouseA, spouseB }) => {
  const getTopGifts = (scores) => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);
  };

  const topA = getTopGifts(spouseA);
  const topB = getTopGifts(spouseB);

  const radarData = {
    labels: GIFT_CATEGORIES.map(g => g.name),
    datasets: [
      {
        label: 'Spouse A',
        data: GIFT_CATEGORIES.map(g => spouseA[g.id] || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: APP_COLOR.primary,
        borderWidth: 2,
        pointBackgroundColor: APP_COLOR.primary,
      },
      {
        label: 'Spouse B',
        data: GIFT_CATEGORIES.map(g => spouseB[g.id] || 0),
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: APP_COLOR.secondary,
        borderWidth: 2,
        pointBackgroundColor: APP_COLOR.secondary,
      }
    ]
  };

  // Fusion Logic
  const getMarriageBrand = () => {
    const primaryA = topA[0][0];
    const primaryB = topB[0][0];

    if (primaryA === 'teacher' && primaryB === 'servant') return "Informative Hospitality";
    if (primaryA === 'admin' && primaryB === 'mercy') return "Structured Care";
    if (primaryA === 'evangelist' && primaryB === 'giver') return "Strategic Outreach";
    if (primaryA === 'exhorter' && primaryB === 'teacher') return "Transformative Mentorship";
    return "Kingdom Catalyst";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-3 mb-2 rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Combine size={24} className="animate-pulse" />
        </div>
        <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 uppercase tracking-tighter">
          Command Center
        </h2>
        <p className="text-lg text-gray-500 font-medium tracking-wide uppercase">Your Marriage Brand is Activated</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 ring-1 ring-white/60 transform hover:scale-[1.01] transition-transform duration-500">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
            <Activity className="text-blue-500" strokeWidth={3} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">Fusion Analytics</span>
          </h3>
          <div className="h-[350px] relative">
            <Radar
              data={radarData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  r: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    angleLines: { color: 'rgba(0,0,0,0.05)' },
                    pointLabels: { font: { family: 'ui-sans-serif, system-ui, sans-serif', weight: 'bold', size: 12 } },
                    ticks: { display: false }
                  }
                },
                plugins: {
                  legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: 'ui-sans-serif, system-ui, sans-serif', weight: 'bold' } } }
                }
              }}
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-indigo-900/20 transform hover:scale-[1.01] transition-transform duration-500 flex flex-col justify-center text-center p-10 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-md shadow-inner ring-1 ring-white/20 mb-2">
              <Zap size={40} className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" fill="currentColor" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">The Marriage Brand</h3>
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-tight">
                {getMarriageBrand()}
              </h2>
            </div>
            <div className="pt-6 relative">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <p className="text-lg text-blue-100/90 font-medium leading-relaxed max-w-sm mx-auto">
                "Stay in this relationship, knowing it's not about you. It's about the <span className="text-white font-bold">Kingdom power</span> you activate together."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] shadow-2xl shadow-yellow-900/5 ring-1 ring-white/60 mt-12 group">
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-yellow-400 via-amber-500 to-orange-500"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-colors duration-700"></div>

        <div className="relative z-10 pl-4">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-amber-500" size={28} />
            <h3 className="text-2xl font-black text-gray-800">The Bounty <span className="text-gray-400 font-medium text-xl ml-2 tracking-wide">(Your 37-Year Forecast)</span></h3>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
            Based on your combined strengths in <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold mx-1 shadow-sm">{topA[0][0].toUpperCase()}</span> and <span className="px-3 py-1 rounded-lg bg-red-50 text-red-700 font-bold mx-1 shadow-sm">{topB[0][0].toUpperCase()}</span>, your marriage is designed to be a template of healing for your community. Every year you stay in this power, you accumulate a wealth of resources for the next generation.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={() => window.location.reload()}
          className="group relative w-full lg:w-auto lg:min-w-[300px] mx-auto py-5 px-8 bg-white text-gray-800 font-black text-lg rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-200 hover:ring-blue-300 hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/100 transition-colors duration-300"></div>
          <RefreshCcw size={22} className="relative group-hover:-rotate-180 transition-transform duration-700 ease-out text-gray-400 group-hover:text-blue-500" />
          <span className="relative group-hover:text-blue-600 transition-colors duration-300">Reset All Assessments</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState('welcome');
  const [spouseA, setSpouseA] = useState({});
  const [spouseB, setSpouseB] = useState({});

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden flex flex-col">
      {/* Decorative Background Meshes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-red-400/10 blur-[100px] mix-blend-multiply"></div>
      </div>

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 transform hover:rotate-12 transition-transform duration-300">
            <div className="absolute inset-0 bg-white/20 rounded-xl rounded-bl-none"></div>
            S
          </div>
          <span className="font-extrabold text-gray-900 tracking-tight uppercase text-lg">Stay In Power</span>
        </div>
        <div className="px-4 py-2 bg-gray-900/5 rounded-full backdrop-blur-md border border-white/50 text-xs font-bold text-gray-600 tracking-widest uppercase hidden md:block">
          Grace Church Plano • March 29, 2026
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 md:py-20 relative z-10 flex-grow flex flex-col">
        {step === 'welcome' && (
          <div className="m-auto w-full max-w-3xl text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="relative inline-block group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-full shadow-2xl ring-1 ring-white/50 transform group-hover:scale-110 transition-transform duration-500">
                <Shield size={72} strokeWidth={1.5} className="text-transparent fill-blue-600 bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 drop-shadow-sm" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9] drop-shadow-sm">
                Wonder Twins <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Activate
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600/90 font-medium max-w-2xl mx-auto leading-relaxed">
                Discover the unique <span className="text-gray-900 font-bold">Kingdom Power</span> of your marriage. Take the assessment together to reveal your brand.
              </p>
            </div>

            <div className="max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={() => setStep('spouseA')}
                className="relative w-full py-6 md:py-8 bg-gray-900 text-white font-black text-xl md:text-2xl tracking-wide rounded-[2rem] shadow-2xl hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 overflow-hidden flex items-center justify-center gap-4 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                Start Activation
                <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
              </button>
            </div>

            <div className="flex justify-center gap-4 md:gap-8 pt-10">
              {[
                { icon: Award, label: 'Purpose', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                { icon: Target, label: 'Vision', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Zap, label: 'Power', color: 'text-red-500', bg: 'bg-red-50' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm ring-1 ring-gray-900/5 hover:-translate-y-1 transition-transform duration-300">
                  <div className={`p-2 rounded-xl ${item.bg}`}>
                    <item.icon className={item.color} size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm uppercase font-black tracking-widest text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'spouseA' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex-grow flex flex-col justify-center">
            <div className="max-w-3xl mx-auto w-full flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100/80 backdrop-blur-sm text-blue-600 rounded-2xl shadow-inner ring-1 ring-blue-200">
                  <User size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">Spouse A</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600">The Visionary</p>
                </div>
              </div>
            </div>
            <AssessmentView
              title="Individual Power Scan"
              scores={spouseA}
              setScores={setSpouseA}
              onComplete={() => setStep('spouseB')}
            />
          </div>
        )}

        {step === 'spouseB' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex-grow flex flex-col justify-center">
            <div className="max-w-3xl mx-auto w-full flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100/80 backdrop-blur-sm text-red-600 rounded-2xl shadow-inner ring-1 ring-red-200">
                  <User size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">Spouse B</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-red-600">The Activator</p>
                </div>
              </div>
            </div>
            <AssessmentView
              title="Individual Power Scan"
              scores={spouseB}
              setScores={setSpouseB}
              onComplete={() => setStep('results')}
            />
          </div>
        )}

        {step === 'results' && (
          <div className="animate-in fade-in zoom-in-95 duration-700 w-full">
            <BrandDashboard spouseA={spouseA} spouseB={spouseB} />
          </div>
        )}
      </main>
    </div>
  );
}
