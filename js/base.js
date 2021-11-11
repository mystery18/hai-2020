window.Base = window.Base || function() {};
window.console = window.console || {
  log: function() {},
  warn: function() {},
  error: function() {},
  info: function() {}
}
// Place any jQuery/helper plugins in here.
/*! jquery.cookie v1.4.1 | MIT */
jQuery.cookie = function(name, value, options) {
  if (typeof value != 'undefined') {
    options = options || {};
    if (value === null) {
      value = '';
      options = $.extend({}, options);
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};


// 2017/12废弃
//使用jquery能获取隐藏元素的宽高，获取方法$(元素).actual('width')
;
(function($) {
  $.fn.addBack = $.fn.addBack || $.fn.andSelf;

  $.fn.extend({

    actual: function(method, options) {
      // check if the jQuery method exist
      if (!this[method]) {
        throw '$.actual => The jQuery method "' + method + '" you called does not exist';
      }
      var defaults = {
        absolute: false,
        clone: false,
        includeMargin: false
      };

      var configs = $.extend(defaults, options);
      var $target = this.eq(0);
      var fix, restore;
      if (configs.clone === true) {
        fix = function() {
          var style = 'position: absolute !important; top: -1000 !important; ';

          // this is useful with css3pie
          $target = $target.
          clone().
          attr('style', style).
          appendTo('body');
        };

        restore = function() {
          // remove DOM element after getting the width
          $target.remove();
        };
      } else {
        var tmp = [];
        var style = '';
        var $hidden;

        fix = function() {
          // get all hidden parents
          $hidden = $target.parents().addBack().filter(':hidden');
          style += 'visibility: hidden !important; display: block !important; ';

          if (configs.absolute === true) style += 'position: absolute !important; ';

          // save the origin style props
          // set the hidden el css to be got the actual value later
          $hidden.each(function() {
            var $this = $(this);

            // Save original style. If no style was set, attr() returns undefined
            tmp.push($this.attr('style'));
            $this.attr('style', style);
          });
        };

        restore = function() {
          // restore origin style values
          $hidden.each(function(i) {
            var $this = $(this);
            var _tmp = tmp[i];

            if (_tmp === undefined) {
              $this.removeAttr('style');
            } else {
              $this.attr('style', _tmp);
            }
          });
        };
      }

      fix();
      // get the actual value with user specific methed
      // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
      // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
      var actual = /(outer)/.test(method) ?
        $target[method](configs.includeMargin) :
        $target[method]();

      restore();
      // IMPORTANT, this plugin only return the value of the first element
      return actual;
    }
  });
})(jQuery);


// 2017/12废弃
//计算等高,参数(外框,规律子元素,需要计算等高的元素,该宽度以下不计算等高)
Base.prototype.contourFun = function(box, element, obj, resolution) {
  var box_set = $(box),
    win_w = $(window).width();
  if (box_set.length > 0) {
    if (resolution == undefined || win_w > resolution) {
      $.each(box_set, function(i, box_o) {
        box_o = $(box_o);
        var element_o = box_o.find(element),
          obj_o = element_o.find(obj),
          box_w = box_o.actual('outerWidth'),
          element_w = element_o.actual('width') - 1,
          oneRowNum = Math.floor(box_w / element_w),
          arr = [],
          max_height;
        if (box_w > 0 && oneRowNum > 0) {
          var rowNum = Math.ceil(element_o.length / oneRowNum);
          obj_o.height('auto');
          for (var y = 0; y < rowNum; y++) {
            arr = [];
            for (var x = oneRowNum * y; x < oneRowNum * (y + 1); x++) {
              arr.push(obj_o.eq(x).actual('height'));
            }
            max_height = Math.max.apply(null, arr);
            for (var x = oneRowNum * y; x < oneRowNum * (y + 1); x++) {
              obj_o.eq(x).height(max_height)
            }
          }
        }
      });
    } else {
      box_set.find(element).find(obj).height("auto");
    }
  }
}


Base.prototype.promptIncident = function() {

  $(".prompt-popup").on("click", function() {
    var showClass = "." + $(this).data("vaule");
    (showClass && showClass == ".map-reveal-module") && $(showClass).addClass("map-reveal-module-bg");

    var nowscroll_length = $(document).scrollTop();
    $("body").addClass("position-fix").css("margin-top", -nowscroll_length);
    $(showClass).fadeIn("fast").css("overflow-y", "auto");
  });

  $(".prompt-clock").on("click", function(event) {
    var e = event || window.event;
    e.stopPropagation();
    var nowscroll_length = Math.abs(parseInt($("body").css("margin-top")));
    $("body").removeClass("position-fix").css("margin-top", 0);
    $("html,body").scrollTop(nowscroll_length);
    $(this).parents(".prompt-box").fadeOut("fast");
  });
}


Base.prototype.v2PromptIncident = function() {

  $(".v2-prompt-popup").on("click", function() {
    var showClass = "." + $(this).data("vaule");
    var nowscroll_length = $(document).scrollTop();
    $("body").addClass("position-fix").css("margin-top", -nowscroll_length);
    $(showClass).fadeIn("fast").css("overflow-y", "auto");
  });

  $(".v2-prompt-clock").on("click", function(event) {
    var e = event || window.event;
    e.stopPropagation();
    var nowscroll_length = Math.abs(parseInt($("body").css("margin-top")));
    $("body").removeClass("position-fix").css("margin-top", 0);
    $("html,body").scrollTop(nowscroll_length);
    $(this).parents(".v2-prompt-box").fadeOut("fast");
  });
}


//PC端设置二级导航在一级导航的正下方比，PC端设置二级菜单的同级等高
Base.prototype.navigationIncident = function() {
  //PC端设置二级导航在一级导航的正下方比
  var box_width = 0,
    li_width = 0,
    left_length = 0,
    right_length = 0,
    win_widht = $(window).width();
  var test_html = "";

  $(".nav-subset-module").each(function() {
    box_width = $(this).actual('width'); //二级盒子的宽度
    li_width = $(this).parents(".nav-list").outerWidth(); //一级栏目的宽度
    left_length = $(this).parents(".nav-list").offset().left; //一级距离浏览器左侧的宽度
    right_length = win_widht - li_width - left_length;
    if (left_length < (box_width - li_width) / 2) {
      $(this).css("margin-left", -left_length);
    } else {
      if (right_length < (box_width - li_width) / 2) {
        $(this).css("margin-left", -(box_width - li_width - right_length + 1));
      } else {
        $(this).css("margin-left", (li_width - box_width) / 2);
      }
    }
  });



  //登录提示框相关事件
  $(".login").on("hover", function() {
    if ($('#noshow_myspace').prop('checked')) {
      $.cookie('SpaceTimes', "no_notice", {
        expires: 90,
        path: '/'
      });
    }
    if ($(".logined-tip").length > 0) $(".logined-tip").hide();
  });
  $("body").on("click", function() {
    if ($('#noshow_myspace').prop('checked')) {
      $.cookie('SpaceTimes', "no_notice", {
        expires: 90,
        path: '/'
      });
    }
    if ($(".logined-tip").length > 0) $(".logined-tip").hide();
  });
  $(".nav-quick").on("hover", function() {
    if ($('#noshow_myspace').prop('checked')) {
      $.cookie('SpaceTimes', "no_notice", {
        expires: 90,
        path: '/'
      });
    }
    if ($(".logined-tip").length > 0) $(".logined-tip").hide();
  });
  $(".logined-tip").on("click", function(event) {
    event.stopPropagation();
  });


  //处理IE下搜索框焦点问题
  $(".nav-section .nav-list").hover(function() {}, function() {
    if ($(".nav-section .nav-searchbit-text").length > 0) {
      $(".nav-section .nav-searchbit-text").blur();
    }
  });


  //PC端设置二级菜单的同级等高
  $(".nav-subset-height").each(function() {
    var max_height = 0;
    for (var i = 0; i < $(this).find(".nav-tabel-cell").length; i++) {
      var box_obj = $(this).find(".nav-tabel-cell").eq(i).find(".nav-subset-box").eq(0);
      if (i == 0) {
        max_height = box_obj.actual('outerHeight');
      } else {
        if (max_height < box_obj.actual('outerHeight')) {
          max_height = box_obj.actual('outerHeight');
        }
      }
    }
    for (var i = 0; i < $(this).find(".nav-tabel-cell").length; i++) {
      $(this).find(".nav-tabel-cell").eq(i).find(".nav-subset-box").eq(0).outerHeight(max_height);
    }

  });
  $(".nav-subset-module").removeClass("nav-subset-height");

  //处理PC端顶部导航的状态
  function resetNavStatus() {
    if ($('.nav-section').length > 0) {
      if ($(window).scrollTop() < $('.nav-section').offset().top) {
        $(".nav-section .nav").css("position", "relative");
      } else {
        $(".nav-section .nav").css("position", "fixed");
      }
    }
  }
  resetNavStatus();

  $(window).scroll(function() {
    resetNavStatus();
  });

}


//IE8以下提示
Base.prototype.BrowseHappyFun = function() {
  var cookie_name = "browsehappy";
  var lang = $("#gLanguageCurrent").val();
  if (lang == "en" || lang == "en-gb" || lang == "fr-fr" || lang == "de" || lang == "it" || lang == "es") {
    cookie_name = "browsehappy_other";
  }

  if ($.cookie(cookie_name)) {
    return false;
  } else {
    $('.browsehappy').slideDown(function() {
      $(this).trigger("slideEnd")
      $(window).trigger("scroll")
    });
  }
  $('.browsehappy a.close').click(function() {
    $(this).parents('.browsehappy').slideUp(
      function() {
        $(this).trigger("slideEnd");
        $(window).trigger("scroll")
        $.cookie(cookie_name, 'browsehappy', {
          expires: 30,
          path: '/',
          domain: 'huawei.com'
        })
      }
    );
  })
}


//绑定PC端和移动端导航栏搜索框隐藏显示事件
Base.prototype.searchIncident = function() {
  //PC端
  $(".search").on("click", function(e) {
    $(this).find(".search-box").addClass("on").find(".search-text").focus();
    $(document).on("click", function() {
      $(".search-box").removeClass("on");
    });
    //if ($(".logined-tip").length > 0) $(".logined-tip").hide();
    e.stopPropagation();
  });
  $(".search-box").on("click", function(e) {
    e.stopPropagation();
  });
  $(".search .search-close").on("click", function(e) {
    $(this).parents(".search-box").removeClass("on");
    e.stopPropagation();
  });

  //移动端
  $(".mobile-search .mobile-search-a").on("click", function(e) {
    $(this).parents(".mobile-search").find(".mobile-search-box").slideToggle(100).find(".mobile-search-text").focus();
    $(document).on("click", function() {
      $(".mobile-search-box").slideUp(100);
    });
    e.stopPropagation();
  });
  $(".mobile-search-box").on("click", function(e) {
    e.stopPropagation();
  });
  $(".mobile-search-box span").on("click", function() {
    $(this).parents(".mobile-search-box").slideUp(100);
  });
}

//不同区域刷新
Base.prototype.resizeStackLock = false;
Base.prototype.resizeStack = [];
Base.prototype.resizeChangeScreen = function() {

  // 判断是否有已全屏的元素
  var resizeTimer;
  var that = this;
  var perWinWidth = $(window).width();

  function getLevel(w) {
    if (w <= 750) {
      return 0;
    } else if (w <= 1200) {
      return 1;
    } else {
      return 2;
    }
  }
function hasFullScreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
  }
  //视频播放不刷新页面
  function checkVideoPlaying(){
    var fullScreenElement = hasFullScreenElement();
    return (fullScreenElement && $(fullScreenElement).attr("id") == "jWVideoFrameId")||$("#jWVideoFrameId").hasClass("vjs-playing")||$(".mudu-state-playing").length
  }

  $(window).on("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      var winw = $(window).width()
        //视频不在播放状态，不在全屏状态,媒体查询没有切换
        if (getLevel(perWinWidth) != getLevel(winw) && !checkVideoPlaying()) {

       location.reload();
        } else {
	          //处理需要resize的函数
		            that.resizeStackLock = true
          $.each(that.resizeStack, function(idx, val) {
            if (val && val.fn) {
              val.fn.apply(this, val.params);
            }
          })
          that.resizeStackLock = false
        }
      
    }, 400);

  })
}

