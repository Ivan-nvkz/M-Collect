'use strict';

document.addEventListener('DOMContentLoaded', () => {
   // =============================
   const swiperHeader = new Swiper('.header__slider', {
      // Optional parameters
      // direction: 'vertical',
      spaceBetween: 10,
      loop: true,

      // If we need pagination
      pagination: {
         el: '.swiper-pagination , header__slide-pagination',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.swiper-button-next, .header__slider-button-next',
         prevEl: '.swiper-button-prev, .header__slider-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
         el: '.swiper-scrollbar',
      },
   });
   // =============================
   // =============================
   const swiperPopular = new Swiper('.popular__slider', {
      // Optional parameters
      // direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 10,
      loop: true,

      navigation: {
         nextEl: '.swiper-button-next, .popular__slider-button-next',
         prevEl: '.swiper-button-prev, .popular__slider-button-prev',
      },

   });





   // =============================

   // ===========================================================
   /* Модуь звездного рейтинга */

   const ratings = document.querySelectorAll('.rating');
   if (ratings.length > 0) {
      initRatings();
   }
   // Основная функция
   function initRatings() {
      let ratingActive, ratingValue;
      // "Бегаем" по всем рейтингам на странице
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }
      // Инициализируем конкретный рейтинг
      function initRating(rating) {
         initRatingVars(rating);

         setRatingActiveWidth();

         if (rating.classList.contains('rating_set')) {
            setRating(rating);
         }
      }
      // Инициализация переменных
      function initRatingVars(rating) {
         ratingActive = rating.querySelector('.rating__active');
         ratingValue = rating.querySelector('.rating__value');
      }
      // Изменяем ширину активных звезд
      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }
      // Возможность указать оценку 
      function setRating(rating) {
         const ratingItems = rating.querySelectorAll('.rating__item');
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
               // Обновление переменных
               initRatingVars(rating);
               // Обновление активных звезд
               setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
               // Обновление активных звезд
               setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
               // Обновление переменных
               initRatingVars(rating);

               if (rating.dataset.ajax) {
                  // "Отправить" на сервер
                  setRatingValue(ratingItem.value, rating);
               } else {
                  // Отобразить указанную оцнку
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }

            });
         }
      }
      async function setRatingValue(value, rating) {
         if (!rating.classList.contains('rating_sending')) {
            rating.classList.add('rating_sending');

            // Отправика данных (value) на сервер
            let response = await fetch('rating.json', {
               method: 'GET',

               //body: JSON.stringify({
               //	userRating: value
               //}),
               //headers: {
               //	'content-type': 'application/json'
               //}

            });
            if (response.ok) {
               const result = await response.json();

               // Получаем новый рейтинг
               const newRating = result.newRating;

               // Вывод нового среднего результата
               ratingValue.innerHTML = newRating;

               // Обновление активных звезд
               setRatingActiveWidth();

               rating.classList.remove('rating_sending');
            } else {
               alert("Ошибка");

               rating.classList.remove('rating_sending');
            }
         }
      }
   }

   // ===========================================================




});

//=====  JQuery  start  =============================================================

$(document).ready(function () {
   $("form").submit(function () { // Событие отправки с формы
      var form_data = $(this).serialize(); // Собираем данные из полей
      $.ajax({
         type: "POST", // Метод отправки
         url: "send.php", // Путь к PHP обработчику sendform.php
         data: form_data,
         success: function () {
            $('.overley').addClass('overley-visible');
            $('.modal').addClass('modal__visible');
         }
      }).done(function () {
         $(this).find('input').val('');
         $('form').trigger('reset');
      });
      event.preventDefault();
   });
});


// Slick slider start ====================================================================
$(function () {
   $('.your-class').slick({
      dots: true,
   });

});

// Slick slider finish ====================================================================

//=====  JQuery  finish ===================================================================
