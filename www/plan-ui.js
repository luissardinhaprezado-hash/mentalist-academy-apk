(function(){
const KEY='mentalist-academy-plan-v1';
const app=document.getElementById('app');
if(!app||!window.MENTALIST_PLAN)return;
function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
function showPlan(){
const done=saved(),items=window.MENTALIST_PLAN;
app.innerHTML='<section class="hero"><div class="tag">MENTALIST ACADEMY · DESAFIO</div><h2>Plano de treino — 30 dias</h2><p>Avança ao teu ritmo. Marca cada desafio quando o terminares.</p><div class="progressbar"><span style="width:'+Math.round(done.length/items.length*100)+'%"></span></div><p>'+done.length+' de '+items.length+' dias concluídos</p><button class="btn secondary" data-plan-back>← Voltar à Academia</button></section><div class="cards">'+items.map((t,i)=>'<button class="btn '+(done.includes(i)?'':'secondary')+'" data-plan-day="'+i+'" style="text-align:left;margin:5px 0">'+(done.includes(i)?'✓ ':'○ ')+t+'</button>').join('')+'</div>';
}
app.addEventListener('click',function(e){
const open=e.target.closest('[data-plan-open]');
if(open){showPlan();return}
const day=e.target.closest('[data-plan-day]');
if(day){const i=Number(day.dataset.planDay),done=saved(),at=done.indexOf(i);if(at<0)done.push(i);else done.splice(at,1);localStorage.setItem(KEY,JSON.stringify(done));showPlan();return}
if(e.target.closest('[data-plan-back]'))location.reload();
});
const observer=new MutationObserver(function(){
if(app.querySelector('.hero')&&!app.querySelector('[data-plan-open]')){
const cards=app.querySelector('.cards');
if(cards)cards.insertAdjacentHTML('afterend','<div class="note" style="margin-top:14px"><strong>Plano de 30 dias</strong><p class="muted">Treina um pouco todos os dias e acompanha o teu progresso.</p><button class="btn" data-plan-open>Abrir plano de treino →</button></div>');
}
});
observer.observe(app,{childList:true,subtree:true});
})();
