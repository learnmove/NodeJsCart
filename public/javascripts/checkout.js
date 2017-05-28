var stripe = Stripe('pk_test_nACxbQHsMSgJvdmV6AjNNW0C');
var $form=$('#checkout-form');
var elements=stripe.elements();
var card = elements.create('card', {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});
card.mount('#card-element');
  card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});
$('#check').click(function(){


    $form.find('button').prop('disabled',true);
     stripe.createToken(card).then(function(result) {
    if (result.error) {
        $form.find('button').prop('disabled',false);
      // Inform the user if there was an error
      var errorElement = document.getElementById('charge-error');
      errorElement.textContent = result.error.message;
        // $form.find('#charge-error').text(result.error.message);
      
      errorElement.classList.remove("hidden");
    $form.find('#charge-error').text(response.error.message);
        // $form.find('#charge-error').removeClass('hidden');
        
    } else {
      // Send the token to your server
         var token=result.token.id;
        $form.append($('<input type="hidden" name="stripeToken" />').val(token
        ));
        $form.submit();

    }
  });
})



// function stripeResponseHandler (status,response){
//     alert(status);
    
//     if(response.error){
//         $form.find('#charge-error').removeClass('hidden');
//         $form.find('#charge-error').prop('disabled',false);

//     }else{
//         var token=response.id;
//         $form.append($('<input type="hidden" name="stripeToken" />')).val(token
//         );
//     }
// }


//   var card={
//         number:$('#card-number').val(),
//         cvc:$('#card-cvc').val(),
//         exp_month:$('#card-exp_month').val(),
//         address:$('#card-address').val(),
//         exp_year:$('#card-exp_year').val(),
//         name:$('#card-name').val(),
        
//     };