//移动端菜单事件
Base.prototype.wapManuNav = function() {
  //设置菜单高度
  var window_H = $(window).height();

  $(".wap-navbox").height(window_H);
  $(".wap-nav").height(window_H);
  //为展开菜单添加点击事件
  $("#wap-menubtn").on("click", function() {
    var sroll_length = $(document).scrollTop();
    $("body").addClass("position-fix").css("marginTop", -sroll_length);
    $("#wap-menu").fadeIn(100);
    $('#top').fadeOut();
  });

  //为关闭菜单添加点击事件
  $(".wap-menuclose").on("click", function() {
    if ($("#wap-menuprev").attr("data-prev") != "" && $("#wap-menuprev").attr("data-prev") != undefined) {
      $('#wap-menuprev').trigger('click');
    }
    var sroll_length = Math.abs(parseInt($("body").css("marginTop")));
    $("body").removeClass("position-fix").css("marginTop", 0);
    $("html,body").scrollTop(sroll_length);
    $("#wap-menu").fadeOut(100);
    $(".mob-nav-corporate").find('a[aria-expanded="true"]').trigger("click");
  });

  //为返回菜单添加点击事件
  $("#wap-menuprev").on("click", function() {
    var This = $(this);
    var pre_class = $('.' + This.attr("data-prev"));

    if (This.attr("data-prev") == "opened1") {
      pre_class.removeClass("wap-rollout opened1");
      $(".wap-navmain ul").removeClass("wap-putaway");
      $("#wap-menutitle").html("").removeClass("wap-show");
      $("#wap-menuprev").removeClass("wap-show").attr("data-prev", "");
      $(".wap-navbox").scrollTop(0);
    }

    if (This.attr("data-prev") == "opened2") {
      var pre_title = $(".opened1").parents("li").find(".wap_firstcolumn span").text();
      pre_class.removeClass("wap-rollout opened2");
      $("#wap-menutitle").html(pre_title);
      $("#wap-menuprev").attr("data-prev", "opened1");
      $(".opened1").removeClass("wap-overflow-hide");
      $(".opened1").find("dl").first().removeClass("wap-putaway");
      $(".wap-navbox").scrollTop(0);
    }
  });

  //为一级菜单添加点击事件
  $(".wap-navmain .wap_firstcolumn").on("click", function() {
    if ($(this).parents("li").find(".wap-navbox").length > 0) {
      var head_title = $(this).find("span").text();
      $("#wap-menutitle").html(head_title).addClass("wap-show");
      $("#wap-menuprev").addClass("wap-show").attr("data-prev", "opened1");

      $(".wap-navmain ul").addClass("wap-putaway");
      $(this).parents("li").find(".wap-navbox").first().addClass("wap-rollout opened1");
    }
  });

  //为二级菜单有三级栏目的添加点击事件
  $(".wap-navmain .wap_secondcolumn").on("click", function() {
    var head_title = $(this).find("span").text();
    $("#wap-menutitle").html(head_title).addClass("wap-show");
    $("#wap-menuprev").addClass("wap-show").attr("data-prev", "opened2");

    $(".wap-navbox").scrollTop(0);
    $(".opened1").addClass("wap-overflow-hide");
    $(".opened1").find("dl").first().addClass("wap-putaway");
    $(this).parents("dd").find(".wap-navbox").first().addClass("wap-rollout opened2");
  });
}


