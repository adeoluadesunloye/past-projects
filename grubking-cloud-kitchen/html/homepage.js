//menu bar
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// search
$(document).ready(function(){
 $.ajaxSetup({ cache: false });
 $('#search').keyup(function(){
  $('#result').html('');
  $('#state').val('');
  var searchField = $('#search').val();
  var expression = new RegExp(searchField, "i");
  $.getJSON('data.json', function(data) {
   $.each(data, function(key, value){
    if (value.name.search(expression) != -1 || value.price.search(expression) != -1)
    {
     $('#result').append('<li class="list-group-item link-class"><img src="'+value.image+'" height="40" width="40" class="img-thumbnail" /> '+value.name+' | <span class="text-muted">'+value.price+'</span></li>');   
    }
       
   });   
  });
 });
 
 $('#result').on('click', 'li', function() {
  var click_text = $(this).text().split('|');
  $('#search').val($.trim(click_text[0]));
  $("#result").html('');
     
 });
});

//date and time
var dt = new Date();
document.getElementById('date-time').innerHTML=dt;

//image gallery
 var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg")

function openFullImg(pic){
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
}
function closeFullImg(){
    fullImgBox.style.display = "none";
}


//slider
(function($) {
    var slide = function(ele,options) {
        var $ele = $(ele);
      
        var setting = {
        	
            speed: 1000,
           
            interval: 2000,
            
        };
    
        $.extend(true, setting, options);
   
        var states = [
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.2 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 0, $opacity: 0.4 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 110, $opacity: 0.7 },
            { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 0.7 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 620, $opacity: 0.4 },
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

 
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

    
        function next() {
           
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
   
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
     
        return this;
    }
})(jQuery);
$('.slide').hiSlide();

//cart functions
if (document.readyState == 'loading'){
    document.addEventListener('DOMConentLoaded',ready)
} else{
    ready()
}
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0;i<removeCartItemButtons.length;i++){
            var button = removeCartItemButtons[i]
            button.addEventListener('click',removeCartItem)
     }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0;i<removeCartItemButtons.length;i++){
          var input = quantityInputs[i]
          input.addEventListener('change', quantityChanged)
     }
    
    var addTocartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0;i<addTocartButtons.length;i++){
        var button = addTocartButtons[i]
        button.addEventListener('click', addToCartClicked)
     }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',
    purchaseClicked)
}
function purchaseClicked(){
    alert('Now fill in your details')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
function removeCartItem(event){
    var buttonClicked = event.target
               buttonClicked.parentElement.parentElement.remove()
                updateCartTotal()
}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value =1 
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var box = button.parentElement
    var title = box.getElementsByClassName('title')[0].innerText
    var price = box.getElementsByClassName('price')[0].innerText
    var  imageSrc = box.getElementsByClassName('photo')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames= cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title){
            alert('this item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
             <span class="cart-item-title">${title}</span>
         </div>
         <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
           </div>`
    cartRow.innerHTML= cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener
    ('change', quantityChanged)
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows =cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₦',''))
        var quantity = quantityElement.value
        total= total+(price*quantity)
    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText ='₦' + total
}
