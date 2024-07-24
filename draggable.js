let press = false;
const car = document.querySelector('.draggable');
const innerCar = document.querySelector('.draggable-inner');
let prevMouse; // where it is in pixels on the document
let prevScroll = 0; // number of pixels going to the left
let i = 10;

// automatic scrolling but why is it so rough :(
 // var id = setInterval(autoScroll, 3000);

 function autoScroll(){
  car.style.scrollBehavior = "smooth";
  prevScroll += 200;
  car.scroll(prevScroll, {behaviour: "auto"});
  console.log(car.getBoundingClientRect().width);
  console.log(car.scrollLeft);
  if (car.scrollLeft > prevScroll){
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


car.addEventListener('mousedown', (e) => {
 clearInterval(id);
 car.style.scrollBehavior = "";
 press = true;
 car.style.cursor = 'grabbing';
 prevMouse = e.pageX;
 prevScroll = car.scrollLeft;
});

car.addEventListener('mouseup', (e) => {
 press = false;
 car.style.cursor = 'grab';
 id = setInterval(autoScroll, 3000);
});