// 2017/12废弃
// 大屏小屏的替换图片
Base.prototype.replaceImg = function() {
  if ($('.replaceimg').length > 0) {
    var win_w = $(window).width();
    if (win_w > 768) {
      $('.replaceimg').each(function(index, el) {
        var pcsrc = $(this).data('pcsrc');
        $(this).attr('src', pcsrc);
      });
    } else {
      $('.replaceimg').each(function(index, el) {
        var wapsrc = $(this).data('wapsrc');
        $(this).attr('src', wapsrc);
      });
    };
  };
}


// 2017/12废弃
// 大屏小屏的替换图片(需要懒加载)
Base.prototype.replaceImglazyload = function() {
  if ($('.replaceimglazyload').length > 0) {
    var win_w = $(window).width();
    var replaceimg = $('.replaceimglazyload');
    if (win_w > 768) {
      var pcsrc = replaceimg.data('pcsrc');
      replaceimg.attr('data-original', pcsrc);
    } else {
      var wapsrc = replaceimg.data('wapsrc');
      replaceimg.attr('data-original', wapsrc);
    };
  };
}

// 大屏小屏的替换图片
Base.prototype.V2ReplaceImg = function() {
  if ($('.J-V2ReplaceImg').length > 0) {
    var win_w = $(window).width();
    $('.J-V2ReplaceImg').each(function() {
      var replaceimg = $(this);
      if (replaceimg.data('ipadsrc') != undefined) {
        if (win_w > 1200) {
          var pcsrc = replaceimg.data('pcsrc');
          if (replaceimg.is('img')) {
            replaceimg.attr('src', pcsrc);
          } else {
            replaceimg.css('backgroundImage', 'url(' + pcsrc + ')');
          }
        } else if (1200 > win_w && win_w > 750) {
          var ipadsrc = replaceimg.data('ipadsrc');
          if (replaceimg.is('img')) {
            replaceimg.attr('src', ipadsrc);
          } else {
            replaceimg.css('backgroundImage', 'url(' + ipadsrc + ')');
          }
        } else {
          var wapsrc = replaceimg.data('wapsrc');
          if (replaceimg.is('img')) {
            replaceimg.attr('src', wapsrc);
          } else {
            replaceimg.css('backgroundImage', 'url(' + wapsrc + ')');
          }
        };
      } else {
        if (win_w > 750) {
          var pcsrc = replaceimg.data('pcsrc');
          if (replaceimg.is('img')) {
            replaceimg.attr('src', pcsrc);
          } else {
            replaceimg.css('backgroundImage', 'url(' + pcsrc + ')');
          }
        } else {
          var wapsrc = replaceimg.data('wapsrc');
          if (replaceimg.is('img')) {
            replaceimg.attr('src', wapsrc);
          } else {
            replaceimg.css('backgroundImage', 'url(' + wapsrc + ')');
          }
        };
      }
    })
  };
}

