$(document).ready(function() {

var apiKey = "cd867eb5b8ed2d3a91948528280324d3";

function getAccountInfo() {
  //~?what=account_info&apikey={key}
  $.ajax({
    //The URL to process the request
    'url': 'http://52.57.228.6/man2API/php/BankPhp.php',
    //The type of request, also known as the "method" in HTML forms
    //Can be 'GET' or 'POST'
    'type': 'GET',
    //Any post-data/get-data parameters
    //This is optional
    'data': {
      'what' : 'account_info',
      'apikey' : apiKey
    },
    //The response from the server
    'success': function (dataString) {
        //You can use any jQuery/JavaScript here!!!
        console.log(dataString);
        var data = JSON.parse(dataString);
        console.log(data);

        var newAvaiable = data.data[0].amount;
        $('#available').html(newAvaiable);
    }
  });
}

function getAllOffers() {
  clearTable();
//~?what=offers&apikey={key}
$.ajax({
//The URL to process the request
'url': 'http://52.57.228.6/man2API/php/BankPhp.php',
//The type of request, also known as the "method" in HTML forms
//Can be 'GET' or 'POST'
'type': 'GET',
//Any post-data/get-data parameters
//This is optional
'data': {
  'what' : 'offers',
  'apikey' : apiKey
},
//The response from the server
'success': function (dataString) {
    //You can use any jQuery/JavaScript here!!!
    console.log(dataString);
    var data = JSON.parse(dataString);
    console.log(data);

      for(var i = 0; i < data.data.length; i++){
        $('#allOffers tr:last').after('<tr><td>'+ data.data[i].id + '</td>' +
                                      '<td>'+ data.data[i].amount + '</td>' +
                                      '<td>'+ data.data[i].currency + '</td>' +
                                      '<td>'+ data.data[i].since + '</td></tr>');
      }

  }
});
}

function clearTable() {
  var table = document.getElementById('allOffers');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

getAccountInfo();
getAllOffers();
// setInterval(function() {getAccountInfo()}, 15000);
// setInterval(function() {getAllOffers()}, 15000);

function buyOffer(){
    $(document).on('click', '#allOffers tr', function() {
      var id = $(this).children('td:first').text();
      var tr = $(this).children();
      console.log($(this).children('td:first').text());
      $('#buy').on('click', function() {
        //~?what=buy&offer={id}&apikey={key}
          $.ajax({
            //The URL to process the request
            'url': 'http://52.57.228.6/man2API/php/BankPhp.php',
            //The type of request, also known as the "method" in HTML forms
            //Can be 'GET' or 'POST'
            'type': 'GET',
            //Any post-data/get-data parameters
            //This is optional
            'data': {
              'what' : 'buy',
              'offer' : id,
              'apikey' : apiKey
            },
            //The response from the server
            'success': function (dataString) {
                //You can use any jQuery/JavaScript here!!!
                console.log(dataString);
                var data = JSON.parse(dataString);
                console.log(data);
            }
          });
          tr.remove();
      });
    });
}

$('#sell').on('click', function() {
  var amount = $("#sellAmount").val();

    $.ajax({
      //The URL to process the request
      'url': 'http://52.57.228.6/man2API/php/BankPhp.php',
      //The type of request, also known as the "method" in HTML forms
      //Can be 'GET' or 'POST'
      'type': 'GET',
      //Any post-data/get-data parameters
      //This is optional
      'data': {
        'what' : 'sell',
        'amount' : amount,
        'apikey' : apiKey
      },
      //The response from the server
      'success': function (dataString) {
          //You can use any jQuery/JavaScript here!!!
          console.log(dataString);
          var data = JSON.parse(dataString);
          console.log(data);

          var newAvailable = Number($('#available').text().replace(/[^0-9\.]+/g,"")) - amount;
          $('#available').text("Available: " + newAvailable);
          $("#sellAmount").val("");
      }
    });

});

$(document).on('click', '#convert', function() {
  var amountEx = $("#exchangeAmount").val();
  var from = $('#fromCurrency').val();
  var to = $('#toCurrency').val();
  //~?what=exchange_rate&from={currency}&to={currency}&apikey={key}
    $.ajax({
      //The URL to process the request
      'url': 'http://52.57.228.6/man2API/php/BankPhp.php',
      //The type of request, also known as the "method" in HTML forms
      //Can be 'GET' or 'POST'
      'type': 'GET',
      //Any post-data/get-data parameters
      //This is optional
      'data': {
        'what' : 'exchange_rate',
        'from' : from,
        'to' : to,
        'apikey' : apiKey
      },
      //The response from the server
      'success': function (dataString) {
          //You can use any jQuery/JavaScript here!!!
          console.log(dataString);
          var data = JSON.parse(dataString);
          console.log(data);

          $('#result').text((amountEx * data.data.amount)/100);
      }
    });
  });


$('#reverseSymbol').on('click', function(e) {
    e.preventDefault();
    var temp = $('#fromCurrency').val();
    $('#fromCurrency').val($('#toCurrency').val());
    $('#toCurrency').val(temp);
});

$(document).on('click', '#allOffers tr', function() {
    var selected = $(this).hasClass("highlight");
    $("#allOffers tr").removeClass("highlight");
    if(!selected)
            $(this).addClass("highlight");
});

// function changeBackgroundColor() {
//   var color = '#';
//   var letters = '0123456789ABCDEF';
//   for (var i = 0; i < 6; i++ ) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   $('#bodyId').css('background-color', color);
// }
//
// changeBackgroundColor()
// setInterval(function() {changeBackgroundColor()}, 1000);


});
