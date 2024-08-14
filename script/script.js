$(document).ready(function() {
  $('.burger').click (function() {
    $('.burger span').toggleClass('burger-click');
  }).click(function() {
    $('.navigational-list').toggleClass('visible-list');
  });
}); 