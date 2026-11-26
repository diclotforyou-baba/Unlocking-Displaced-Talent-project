const navLinks = document.querySelectorAll('[data-view]');
const views = document.querySelectorAll('.view');
const breadcrumb = document.getElementById('breadcrumbCurrent');
const sidebar = document.getElementById('sidebar');

function showView(name) {
  views.forEach(v => v.classList.toggle('active-view', v.id === `view-${name}`));
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.view === name));
  const active = document.querySelector(`.nav-link[data-view="${name}"]`);
  breadcrumb.textContent = active ? active.textContent.replace(/[◫◎▤↗⌘◷]/g,'').trim() : 'Overview';
  sidebar.classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}
navLinks.forEach(link => link.addEventListener('click', e => {
  e.preventDefault(); showView(link.dataset.view);
  history.replaceState(null, '', `#${link.dataset.view}`);
}));
document.querySelectorAll('.path-footer a,.panel a.text-link').forEach(link => link.addEventListener('click', e => {
  const view = link.dataset.view; if(view){e.preventDefault();showView(view);history.replaceState(null,'',`#${view}`);}
}));
document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));

const modal = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
function openModal(title, text) {
  modalTitle.textContent = title; modalText.textContent = text; modal.classList.add('open');
}
function closeModal(){modal.classList.remove('open')}
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalCancel').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('.profile-detail').forEach(btn=>btn.addEventListener('click',()=>{
  openModal(btn.dataset.person, 'This illustrative profile brings together experience, skills evidence, readiness gaps and career goals. A coordinator can agree the next practical step with the participant, then connect them to a qualified assessor or employer partner.');
}));
document.getElementById('modalAction').addEventListener('click',()=>{
  closeModal(); showView('credentials'); document.getElementById('assessmentFeedback').textContent='Next step opened: review the skills passport and agree an assessment plan.';
});
document.getElementById('addProfile').addEventListener('click',()=>openModal('Add a talent profile','In a live deployment, this action would open a consent-led intake form covering skills, experience, evidence, career goals and support needs. This demo avoids collecting personal data.'));
document.getElementById('startAssessment').addEventListener('click',()=>{
  document.getElementById('assessmentFeedback').textContent='Sample assessment started. Choose a role-relevant task, agree an assessor and record evidence with the participant’s consent.';
});
const checklist = [...document.querySelectorAll('#readinessChecklist input')];
function updateChecklist(){
  const done=checklist.filter(x=>x.checked).length, pct=Math.round(done/checklist.length*100);
  document.getElementById('checkProgress').textContent=pct+'%';
  document.getElementById('checkProgressBar').style.width=pct+'%';
}
checklist.forEach(x=>x.addEventListener('change',updateChecklist));
document.getElementById('mentorMatch').addEventListener('click',()=>{
  document.getElementById('mentorFeedback').textContent='Best sample match: Esther W. — renewable energy mentor (96% fit). A real match requires participant consent and mentor availability.';
});
document.querySelectorAll('.apply-button').forEach(btn=>btn.addEventListener('click',()=>{
  const title=btn.closest('.opportunity-card').querySelector('h3').textContent;
  document.getElementById('interestFeedback').textContent=`Interest recorded in this demo for “${title}”. In a live service, the participant would review eligibility and consent before sharing a profile with the partner.`;
  btn.textContent='Interest noted ✓'; btn.disabled=true;
}));
const talentSearch=document.getElementById('talentSearch');
const sectorFilter=document.getElementById('sectorFilter');
function filterTalent(){
  const q=talentSearch.value.toLowerCase(), sector=sectorFilter.value;
  document.querySelectorAll('.talent-card').forEach(card=>{
    card.style.display=(card.dataset.search.includes(q)&&(sector==='all'||card.dataset.sector===sector))?'block':'none';
  });
}
talentSearch.addEventListener('input',filterTalent);sectorFilter.addEventListener('change',filterTalent);
const jobSearch=document.getElementById('jobSearch'),workType=document.getElementById('workType');
function filterJobs(){
  const q=jobSearch.value.toLowerCase(),type=workType.value;
  document.querySelectorAll('.opportunity-card').forEach(card=>{
    card.style.display=(card.dataset.search.includes(q)&&(type==='all'||card.dataset.type===type))?'flex':'none';
  });
}
jobSearch.addEventListener('input',filterJobs);workType.addEventListener('change',filterJobs);
if(location.hash && document.querySelector(`#view-${location.hash.slice(1)}`)) showView(location.hash.slice(1));