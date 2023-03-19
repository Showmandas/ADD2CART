//light-dark theme
const moon=document.getElementById('moon');
const sun=document.getElementById('sun');
moon.addEventListener('click',()=>{
    document.body.classList.toggle('darkTheme');
    if(document.body.classList.contains('darkTheme')){
        sun.classList.remove('d-none');
        moon.classList.add('d-none');
    }
    else{
        sun.classList.add('d-none');
        moon.classList.remove('d-none');
    }
})

