window.$ = window.jQuery = require('jquery');
var coala = require('coala');
require('./assets/js/turn');
require('./assets/css/app.css');

// function urlParse(url) {
//   var pattern = /(\w+)=([^\?|^\#|^\/|^\&]+)/ig;
//   var params = {};
//   url.replace(pattern, function(a, b, c) {
//     params[b] = c;
//   });
//   return params;
// }

// var params = urlParse(location.href);

function getSessionId() {
  if (window.native) {
    var info = native.getUserInfor();
    if (info) {
      return JSON.parse(info).sessionid;
    }
    alert('系统未登录');
  }
  alert('系统未登录');
}

$.ajax({
  url: '/qfang-agent-api/api/mobile/diarySeventeen/getMyDiary',
  data: {
    sessionId: getSessionId()
    // sessionId: '2c6040dd-8500-44f5-aa8b-54acfce3978f'
  }
}).then(function(data) {
  // alert(JSON.stringify(data))
  if (data.code === 1000) {
    coala.turn = coala.component(require('./pages/turn.html'));
    coala.turn.data.pagesData = data.data;
    coala.turn.mount('#app');
    coala.turn.$('#pages').removeClass('dn');

    coala.cRouter = coala.router({
      routes: {
        '/': function() {
          location.replace(location.href + '#/1');
        },

        '/:num': function(num) {
          coala.turn.trigger('page', num);
        }
      }
    });
  } else if(data.code === 3002) {
    var component = coala.component(require('./pages/no-report.html'));
    component.mount('#app');
  }
});

