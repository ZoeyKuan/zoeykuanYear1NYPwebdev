const displayTotalBill = document.getElementById('displayTotalBill');
const uInfo = document.getElementsByClassName('userInfo');
var total = 0;

function loadAll(){
 const buying = JSON.parse(sessionStorage.getItem('bill'));
 var payList = [];
 buying.forEach((dic) => {
  for (var key in dic){
   // create the html for data to be inputted into
   var payHtml = `<div class="d-flex mt-3 justify-content-between">
   <div class="d-flex flex-column mt-1 text-dark">
     <h6>${dic[key][0]} x${dic[key][3]}</h6>
     <h6 class="price fw-bold text-success">$${dic[key][1]}</h6>
   </div>
   <img src="${dic[key][2]}" alt="${dic[key][0]}">
   </div>`;
   payList.push(payHtml);
   total += parseFloat(dic[key][1]);
   console.log('checking for the list', payList);
  }
 });
 displayFees(payList);
}

function displayFees(payList){
 var display = '';
 payList.forEach((h) => {
  display += h;
 });
 displayTotalBill.innerHTML = display;
 document.getElementById('displayTotal').innerHTML = '$'+total.toFixed(2);
 document.getElementById('gst').innerHTML = '$'+(total * 0.08).toFixed(2);
 document.getElementById('deliveryfee').innerHTML = '$'+(total * 0.02).toFixed(2);
 document.getElementById('finalTotal').innerHTML ='$'+((total * 0.1)+total).toFixed(2);
}

// maybe change checkout into a get form method?
function checkout(){
 var userInfo = [];
 for (i=0;i<uInfo.length;i++){
  var insert = uInfo[i].value;
  userInfo.push(insert);
 }
 userInfo.push(total);
 sessionStorage.setItem('userInformation', JSON.stringify(userInfo));
 console.log(userInfo);
}

function thanks(){
 var userInfo = JSON.parse(sessionStorage.getItem('userInformation'));
 const title = document.getElementById('title');
 const t = userInfo.pop();
 title.innerHTML = 'Thank you for purchasing with us!';
 const ids = ["name", "address", "postalcode", "email", "phonenumber"];
 for(i=0;i<ids.length;i++){
  document.getElementById(ids[i]).outerHTML = `<div>${userInfo[i]}<div/>`;
 } 
 document.getElementById('gst').innerHTML = '$'+(t * 0.08).toFixed(2);
 document.getElementById('deliveryfee').innerHTML = '$'+(t * 0.02).toFixed(2);
 document.getElementById('finalTotal').innerHTML ='$'+((t * 0.1)+t).toFixed(2);
 loadAll();
}