// 大屏小屏的替换图片(需要懒加载) V2
Base.prototype.V2ReplaceImglazyload = function() {
  if ($('.J-V2Replaceimglazyload').length > 0) {
    var win_w = $(window).width();
    $('.J-V2Replaceimglazyload').each(function() {
      var replaceimg = $(this);
      if (replaceimg.data('ipadsrc') != undefined) {
        if (win_w > 1200) {
          var pcsrc = replaceimg.data('pcsrc');
          replaceimg.attr('data-original', pcsrc);
        } else if (1200 > win_w && win_w > 750) {
          var ipadsrc = replaceimg.data('ipadsrc');
          replaceimg.attr('data-original', ipadsrc);
        } else {
          var wapsrc = replaceimg.data('wapsrc');
          replaceimg.attr('data-original', wapsrc);
        };
      } else {
        if (win_w > 750) {
          var pcsrc = replaceimg.data('pcsrc');
          replaceimg.attr('data-original', pcsrc);
        } else {
          var wapsrc = replaceimg.data('wapsrc');
          replaceimg.attr('data-original', wapsrc);
        };
      }
    })
  };
}


// 有懒加载，大屏小屏的替换图片
Base.prototype.ebgReplaceImgLazyLoad = function() {
  function init() {
    if ($('.J-ebg-replace-img-lazyload').length > 0) {
      var win_w = $(window).width();
      $('.J-ebg-replace-img-lazyload').each(function() {
        var $this = $(this);
        var src = $this.attr("src");
        var img1920 = $this.data("pc-l");
        var img1600 = $this.data("pc-s");
        var img1200 = $this.data("ipad-h");
        var img992 = $this.data("ipad-v");
        var img750 = $this.data("wap");
        if (win_w > 1600) {
          $this.attr('data-original', img1920 || img1600 || img1200 || img992 || img750 || src);
        } else if (win_w > 1200) {
          $this.attr('data-original', img1600 || img1920 || img1200 || img992 || img750 || src);
        } else if (win_w > 992) {
          $this.attr('data-original', img1200 || img1600 || img1920 || img992 || img750 || src);
        } else if (win_w > 750) {
          $this.attr('data-original', img992 || img750 || img1200 || img1600 || img1920 || src);
        } else {
          $this.attr('data-original', img750 || img992 || img1200 || img1600 || img1920 || src);
        }
      });
    };
  }
  //对外重新初始化
  $("body").on("ebgReplaceImgLazyLoad", function() {
    init();
  });
  init();
}

