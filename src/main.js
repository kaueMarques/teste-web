// Projeto minimal: nenhum framework, apenas um console log leve
document.addEventListener('DOMContentLoaded', ()=>{
  console.log('Landing page carregada - kaueMarques')

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'))
      if(target){
        e.preventDefault()
        target.scrollIntoView({behavior:'smooth',block:'start'})
        history.replaceState(null,'',this.getAttribute('href'))
      }
    })
  })

  // Modal logic
  const donateBtn = document.getElementById('donateBtn')
  const modal = document.getElementById('donateModal')
  const modalClose = document.getElementById('modalClose')
  const modalOk = document.getElementById('modalOk')
  let lastFocused = null

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle')
  const siteNav = document.getElementById('siteNav')
  if(navToggle && siteNav){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true'
      navToggle.setAttribute('aria-expanded', String(!expanded))
      siteNav.classList.toggle('open')
    })
  }

  function openModal(){
    lastFocused = document.activeElement
    modal.setAttribute('aria-hidden','false')
    modal.style.display = 'flex'
    modalClose.focus()
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true')
    modal.style.display = 'none'
    if(lastFocused) lastFocused.focus()
  }

  donateBtn && donateBtn.addEventListener('click', ()=> openModal())
  modalClose && modalClose.addEventListener('click', ()=> closeModal())
  modalOk && modalOk.addEventListener('click', ()=> closeModal())
  modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal() })
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal() })

  // VLibras widget lazy load
  try{
    const s = document.createElement('script')
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    s.defer = true
    s.onload = ()=>{
      try{ new window.VLibras.Widget('https://vlibras.gov.br/app') }catch(e){console.warn('VLibras init failed',e)}
    }
    document.body.appendChild(s)
  }catch(e){console.warn('VLibras load error',e)}

  // floating donate opens same modal
  const flo = document.querySelector('.floating-donate')
  flo && flo.addEventListener('click', ()=> openModal())
})
