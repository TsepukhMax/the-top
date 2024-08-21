$(document).ready(function () {
  $('.burger').click(function () {
    $('.js-burger-content').toggleClass('burger-content-open');
    $('.navigational-list').toggleClass('navigational-list-visible');
  });

	$(document).click(function (e) { 
    var menu = $('.navigational-menu');
    if (!menu.is(e.target) && menu.has(e.target).length === 0 ) {
      $('.js-burger-content').removeClass('burger-content-open');
      $('.navigational-list').removeClass('navigational-list-visible');
    }
  }); 

  $('.js-movie-link').click(function () {
    var href = $(this).attr('href');

    $('html').animate({
      scrollTop: $(href).offset().top
    },{
      duration: 300, 
      easing: 'linear',
    });
    $('.js-burger-content').removeClass('burger-content-open');
    $('.navigational-list').removeClass('navigational-list-visible');
    return false;
  });

/*-------Popup---------*/
  $('.button').click(function () {
    var section = $(this).closest('section');

    var titleText = section.attr('data-title');
    var topText = section.attr('data-top');

    $('.popup-title-text').text(titleText);
    $('.popup-top').text(topText);

    $('.popup').addClass('show');
    $('body').addClass('body-wrapper');
  });

  $('.popup-close').click(function () {
    $('.popup').removeClass('show');
    $('body').removeClass('body-wrapper');
  });
});












// // Получаем элементы модального окна
// var modal = document.getElementById("myModal");
// var modalTitle = document.getElementById("modalTitle");
// var modalText = document.getElementById("modalText");
// var closeModal = document.getElementsByClassName("close")[0];

// // Находим все кнопки, которые могут открыть модальное окно
// var openModalBtns = document.querySelectorAll(".openModalBtn");

// // Функция для открытия модального окна с динамическим контентом
// openModalBtns.forEach(function(button) {
//     button.addEventListener('click', function() {
//         // Получаем данные из атрибутов data-title и data-content
//         var title = this.getAttribute('data-title');
//         var content = this.getAttribute('data-content');
        
//         // Устанавливаем текст заголовка и содержимого
//         modalTitle.textContent = title;
//         modalText.textContent = content;

//         // Открываем модальное окно
//         modal.style.display = "block";
//     });
// });

// // Закрытие модального окна при нажатии на крестик
// closeModal.onclick = function() {
//     modal.style.display = "none";
// }

// // Закрытие модального окна при клике вне его
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
// });


  
  /*------------Popup-----------*/
//   var popupCall = $('[data-popup]');
//   var popupClose = $('[data-close]');
  
//   popupCall.click(function (e) {
//     e.preventDefault();

//     var $this = $(this);
//     var popupId = $this.data('popup');

//     $(popupId).addClass('show');
//     $('body').addClass('body-wrapper');
//   });

//   popupClose.click(function (e) {
//     e.preventDefault();

//     var $this = $(this);
//     var popupParent = $this.parents('.popup');

//     popupParent.removeClass('show');
//     $('body').removeClass('body-wrapper');
//   });