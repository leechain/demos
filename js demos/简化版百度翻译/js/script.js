(function() {
    var title = document.querySelector(".left .title .lang"),
        ul = document.querySelector(".ul1"),
        lis = document.querySelectorAll(".ul1 li"),
        text = document.querySelector(".left .text"),
        result = document.querySelector(".right .cont"),
        reset = document.querySelector(".bottom .reset"),
        trans = document.querySelector(".bottom .trans"),
        key = true,
        length = lis.length,
        lang = "en",
        timer = null;

    function langShow() {
        if (key == true) {
            ul.style.display = "block";
            key = false;
        } else {
            ul.style.display = "none";
            key = true;
        }
    }

    function changeLang() {
        lang = this.getAttribute('data-lang');
        title.innerHTML = this.innerHTML;
        this.parentNode.style.display = "none";
        key = true;
    }

    function createScript(src) {
        var script = document.createElement('script');
        script.id = "script1"
        script.src = src;
        document.body.appendChild(script);
    }

    function translate() {
        var value = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
        var date = Date.now();
        var str = '20170605000052254' + text.value + date + '63r1c42X7_buc4OrXm1g';
        var md5 = MD5(str);
        var data = 'q=' + text.value + '&from=auto&to=' + lang + '&appid=20170605000052254' + '&salt=' + date + '&sign=' + md5 + "&callback=fn";
        var src = value + data;
        createScript(src);
    }

    function init() {

        title.onclick = langShow;

        for (var i = 0; i < length; i++) {
            lis[i].onclick = changeLang;
        }

        reset.onclick = function() {
            text.value = "";
        }

        trans.onclick = function() {
            if (text.value == "") {
                return;
            }
            var script = document.querySelector('#script1');
            if (script) {
                script.parentNode.removeChild(script);
                translate();
            } else {
                translate();
            }
        }

        text.onkeydown = function() {
            clearTimeout(timer);
            timer = setInterval(function() {
                if (text.value == "") {
                    return;
                }
                var script = document.querySelector('#script1');
                if (script) {
                    script.parentNode.removeChild(script);
                    translate();
                } else {
                    translate();
                }
            }, 500);
            clearTimeout(timer);
        }
    }
    init();
})();

// callback函数fn
function fn(str) {
    var result = document.querySelector(".right .cont");
    result.innerHTML = str.trans_result[0].dst;
}