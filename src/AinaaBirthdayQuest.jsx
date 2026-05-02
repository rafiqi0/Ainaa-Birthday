import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Heart, ChevronRight, Camera,
  CheckCircle, Trophy, Sparkles, Utensils, Leaf,
  ShoppingBag, Flag, MessageCircle, Gift, RefreshCw, Lock
} from "lucide-react";

// ─────────────────────────────────────────────
// FONTS + GLOBAL STYLES
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --cream:        #FAF7F0;
      --cream-dark:   #F0EAD9;
      --sage:         #7A9E7E;
      --sage-light:   #A8C5AC;
      --sage-dark:    #4E7255;
      --gold:         #C9A84C;
      --gold-light:   #E8C97E;
      --gold-dark:    #9A7A30;
      --charcoal:     #2C2C2C;
      --warm-gray:    #6B6560;
      --blush:        #E8D5C4;
      --glass-bg:     rgba(255,255,255,0.55);
      --glass-border: rgba(255,255,255,0.78);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--cream);
      font-family: 'Inter', sans-serif;
      color: var(--charcoal);
      min-height: 100vh;
      overflow-x: hidden;
    }

    .app-bg {
      min-height: 100vh;
      background:
        radial-gradient(ellipse at 15% 85%, rgba(122,158,126,0.13) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 15%, rgba(201,168,76,0.11) 0%, transparent 55%),
        radial-gradient(ellipse at 50% 50%, rgba(232,213,196,0.20) 0%, transparent 65%),
        var(--cream);
    }

    /* ── Glassmorphism ── */
    .glass-card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset;
    }

    /* ── Buttons ── */
    .btn-gold {
      background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
      color: white; border: none; border-radius: 50px;
      padding: 17px 32px; font-family: 'Inter', sans-serif; font-weight: 600;
      font-size: 16px; letter-spacing: 0.3px; cursor: pointer;
      transition: all 0.35s ease; box-shadow: 0 4px 22px rgba(201,168,76,0.42);
      width: 100%; min-height: 56px;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-gold:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 38px rgba(201,168,76,0.6); }
    .btn-gold:disabled { opacity: 0.42; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-gold.glowing { animation: goldPulse 2.2s ease-in-out infinite; }
    @keyframes goldPulse {
      0%,100% { box-shadow: 0 4px 22px rgba(201,168,76,0.45); }
      50%      { box-shadow: 0 6px 44px rgba(201,168,76,0.85), 0 0 70px rgba(201,168,76,0.28); }
    }

    .btn-sage {
      background: linear-gradient(135deg, var(--sage-dark), var(--sage));
      color: white; border: none; border-radius: 50px;
      padding: 17px 32px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px;
      cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(122,158,126,0.42);
      width: 100%; min-height: 56px; display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-sage:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(122,158,126,0.58); }
    .btn-sage:disabled { opacity: 0.42; cursor: not-allowed; }

    /* ── Progress ── */
    .prog-track { background: rgba(201,168,76,0.15); border-radius: 50px; height: 5px; overflow: hidden; }
    .prog-fill  { height: 100%; border-radius: 50px; background: linear-gradient(90deg,var(--sage),var(--gold)); transition: width 0.9s cubic-bezier(0.34,1.56,0.64,1); }

    /* ── Upload ── */
    .upload-zone {
      border: 2px dashed var(--sage-light); border-radius: 16px; padding: 22px 14px;
      text-align: center; cursor: pointer; transition: all 0.3s ease;
      background: rgba(122,158,126,0.04); position: relative; overflow: hidden;
    }
    .upload-zone:hover { border-color: var(--sage); background: rgba(122,158,126,0.09); }
    .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

    /* ── Trivia ── */
    .t-opt {
      border: 2px solid rgba(240,234,217,0.9); border-radius: 14px; padding: 14px 18px;
      cursor: pointer; transition: all 0.22s ease;
      background: var(--glass-bg); backdrop-filter: blur(12px);
      font-size: 15px; font-weight: 500; text-align: left; width: 100%; font-family: 'Inter', sans-serif;
    }
    .t-opt:hover    { border-color: var(--sage-light); background: rgba(122,158,126,0.09); }
    .t-opt.selected { border-color: var(--sage); background: rgba(122,158,126,0.14); color: var(--sage-dark); }
    .t-opt.correct  { border-color: #4CAF50; background: rgba(76,175,80,0.12); color: #2E7D32; }
    .t-opt.wrong    { border-color: #E53935; background: rgba(229,57,53,0.10); color: #C62828; }

    /* ── Cards ── */
    .r-card {
      border: 2px solid rgba(240,234,217,0.85); border-radius: 20px; overflow: hidden;
      cursor: pointer; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      background: var(--glass-bg); backdrop-filter: blur(16px);
    }
    .r-card:hover, .r-card.sel { border-color: var(--gold); box-shadow: 0 10px 36px rgba(201,168,76,0.22); transform: translateY(-3px); }
    .s-btn {
      border: 2px solid rgba(240,234,217,0.9); border-radius: 20px; padding: 26px 18px;
      cursor: pointer; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      background: var(--glass-bg); backdrop-filter: blur(16px); text-align: center; flex: 1;
    }
    .s-btn:hover, .s-btn.sel { border-color: var(--gold); background: rgba(201,168,76,0.09); transform: scale(1.04); }

    .divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent); margin: 30px 0; }

    /* ── Floating decorations ── */
    @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)}   50%{transform:translateY(-14px) rotate(12deg)} }
    @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)}   50%{transform:translateY(-10px) rotate(-8deg)} }
    @keyframes floatC { 0%,100%{transform:translateY(0) rotate(0deg)}   50%{transform:translateY(-18px) rotate(6deg)} }
    @keyframes twinkle { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
    .fl-a { animation: floatA 4s ease-in-out infinite; }
    .fl-b { animation: floatB 5.5s ease-in-out infinite; }
    .fl-c { animation: floatC 3.8s ease-in-out infinite; }
    .twink { animation: twinkle 2.5s ease-in-out infinite; }

    /* ── Dev button ── */
    .dev-btn {
      position: fixed; bottom: 18px; right: 18px; z-index: 9999;
      background: rgba(44,44,44,0.88); color: white; border: none; border-radius: 50px;
      padding: 8px 16px; font-size: 12px; cursor: pointer; backdrop-filter: blur(10px);
      display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif;
    }
  `}</style>
);

// ─────────────────────────────────────────────
// CONFETTI
// ─────────────────────────────────────────────
const fireConfetti = () => {
  const colors = ["#C9A84C","#7A9E7E","#E8D5C4","#FAF7F0","#E8C97E","#ffb3d1"];
  const el = document.createElement("canvas");
  el.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;";
  document.body.appendChild(el);
  const ctx = el.getContext("2d");
  el.width = window.innerWidth; el.height = window.innerHeight;
  const particles = Array.from({length:110}, () => ({
    x: Math.random()*el.width, y: -20,
    vx: (Math.random()-0.5)*5, vy: Math.random()*5+2,
    color: colors[Math.floor(Math.random()*colors.length)],
    r: Math.random()*7+3, rot: Math.random()*360, vrot: (Math.random()-0.5)*12,
    circle: Math.random() > 0.55
  }));
  let alive = true;
  const draw = () => {
    if (!alive) return;
    ctx.clearRect(0,0,el.width,el.height);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.14; p.rot+=p.vrot;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180); ctx.fillStyle=p.color;
      if (p.circle) { ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill(); }
      else { ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r); }
      ctx.restore();
    });
    if (particles.some(p=>p.y < el.height+20)) requestAnimationFrame(draw);
    else { alive=false; if(el.parentNode) document.body.removeChild(el); }
  };
  draw();
  setTimeout(()=>{ alive=false; if(el.parentNode) document.body.removeChild(el); }, 4500);
};

// ─────────────────────────────────────────────
// COUNTDOWN HOOK
// ─────────────────────────────────────────────
const UNLOCK_DATE = new Date("2026-05-04T00:00:00");

function useCountdown(devMode) {
  const [time, setTime] = useState({d:0,h:0,m:0,s:0,done:false});
  useEffect(() => {
    const tick = () => {
      if (devMode) { setTime({d:0,h:0,m:0,s:0,done:true}); return; }
      const diff = UNLOCK_DATE - Date.now();
      if (diff <= 0) { setTime({d:0,h:0,m:0,s:0,done:true}); return; }
      setTime({
        d: Math.floor(diff/86400000),
        h: Math.floor((diff%86400000)/3600000),
        m: Math.floor((diff%3600000)/60000),
        s: Math.floor((diff%60000)/1000),
        done: false
      });
    };
    tick();
    const id = setInterval(tick,1000);
    return ()=>clearInterval(id);
  },[devMode]);
  return time;
}

// ─────────────────────────────────────────────
// FLOATING DECORATIONS
// ─────────────────────────────────────────────
const FloatingDecos = () => {
  const items = [
    {t:"💛",cls:"fl-a",s:{top:"7%",left:"5%",fontSize:22,opacity:0.75}},
    {t:"✦", cls:"twink",s:{top:"11%",right:"9%",fontSize:18,color:"var(--gold)",opacity:0.85}},
    {t:"🌿",cls:"fl-b",s:{top:"19%",left:"3%",fontSize:16,opacity:0.55}},
    {t:"💛",cls:"fl-c",s:{top:"5%",right:"4%",fontSize:14,opacity:0.5}},
    {t:"✦", cls:"twink",s:{top:"23%",left:"15%",fontSize:11,color:"var(--sage)",opacity:0.7},delay:"0.8s"},
    {t:"🌸",cls:"fl-a",s:{top:"29%",right:"7%",fontSize:15,opacity:0.55}},
    {t:"✦", cls:"twink",s:{top:"33%",right:"19%",fontSize:10,color:"var(--gold-light)",opacity:0.9},delay:"1.3s"},
    {t:"💫",cls:"fl-b",s:{top:"15%",left:"44%",fontSize:13,opacity:0.4}},
  ];
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {items.map((d,i)=>(
        <div key={i} className={d.cls} style={{position:"absolute",animationDelay:d.delay||"0s",...d.s}}>{d.t}</div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// BIRTHDAY HERO — always visible at top
// ─────────────────────────────────────────────
const BirthdayHero = () => (
  <motion.div
    initial={{opacity:0,y:-18}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.9,ease:"easeOut"}}
    style={{position:"relative",padding:"52px 28px 30px",textAlign:"center",overflow:"hidden"}}
  >
    <FloatingDecos/>

    {/* Photo avatar */}
    <motion.div
      initial={{scale:0.7,opacity:0}}
      animate={{scale:1,opacity:1}}
      transition={{delay:0.3,type:"spring",stiffness:180,damping:14}}
      style={{
        width:118,height:118,margin:"0 auto 28px",borderRadius:"50%",
        background:"linear-gradient(135deg,var(--sage-light),var(--blush),var(--gold-light))",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        boxShadow:"0 0 0 5px white, 0 0 0 9px var(--sage-light), 0 14px 44px rgba(122,158,126,0.3)"
      }}
    >
      <Heart size={34} color="var(--sage-dark)" fill="rgba(122,158,126,0.28)"/>
      <div style={{fontSize:9,color:"var(--sage-dark)",marginTop:5,fontWeight:600,letterSpacing:0.4}}>Photo Here 📸</div>
    </motion.div>

    {/* Eyebrow label */}
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
      style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"var(--gold-dark)",fontWeight:700,marginBottom:14}}>
      ✦ &nbsp; A Day Made For You &nbsp; ✦
    </motion.div>

    {/* Main birthday message */}
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.65}}>
      <h1 style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:"clamp(28px,8vw,38px)",
        fontWeight:700,
        lineHeight:1.22,
        color:"var(--charcoal)",
        marginBottom:16,
        letterSpacing:"-0.3px"
      }}>
        Happy{" "}
        <span style={{fontStyle:"italic",color:"var(--gold-dark)"}}>26th</span>
        <br/>Birthday,{" "}
        <span style={{
          fontStyle:"italic",
          background:"linear-gradient(135deg,var(--gold-dark),var(--gold))",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent"
        }}>Sayang!</span>
      </h1>

      {/* Ornamental divider */}
      <div style={{
        height:1,
        background:"linear-gradient(90deg,transparent,var(--gold-light),transparent)",
        margin:"0 auto 20px",width:"65%"
      }}/>

      {/* Love quote */}
      <p style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:"clamp(17px,5vw,22px)",
        fontStyle:"italic",
        fontWeight:400,
        color:"var(--sage-dark)",
        lineHeight:1.75,
        marginBottom:10
      }}>
        "I love you to the moon<br/>and Pluto!!!"
      </p>

      {/* Blessing */}
      <p style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:"clamp(14px,4.5vw,18px)",
        color:"var(--warm-gray)",
        lineHeight:1.85,
        fontStyle:"italic"
      }}>
        May you be granted forever happiness<br/>
        and never-ending{" "}
        <em style={{color:"var(--gold-dark)",fontWeight:600,fontStyle:"normal"}}>Rezeki</em> 🌿✨
      </p>
    </motion.div>
  </motion.div>
);

// ─────────────────────────────────────────────
// COUNTDOWN BARRIER CARD
// ─────────────────────────────────────────────
const CountdownCard = ({ time, onStart }) => {
  const unlocked = time.done;

  return (
    <motion.div
      initial={{opacity:0,y:26}}
      animate={{opacity:1,y:0}}
      transition={{delay:0.9,duration:0.7}}
      style={{margin:"0 20px 38px",position:"relative"}}
    >
      {/* Card content — blurred while locked */}
      <motion.div
        animate={{ filter: unlocked ? "blur(0px)" : "blur(15px)" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="glass-card"
        style={{padding:"28px 24px",textAlign:"center"}}
      >
        <div style={{fontSize:26,marginBottom:10}}>{unlocked ? "🎉" : "🗝️"}</div>

        <h3 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:20,marginBottom:7,color:"var(--charcoal)"
        }}>
          {unlocked ? "Your Quest Awaits!" : "Coming Soon…"}
        </h3>

        <p style={{fontSize:13,color:"var(--warm-gray)",marginBottom:22,lineHeight:1.65}}>
          {unlocked
            ? "The path is open. Begin your birthday odyssey."
            : "Your special journey unlocks very soon. Anticipate every second."}
        </p>

        {/* Countdown digits — shown only when locked */}
        {!unlocked && (
          <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
            {[["Days",time.d],["Hrs",time.h],["Min",time.m],["Sec",time.s]].map(([l,v])=>(
              <div key={l} style={{
                background:"linear-gradient(135deg,rgba(201,168,76,0.13),rgba(122,158,126,0.10))",
                border:"1px solid rgba(201,168,76,0.32)",
                borderRadius:14,padding:"12px 10px",minWidth:58,
                backdropFilter:"blur(10px)"
              }}>
                <div style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:26,fontWeight:700,color:"var(--gold-dark)",lineHeight:1
                }}>
                  {String(v??0).padStart(2,"0")}
                </div>
                <div style={{
                  fontSize:9,color:"var(--warm-gray)",
                  fontWeight:700,letterSpacing:1.5,
                  textTransform:"uppercase",marginTop:5
                }}>{l}</div>
              </div>
            ))}
          </div>
        )}

        <button
          className={`btn-gold${unlocked?" glowing":""}`}
          disabled={!unlocked}
          onClick={onStart}
        >
          <Sparkles size={18}/>
          Start Birthday Quest
          <ChevronRight size={18}/>
        </button>
      </motion.div>

      {/* Lock badge overlay — vanishes when unlocked */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            key="lock-overlay"
            initial={{opacity:1}}
            exit={{opacity:0,scale:0.8}}
            transition={{duration:0.8}}
            style={{
              position:"absolute",inset:0,
              display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",
              borderRadius:24,pointerEvents:"none",gap:10
            }}
          >
            <motion.div
              animate={{y:[0,-7,0]}}
              transition={{repeat:Infinity,duration:2.8,ease:"easeInOut"}}
              style={{
                background:"linear-gradient(135deg,var(--charcoal),#3a3a3a)",
                borderRadius:"50%",width:58,height:58,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 8px 28px rgba(0,0,0,0.28)"
              }}
            >
              <Lock size={24} color="white"/>
            </motion.div>
            <span style={{
              background:"rgba(44,44,44,0.76)",
              color:"white",borderRadius:50,
              padding:"5px 16px",fontSize:11,fontWeight:700,
              backdropFilter:"blur(8px)",letterSpacing:1.2,
              textTransform:"uppercase"
            }}>Locked Until May 4</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [devMode,     setDevMode]     = useState(false);
  const [checkpoint,  setCheckpoint]  = useState(()=>{ try{return parseInt(localStorage.getItem("ainaa_cp")||"0");}catch{return 0;} });
  const [completed,   setCompleted]   = useState(()=>{ try{return JSON.parse(localStorage.getItem("ainaa_done")||"[]");}catch{return [];} });
  const [questStarted,setQuestStarted]= useState(()=>{ try{return localStorage.getItem("ainaa_started")==="1";}catch{return false;} });

  const time     = useCountdown(devMode);
  const progress = Math.min(100, Math.round((checkpoint/4)*100));

  const saveProgress = (cp, done) => {
    try{ localStorage.setItem("ainaa_cp",String(cp)); localStorage.setItem("ainaa_done",JSON.stringify(done)); }catch{}
  };

  const handleStart = () => {
    fireConfetti();
    setQuestStarted(true);
    setCheckpoint(1);
    saveProgress(1, completed);
    try{ localStorage.setItem("ainaa_started","1"); }catch{}
  };

  const completeCP = (n) => {
    fireConfetti();
    const newDone = [...completed, n];
    const newCp   = n + 1;
    setCompleted(newDone);
    setCheckpoint(newCp);
    saveProgress(newCp, newDone);
  };

  const reset = () => {
    setCheckpoint(0); setCompleted([]); setQuestStarted(false);
    try{ localStorage.removeItem("ainaa_cp"); localStorage.removeItem("ainaa_done"); localStorage.removeItem("ainaa_started"); }catch{}
  };

  return (
    <>
      <GlobalStyles/>
      <div className="app-bg" style={{maxWidth:480,margin:"0 auto",paddingBottom:72}}>

        {/* Sticky progress — quest phase only */}
        {questStarted && (
          <div style={{
            position:"sticky",top:0,zIndex:100,
            background:"rgba(250,247,240,0.92)",
            backdropFilter:"blur(16px)",
            padding:"10px 20px",
            borderBottom:"1px solid rgba(201,168,76,0.18)"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:10,color:"var(--warm-gray)",fontWeight:600,letterSpacing:1.5,textTransform:"uppercase"}}>Ainaa's Quest</span>
              <span style={{fontSize:10,color:"var(--gold-dark)",fontWeight:700}}>{progress}% Complete</span>
            </div>
            <div className="prog-track">
              <motion.div className="prog-fill" animate={{width:`${progress}%`}} transition={{duration:0.9,ease:[0.34,1.56,0.64,1]}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
              {["🍽","🌿","👗","🎯"].map((e,i)=>(
                <motion.span key={i}
                  animate={{scale: completed.includes(i+1)?[1,1.45,1]:1}}
                  transition={{duration:0.4}}
                  style={{fontSize:13, opacity: completed.includes(i+1)?1:0.22}}
                >{e}</motion.span>
              ))}
            </div>
          </div>
        )}

        {/* ── Birthday Hero — always visible ── */}
        <BirthdayHero/>

        {/* ── Countdown barrier / quest ── */}
        <AnimatePresence mode="wait">
          {!questStarted ? (
            <motion.div key="barrier"
              initial={{opacity:0}} animate={{opacity:1}}
              exit={{opacity:0,y:-16,transition:{duration:0.4}}}
            >
              <CountdownCard time={time} onStart={handleStart}/>
            </motion.div>
          ) : (
            <motion.div key="quest"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}}
              transition={{duration:0.65,ease:"easeOut"}}
            >
              <div style={{padding:"0 20px"}}>
                <CP1 completed={completed.includes(1)} onComplete={()=>completeCP(1)}/>
                {checkpoint >= 2 && (<><div className="divider"/><CP2 completed={completed.includes(2)} onComplete={()=>completeCP(2)}/></>)}
                {checkpoint >= 3 && (<><div className="divider"/><CP3 completed={completed.includes(3)} onComplete={()=>completeCP(3)}/></>)}
                {checkpoint >= 4 && (<><div className="divider"/><CP4/></>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {devMode && (
          <div style={{padding:"8px 20px"}}>
            <button onClick={reset} style={{
              width:"100%",background:"rgba(229,57,53,0.08)",border:"1px solid rgba(229,57,53,0.25)",
              borderRadius:12,padding:10,fontSize:12,color:"#C62828",cursor:"pointer",fontFamily:"Inter"
            }}>🔄 Reset All Progress</button>
          </div>
        )}
      </div>

      <button className="dev-btn" onClick={()=>setDevMode(d=>!d)}>
        <RefreshCw size={11}/> Dev {devMode?"ON":"OFF"}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function CPHeader({ n, icon, title, subtitle }) {
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
        <div style={{
          width:42,height:42,borderRadius:"50%",flexShrink:0,
          background:"linear-gradient(135deg,var(--gold-dark),var(--gold))",
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"white",boxShadow:"0 4px 18px rgba(201,168,76,0.38)"
        }}>{icon}</div>
        <div>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--gold-dark)",fontWeight:700}}>Checkpoint {n}</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:"var(--charcoal)",lineHeight:1.22}}>{title}</h2>
        </div>
      </div>
      <p style={{fontSize:13,color:"var(--warm-gray)",lineHeight:1.6}}>{subtitle}</p>
    </div>
  );
}

function DoneBadge({ label }) {
  return (
    <motion.div
      initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}}
      transition={{type:"spring",stiffness:220}}
      className="glass-card"
      style={{padding:20,textAlign:"center",marginBottom:4,border:"2px solid rgba(122,158,126,0.38)"}}
    >
      <CheckCircle size={30} color="var(--sage)" style={{margin:"0 auto 8px"}}/>
      <p style={{fontWeight:600,color:"var(--sage-dark)",fontSize:15}}>{label}</p>
      <p style={{fontSize:12,color:"var(--warm-gray)",marginTop:4}}>Scroll down to continue ↓</p>
    </motion.div>
  );
}

function ImageUpload({ label, onUpload, uploaded }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="upload-zone" style={{minHeight:110}}>
      <input type="file" accept="image/*" capture="environment" onChange={handleChange}/>
      {uploaded ? (
        <div style={{position:"relative"}}>
          <img src={uploaded} alt="uploaded" style={{width:"100%",maxHeight:170,objectFit:"cover",borderRadius:12}}/>
          <div style={{position:"absolute",top:6,right:6,background:"var(--sage)",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <CheckCircle size={15} color="white"/>
          </div>
        </div>
      ) : (
        <>
          <Camera size={26} color="var(--sage)" style={{margin:"0 auto 8px"}}/>
          <div style={{fontSize:13,color:"var(--warm-gray)",fontWeight:500}}>{label}</div>
          <div style={{fontSize:11,color:"var(--sage-light)",marginTop:3}}>Tap to upload</div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// CHECKPOINT 1 — Lunch
// ─────────────────────────────────────────────
const RESTAURANTS = [
  {id:1,name:"Nadeje Patisserie", emoji:"🥐",vibe:"French-inspired crepes & delicate cakes",  bg:"rgba(248,232,212,0.65)"},
  {id:2,name:"Limapulo",          emoji:"🍜",vibe:"Modern Malaysian heritage cuisine",          bg:"rgba(212,232,212,0.65)"},
  {id:3,name:"The Ganga Cafe",    emoji:"🥗",vibe:"Wholesome vegetarian nourishing plates",    bg:"rgba(232,212,232,0.65)"},
];

function CP1({ completed, onComplete }) {
  const [selected,setSelected]= useState(null);
  const [photos,  setPhotos]  = useState([null,null,null]);
  const allUploaded = photos.every(Boolean);

  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
      <CPHeader n={1} icon={<Utensils size={19}/>} title="The Lunch Selection" subtitle="Choose where you'd like to dine today"/>

      {completed ? <DoneBadge label="Lunch checkpoint complete! 🍽"/> : (
        <>
          <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:24}}>
            {RESTAURANTS.map(r=>(
              <div key={r.id} className={`r-card ${selected===r.id?"sel":""}`} onClick={()=>setSelected(r.id)}>
                <div style={{padding:"16px 18px",display:"flex",gap:13,alignItems:"center"}}>
                  <div style={{width:50,height:50,borderRadius:14,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{r.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:15,marginBottom:2}}>{r.name}</div>
                    <div style={{fontSize:12,color:"var(--warm-gray)",lineHeight:1.5}}>{r.vibe}</div>
                  </div>
                  {selected===r.id && <CheckCircle size={19} color="var(--gold-dark)"/>}
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
              <div className="glass-card" style={{padding:20,marginBottom:20}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,marginBottom:5}}>Your Mission 📸</h3>
                <p style={{fontSize:13,color:"var(--warm-gray)",marginBottom:16}}>Capture these three beautiful moments</p>
                <div style={{display:"flex",flexDirection:"column",gap:13}}>
                  {[["Selfie Time ✨","Strike a pose!"],["Food Portrait 🍽","Make it delicious"],["We're Eating! 🥂","The full experience"]].map(([l,h],i)=>(
                    <div key={i}>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
                        {photos[i]?<CheckCircle size={13} color="var(--sage)"/>:<Camera size={13} color="var(--warm-gray)"/>}
                        {l} <span style={{color:"var(--warm-gray)",fontWeight:400,fontSize:12}}>{h}</span>
                      </div>
                      <ImageUpload label={`Tap: ${l}`} uploaded={photos[i]} onUpload={v=>{const p=[...photos];p[i]=v;setPhotos(p);}}/>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-gold" disabled={!allUploaded} onClick={onComplete}>
                <CheckCircle size={17}/> Complete Checkpoint 1
              </button>
              {!allUploaded && <p style={{textAlign:"center",fontSize:12,color:"var(--warm-gray)",marginTop:7}}>{photos.filter(Boolean).length}/3 photos uploaded</p>}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CHECKPOINT 2 — Trivia
// ─────────────────────────────────────────────
const TRIVIA = [
  {q:"What is the signature color of the Farm Fresh tractor?", opts:["Red","Blue","Green","Yellow"], ans:"Blue"},
  {q:"Which ice cream flavor is a must-try here?",             opts:["Chocolate","Milk","Strawberry","Mixed"], ans:"Milk"},
];

function CP2({ completed, onComplete }) {
  const [answers,  setAnswers]  = useState([null,null]);
  const [submitted,setSubmitted]= useState(false);
  const [unlockAnim,setUA]      = useState(true);

  useEffect(()=>{ setTimeout(()=>setUA(false),2200); },[]);

  const allCorrect = answers[0]==="Blue" && answers[1]==="Milk";

  const submit = () => {
    setSubmitted(true);
    if (allCorrect) setTimeout(onComplete,1000);
  };

  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
      <CPHeader n={2} icon={<Leaf size={19}/>} title="Farm Fresh Challenge" subtitle="Test your knowledge of this beloved spot"/>

      {unlockAnim && (
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} style={{textAlign:"center",marginBottom:20}}>
          <motion.div animate={{rotate:[0,15,-15,0]}} transition={{repeat:2,duration:0.4}}>
            <span style={{fontSize:46}}>🔓</span>
          </motion.div>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
            style={{color:"var(--sage-dark)",fontWeight:700,marginTop:6}}>Checkpoint Unlocked!</motion.p>
        </motion.div>
      )}

      {completed ? <DoneBadge label="Farm Fresh challenge passed! 🌿"/> : (
        <>
          <div style={{display:"flex",flexDirection:"column",gap:18,marginBottom:22}}>
            {TRIVIA.map((t,i)=>(
              <div key={i} className="glass-card" style={{padding:20}}>
                <p style={{fontWeight:600,fontSize:15,marginBottom:13,lineHeight:1.55}}>Q{i+1}: {t.q}</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {t.opts.map(o=>{
                    let cls="t-opt";
                    if(answers[i]===o){ if(submitted) cls+=o===t.ans?" correct":" wrong"; else cls+=" selected"; }
                    else if(submitted&&o===t.ans) cls+=" correct";
                    return (
                      <button key={o} className={cls} onClick={()=>!submitted&&setAnswers(a=>{const n=[...a];n[i]=o;return n;})}>
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {submitted && !allCorrect && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="glass-card"
              style={{padding:16,marginBottom:16,textAlign:"center",border:"1px solid rgba(229,57,53,0.25)"}}>
              <p style={{color:"#C62828",fontSize:14,fontWeight:500}}>Hmm, not quite! Try again 🌿</p>
              <button onClick={()=>{setSubmitted(false);setAnswers([null,null]);}}
                style={{marginTop:8,background:"none",border:"none",color:"var(--sage-dark)",fontSize:13,cursor:"pointer",fontWeight:600,textDecoration:"underline",fontFamily:"Inter"}}>
                Try Again
              </button>
            </motion.div>
          )}

          {!submitted && (
            <button className="btn-sage" disabled={answers.some(a=>!a)} onClick={submit}>
              <Star size={17}/> Submit Answers
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CHECKPOINT 3 — Shopping
// ─────────────────────────────────────────────
function CP3({ completed, onComplete }) {
  const [store,setStore]= useState(null);
  const [photo,setPhoto]= useState(null);

  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
      <CPHeader n={3} icon={<ShoppingBag size={19}/>} title="The Style Procurement" subtitle="Time to find your birthday outfit ✨"/>

      {completed ? <DoneBadge label="Outfit secured — you look amazing! 👗"/> : (
        <>
          <p style={{fontSize:13,color:"var(--warm-gray)",marginBottom:18}}>Choose your shopping destination:</p>
          <div style={{display:"flex",gap:12,marginBottom:22}}>
            {[["M&B","👜","Modern & chic essentials"],["Panda Eyes","🐼","Unique & playful finds"]].map(([name,emoji,desc])=>(
              <div key={name} className={`s-btn ${store===name?"sel":""}`} onClick={()=>setStore(name)}>
                <div style={{fontSize:32,marginBottom:8}}>{emoji}</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{name}</div>
                <div style={{fontSize:11,color:"var(--warm-gray)",lineHeight:1.5}}>{desc}</div>
                {store===name && <div style={{marginTop:8,display:"flex",justifyContent:"center"}}><CheckCircle size={16} color="var(--gold-dark)"/></div>}
              </div>
            ))}
          </div>

          {store && (
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}>
              <div className="glass-card" style={{padding:20,marginBottom:18,textAlign:"center"}}>
                <div style={{fontSize:24,marginBottom:8}}>👗</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,marginBottom:6}}>Find your birthday outfit!</h3>
                <p style={{fontSize:13,color:"var(--warm-gray)",marginBottom:16}}>Show us what you picked 🌟</p>
                <ImageUpload label="Upload your birthday look" uploaded={photo} onUpload={setPhoto}/>
              </div>
              <button className="btn-gold" disabled={!photo} onClick={onComplete}>
                <Trophy size={17}/> Complete Checkpoint 3
              </button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CHECKPOINT 4 — Finale
// ─────────────────────────────────────────────
function CP4() {
  const waLink = "https://wa.me/60XXXXXXXXXX?text=Ainaa%20is%20ready%20for%20the%20final%20destination!%20%F0%9F%8E%AF";

  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
      <CPHeader n={4} icon={<Flag size={19}/>} title="The Finale" subtitle="Your odyssey reaches its peak"/>

      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.3}}
        style={{position:"relative",borderRadius:24,overflow:"hidden",marginBottom:22}}>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#2c2c3e)",borderRadius:24,padding:32,textAlign:"center",
          filter:"blur(10px)",userSelect:"none",pointerEvents:"none"}}>
          <div style={{fontSize:36}}>🗺</div>
          <h3 style={{color:"white",marginTop:8,fontFamily:"'Playfair Display',serif"}}>Classified</h3>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginTop:6}}>████████████████████████</p>
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(20,20,40,0.93),rgba(30,30,55,0.96))",
          borderRadius:24,padding:32,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          textAlign:"center",backdropFilter:"blur(3px)"}}>
          <div style={{background:"rgba(201,168,76,0.18)",border:"2px solid var(--gold)",
            borderRadius:50,padding:"7px 20px",marginBottom:18,display:"inline-flex",alignItems:"center",gap:6}}>
            <span style={{color:"var(--gold-light)",fontSize:10,letterSpacing:3,fontWeight:700,textTransform:"uppercase"}}>⚠ CLASSIFIED ⚠</span>
          </div>
          <div style={{fontSize:42,marginBottom:14}}>🎯</div>
          <h3 style={{fontFamily:"'Playfair Display',serif",color:"white",fontSize:21,marginBottom:9,lineHeight:1.3}}>
            Final Destination:<br/><em style={{color:"var(--gold-light)"}}>Classified</em>
          </h3>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,lineHeight:1.7,marginBottom:6}}>Your transport is waiting.</p>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:12}}>Request your coordinates below 👇</p>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.55}}>
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <button className="btn-gold" style={{background:"linear-gradient(135deg,#0d7a6e,#1db954)"}}>
            <MessageCircle size={19}/> Request Final Coordinates
          </button>
        </a>
        <p style={{textAlign:"center",fontSize:12,color:"var(--warm-gray)",marginTop:10}}>Opens WhatsApp → Rafiqi 💌</p>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
        className="glass-card" style={{marginTop:28,padding:24,textAlign:"center"}}>
        <Gift size={30} color="var(--gold-dark)" style={{margin:"0 auto 10px"}}/>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,marginBottom:8}}>You did it! 🎉</h3>
        <p style={{fontSize:13,color:"var(--warm-gray)",lineHeight:1.8}}>
          You've completed Ainaa's Birthday Quest. Every checkpoint was a memory made with love.
          Here's to a birthday as extraordinary as you are. 💛
        </p>
      </motion.div>
    </motion.div>
  );
}