// 没有懒加载，大屏小屏的替换图片
Base.prototype.ebgReplaceImg = function() {
  function init() {
    if ($('.J-ebg-replace-img').length > 0) {
      var win_w = $(window).width();
      $('.J-ebg-replace-img').each(function() {
        var $this = $(this);
        var src = $this.attr("src");
        var img1920 = $this.data("pc-l");
        var img1600 = $this.data("pc-s");
        var img1200 = $this.data("ipad-h");
        var img992 = $this.data("ipad-v");
        var img750 = $this.data("wap");
        if (win_w > 1600) {
          $this.attr('src', img1920 || img1600 || img1200 || img992 || img750 || src);
        } else if (win_w > 1200) {
          $this.attr('src', img1600 || img1920 || img1200 || img992 || img750 || src);
        } else if (win_w > 992) {
          $this.attr('src', img1200 || img1600 || img1920 || img992 || img750 || src);
        } else if (win_w > 750) {
          $this.attr('src', img992 || img1200 || img1600 || img1920 || img750 || src);
        } else {
          $this.attr('src', img750 || img992 || img1200 || img1600 || img1920 || src);
        }
      });
    };
  }
  //对外重新初始化
  $("body").on("ebgReplaceImg", function() {
    init();
  });
  init();
}

// 检测浏览器的版本
Base.prototype.browserVersion = function() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

  if ((userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    var isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断移动端浏览器
    var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //判断移动端浏览器
    if (isIos) {
      return "ios";
    }
    if (isAndroid) {
      if (userAgent.match(/HUAWEI/i) && userAgent.match(/MQQBrowser/i)) {
        return "huawei";
      } else if (userAgent.match(/HONOR/i) && userAgent.match(/MQQBrowser/i)) {
        return "honor";
      } else {
        return "android";
      }
    }
  } else {
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf("rv:11") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      switch (fIEVersion) {
        case 6:
          return "6";
        case 7:
          return "7";
        case 8:
          return "8";
        case 9:
          return "9";
        case 10:
          return "10";
        case 11:
          return "11";
        default:
          return "0"; //IE版本过低
      }
    }
    if (isFF) {
      return "FF";
    }
    if (isOpera) {
      return "Opera";
    }
    if (isSafari) {
      return "Safari";
    }
    if (isChrome) {
      return "Chrome";
    }
    if (isEdge) {
      return "Edge";
    }
    if (isIE11) {
      return '11'
    }
  }
}

