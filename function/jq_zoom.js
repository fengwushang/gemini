/* get the url query */

function GetQueryString(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(LocString),
        tmp;
    if (tmp = rs) return decodeURIComponent(tmp[2]);
    return "";
}
/* 底部广告picScroll */
if (typeof rady === 'undefined') {
    var rady = window.rady = {};
}
if (typeof rady.ui === 'undefined') {
    rady.ui = {};
}
(function($) {
    rady.ui.slide = function(options) {
        this.opts = $.extend({}, rady.ui.slide.defaults, options);
        this._container = this.opts.itemContain;
        this._showContain = this.opts.showContain;
        this._containsize = this.opts.containSize;
        this._left = this.opts.leftMove;
        this._right = this.opts.rightMove;
        this._auto = this.opts.auto;
        this._step = this.opts.step;
        this._timer = null;

        this._itemCount = 0;
        this._index = 0;
        this.__play = null;
        this._init();
    };

    rady.ui.slide.prototype = {
        _init: function() {
            var $this = this;
            $this._itemCount = $($this._container).length;
            $this._showContain = $($this.opts.showContain);
            $this._bindEvent();
            $this._showItems();
            $this._startAuto();
        },
        _startAuto: function(s) {
            if (s != undefined)
                this.opts.auto = s;

            if (this.opts.auto == 0)
                return this._stopAuto();

            if (this._timer != null)
                return;

            var $this = this;
            this._timer = setInterval(function() {
                $this._moveRight();
            }, this._auto * 1000);
        },
        _stopAuto: function() {
            if (this._timer == null)
                return;
            clearTimeout(this._timer);
            this._timer = null;
        },
        _bindEvent: function() {
            var $this = this;
            $($this._left).bind("click", function() {
                $this._stopAuto();
                $this._moveLeft();
            }).mouseout(function() {
                $this._startAuto();
            });
            $($this._right).bind("click", function() {
                $this._stopAuto();
                $this._moveRight();
            }).mouseout(function() {
                $this._startAuto();
            });

            $this._showContain.hover(function() {
                    $this._stopAuto();
                },
                function() {
                    $this._startAuto();
                }
            )
        },
        _moveLeft: function() {
            var $this = this;
            if ($this._index >= 0) {
                $this._index -= $this._step;
            } else {
                $this._index = 0;
            }
            $this._showItems();
        },
        _moveRight: function() {
            var $this = this;
            if ($this._index <= $this._itemCount) {
                $this._index += $this._step;
            } else {
                $this._index = 0;
            }
            $this._showItems();
        },
        _showItems: function() {
            var $this = this;
            $this._showContain.empty();
            for (i = $this._index; i < $this._index + $this._containsize; i++) {
                $this._showContain.append($($this._container).eq(i >= $this._itemCount ? i % $this._itemCount : i).clone());
            }
        }
    };

    //设计选项默认值
    rady.ui.slide.defaults = {
        showContain: "#thumblist",
        itemContain: ".thumblist a",
        containSize: 4, //盒子大小
        leftMove: "#leftarrow",
        rightMove: "#rightarrow",
        step: 1
    };
})(jQuery);
/* 幻灯 */
$.fn.extend({
    btbAd: function() {
        var auto = null;
        var obj = $(this);
        var count = $("a", obj).size();
        var n = 0;
        var settings = {
            timer: 5000,
            menu: "#play_text"
        };

        $("a:not(:first-child)", this).hide();

        $(settings.menu + " li").eq(0).css({
            "background": "#ff0000",
            "color": "#fff",
            "border": "1px solid #eaeaea"
        });
        $(settings.menu + " li").mouseover(function() {
            var i = $(this).text() - 1;
            n = i;
            if (n >= count) return;
            $("a", obj).filter(":visible").fadeOut(50, function() {
                $(this).parent().children().eq(n).fadeIn(100);
            });
            $(this).css({
                "background": "#ff0000",
                "color": "#fff",
                "border": "1px solid #eaeaea"
            }).siblings().css({
                "background": "#416fa0",
                "color": "#fff",
                "border": "1px solid #eaeaea"
            });
        });

        auto = setInterval(showAuto, settings.timer);
        obj.hover(function() {
            clearInterval(auto)
        }, function() {
            auto = setInterval(showAuto, settings.timer);
        });

        function showAuto() {
            n = n >= (count - 1) ? 0 : ++n;
            $(settings.menu + " li").eq(n).trigger('mouseover');
        }
    }
});
/* 搜索下拉 */
(function($) {
    $.fn.dropDownList = function() {
        var optionCon = this.find("ul");
        if ($.browser.msie && parseInt($.browser.version) <= 6) {
            this.mouseover(function() {
                $(this).find('.option').show();
            });

            this.mouseleave(function() {
                $(this).find('.option').hide();
            });
        };
    };
})(jQuery);
/* 列表标签 */
$.fn.extend({
    flTab: function() {
        return this.each(function() {
            var t = $(this),
                tit = t.find('.lTabHeader li'),
                nav = t.find('.lTabPanel ul'),
                evt = 'mouseover',
                eq = 0;
            tit.bind(evt, function() {
                if (!$(this).hasClass('noLi')) {
                    $(this).addClass('lTcurr').siblings(tit).removeClass('lTcurr');
                    nav.eq(tit.index($(this))).show().siblings('.lTabPanel ul').hide();
                }
            });
            evt === 'click' ? tit.eq(eq).click() : tit.eq(eq).mouseover();
        })
    }
});



$('#istart').mouseover(function() {
    //console.log("ov");
    var timeOut = setTimeout(function() {
        $("ul.dropdown").show();
    }, 200);
    $('#nav').hover(function() {
        clearTimeout(timeOut);
        $("ul.dropdown>li").hover(function() {
            var thisLi = this;
            var pTop = $("#new_tab").offset().top + 30;
            var tTop = $(thisLi).offset().top;
            var absTop = pTop - tTop - 1;
            var absLeft = 158;
            $("div.dirbox", thisLi).css({
                "top": absTop,
                "left": absLeft
            });
            $(this).addClass("hover");
            $('div.dirbox', this).css('visibility', 'visible');
        }, function() {
            $(this).removeClass("hover");
            $('div.dirbox', this).css('visibility', 'hidden');
        });
        $("div.dirbox").hover(function() {
            $(this).siblings("a").addClass('hover');
        }, function() {
            $(this).siblings("a").removeClass('hover');
        });
    }, function() {
        $("ul.dropdown").hide();
    });
});
$('#istart').mouseout(function() {
    var timeOut = setTimeout(function() {
        $("ul.dropdown").hide();
    }, 200);
    $('#nav').hover(function() {
        clearTimeout(timeOut);
    }, function() {
        $("ul.dropdown").hide();
    });
});


var btl;
$('#btnLogin').mouseenter(function() {
    var left = $(this).position().left;
    $('#login_iframe').css('left', left).show();
});
$('#btnLogin').mouseleave(function() {
    btl = setTimeout(function() {
        $('#login_iframe').hide();
    }, 1000);
});
$('#login_iframe').mouseenter(function() {
    clearTimeout(btl);
    $(document).keypress(function(e) {
        var kcode = (e.keyCode) || (e.which) || (e.charCode);
        if (kcode == 13) {
            $("#btn_Login").trigger("click");
        }
        if (kcode == 27) {
            $('#login_iframe').hide();
        }
    });
});
$('#login_iframe').mouseleave(function() {
    $(this).hide();
});