'use strict';


  /* global chrome */
  // var stime = Number(localStorage.stime);
  // var ftime = Number(localStorage.ftime);

  // window.stime = stime;

  function isOfficeTime(currentTime) {
    var hour = currentTime.getHours();
    return hour >= 1 && hour <= 23;
  }

  function isWeekday(currentTime) {
    var dayOfWeek = currentTime.getDay();
    return dayOfWeek >= 0 && dayOfWeek <= 6;
  }

  // var req = new XMLHttpRequest();
  // req.open('GET', 'http://localhost:8080/api/url/blocked', false);
  // console.log(req.responseText);

  var block;

  // $.get('http://localhost:8080/api/url/blocked', function (data) {
  //   window.kampret = data.toString().split(',');
  //   block = data;
  // });

  if (localStorage.blocked) {

    block = localStorage.blocked.split(',');

  } else {
    block = ['*://*.cumauntukgaklangsungkeblockajaceritanyatuh.com/*'];
  }


  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (localStorage.blocked.split(',')[0] === '')
        block = ['*://*.cumauntukgaklangsungkeblockajaceritanyatuh.com/*'];
      if (block.length !== localStorage.blocked.split(',').length)
        block = localStorage.blocked.split(',');

      console.log(block);
      window.block = block;
      var currentTime = new Date();
      if (isOfficeTime(currentTime) && isWeekday(currentTime)) {
        return {
          redirectUrl: chrome.extension.getURL('../block.html')
        };
      }
      return details.url;
    }, {
      urls: block,
      types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
    }, ['blocking']
  );
