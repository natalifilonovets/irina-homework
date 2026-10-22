const data=[
  [
    "Please send your ___ by email if you need a copy of the document.",
    "request",
    "forecast",
    "Прохання",
    "Request — запит або прохання. Send a request означає «надіслати запит». Forecast — прогноз, тому тут не підходить.",
    "запит, прохання"
  ],
  [
    "The shop had sold out of bread, so I came home ___.",
    "empty-handed",
    "on my own",
    "Порожні руки",
    "Empty-handed — з порожніми руками: без того, що хотіли принести чи отримати. On my own — самостійно або на самоті; тут важливо, що хліб купити не вдалося.",
    "з порожніми руками"
  ],
  [
    "You see a strange object and ask: “___”",
    "What on earth is that?",
    "What is the weather like?",
    "Незвичний предмет",
    "What on earth is that? — «Що це взагалі таке?» On earth підсилює здивування. What is the weather like? — запитання про погоду.",
    "Що це взагалі таке?"
  ],
  [
    "A stranger walks into your locked office. In shock, you ask: “___”",
    "Who on earth are you?",
    "How are you?",
    "Несподіваний незнайомець",
    "Who on earth are you? — «Хто ти взагалі такий?» On earth передає сильне здивування або обурення, тому запитання може звучати різко. How are you? означає «Як справи?».",
    "Хто ти взагалі такий?"
  ],
  [
    "They ___ that their product is the best, but they offer no evidence.",
    "claim",
    "request",
    "Твердження без доказів",
    "Claim у цьому реченні — стверджувати, заявляти: claim that… — «стверджувати, що…». Request — просити або запитувати. В інших контекстах claim може означати «вимагати», а як іменник — «вимога» чи «твердження».",
    "стверджувати, заявляти"
  ],
  [
    "The new rules are ___ than the old ones: the penalties are much higher.",
    "tougher",
    "easier",
    "Суворіші правила",
    "Tougher — вищий ступінь порівняння від tough. Про правила це «суворіші» або «жорсткіші»; про завдання — «складніші». Than означає «ніж». Easier — легші.",
    "жорсткіші, суворіші; складніші"
  ],
  [
    "She started her own company and became a successful ___.",
    "entrepreneur",
    "employee",
    "Власна справа",
    "Entrepreneur — підприємець або підприємиця: людина, яка створює та розвиває власний бізнес. Правильне написання — entrepreneur. Employee — найманий працівник.",
    "підприємець, підприємиця"
  ],
  [
    "“You don’t need to help me. ___,” she said.",
    "I will do it on my own",
    "I will ask you to do it",
    "Самостійна робота",
    "I will do it on my own — «Я зроблю це сама / сам». On my own тут означає «самостійно, без допомоги». Другий варіант означає «Я попрошу тебе це зробити» й суперечить першій фразі.",
    "я зроблю це сама / сам"
  ],
  [
    "I don’t want to hide my opinion. I want to ___.",
    "speak my mind",
    "change my mind",
    "Власна думка",
    "Speak my mind — відверто висловити свою думку, сказати те, що думаю. Change my mind — змінити своє рішення або думку. Після want to вживаємо початкову форму дієслова.",
    "відверто висловити свою думку"
  ],
  [
    "The tree’s ___ absorb water from the soil.",
    "roots",
    "leaves",
    "Частини дерева",
    "Roots — коріння: саме воно поглинає воду з ґрунту. Root — один корінь, roots — множина. Leaves — листя. У переносному значенні roots також означає походження або родинне коріння.",
    "коріння"
  ],
  [
    "We need to ___ a new idea for the project.",
    "come up with",
    "give up on",
    "Нова ідея",
    "Come up with — придумати, запропонувати ідею або рішення. Вираз вживається разом із with: come up with an idea. Give up on — відмовитися від чогось або перестати вірити в успіх.",
    "придумати"
  ],
  [
    "Check the ___ to see whether it will rain tomorrow.",
    "weather forecast",
    "weather report from yesterday",
    "Погода на завтра",
    "Weather forecast — прогноз погоди: повідомлення про очікувану погоду. У реченні йдеться про завтрашній дощ. Weather report from yesterday — учорашнє зведення про погоду.",
    "прогноз погоди"
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
