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
})