// 计算同行等高方法，只用在IE10以下，其他的用属性控制
Base.prototype.v2SetHeight = function(obj, obj2, obj3) {
  if (!this.resizeStackLock && this.resizeStack) {
    this.resizeStack.push({
      fn: this.v2SetHeight,
      params: arguments
    });
  }
  if (baseLib.browserVersion() < 11) {
    var This = $(obj);
    This.each(function() {
      var _this = $(this),
        oList = _this.find(obj2),
        oList_len = oList.length,
        oBox_w = _this.outerWidth(true) + 10,
        oList_w = oList.outerWidth(true),
        oColumn_len = Math.floor(oBox_w / oList_w),
        oRow_len = Math.ceil(oList_len / oColumn_len),
        oList_H = 0,
        oList_obj = null;
      oList.find(obj3).height('auto');
      for (var i = 0; i < oRow_len; i++) {
        for (var j = i * oColumn_len; j < oColumn_len * (i + 1); j++) {
          oList.eq(j).addClass('oList_obj');
          var H = oList.eq(j).find(obj3).height();
          H > oList_H ? oList_H = H : oList_H;
          oList_obj = $('.oList_obj');
        }
        oList_obj.find(obj3).height(oList_H);
        oList_obj.removeClass('oList_obj');
        oList_H = 0;
      }
    });
  }
}
Base.prototype.lineLimit = function() {

  function getWord($text, line, word) {

    var text = $text.text();

    if ($text.data("org-text")) {
      text = $text.data("org-text");
    } else {
      $text.data("org-text", text);
    }

    line = line || 1;

    var $testWord = $("#J-line-limit-text");

    if ($testWord.length == 0) {
      $("body").append('<div id="J-line-limit-text" style="position:absolute;opacity:0;left:-100%;top: -100px;"></div>');
      // $("body").append('<div id="J-line-limit-text" style="position:absolute;opacity:1;left:0;top:800px;word-break:break-all;background:red;color:#fff"></div>');
    }

    $testWord = $("#J-line-limit-text").css({
      fontSize: $text.css("font-size"),
      lineHeight: $text.css("line-height"),
      width: $text.width(),
      wordBreak: $text.css("word-break"),
    })

    var maxHeight = $testWord.html("...").height() * line;

    //按单词来计算
    if (word) {
      text = text.split(/([^x00-xff]|\s+)/ig);
    }

    var len = text.length;
    var over = false;
    while (len--) {
      var sliceText;
      if (text[len] == "") {
        continue;
      }
      if (typeof text == "object") {
        sliceText = text.slice(0, len + 1).join("");
      } else {
        sliceText = text.slice(0, len + 1);
      }

      $testWord.html(sliceText + "...");
      if ($testWord.height() > maxHeight) {
        over = true;
        continue;
      }
      if (over) {
        return sliceText.slice(0, sliceText.length - 1) + "...";
      } else {
        return text;
      }

    }
    return "";
  }
  //事件
  $(document).off("limit", ".J-line-limit").on("limit", ".J-line-limit", function() {

    var win_w = $(window).width();
    var $this = $(this);
    if ($this.data("init-limit") || $this.is(":hidden")) {
      return;
    }

    $this.data("init-limit", true)
    var line = $this.data("limit");
    var limit1600 = $this.data("limit-pc-s");
    var limit1200 = $this.data("limit-ipad-h");
    var limit992 = $this.data("limit-ipad-s");
    var limit750 = $this.data("limit-wap");

    var allow = false;
    if (limit1600 && win_w > 1600) {
      allow = true;
    }

    if (limit1200 && win_w > 1200) {
      allow = true;
    }

    if (limit992 && win_w > 992) {
      allow = true;
    }

    if (limit750 && win_w > 750) {
      allow = true;
    }

    if (!allow && !(limit1600 || limit1200 || limit992 || limit750)) {
      allow = true;
    }
    if (allow) {
      $this.html(getWord($this, line, $this.data("limit-type")));
    }
  })
  $(".J-line-limit").trigger("limit");
  setTimeout(function() {
    $(".J-line-limit").data("init-limit", false)
    $(".J-line-limit").trigger("limit");
  }, 1000)

}
// 计算同行等高方法,优化版
//  如果层级只有两级，传2个参数，如果层级有三级，传3个参数，
Base.prototype.v3SetHeight = function(obj, obj2, obj3) {
  if (!this.resizeStackLock && this.resizeStack) {
    this.resizeStack.push({
      fn: this.v3SetHeight,
      params: arguments
    });
  }
  var This = $(obj);
  var args = arguments;
  This.each(function() {
    var _this = $(this),
      oList = _this.find(obj2),
      oList_len = oList.length,
      oBox_w = _this.width() + 10,
      oList_w = oList.width(),
      oColumn_len = Math.floor(oBox_w / oList_w),
      oRow_len = Math.ceil(oList_len / oColumn_len),
      oList_H = 0,
      oList_obj = null;
    if (args.length == 2) {
      oList.height('auto');
    } else {
      oList.find(obj3).height('auto');
    }
    for (var i = 0; i < oRow_len; i++) {
      for (var j = i * oColumn_len; j < oColumn_len * (i + 1); j++) {
        oList.eq(j).addClass('oList_obj');
        if (args.length == 2) {
          var H = oList.eq(j).height();
        } else {
          var H = oList.eq(j).find(obj3).height();
        }
        H > oList_H ? oList_H = H : oList_H;
        oList_obj = $('.oList_obj');
      }
      if (args.length == 2) {
        oList_obj.height(oList_H);
      } else {
        oList_obj.find(obj3).height(oList_H);
      }
      oList_obj.removeClass('oList_obj');
      oList_H = 0;
    }
  });
}

// v2版底部 (废弃2019/05/15 z270868)
Base.prototype.v2FooterFun = function() {
  $('.foot-nav-cell').on('click', function() {
    var _this = $(this);

    if (!_this.hasClass('current')) {
      $('.foot-nav-cell').removeClass('current');
      $('.foot-nav-cell').find('dd').removeClass('current');
      $('.foot-nav-cell').find('.iconfont').addClass('icon-expansion').removeClass('icon-collapse');

      _this.addClass('current');
      _this.find('dd').addClass('current');
      _this.find('.iconfont').removeClass('icon-expansion').addClass('icon-collapse');
    } else {
      _this.removeClass('current');
      _this.find('dd').removeClass('current');
      _this.find('.iconfont').addClass('icon-expansion').removeClass('icon-collapse');
    }
  });
}

//侧边栏动画效果
Base.prototype.globalToolbar = function() {

  // 20171219 zhangle
  var globalToolbarH = null;
  var objGlobalToolbar = $('.global_toolbar');
  var toolbarBtnH = $('.toolbar_btn').height();

  //初始化
  if ($('.bannar-breadcrumbs-wrap').height() > 100) {
    globalToolbarH = $('.bannar-breadcrumbs-wrap').height() + $('.zl-pc-header').height() + 50;
    $('.toolbar_btn').css({
      'top': globalToolbarH,
      'marginTop': 0
    });
  } else {
    $('.global_toolbar').removeClass('default');
    $('.toolbar_btn').css({
      'top': '50%',
      'marginTop': -toolbarBtnH / 2
    });
  }

  // 滚动条滚动时
  $(window).on('scroll.toolbar', function() {
    var scrTop = $(window).scrollTop();
    var winH = $(window).height()
    if (objGlobalToolbar.hasClass('default')) {
      if (scrTop + winH / 2 >= globalToolbarH + toolbarBtnH / 2) {
        $('.global_toolbar').removeClass('default opacity');
        $('.toolbar_btn').removeClass('default').css({
          'top': '50%',
          'marginTop': -toolbarBtnH / 2
        });
      }
    } else {
      if (scrTop > 10) {
        $('.global_toolbar').removeClass('opacity');
        $('.toolbar_btn').removeClass('default');
      }
    }

  })
  // 针对页面内部有滚动条
  $('.reading_container').on('scroll.readingcontainer', function() {
    $('.global_toolbar').removeClass('opacity');
    $('.toolbar_btn').removeClass('default');
    $('.reading_container').off("scroll.readingcontainer");
    $('.global_toolbar').removeClass('default');
  });
  // 当鼠标移入在移出的时候，收起
  $('.global_toolbar').on('mouseleave', '.toolbar_btn', function() {
    $('.global_toolbar').removeClass('opacity');
    $('.toolbar_btn').removeClass('default');
  });
}

