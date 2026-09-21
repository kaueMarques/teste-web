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

  // Accessibility defaults and toolbar controls
  const a11yDefaults = {
    contrast: true,
    grayscale: false,
    scale: 1.125,
    vlibras: true
  }

  const a11yVlibras = document.getElementById('a11yVlibras')
  const a11yContrast = document.getElementById('a11yContrast')
  const a11yGrayscale = document.getElementById('a11yGrayscale')
  const a11yIncrease = document.getElementById('a11yIncrease')
  const a11yDecrease = document.getElementById('a11yDecrease')

  function setContrast(on){
    if(on) document.body.classList.add('high-contrast')
    else document.body.classList.remove('high-contrast')
    if(a11yContrast) a11yContrast.setAttribute('aria-pressed', String(!!on))
    localStorage.setItem('a11y-contrast', on? '1':'0')
  }

  function setGrayscale(on){
    if(on) document.body.classList.add('grayscale')
    else document.body.classList.remove('grayscale')
    if(a11yGrayscale) a11yGrayscale.setAttribute('aria-pressed', String(!!on))
    localStorage.setItem('a11y-grayscale', on? '1':'0')
  }

  function setFontScale(scale){
    const base = 16
    const size = Math.round(base * scale)
    document.documentElement.style.setProperty('--base-font-size', size + 'px')
    localStorage.setItem('a11y-scale', String(scale))
  }

  function ensureVlibras(){
    if(window.VLibras) return new window.VLibras.Widget('https://vlibras.gov.br/app')
    // if script not yet appended, it will be loaded below and init in onload
    if(!document.querySelector('script[src*="vlibras-plugin.js"]')){
      const s = document.createElement('script')
      s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
      s.defer = true
      s.onload = ()=>{ try{ new window.VLibras.Widget('https://vlibras.gov.br/app') }catch(e){console.warn('VLibras init failed',e)} }
      document.body.appendChild(s)
    }
  }

  // toolbar handlers
  a11yContrast && a11yContrast.addEventListener('click', ()=>{
    const cur = document.body.classList.contains('high-contrast')
    setContrast(!cur)
  })
  a11yGrayscale && a11yGrayscale.addEventListener('click', ()=>{
    const cur = document.body.classList.contains('grayscale')
    setGrayscale(!cur)
  })
  a11yIncrease && a11yIncrease.addEventListener('click', ()=>{
    const cur = parseFloat(localStorage.getItem('a11y-scale')||a11yDefaults.scale)
    const next = Math.min(cur + 0.125, 2)
    setFontScale(next)
  })
  a11yDecrease && a11yDecrease.addEventListener('click', ()=>{
    const cur = parseFloat(localStorage.getItem('a11y-scale')||a11yDefaults.scale)
    const next = Math.max(cur - 0.125, 0.75)
    setFontScale(next)
  })
  a11yVlibras && a11yVlibras.addEventListener('click', ()=>{
    ensureVlibras()
    a11yVlibras.setAttribute('aria-pressed','true')
    localStorage.setItem('a11y-vlibras','1')
  })

  // apply initial preferences (persisted or defaults)
  (function applyInitialA11y(){
    const contrast = localStorage.getItem('a11y-contrast') !== null ? localStorage.getItem('a11y-contrast') === '1' : a11yDefaults.contrast
    const grayscale = localStorage.getItem('a11y-grayscale') !== null ? localStorage.getItem('a11y-grayscale') === '1' : a11yDefaults.grayscale
    const scale = parseFloat(localStorage.getItem('a11y-scale') || a11yDefaults.scale)
    const vl = localStorage.getItem('a11y-vlibras') !== null ? localStorage.getItem('a11y-vlibras') === '1' : a11yDefaults.vlibras
    setContrast(contrast)
    setGrayscale(grayscale)
    setFontScale(scale)
    if(vl) ensureVlibras()
  })()

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
    // prevent background scroll and focus without scrolling page
    document.documentElement.style.overflow = 'hidden'
    try{ modalClose.focus({preventScroll:true}) }catch(e){ modalClose.focus() }
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true')
    modal.style.display = 'none'
    document.documentElement.style.overflow = ''
    if(lastFocused){ try{ lastFocused.focus({preventScroll:true}) }catch(e){ lastFocused.focus() } }
  }

  donateBtn && donateBtn.addEventListener('click', ()=> openModal())
  modalClose && modalClose.addEventListener('click', ()=> closeModal())
  modalOk && modalOk.addEventListener('click', ()=> closeModal())
  modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal() })
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal() })

  // ensure toolbar buttons don't cause page to jump on focus
  document.querySelectorAll('.a11y-btn, .vlibras-btn, .donate-btn, .nav-toggle').forEach(btn=>{
    btn.addEventListener('mousedown', e=> e.preventDefault())
    btn.addEventListener('click', ()=>{ try{ btn.focus({preventScroll:true}) }catch(e){ btn.focus() } })
  })

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
