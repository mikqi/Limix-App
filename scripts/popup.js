'use strict';

/* global chrome */
/* global $ */

chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  },
  function(tabs) {
    var url = tabs[0].url;

    var a = $('<a>', {
      href: url
    })[0];
    var title = a.host;
    // var urlSplit = url.split('/')[2].split('w.');
    // var title = urlSplit[( urlSplit.length - 1 ) - 1];
    var blockedUrl = '*://*.' + title + '/*';
    var data = {};

    $('#add').on('click', function() {
        data = {
          name: $('#name').val(),
          url: a.hostname,
          urlRegex: blockedUrl,
          tags: $('#tag').materialtags('items')
        };

        document.getElementById('name').value = '';
        document.getElementById('tag').value = '';

        $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/api',
          data: data,
          success: function() {
            console.log(data + ' has been added');
            $.get('http://localhost:8080/api/url/blocked', function(data) {
              localStorage.blocked = data;
            });
          },
        });

      });


    window.data = data;
  }
);