// 添加全站置顶按钮 2019/05/16 zwx270868
Base.prototype.globalTopButton = function() {
  var win_w = $(window).width();
  // 去除老版本的置顶按钮
  if ($('div#top').length > 0 || $('a#top').length > 0) {
    $('#top').detach();
  };
  // 创建新的置顶按钮
  $('<div/>', {
    'id': 'global-top-button',
    'class': 'iconfont icon-up',
    'style': 'display:none;border:1px solid #eee;border-radius:2px;background:#fff;position:fixed;bottom:190px;right:20px;width:40px;height:40px;text-align:center;padding-top:7px;font-size:24px;color: #999;cursor:pointer;z-index:1001;line-height:1;'
  }).appendTo('body');
  var objBtn = $('#global-top-button');
  var perScrollTop = 0;
  // 移动端改变大小
  if ($(window).width() < 750) {
    objBtn.css({
      'bottom': 165,
      'right': 15
    });
  } else if (750 < $(window).width() && $(window).width() < 1200) {
    objBtn.css({
      'bottom': 180,
      'right': 15
    });
  } else {
    // hover状态换图
    objBtn.hover(function() {
      objBtn.css('color', '#333');
    }, function() {
      objBtn.css('color', '#666');
    })
  }
  // 针对华为手机处理定位问题
  if (baseLib.browserVersion() == 'huawei' && win_w < 750) {
    objBtn.css('bottom', 165);
  }
  //else if (baseLib.browserVersion() == 'honor' && win_w < 750) {
  //   objBtn.css('bottom', 115);
  // }

  // 滚动事件，显示隐藏
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 700) {
      objBtn.show();
    } else {
      objBtn.hide();
    }
  })
  // 点击滚动到最顶部
  objBtn.on('click', function() {
    $('body,html').animate({
      'scrollTop': 0
    });
  })

}

var baseLib = new Base();
baseLib.wapManuNav(); //加载导航移动端菜单
baseLib.navigationIncident(); //加载处理PC端二级导航对齐并且二级菜单同级等高
baseLib.promptIncident(); //加载弹出框处理事件
baseLib.searchIncident(); //加载搜索框事件
baseLib.contourFun(".subset-industry-I", "dd", "span"); //设置PC二级导航类别等高
baseLib.BrowseHappyFun(); //IE注释关闭
baseLib.resizeChangeScreen(); //刷新
baseLib.replaceImg(); //大屏小屏的图片替换
baseLib.replaceImglazyload(); //大屏小屏的图片替换
baseLib.ebgReplaceImgLazyLoad() // 有懒加载5种尺寸图片的图片替换
baseLib.ebgReplaceImg() // 没有懒加载5种尺寸图片的图片替换
baseLib.browserVersion(); //v2版
baseLib.lineLimit();
//baseLib.v2SetHeight();//v2版设置高度仅限IE10以下
baseLib.v2FooterFun(); //v2版底部
baseLib.v2PromptIncident();
baseLib.V2ReplaceImglazyload(); // 17/11/27 懒加载如果有3张图的话或者两张图都行。移动端节点改成了750
baseLib.V2ReplaceImg(); // 17/11/27 懒加载如果有3张图的话或者两张图都行。移动端节点改成了750
baseLib.globalToolbar();
baseLib.globalTopButton(); // 全站置顶按钮

var win_W = $(window).width();
$(window).resize(function() {
  var curWin_W = $(window).width();
  if (curWin_W != win_W) {
    win_W = curWin_W;
    baseLib.replaceImg(); //大屏小屏的图片替换
    baseLib.replaceImglazyload(); //大屏小屏的图片替换(需要懒加载)
  };
});


// 判断浏览器是否是IE8及以下，是的话弹出提示升级框
switch (baseLib.browserVersion()) {
  case '6':
  case '7':
  case '8':
  case '0':
    var cook = $.cookie('browserVersionie8');
    if (cook == null) {
      $.cookie('browserVersionie8', "ok", {
        expires: 1,
        path: '/'
      });
      $('.prompt-ie8').fadeIn();
    }
    break;
  default:
    break;
}


//懒加载拓展jquery插件
$.fn.extend({
  'setWidthHeight': function(options) {
    //默认参数
    var defaluts = {
      'scale': 4 / 3 // 传图片比例
    };
    //使用jQuery.extent覆盖插件默认参数
    var opts = $.extend({}, defaluts, options);
    var This = $(this);
    var w = This.width();
    var h = w / opts.scale;
    This.css('height', h);
    $(window).resize(function() {
      This.each(function() {
        if (!$(this).hasClass('over')) {
          w = This.width();
          h = w * opts.h / opts.w;
          This.css('height', h);
        };
      })
    })
  }
});


