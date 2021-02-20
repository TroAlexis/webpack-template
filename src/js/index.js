// Main js file

// SLIDER EXAMPLE
// $(document).ready(() => {
//   const settings = {
//     dots: true,
//     arrows: false,
//     mobileFirst: true,
//     adaptiveHeight: true,
//     slidesToShow: 1,
//     responsive: [
//       {
//         breakpoint: 767,
//         settings: 'unslick',
//       },
//     ],
//   };
//   const advantagesCards = $('.proof__cards');
//   const reviewsCards = $('.reviews__content');
//
//   const sliders = [
//     advantagesCards.slick(settings),
//     reviewsCards.slick(settings),
//   ];
//
//   $(window).on('resize', () => {
//     if ($(window).width() < 768) {
//       sliders.forEach((slider) => {
//         if (!isSliderInitialized(slider)) {
//           slider.slick(settings);
//         }
//       });
//     }
//   });
//
//   function isSliderInitialized(slider) {
//     return slider.hasClass('slick-initialized');
//   }
// });
