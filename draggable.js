let press = false;
const car = document.querySelector('.draggable');
const innerCar = document.querySelector('.draggable-inner');
let prevMouse; // where it is in pixels on the document
let prevScroll = 0; // number of pixels going to the left
let i = 10;

// automatic scrolling but why is it so rough :(
 var id = setInterval(autoScroll, 3000);

 function autoScroll(){
  car.classList.add('smooth-scrolling');
  car.style.scrollBehavior = "smooth !important";
  prevScroll = Math.abs(prevScroll) + 200;
  car.scroll(prevScroll, {behaviour: "smooth !important"});
  var scrollLeftMax = car.scrollWidth - car.clientWidth;
  if (car.scrollLeft >= scrollLeftMax){
   car.scrollLeft = 0;
   prevScroll = 0;
  }
 }

car.addEventListener('mousemove', (e) => {
 if (!press) return;
 e.preventDefault();
 diffOfNewOld = e.pageX - prevMouse;
 // if you plus then it will go in a pull direction
 car.scrollLeft = prevScroll - diffOfNewOld;
});

car.addEventListener('mouseleave', () => {
 if (!press) return;
 document.style.cursor = 'grabbing';
});

car.addEventListener('mouseenter', ()=>{
 car.style.cursor = 'grab';
});

car.addEventListener('mousedown', (e) => {
 clearInterval(id);
 car.classList.toggle('smooth-scrolling');
 e.preventDefault();
 press = true;
 car.style.cursor = 'grabbing';
 prevMouse = e.pageX;
 prevScroll = car.scrollLeft;
});

car.addEventListener('mouseup', () => {
 press = false;
 car.style.cursor = 'grab';
 id = setInterval(autoScroll, 3000);
});