// 将带有lazyload下的img懒加载
// 带参数(配置对象)，下面配置对象中的各个属性值都是默认的
if ($('.lazyload img').length > 0) {
  $('.lazyload img').lazyload({
    threshold: 100, //临界值，这个值是针对container容器的，即距离container容器视口的临界值
    failure_limit: 100, //最后一个配置属性failure_limit
    event: 'scroll', //触发内部appear事件
    effect: "fadeIn", //显示方法，默认为show，也可以设置为fadeIn
    container: window,
    data_attribute: "original", //img元素的一个data属性，用于存放图片的真实地址
    skip_invisible: true, //忽略隐藏的img元素
    appear: function() {
      var $lazyload = $(this).parents(".lazyload");
      if ($lazyload.parents(".ebg-bg").length && $lazyload.parents(".ebg-bg").data("replace") != "not") {
        $lazyload.parents(".ebg-bg").css("background-image", "url(" + $(this).data("original") + ")");
        $(this).data("original", "");
        $lazyload.hide();
      }
    }, //在img触发appear事件时执行的回调
    load: function() {
      var $lazyload = $(this).parents(".lazyload");

      if ($lazyload.parents(".ebg-bg").length && $lazyload.parents(".ebg-bg").data("replace") != "not") {
        // $lazyload.parents(".ebg-bg").css("background-image","url("+$(this).attr("src")+")");
        // $lazyload.hide();
      } else {
        $lazyload.css({
          'height': 'auto',
          'background': 'none'
        }).addClass('over');
      }
    } //在img触发load事件时执行的回调
  });
}



// 将带有lazyload下的img懒加载
// 带参数(配置对象)，下面配置对象中的各个属性值都是默认的
if ($('.lazyload-v2 img').length > 0) {
  $('.lazyload-v2 img').lazyload({
    threshold: 100, //临界值，这个值是针对container容器的，即距离container容器视口的临界值
    failure_limit: 100, //最后一个配置属性failure_limit
    event: 'scroll', //触发内部appear事件
    effect: "fadeIn", //显示方法，默认为show，也可以设置为fadeIn
    container: window,
    data_attribute: "original", //img元素的一个data属性，用于存放图片的真实地址
    skip_invisible: true, //忽略隐藏的img元素
    appear: null, //在img触发appear事件时执行的回调
    load: function() {
      $(this).parents(".lazyload-v2").css({
        'height': 'auto',
        'background': 'none'
      }).addClass('over');
    } //在img触发load事件时执行的回调
  });
}


// 小语种侧边栏事件
(function($) {

  // 滚动条滚动时，侧边栏显示隐藏功能
  if ($('#need_help_desktop').length > 0) {
    var contactUsAnimate = 0;
    $(window).scroll(function() {
      if (contactUsAnimate == 0) {
        if ($(document).scrollTop() > 100 && $(window).width() > 767) {
          $("#need_help_desktop").fadeIn(330);
          contactUsAnimate = 1;
        }
      }
    });

    // 点击展开侧边栏功能
    var $needHelpContHeight = $("#need_help_popup ul").height() + 40;

    $("#need_help_desktop").click(function(e) {
      e.stopPropagation();
    })

    $("#need_help_desktop .tab_help_open").click(function(e) {
      e.stopPropagation();
      if ($(window).width() <= 767) {
        $("#need_help_popup").css('top', '132px').show();
      } else {
        if ($(this).hasClass('close')) {
          if ($("#gLanguageCurrent").val() == 'ar-sa') {
            $("#need_help_desktop").animate({
              'left': -250
            }, 330);
          } else {
            $("#need_help_desktop").animate({
              'right': -250
            }, 330);
          }
          var $needHelpHeight = $("#need_help_desktop .tab_help_open img").height() + 16;
          $("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
            'height': $needHelpHeight
          }, function() {
            $('#need_help_desktop .tab_help_open').removeClass('close clickopen').addClass("clickclose");
          })
        } else {
          if ($("#gLanguageCurrent").val() == 'ar-sa') {
            $("#need_help_desktop").animate({
              'left': 0
            });
          } else {
            $("#need_help_desktop").animate({
              'right': 0
            });
          }

          $("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
            'height': 330
          }, function() {
            $('#need_help_desktop .tab_help_open').addClass('close clickopen').removeClass("clickclose");
          });
        }
      }
    });

    $("#footer_nav_mobile_back_to_top").click(function() {
      window.scrollTo(0, 0);
    });

    $("body").click(function() {
      if ($("#gLanguageCurrent").val() == 'ar-sa') {
        $("#need_help_desktop").animate({
          'left': -250
        }, 330);
      } else {
        $("#need_help_desktop").animate({
          'right': -250
        }, 330);
      }
      var $needHelpHeight = $("#need_help_desktop .tab_help_open img").height() + 16;
      $("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
        'height': $needHelpHeight
      })
      $('#need_help_desktop .tab_help_open').removeClass('close clickopen').addClass("clickclose");
    });

  }

})(jQuery);