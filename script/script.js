$(document).ready(function() {
  $('.burger').click (function() {
    $('.js-burger-content').toggleClass('burger-content-open');
    $('.navigational-list').toggleClass('navigational-list-visible');
  });
}); 