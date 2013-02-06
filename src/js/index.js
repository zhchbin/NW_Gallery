window.gui = require('nw.gui');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

$(function() {
  $('.navbar-inner a').click(function() {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var id = $(this).attr('data-con');
    var contentTohide;
    if (id == 'overview') {
      contentTohide = $('#demo'); 
    } else if (id == "demo") {
      contentTohide = $('#overview'); 
    }
    $(contentTohide).fadeOut(function() {
      $('#' + id).fadeIn();
    });
  });

  var content = fs.readFileSync('nativeui.json');
  var nativeuidemos = $.parseJSON(content.toString()).apis;
  var baseURL = "https://github.com/rogerwang/node-webkit/wiki/";
  for (var i = 0; i < nativeuidemos.length; i++) {
    var name = nativeuidemos[i].name;
    $('<li><a href="#' + name +'" data-toggle="tab">' + name + '</a></li>').appendTo($('#nativeui-tabs'));
    var div = $('<div class="tab-pane" id="'+ name +'"><p>' + nativeuidemos[i].description
      + ' <a data-href="'+ baseURL + name + '" class="browserLink" href="javascript:void(0);">More details...</a></p>\
      </div>').appendTo($('#nativeui-con'));
    if (nativeuidemos[i].hasdemo) {
      $('<a class="thumbnail span3" href="javascript:void(0);" data-value="'+ name +'"> \
          <img src="img/'+ name +'.png" /> \
        </a>').appendTo($(div));
    }
  }

  $('a[href="#Window"]').click();

  $('.browserLink').click(function() {
    gui.Shell.openExternal($(this).attr('data-href'));    
  });

  $('.thumbnail').click(function(){
    var app = process.execPath + " " + process.cwd() +"/demos/" + $(this).attr('data-value');
    exec(app);
  });
});
