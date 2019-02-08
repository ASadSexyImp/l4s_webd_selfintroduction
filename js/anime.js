function randomValues() {
  anime({
    targets: "#sidebar",
    translateY: function() {
      return anime.random(0, 1000);
    },
    easing: "easeInOutQuad",
    duration: 750,
    complete: randomValues,
    elasticity: 1000
  });
}

randomValues();

// anime({
//   targets: "#sidebar", // セレクタ
//   translateY: "5rem", // 現在地基準に移動
//   scale: [0.75, 0.9], // .75から.9へ変化
//   delay: function(el, index) {
//     // function(el, i){...}で複数の要素に処理
//     return index * 80;
//   },
//   direction: "alternate",
//   loop: true,
//   elasticity: 800
// });

// function bounceUp() {
//   anime({
//     autoplay: false, //We don't want to immediately start the animation
//     targets: "#sidebar", //target the div '#ball'
//     translateY: {
//       value: ["1000px", "0px"], //When bouncing up, start at 160px and end at 0px
//       duration: 575,
//       easing: "easeOutQuad"
//     },
//     complete: function() {
//       bounceDown();
//     } //Function encapsulation is necessary, otherwise we run into not defined error
//   });
// }

// function bounceDown() {
//   anime({
//     autoplay: false, //See similar comments above
//     targets: "#sidebar",
//     translateY: {
//       value: ["0px", "1000px"], //When bouncing down, start at 0px and end at 160px
//       duration: 575,
//       easing: "easeInQuad"
//     },
//     complete: function() {
//       bounceUp();
//     } //After we bounce down, start the bounce up animation
//   });
// }

// bounceDown(); //Start the animation!
