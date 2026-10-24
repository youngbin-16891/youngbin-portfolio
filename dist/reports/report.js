// Keep all analysis appendices in browser print/PDF output, then restore reading state.
let printDetails=[];
window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('details')].map(el=>[el,el.open]);for(const [el] of printDetails)el.open=true;});
window.addEventListener('afterprint',()=>{for(const [el,wasOpen] of printDetails)el.open=wasOpen;printDetails=[];});
document.querySelector('.print')?.addEventListener('click',()=>window.print());
