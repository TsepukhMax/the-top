$(document).ready(function() {
  $('.burger').click (function() {
    $('.burger span').toggleClass('active');
  }).click(function() {
    $('.navigational-list').toggleClass('active');
  });
}); 