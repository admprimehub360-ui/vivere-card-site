'use strict';
const solutions=[
{id:'aulas',name:'Aulas e programas',category:'rotina',mark:'↗',short:'Movimento, meditação e conteúdos para sua rotina.',detail:'Explore aulas de fitness, yoga, pilates, dança e práticas guiadas de meditação, além de programas e conteúdos de autocuidado. Os temas e o acesso dependem da solução disponibilizada.'},
{id:'food',name:'Food Tech',category:'rotina',mark:'◒',short:'Tecnologia para explorar sua alimentação no dia a dia.',detail:'O portfólio apresenta FoodScan, com análise de refeições por imagem, e Chef, com sugestões de receitas a partir dos ingredientes disponíveis. As informações são orientativas e não substituem acompanhamento nutricional.'},
{id:'orienta',name:'Vivere Card Orienta',category:'apoio',mark:'◎',short:'Teleorientação com profissionais em diferentes áreas.',detail:'Serviço de orientação por vídeo em áreas como psicologia, nutrição, educação física e educação financeira. Disponibilidade de profissionais, créditos e condições de uso devem ser consultados na proposta.'},
{id:'pass',name:'Vivere Card Pass',category:'rotina',mark:'↝',short:'Explore a rede de academias com pagamento por utilização.',detail:'O Pass apresenta um modelo de acesso por utilização a uma rede de academias. Consulte estabelecimentos participantes, disponibilidade na sua região e valores por uso antes da contratação.'},
{id:'saude',name:'Serviços de saúde',category:'apoio',mark:'+',short:'Possibilidades de acesso a consultas, exames e teleatendimento.',detail:'Os materiais apresentam serviços de telemedicina e uma rede de acesso a consultas e exames. Cobertura, rede, disponibilidade, agendamento e eventuais cobranças dependem do serviço contratado. Não há atendimento clínico neste protótipo.'},
{id:'manu',name:'IA Manu',category:'apoio',mark:'✳',short:'Uma assistente para explorar conteúdos de bem-estar.',detail:'Assistente de inteligência artificial apresentada para esclarecer dúvidas e apoiar a navegação por temas de bem-estar físico, mental, nutricional, social e financeiro. Suas respostas não substituem orientação profissional.'},
{id:'vital',name:'Vital Scan',category:'apoio',mark:'⌁',short:'Conheça o recurso digital apresentado no portfólio.',detail:'Os materiais descrevem uma ferramenta que utiliza a câmera e tecnologia rPPG para estimar indicadores. As condições técnicas e limitações devem ser verificadas com a Vivere Card. Não use estimativas como diagnóstico, para decisões clínicas ou como substituição de avaliação profissional.'},
{id:'sst',name:'Saúde e segurança',category:'empresa',mark:'◇',short:'Mapeamento, orientação e engajamento no trabalho.',detail:'Programa com questionário sobre fatores de riscos psicossociais, painel de resultados, recomendações, playbook e conteúdos de engajamento. O escopo deve ser avaliado pelos responsáveis técnicos da empresa; não há garantia automática de conformidade legal.'}
];
const grid=document.querySelector('#solution-grid');
function renderSolutions(filter='all'){grid.innerHTML=solutions.filter(s=>filter==='all'||s.category===filter).map(s=>`<article class="solution-card"><span class="solution-mark" aria-hidden="true">${s.mark}</span><h3>${s.name}</h3><p>${s.short}</p><button data-detail="${s.id}" aria-label="Conhecer ${s.name}">Conhecer solução ↗</button></article>`).join('');}
renderSolutions();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});renderSolutions(button.dataset.filter);}));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const steps={pessoa:[['Conheça as possibilidades','Explore os recursos e identifique o que faz sentido para a sua rotina.'],['Consulte as condições','Converse sobre acesso individual, serviços incluídos e condições de uso.'],['Comece seu cuidado','Após a contratação e ativação, explore os recursos disponíveis na sua solução.']],empresa:[['Conte sobre sua equipe','Compartilhe as necessidades e o contexto da sua empresa.'],['Construa a proposta','Avalie soluções, escopo, serviços e condições com a Vivere Card.'],['Ative e engaje','Após a contratação, organize a ativação e a comunicação com os colaboradores.']]};
function showJourney(profile){document.querySelector('#how-grid').innerHTML=steps[profile].map((s,i)=>`<article><span>0${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('');const cta=document.querySelector('#how-cta');cta.dataset.contact=profile;cta.textContent=profile==='empresa'?'Conversar sobre minha equipe →':'Começar minha jornada →';}
showJourney('pessoa');
document.querySelectorAll('[data-journey]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-journey]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});showJourney(button.dataset.journey);}));
const dialog=document.querySelector('#detail-dialog');
function openDialog(title,body,contact){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-body').innerHTML=body;document.querySelector('#dialog-actions').innerHTML=contact?`<button class="button primary" data-contact="${contact}">Consultar condições <span>↗</span></button>`:'';dialog.showModal();}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#contact-form'),company=document.querySelector('#company-field');
function updateProfile(){const business=form.elements.perfil.value==='empresa';company.hidden=!business;company.querySelector('input').required=business;company.querySelector('input').disabled=!business;document.querySelector('.form-result').hidden=true;}
form.querySelectorAll('[name=perfil]').forEach(r=>r.addEventListener('change',updateProfile));
function contact(profile){if(dialog.open)dialog.close();const business=profile==='empresa'||profile==='sst';form.querySelector(`[name=perfil][value="${business?'empresa':'pessoa'}"]`).checked=true;updateProfile();document.querySelector('#interest').value=['sst','orienta','pass','saude'].includes(profile)?profile:'geral';document.querySelector('#contato').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});form.elements.nome.focus({preventScroll:true});}
document.addEventListener('click',e=>{const c=e.target.closest('[data-contact]');if(c)contact(c.dataset.contact);const d=e.target.closest('[data-detail]');if(d){const s=solutions.find(x=>x.id===d.dataset.detail);openDialog(s.name,`<p>${s.detail}</p><p class="small">As condições comerciais e a disponibilidade precisam ser confirmadas com a Vivere Card.</p>`,s.id==='sst'?'sst':['orienta','pass','saude'].includes(s.id)?s.id:'pessoa');}const info=e.target.closest('[data-info]');if(info)openDialog(info.dataset.info==='privacidade'?'Seus dados neste protótipo':'Sobre esta experiência',info.dataset.info==='privacidade'?'<p>Este site não armazena os dados do formulário em servidor. Ao continuar, os campos preenchidos são incluídos em um link para o WhatsApp da Vivere Card, no número (11) 5026-5833. Você revisa e confirma o envio no WhatsApp, sujeito às políticas da plataforma. Não há integração com CRM, analytics ou pagamentos.</p>':'<p>Protótipo demonstrativo da Home Vivere Card, com conteúdo elaborado a partir dos materiais de produtos, treinamento, SST e Fluid Wellness. As 11 seções são uma proposta provisória: o texto do briefing anterior não estava acessível na recuperação do histórico.</p><p>O contato comercial abre uma conversa real no WhatsApp da Vivere Card. O envio da mensagem depende da sua confirmação no WhatsApp. O site não realiza contratação, atendimento clínico ou cobrança.</p>');});
const WHATSAPP_NUMBER='551150265833';
function buildWhatsAppUrl(){
 const f=form.elements;
 const business=f.perfil.value==='empresa';
 const lines=['Olá! Vim pelo site da Vivere Card.', '', 'Perfil: '+(business?'Para minha empresa':'Para mim'), 'Nome: '+f.nome.value.trim(), 'E-mail: '+f.email.value.trim()];
 if(f.telefone.value.trim())lines.push('Telefone: '+f.telefone.value.trim());
 if(business)lines.push('Empresa: '+f.empresa.value.trim());
 lines.push('Interesse: '+document.querySelector('#interest').selectedOptions[0].textContent);
 if(f.mensagem.value.trim())lines.push('', 'Mensagem: '+f.mensagem.value.trim());
 return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(lines.join('\n'));
}
form.addEventListener('submit',e=>{
 e.preventDefault();
 if(!form.reportValidity())return;
 window.location.assign(buildWhatsAppUrl());
});
