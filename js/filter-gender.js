$(document).ready(function() {
  $('#genderFilterOptions a').click(function() {
    // get class of clicked item
    var filterGenderClass = $(this).data('sex');
    console.log(filterGenderClass);
    // reset active class on buttons
    $('#genderFilterOptions a').removeClass('activeOption');
    // update active state on our clicked button
    $(this).addClass('activeOption');
    
    if(filterGenderClass == 'All') {
      // show all items
      $('.results-container').show();  
    }
    else {
      // hide and show all elements that don't share filterGenderClass
      $('.results-container:not([data-sex="' + filterGenderClass + '"])').hide();
      $('.results-container[data-sex="' + filterGenderClass + '"]').show();
    }
    return false;
  });
});