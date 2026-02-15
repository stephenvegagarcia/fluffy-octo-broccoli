import React, { useState, useEffect, useRef } from 'react';
import { 
  Atom, ChevronLeft, Waves, Signal, Send, Sparkles, Brain, Radio, Shield, Zap, Activity, Cpu, Terminal
} from 'lucide-react';

const apiKey = ""; 

const App = () => {
  const [view, setView] = useState('locked'); 
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Interface Logic
  const [groundFrequency, setGroundFrequency] = useState(60); // 60Hz standard ground
  const [phaseShift, setPhaseShift] = useState(0);
  const [teleportedState, setTeleportedState] = useState(null);
  const [logs, setLogs] = useState(["[G-LINK] Searching for Ground Reference...", "[PHY] Impedance: 0.42 Ohms"]);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString([], {hour12:false})}] ${msg}`, ...prev].slice(0, 6));

  // --- THE "GROUND-SYNC" ALGORITHM ---
  const executeGroundTeleport = async () => {
    setLoading(true);
    addLog("Initiating Ground-Wave Entanglement...");
    
    // Step 1: Modulation
    await new Promise(r => setTimeout(r, 800));
    setPhaseShift(180); // Inverting phase to carry data
    addLog("Phase-Shift Keying (PSK) applied to Ground Rail.");

    // Step 2: Transmission of Classical Correction Bits via Electrical Pulse
    await new Promise(r => setTimeout(r, 1000));
    const m1 = Math.random() > 0.5 ? 1 : 0;
    const m2 = Math.random() > 0.5 ? 1 : 0;
    addLog(`Classical Correction received via Pulse: [${m1}, ${m2}]`);

    // Step 3: Reconstruction (The Quantum Math)
    // Applying the correction logic to the simulated "remote" qubit
    let result = (m1 ^ m2) === 1 ? "1" : "0";
    
    await new Promise(r => setTimeout(r, 600));
    setTeleportedState(result);
    setLoading(false);
    addLog(`Teleportation Successful. Final Ground State: |${result}⟩`);
  };

  const handlePin = (digit) => {
    const newPin = pin + digit;
    if (newPin.length <= 4) setPin(newPin);
    if (newPin === '1234') {
      setIsAuthorized(true);
      setView('home');
      addLog("Grounded. System Ready.");
    } else if (newPin.length === 4) {
      setPin('');
      addLog("Ground Fault: Improper PIN.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="relative w-[375px] h-[780px] bg-slate-900 rounded-[3.5rem] p-3 border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Dynamic Island Indicator */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-full z-[120] flex items-center justify-center border border-white/5">
           <div className="flex items-center gap-2">
             <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-amber-400 animate-ping' : 'bg-indigo-500 animate-pulse'}`} />
             <span className="text-[7px] font-black uppercase tracking-tighter text-white/50">Interface: GND-SENSE-01</span>
           </div>
        </div>

        <div className="relative w-full h-full rounded-[2.8rem] bg-black overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-16 w-full px-8 pt-10 flex justify-between items-center z-50">
            <Activity className="w-4 h-4 text-indigo-400" />
            <div className="flex gap-2 items-center">
              <span className="text-[9px] font-black opacity-40">60Hz SYNC</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            
            {view === 'locked' && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-12 p-8">
                <div className="flex flex-col items-center gap-2">
                  <Zap className="w-10 h-10 text-amber-500" />
                  <span className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest">Identify Ground</span>
                </div>
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full border border-white/10 transition-all ${pin.length > i ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-transparent'}`} />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[1,2,3,4,5,6,7,8,9,'',0,'X'].map((d, i) => (
                    <button key={i} onClick={() => d === 'X' ? setPin('') : handlePin(d)} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:scale-90 transition-all">{d}</button>
                  ))}
                </div>
              </div>
            )}

            {view === 'home' && (
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {/* Waveform Visualization */}
                <div className="bg-slate-900/50 border border-white/5 p-4 rounded-3xl h-40 relative overflow-hidden">
                  <span className="text-[8px] font-black opacity-30 uppercase absolute top-3 left-4">Gnd Oscilloscope</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-full h-[1px] bg-white/20" />
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <path 
                      d={`M 0 20 Q 10 ${20 - (loading ? 15 : 5)}, 20 20 T 40 20 T 60 20 T 80 20 T 100 20`} 
                      fill="none" 
                      stroke="#6366f1" 
                      strokeWidth="0.5"
                      className={loading ? "animate-[wave_1s_infinite_linear]" : ""}
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setView('teleport')} className="flex flex-col p-5 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl gap-4 hover:bg-indigo-600/20 transition-all">
                    <Radio className="w-6 h-6 text-indigo-400" />
                    <span className="text-[10px] font-black uppercase">Teleport Link</span>
                  </button>
                  <button className="flex flex-col p-5 bg-white/5 border border-white/10 rounded-3xl gap-4 opacity-50">
                    <Terminal className="w-6 h-6 text-slate-400" />
                    <span className="text-[10px] font-black uppercase">Debug Console</span>
                  </button>
                </div>

                <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                   <div className="flex justify-between text-[9px] font-black opacity-40 uppercase mb-3">
                     <span>Reference Basis</span>
                     <span>$\langle 0 | \psi \rangle$</span>
                   </div>
                   <div className="flex gap-2">
                     <div className="flex-1 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-[10px] font-bold text-indigo-400">GND_ALPHA</div>
                     <div className="flex-1 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-[10px] font-bold text-amber-400">GND_BETA</div>
                   </div>
                </div>
              </div>
            )}

            {view === 'teleport' && (
              <div className="flex-1 p-6 flex flex-col animate-in">
                <button onClick={() => setView('home')} className="mb-6 p-2 bg-white/5 rounded-xl w-fit"><ChevronLeft className="w-5 h-5"/></button>
                
                <div className="flex-1 space-y-8 flex flex-col justify-center">
                  <div className="text-center space-y-2">
                    <div className="relative inline-block">
                      <Atom className={`w-24 h-24 ${loading ? 'animate-spin text-indigo-400' : 'text-slate-700'}`} />
                      <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
                    </div>
                    <h2 className="text-lg font-black italic uppercase tracking-tighter">Ground-State <span className="text-indigo-400">Transfer</span></h2>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                    <div className="flex justify-between text-[9px] font-black opacity-30 uppercase">
                      <span>Phase Match</span>
                      <span>{phaseShift}&deg;</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-1000" style={{width: loading ? '100%' : '0%'}} />
                    </div>
                    <button 
                      onClick={executeGroundTeleport} 
                      disabled={loading}
                      className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-[11px] tracking-widest active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                    >
                      {loading ? 'MODULATING GROUND...' : 'INITIALIZE LINK'}
                    </button>
                  </div>

                  {teleportedState && (
                    <div className="p-8 bg-gradient-to-t from-indigo-600/20 to-transparent border border-indigo-500/30 rounded-[2.5rem] text-center animate-in">
                      <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest block mb-2">Qubit Recovered</span>
                      <div className="text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">|{teleportedState}⟩</div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Telemetry Log */}
          <div className="bg-black/80 border-t border-white/5 p-4 h-28 font-mono text-[7px] text-indigo-400/70 overflow-y-auto">
            {logs.map((log, i) => <div key={i} className="mb-1 uppercase tracking-tighter"><span className="opacity-30">#</span> {log}</div>)}
          </div>
          
          <div onClick={() => setView('home')} className="h-8 flex items-center justify-center cursor-pointer group">
            <div className="w-24 h-1 bg-white/10 rounded-full group-hover:bg-indigo-500 transition-all" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20px); }
        }
        .animate-in { animation: slideUp 0.5s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
};

export default App;
