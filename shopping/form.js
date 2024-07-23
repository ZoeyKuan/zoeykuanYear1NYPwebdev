const displayBillItems = document.getElementById('display-bill-items');
const uInfo = document.getElementsByClassName('userInfo');
var total = 0;
let payList = '';

function loadAll(){
 const buying = JSON.parse(sessionStorage.getItem('bill'));
 console.log(buying);
 // var payList = '';
 buying.forEach((dic) => {
  console.log('dic looks like ', dic);
  for (var key in dic){
   // create the html for data to be inputted into
   console.log(key);
   var payHtml = `<div class="d-flex mt-3 justify-content-between">
   <div class="d-flex flex-column mt-1 text-dark">
     <h6>${dic[key][0]} x${dic[key][3]}</h6>
     <h6 class="price fw-bold text-success">$${dic[key][1]}</h6>
   </div>
   <img src="${dic[key][2]}" alt="${dic[key][0]}">
   </div>`;
   displayBillItems.innerHTML += payHtml;
   total += parseFloat(dic[key][1]);
   console.log('checking for the list', payList);
  }
 });
 try {
  document.getElementById('display-total').innerHTML = '$'+total.toFixed(2);
 } catch (error) {
  console.log('this does not exist');
 }
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
 loadAll();
}