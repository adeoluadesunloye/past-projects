let hero_slide = document.querySelector('#hero-slide')

let hero_slide_items= hero_slide.querySelectorAll('.slide')

let hero_slide_index = 0

let hero_slide_play = true

let hero_slide_control_items = hero_slide.querySelectorAll('.slide-control-item')

let slide_next = hero_slide.querySelector('.slide-next')

let slide_prev= hero_slide.querySelector('.slide-prev')

let header = document.querySelector('header')


showSlide = (index)=> {
    hero_slide.querySelector('.slide.active').classList.remove('active')
    hero_slide.querySelector('.slide-control-item.active').classList.remove('active')
    hero_slide_control_items[index].classList.add('active')
    hero_slide_items[index].classList.add('active')
}

nextSlide = () => {
    hero_slide_index=hero_slide_index+1 === hero_slide_items.length? 0 : hero_slide_index+1 
    showSlide(hero_slide_index)
}

prevSlide = () => {
    hero_slide_index = hero_slide_index - 1 < 0 ? hero_slide_items.length - 1 : hero_slide_index-1 
    showSlide(hero_slide_index)
}

slide_next.addEventListener('click',() => nextSlide())

slide_prev.addEventListener('click',() => prevSlide())

hero_slide_control_items.forEach((item,index) => {
    item.addEventListener('click',() => showSlide(index))
})

//pause slide when mouse is over slider
hero_slide.addEventListener('mouseover',()=>hero_slide_play=false)
//resume slide when mouse leaves slider
hero_slide.addEventListener('mouseleave',()=>hero_slide_play=true)

//auto slide
setTimeout(()=>hero_slide_items[0].classList.add('active'),200);

setInterval(()=>{
    if(!hero_slide_play)return
    nextSlide()
},5000);


//change header when scrolling
window.addEventListener('scroll', () =>{
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop >80){
       header.classList.add('shrink') 
    }else{
        header.classList.remove('shrink')
    }
})

//scroll
let scroll = window.requestAnimationFrame || function(callback){window.setTimeout(callback,1000/60)}

let el_to_show = document.querySelectorAll('.show-on-scroll')

isElInViewport = (el) => {
    let rect = el.getBoundingClientRect()
    
    let distance = 200
    
    return (rect.top <= (window.innerHeight-distance||document.documentElement.clientHeight-distance))
}
loop =() =>{
    el_to_show.forEach(el =>{
        if (isElInViewport(el)) el.classList.add('show')
    })
    scroll(loop)
}

loop()