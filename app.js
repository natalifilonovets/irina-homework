const data=[
  [
    "In the film, the ___ has a secret plan to destroy the city.",
    "villain",
    "thief",
    "Персонаж фільму",
    "Villain — злодій, лиходій: негативний персонаж історії. Thief — людина, яка краде; у цьому реченні йдеться про лиходія, що планує знищити місто.",
    "злодій, лиходій"
  ],
  [
    "She played the role so ___ that everyone believed her tears were real.",
    "convincingly",
    "quietly",
    "Акторська майстерність",
    "Convincingly — переконливо. Її гра була настільки переконливою, що всі повірили у справжність сліз. Quietly означає «тихо» й не передає цієї думки.",
    "переконливо"
  ],
  [
    "A ___ stole my wallet on the bus and ran away.",
    "thief",
    "villain",
    "Крадіжка в автобусі",
    "Thief — крадій, людина, яка краде (у вашому списку — «грабіжник»). Тут слово stole прямо вказує на крадіжку. Villain — лиходій або негативний персонаж.",
    "грабіжник; точніше — крадій"
  ],
  [
    "He was married, but he was having an ___ with a colleague.",
    "affair",
    "argument",
    "Таємні стосунки",
    "Affair — роман, інтрижка; having an affair означає мати роман, часто таємний або позашлюбний. Argument — суперечка.",
    "роман, інтрижка"
  ],
  [
    "Let’s ___ the birthday present so she won’t find it.",
    "hide",
    "find",
    "Подарунок-сюрприз",
    "Hide — ховати. Подарунок потрібно сховати, щоб вона його не знайшла. Find означає «знайти». Після let’s вживаємо початкову форму дієслова.",
    "ховати"
  ],
  [
    "We have only five minutes, so let’s ___ and discuss the price.",
    "cut to the chase",
    "change your mind",
    "Ділова розмова",
    "Cut to the chase — перейти до справи, одразу говорити про головне. Часу мало, тому співрозмовники переходять до ціни. Change your mind — передумати.",
    "перейти до справи"
  ],
  [
    "If the argument gets out of control, the teacher will ___ and stop it.",
    "step in",
    "hide",
    "Втручання в суперечку",
    "Step in — втручатися, щоб допомогти або владнати ситуацію. Учитель втрутиться, якщо суперечка вийде з-під контролю. Hide — ховати або ховатися.",
    "втручатися"
  ],
  [
    "The car is worth $10,000. Don’t ___ me by offering just $2,000.",
    "lowball",
    "convince",
    "Занижена пропозиція",
    "Lowball — запропонувати навмисно занижену ціну або суму. Тут за автомобіль вартістю 10 000 доларів пропонують лише 2 000. Це може бути спробою обманути, але слово не означає «принизити» загалом. Convince — переконати.",
    "навмисно занижувати ціну або пропозицію"
  ],
  [
    "You said you didn’t want to come, but you can still ___ and join us.",
    "change your mind",
    "cut to the chase",
    "Зміна рішення",
    "Change your mind — передумати, змінити своє рішення. Людина спочатку відмовилася, але ще може погодитися. Cut to the chase — перейти до справи.",
    "передумати"
  ]
];
let order=data.map((_,i)=>i),pos=0,answers={},layout={};
const card=document.querySelector('#card');
function options(i){return layout[i]??(layout[i]=Math.random()<.5?[0,1]:[1,0])}
function render(){
if(pos>=order.length){results();return}
const i=order[pos],q=data[i],a=answers[i],done=a!==undefined;
card.innerHTML=`<div class="topline"><span>${pos+1} / ${order.length}</span><div class="progress" role="progressbar" aria-label="Прогрес" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${pos}"><i style="width:${pos/order.length*100}%"></i></div></div><p class="sentence" lang="en">${q[0].replace('___',`<span class="blank">${done?q[1]:'&nbsp;…&nbsp;'}</span>`)}</p><div class="options">${options(i).map((v,n)=>`<button class="option ${done?(v===0?'correct':a===v?'wrong':''):''}" data-choice="${v}" ${done?'disabled':''} aria-label="Варіант ${n+1}: ${q[v+1]}">${q[v+1]}${done&&v===0?' ✓':''}${done&&a===v&&v!==0?' ×':''}</button>`).join('')}</div>${done?`<div class="feedback"><strong>${a===0?'Правильно':'Правильна відповідь: '+q[1]}</strong>${q[4]}</div>`:''}<div class="actions"><button class="textbtn" id="back" ${pos===0?'disabled':''} aria-label="Попереднє запитання">← Назад</button>${done?`<button class="primary" id="next">${pos===order.length-1?'Результат':'Далі'} →</button>`:''}</div>`;
document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{answers[i]=+b.dataset.choice;render()});
if(done)document.querySelector('#next').onclick=()=>{pos++;render()};
document.querySelector('#back').onclick=()=>{if(pos>0){pos--;render()}}
}
function results(){
const wrong=order.filter(i=>answers[i]!==0),score=order.length-wrong.length;
card.innerHTML=`<div class="result"><h2>Результат</h2><div class="score">${score}<span> / ${order.length}</span></div><div class="actions">${wrong.length?'<button class="primary" id="retry">Повторити помилки</button>':''}<button class="textbtn" id="restart">Спочатку ↻</button></div>${wrong.map(i=>`<div class="review"><b>${data[i][1]}</b><p lang="en">${data[i][0].replace('___',data[i][1])}</p>${data[i][4]}</div>`).join('')}</div>`;
document.querySelector('#restart').onclick=()=>{order=data.map((_,i)=>i);answers={};layout={};pos=0;render()};
if(wrong.length)document.querySelector('#retry').onclick=()=>{order=wrong;answers={};layout={};pos=0;render()}
}
document.addEventListener('keydown',e=>{if(!['1','2'].includes(e.key)||e.repeat)return;const b=document.querySelectorAll('[data-choice]')[+e.key-1];if(b&&!b.disabled)b.click()});
render();
