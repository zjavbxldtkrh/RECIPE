import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {House, Carrot, RefreshCw, ArrowRight, Plus, X, Upload, ChefHat, Refrigerator, BookOpen, Sparkles, Copy, RotateCcw, Clock3, AlertCircle, CheckCircle2} from 'lucide-react';
import './style.css';

const slogans = [
 '레시피는 정답이 아니라, 내가 만드는 요리의 시작입니다.',
 '오늘의 냉장고가 오늘의 레시피가 됩니다.',
 '조금 바꿔도, 나만의 맛이 될 수 있어요.',
 '재료가 달라지면 레시피도 달라져야 하니까.',
 '남은 재료도 새로운 한 끼의 재료가 됩니다.',
 '원래 레시피에 나만의 한 끗을 더해보세요.',
 '바꾸고, 조정하고, 다시 맛보세요.',
 '같은 레시피라도 오늘의 선택은 다를 수 있으니까.'
];

function PixelTomato({small=false}) { return <span className={`tomato ${small?'small':''}`} aria-label="픽셀 토마토"><i/><b/><em/></span> }
function Logo({onClick}) { return <button className="logo" onClick={onClick} aria-label="RE:CIPE 홈으로"><span className="logo-hat">♟</span>RE:<span>CIPE</span><PixelTomato small/></button> }
function Header({page,setPage}) {
 const links=[['home','홈',House],['recommend','레시피 추천',Carrot],['variation','레시피 변형',RefreshCw]];
 return <header className="header"><div className="nav-inner"><Logo onClick={()=>setPage('home')}/><nav>{links.map(([id,label,Icon])=><button key={id} className={`nav-link ${page===id?'active':''}`} onClick={()=>setPage(id)}><Icon size={17}/>{label}</button>)}</nav><div className="header-side"><span className="pixel-status"><i/> YOUR KITCHEN, YOUR RULES</span><PixelTomato/></div></div></header>
}
function Footer(){return <footer><span className="footer-sprout">✳</span><span>A RECIPE IS A STARTING POINT.</span><span className="footer-sprout">✳</span></footer>}
function Home({setPage}) {
 const [slogan]=useState(()=>slogans[Math.floor(Math.random()*slogans.length)]);
 return <main className="home page-wrap">
  <div className="hero-deco deco-one">✦</div><div className="hero-deco deco-two">✳</div>
  <div className="hero-kicker"><span/> WELCOME TO YOUR LITTLE KITCHEN <span/></div>
  <div className="hero-logo-wrap"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="floating tomato-float"><PixelTomato/></div><div className="floating leaf-float">◢</div><div className="hero-chef"><ChefHat size={35}/></div><h1 className="hero-logo"><span className="logo-pop">RE:CIPE</span></h1></div>
  <p className="hero-slogan">{slogan}</p>
  <p className="hero-sub">재료와 취향에 맞춰, 오늘의 요리를 새롭게 만들어봐.</p>
  <div className="home-cards">
   <button className="feature-card" onClick={()=>setPage('recommend')}><div className="card-art fridge-art"><Refrigerator size={66}/><PixelTomato/></div><div className="feature-copy"><span className="eyebrow">01 / FIND YOUR MENU</span><h2>레시피 추천</h2><p>냉장고 속 재료로,<br/>오늘 뭐 먹지?</p><span className="card-cta">시작하기 <ArrowRight size={16}/></span></div></button>
   <button className="feature-card" onClick={()=>setPage('variation')}><div className="card-art recipe-art"><BookOpen size={66}/><span className="mini-dish">🍲</span></div><div className="feature-copy"><span className="eyebrow">02 / MAKE IT YOURS</span><h2>레시피 변형</h2><p>기존 레시피를 내 취향에 맞게,<br/>새롭게 바꿔봐.</p><span className="card-cta">시작하기 <ArrowRight size={16}/></span></div></button>
  </div>
  <div className="counter-note"><span>♥</span> MADE WITH A LITTLE CURIOSITY <span>♥</span></div>
  <Footer/>
 </main>
}
function Recommend() {
 const [items,setItems]=useState([]),[value,setValue]=useState('');
 const add=()=>{let v=value.trim();if(v&&!items.includes(v))setItems([...items,v]);setValue('')};
 return <main className="page-wrap inner-page"><div className="page-kicker"><Carrot size={16}/> RECIPE RECOMMENDATION</div><div className="page-heading"><h1>냉장고 속 재료로,<br/><span>오늘 뭐 먹지?</span></h1><p>가지고 있는 재료를 적어두면, 만들 수 있는 레시피를 찾아갈 준비를 해둘게.</p></div>
 <section className="panel recommend-panel"><div className="panel-title"><span className="pixel-icon"><Refrigerator size={22}/></span><div><h2>내 냉장고</h2><p>지금 가지고 있는 재료를 추가해봐.</p></div><span className="coming-tag">추천 엔진 연결 예정</span></div>
 <div className="ingredient-entry"><input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="예: 토마토, 달걀, 양파"/><button className="primary-btn" onClick={add}><Plus size={17}/> 재료 추가</button></div>
 <div className="chips">{items.length?items.map(x=><span className="chip" key={x}>{x}<button onClick={()=>setItems(items.filter(i=>i!==x))} aria-label={`${x} 삭제`}><X size={13}/></button></span>):<span className="empty-hint">아직 추가한 재료가 없어. 위 칸에 재료를 입력해줘.</span>}</div>
 <div className="recommend-placeholder"><div className="pixel-fridge"><Refrigerator size={46}/><PixelTomato/></div><div><b>오늘의 레시피가 이곳에 도착할 거야!</b><p>재료 기반 추천 기능은 별도 추천 엔진/API 연결 후 활성화돼.</p></div></div>
 </section><div className="note-line"><AlertCircle size={15}/> 현재는 재료 입력·삭제까지 작동해. 아직 레시피를 실제 분석하거나 추천하지는 않아.</div><Footer/></main>
}
const starter = `적앙금 200g
한천 분말 5g
설탕 20g
올리고당 25g
물 120g

1. 냄비에 물과 한천 분말을 넣고 충분히 불린다.
2. 가열해 한천을 녹인 뒤 설탕과 올리고당을 넣는다.
3. 적앙금을 넣고 저어가며 끓인다.
4. 틀에 붓고 식혀 굳힌다.`;
function Variation() {
 const [recipe,setRecipe]=useState(starter),[mode,setMode]=useState('replace'),[purpose,setPurpose]=useState(''),[changes,setChanges]=useState([{from:'한천 분말',to:'젤라틴',amount:''}]),[file,setFile]=useState(null),[status,setStatus]=useState('idle');
 const [result,setResult]=useState('');
 const addChange=()=>setChanges([...changes,{from:'',to:'',amount:''}]);
 const update=(i,k,v)=>setChanges(changes.map((c,n)=>n===i?{...c,[k]:v}:c));
 const submit=async()=>{
  setStatus('loading');setResult('');
  try {
   const response=await fetch('/api/variation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({recipe,mode,purpose,changes})});
   if(!response.ok) throw new Error('API_NOT_READY');
   const data=await response.json();setResult(data.result||JSON.stringify(data,null,2));setStatus('done');
  } catch(e) {setStatus('unavailable');}
 };
 const copy=()=>navigator.clipboard?.writeText(recipe);
 return <main className="page-wrap inner-page"><div className="page-kicker"><RefreshCw size={16}/> RECIPE VARIATION</div><div className="page-heading"><h1>원래 레시피에<br/><span>나만의 한 끗을 더해봐.</span></h1><p>재료를 바꾸고, 비율을 조정하고, 내가 원하는 맛에 가까워져 봐.</p></div>
 <div className="variation-layout"><section className="panel recipe-input-panel"><div className="section-head"><div><span className="eyebrow">STEP 01</span><h2>기존 레시피 입력</h2></div><span className="required-mark">TEXT / IMAGE</span></div>
 <textarea className="recipe-textarea" value={recipe} onChange={e=>setRecipe(e.target.value)} placeholder="레시피 이름, 재료와 사용량, 조리 순서를 입력해줘."/>
 <label className="upload-box"><Upload size={20}/><b>{file?file.name:'레시피 사진 첨부'}</b><span>JPG · PNG · WEBP</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
 {file&&<div className="upload-notice"><AlertCircle size={14}/> 파일이 선택됐어. 이미지 속 글자 분석(OCR)은 서버 기능 연결 후 사용할 수 있어.</div>}
 </section>
 <section className="panel setting-panel"><div className="section-head"><div><span className="eyebrow">STEP 02</span><h2>어떻게 바꿔볼까?</h2></div></div>
 <div className="mode-tabs">{[['replace','재료 대체'],['ratio','비율 변경'],['both','대체 + 비율']].map(([v,l])=><button key={v} className={mode===v?'selected':''} onClick={()=>setMode(v)}>{l}</button>)}</div>
 {(mode==='replace'||mode==='both')&&<div className="change-group"><div className="subhead">재료 대체 <span>원래 재료 → 바꿀 재료</span></div>{changes.map((c,i)=><div className="change-row" key={i}><input value={c.from} onChange={e=>update(i,'from',e.target.value)} placeholder="기존 재료"/><span>→</span><input value={c.to} onChange={e=>update(i,'to',e.target.value)} placeholder="대체 재료"/><button className="icon-btn" onClick={()=>setChanges(changes.filter((_,n)=>n!==i))}><X size={15}/></button></div>)}<button className="add-row" onClick={addChange}><Plus size={15}/> 재료 대체 추가</button></div>}
 {(mode==='ratio'||mode==='both')&&<div className="change-group"><div className="subhead">비율 변경 <span>재료명과 원하는 양을 레시피 입력란에 함께 적어줘.</span></div><p className="helper-copy">예: 적앙금 200g을 250g으로 변경. 입력한 원본 레시피와 변경 조건을 함께 분석하도록 설계돼 있어.</p></div>}
 <div className="purpose-group"><label className="subhead" htmlFor="purpose">변형 목적 <span>원하는 결과를 구체적으로 적을수록 좋아.</span></label><textarea id="purpose" value={purpose} onChange={e=>setPurpose(e.target.value)} placeholder="예: 팥 맛을 더 진하게 하고, 기존의 부드러운 식감은 유지하고 싶어." rows="3"/></div>
 <button className="primary-btn analyze-btn" onClick={submit} disabled={status==='loading'||!recipe.trim()}>{status==='loading'?'연결 확인 중…':<><Sparkles size={17}/> 변형 가능성 분석하기</>}</button>
 {status==='unavailable'&&<div className="api-warning"><AlertCircle size={17}/><div><b>AI 분석 서버가 아직 연결되지 않았어.</b><p>입력한 내용은 화면에서 처리됐지만, 식품 과학 기반 분석 결과를 임의로 만들어 보여주지는 않을게. 서버의 <code>/api/variation</code> 엔드포인트를 연결하면 결과가 표시돼.</p></div></div>}
 {status==='done'&&<div className="result-box"><div className="result-title"><CheckCircle2 size={18}/> 분석 결과</div><pre>{result}</pre><button className="secondary-btn" onClick={()=>navigator.clipboard?.writeText(result)}><Copy size={15}/> 결과 복사</button></div>}
 </section></div>
 <div className="principle-note"><ChefHat size={18}/><p><b>RE:CIPE의 약속</b><br/>재료의 역할과 조리 원리를 확인하지 않은 채 성공을 단정하지 않아. 실제 분석 결과에는 근거, 불확실성, 소량 테스트 권장 여부가 함께 표시돼야 해.</p></div>
 <Footer/></main>
}
function App(){const [page,setPage]=useState('home');useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'})},[page]);return <><Header page={page} setPage={setPage}/>{page==='home'?<Home setPage={setPage}/>:page==='recommend'?<Recommend/>:<Variation/>}</>}
createRoot(document.getElementById('root')).render(<App/>);
