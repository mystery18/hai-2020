$(function () {

  var win_w = $(window).width();
  if (win_w > 1200) {

    // 设置定位位置
    $('.global-share .pop-up-layer').css('top', -($('.global-share .pop-up-layer').height() / 2 - 20));

    // 复制Url链接
    $('.global-share .J-copy-link').on('click', function () {
      copyUrl($(this));
      //出现提示
      $('.global-share .pop-up-layer .con .copy-link .success').fadeIn(200);
      setTimeout(function () {
        $('.global-share .pop-up-layer .con .copy-link .success').fadeOut(200);
      }, 400);

    });

    function copyUrl(obj) {
      if ($('#urlText').length == 0) {
        // 创建input
        obj.after('<input id="urlText" style="position:fixed;top:-200%;left:-200%;" type="text" value=' + window.location.href + '>');
      }
      $('#urlText').select(); //选择对象
      document.execCommand("Copy"); //执行浏览器复制命令
    }
  }
})

