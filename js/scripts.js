//Bussines Logic

var Customer = function( first, last, address)
{
  this.firstName = first;
  this.lastName = last;
  this.addres = address;
}
var Pizza = function( orderStyle, orderSize, order)
{
  this.orderStyle = orderStyle;
  this.orderSize = orderSize;
  this.order = order;
  this.price = 0;
  this.toppings = [];
}

Pizza.prototype.fullPrice = function () {
  this.price += (this.toppings.length * 2)

  if (this.orderStyle === "delivery") {
    this.price += 5;
  }

  if (this.orderSize === "small") {
    this.price += 3;
  }
  else if (this.orderSize === "medium") {
    this.price += 5;
  }
  else if (this.orderSize === "large") {
    this.price += 8;
  }
  else if (this.orderSize === "extra-large") {
    this.price += 11;
  }
}

//User Interface
$(document).ready(function() {
var orderNumber = 0;
  $("form#user-info").submit(function(event) {
    event.preventDefault();
    orderNumber++;


    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var address = $("#address").val();

    var newCustomer  =  new Customer(firstName, lastName, address);

    var orderStyleInput = $("input:radio[name='order-style']:checked").val();
    var orderSizeInput = $("input:radio[name='size']:checked").val();


    var newPizza = new Pizza(orderStyleInput, orderSizeInput, orderNumber);
    $("input[type='checkbox']:checked").each(function(){
      newPizza.toppings.push($(this).val());
    })
    newPizza.fullPrice();


    $(".orders").append("<li>" + "Order #" + newPizza.order + "</li>");
    $('.orders').on('click', 'li', function() {
      $(".final-order-line").text( newCustomer.firstName + " Your " + newPizza.orderSize + " pizza for " + newPizza.orderStyle+ " will be " + newPizza.price + "$ and will have: " + newPizza.toppings);
});

})
})
