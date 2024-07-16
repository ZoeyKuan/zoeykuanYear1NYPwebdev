let cartDictionary = [];
const cartAmountDisplay = document.getElementById('cart-amount');
let cartAmount = 0;
const costID = document.getElementById('cost');
const priceDisplay = document.getElementById('price-display');
const billToggleBtn = document.getElementById("shopping-cart-btn");
let revealBill = 0;
function toggleBill(){
  var bill = document.getElementById("bill");
  revealBill = revealBill + 1;
  if (revealBill % 2 == 1) {
    bill.style.display = "flex";
  } else {
    bill.style.display = "none";
  }
}

costID.addEventListener('click', function() {
 sessionStorage.setItem('bill', JSON.stringify(cartDictionary));
 costID.href = 'form.html';
});
billToggleBtn.addEventListener('click', toggleBill, false);

function createBillItem(productName, price, image, quantity) {
 toAdd = {yomom: [productName, price, image, quantity]};
 for (var dup in cartDictionary){
  console.log(cartDictionary[dup]);
  if (cartDictionary[dup].yomom.includes(productName)){
   cartDictionary.slice(dup, 1);
   alert('You already added that item!');
   return
  }
 }
 cartDictionary.push(toAdd);
 recreation();
}

function cartCreation(){
 var insertIntoDisplayCart = '';
 var total = 0;
 var location = document.getElementById('displayCart');
 const delBtn = document.getElementsByClassName('delbutton');
 htmlCartList.forEach((html) => {
   insertIntoDisplayCart += html;
 });
 cartDictionary.forEach((array) => {
  for (key in array){
   const price = array[key][1];
   total += parseFloat(price);
  }
 });
 location.innerHTML = insertIntoDisplayCart;
 priceDisplay.innerHTML = 'Checkout<br/>($' + total.toFixed(2) + ')';
 for (i=0; i < document.getElementsByClassName('product-quantity').length; i++){
  document.getElementsByClassName('product-quantity')[i].addEventListener('click', updateMonies);
 }
 for (i=0;i<delBtn.length;i++){
  delBtn[i].addEventListener('click', deleteItems);
 }
}

function recreation(){
 htmlCartList = [];
 cartDictionary.forEach((array) => {
  for (var key in array) {
   productName = array[key][0];
   price = array[key][1];
   image = array[key][2];
   quantity = array[key][3];
   var cartHtml = `
   <div class="row py-4">
     <div class="col">
       <img id="${productName}i" src="${image}" alt="${productName}" style="width: 150px; height: 100px;">
     </div>
     <div class="col">
       <span style="color: black;" id="${productName}n">${productName}</span>
       <br /><span id="${productName}p" style="color: black;">$${price}</span>
       <br /><input style="border-radius: 8px; width: 40px; border: transparent; margin-top: 5px; text-align: end;"
       class="product-quantity" id="${productName}" type="number" min="1" value="${quantity}"
       oninput="this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : null">
       <button id="${productName}" class="delbutton">X</button>
     </div>
   </div>`;
   if (htmlCartList.includes(cartHtml) == false){
    htmlCartList.push(cartHtml);
   } else {
     cartDictionary.pop(array);
     alert('You already added that item!');
     continue;
   }
  }}
 );
 cartAmount = cartDictionary.length;
 cartAmountDisplay.innerHTML = cartAmount;
 cartCreation();
}

function updateMonies(event){
 const originalPrice = {
  'Egyptian Tarot Deck': ['Egyptian Tarot Deck', '10.80', 'images/egyptian.jpg', 1],
  'Tarot Playcards': ['Tarot Playcards', '20.70', 'images/game.jpg', 1],
  'Latin Tarot Deck': ['Latin Tarot Deck', '13.70', 'images/latin.jpg', 1],
  'Modern Tarot Deck': ['Modern Tarot Deck', '17.65', 'images/modern.jpg', 1],
  'Rider Waite Tarot Deck': ['Rider Waite Tarot Deck', '8.18', 'images/riderwaite.jpg', 1],
  'Zombie Tarot Deck': ['Zombie Tarot Deck', '33.10', 'images/zombie.jpg', 1],
 };
 let quantity = event.target;
 const i = event.target.id;
 clickedPrice = originalPrice[i][1];
 var clickedImg = document.getElementById(i + 'i');
 clickedImg = 'images' + clickedImg.src.match('/[A-Za-z]+\.[A-Za-z]+$')[0];
 newPrice = parseFloat(clickedPrice) * quantity.value;
 toAdd = {yomom: [
  i, ''+newPrice.toFixed(2), clickedImg, quantity.value,
 ]};
 cartDictionary.forEach((dic) => {
  for (var k in dic){
   if (dic[k][0] == quantity.id){
    dic[k] = toAdd.yomom;
   }
  }
 });
 recreation();
}

function deleteItems(event){
 for(i=0;i<cartDictionary.length;i++) {
  dic = cartDictionary[i];
  for (var key in dic){
   if (dic[key].includes(event.target.id)){
    cartDictionary.splice(i, 1);
   }
  }
 }
 recreation();
}