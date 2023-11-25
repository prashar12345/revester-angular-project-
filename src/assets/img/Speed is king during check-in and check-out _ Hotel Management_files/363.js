/*
==================================================
==================================================

* Dragon UI Placeholders V1.2
* Shannon Brown
* 05/29/2019

==================================================
==================================================
*/


$(document).ready(function() {

  /* 
  function for text fields
  ==================================================
  */

  $("input[type='text']").each(function() { 
    var textInput = $(this);
    var textLabel = textInput.prev('.questionlabel');
    var textContainer = textInput.parent('p');
    var textPlaceholder = textInput.prev('.questionlabel').text();
    
    if ( (textContainer.hasClass("addresslabel")) && (textPlaceholder.indexOf('*') >= 0) ) { /* function for required address text inputs */
      textPlaceholder = textPlaceholder.replace('*', '');
      textInput.addClass("drg-field-address-required");
      textContainer.addClass("drg-field-address-required");
      textInput.attr("placeholder", (textPlaceholder));
      textInput.attr("title", (textPlaceholder));
    }
    
    else if (textContainer.hasClass("addresslabel")) { /* function for non-required address text inputs */
      textInput.attr("placeholder", (textPlaceholder));
      textInput.attr("title", (textPlaceholder));
    }
    
    else if (textPlaceholder.indexOf('*') >= 0) { /* function for required text inputs */
      textPlaceholder = textPlaceholder.replace('*', '');
      textInput.addClass("drg-field-required");
      textContainer.addClass("drg-field-required");
      textInput.attr("placeholder", textPlaceholder);
      textInput.attr("title", textPlaceholder);
    }
    
    else { /* function for non-required text inputs */
      textInput.attr("placeholder", textPlaceholder);
      textInput.attr("title", textPlaceholder);
    };
    
  });

  /* 
  function for password fields
  ==================================================
  */

  $("input[type='password']").each(function() { 
    var pwInput = $(this);
    var pwLabel = pwInput.prev('.questionlabel');
    var pwContainer = pwInput.parent('p');
    var pwPlaceholder = pwInput.prev('.questionlabel').text();
    
    if (pwPlaceholder.indexOf('*') >= 0) { /* function for required password inputs */
      pwPlaceholder = pwPlaceholder.replace('*', '');
      pwInput.addClass("drg-field-required");
      pwContainer.addClass("drg-field-required");
      pwInput.attr("placeholder", (pwPlaceholder));
      pwInput.attr("title", (pwPlaceholder));
    }
    
    else { /* function for non-required password inputs */
      pwInput.attr("placeholder", (pwPlaceholder));
      pwInput.attr("title", (pwPlaceholder));
    };
    
  });


  /* 
  function for other fields
  ==================================================
  */

  $(".otherfillin").each(function() { 
    var otherInput = $(this).find(':text').first();
    var otherParent = $(this).closest("span[class^='spanc']"); /* other for radios */
    var otherParentLabel = otherParent.find('.questionlabel').text(); /* other for radios */
    var otherSibling = $(this).prev("span[class^='spanc']"); /* other for dropdowns */
    var otherSiblingLabel = otherSibling.find('.questionlabel').text(); /* other for dropdowns */
    
    otherInput.attr("placeholder", "Please Specify");
    otherInput.attr("title", "Please Specify");
    
    if ( (otherParentLabel.indexOf('*') >= 0) || (otherSiblingLabel.indexOf('*') >= 0) ) {
      $(this).addClass("drg-field-other-parent-required");
    }
  });

  
  /* 
  function for dropdowns
  ==================================================
  */

  $("select").each(function() { 
    var selInput = $(this);
    var selLabel = selInput.prev('.questionlabel');
    var selContainer = selInput.parent('p');
    var selPlaceholder = selInput.prev('.questionlabel').text();
    var selNullOpt = selInput.find('option[value=""]');
    
    if ( selInput.is('#EXPMONTH') ) {
      selNullOpt.text("Expiration Month");
      selInput.attr("title", "Expiration Month");
    }
    
    else if ( selInput.is('#EXPYEAR') ) {
      selNullOpt.text("Expiration Year");
      selInput.attr("title", "Expiration Year");
    }
    
    else if ( (selContainer.hasClass("addresslabel")) && (selPlaceholder.indexOf('*') >= 0) ) { /* function for required address dropdowns */
      selInput.addClass("drg-field-address-required");
      selContainer.addClass("drg-field-address-required");
      selPlaceholder = selPlaceholder.replace('*', '');
      selNullOpt.text("Select " + selPlaceholder);
      selInput.attr("title", "Select " + selPlaceholder);
    }
    
    else if (selContainer.hasClass("addresslabel")) { /* function for non-required address dropdowns */
      selNullOpt.text(selPlaceholder);
      selInput.attr("title", selPlaceholder);
    }
    
    else if (selPlaceholder.indexOf('*') >= 0) { /* function for required dropdowns */
      selInput.addClass("drg-field-required");
      selContainer.addClass("drg-field-required");
      selPlaceholder = selPlaceholder.replace('*', '');
      selNullOpt.text(selPlaceholder);
      selInput.attr("title", selPlaceholder);
    }
    
    else { /* function for non-required dropdowns */
      selNullOpt.text(selPlaceholder);
      selInput.attr("title", selPlaceholder);
    };
    
  });
  
});