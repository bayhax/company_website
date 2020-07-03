triangle = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/triangle.png"
play = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/play.png"
pause = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/pause.png"
bg_1 = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/bg_1.png"
bg_2 = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/bg_2.png"
bg_3 = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/bg_3.png"
bg_4 = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/bg_4.png"
function change_bg(img){
    $(".bg_img").css({"background":img, "background-size": "cover"})
}
function changeCss(add, change, style_css){
    $(add).css("margin-left","30%")
    $(change).css("margin-left","70%")
}
function changeIcon(add, remove){
    $(add).css({"background":"no-repeat 1.5rem 1.31rem url(" + triangle + ")"})
    $(remove).css({"background":""})
}
function changeStyle(add, remove, style_class){
    $(add).addClass(style_class)
    $(remove).removeClass(style_class)
}
// 整体swiper切换
var mySwiper = new Swiper('.swiper-container', {
    lazy: true,
    speed: 800,
    direction: 'vertical',
    mousewheel: true,
    hashNavigation:true,
    on:{
        setTransition: function() {
            if(window.location.hash != "#game"){

            }
        },
        slideChangeTransitionStart: function(){
            if(this.realIndex == 0){
                changeIcon("#right_li_1", "#right_li_2,#right_li_3,#right_li_4")
                changeCss("#index_hr","#game_hr,#news_hr,#about_hr")
                changeStyle("#index_head", "#game_head,#news_head,#about_head", "active")
                $("#index_right span").css({'opacity':"1"})
                $("#game_right span,#news_right span,#about_right span").css({'opacity':"0"})
                change_bg("no-repeat url(" + bg_1 + ")")
                $(".page_down").css("display","block")
            }else if(this.realIndex == 1){
                changeIcon("#right_li_2", "#right_li_1,#right_li_3,#right_li_4")
                changeCss("#game_hr","#index_hr,#news_hr,#about_hr")
                changeStyle("#game_head", "#index_head,#news_head,#about_head", "active")
                $("#game_right span").css({'opacity':"1"})
                $("#index_right span,#news_right span,#about_right span").css({'opacity':"0"})
                $(".game_dinosaur").css({"margin-left":"13rem","opacity":"0"})
                $(".name_logo").css({"margin-left":"-7rem", "opacity":"0"})
                $("#game_text").css({"margin-top": "6rem", "opacity": "0"})
                change_bg("no-repeat url(" + bg_2 + ")")
                $(".page_down").css("display","block")
            }else if(this.realIndex == 2){
                changeIcon("#right_li_3", "#right_li_2,#right_li_1,#right_li_4")
                changeCss("#news_hr","#index_hr,#game_hr,#about_hr")
                changeStyle("#news_head", "#index_head,#game_head,#about_head", "active")
                $("#news_right span").css({'opacity':"1"})
                $("#index_right span,#game_right span,#about_right span").css({'opacity':"0"})
                change_bg("no-repeat url(" + bg_3 + ")")
                $(".page_down").css("display","block")
            }else{
                changeIcon("#right_li_4", "#right_li_2,#right_li_3,#right_li_1")
                changeCss("#about_hr","#index_hr,#game_hr,#news_hr")
                changeStyle("#about_head", "#index_head,#news_head,#game_head", "active")
                $("#about_right span").css({'opacity':"1"})
                $("#index_right span,#news_right span,#game_right span").css({'opacity':"0"})
                change_bg("no-repeat url(" + bg_4 + ")")
                $(".page_down").css("display","none")
            }
        },
    },
});

// 导航条切换swiper页面
$('#index_head').click(function(){
    mySwiper[0].slideTo(0, 1000, true);
})
$('#game_head,#next_page').click(function(){
    mySwiper[0].slideTo(1, 1000, true);
    // 设置延迟是为了点击顶部导航栏时game页面也能出现动画滑入效果，不然直接在.on方法里写，变化太快，没有动画效果。
    setTimeout("window.location.href = '/home/index#game'",400);
})
$('#news_head').click(function(){
    mySwiper[0].slideTo(2, 1000, true);
})
$('#about_head').click(function(){
    mySwiper[0].slideTo(3, 1000, true);
})
function title_opacity(add, remove){
    $(add).css({"opacity":"1","transition":"all 0.5s ease-in-out"})
    $(remove).css({"opacity":"0","transition":"all 0.5s ease-in-out"})
}
var thumbsSwiper = new Swiper("#thumbs",{
    /*freeMode: true,*/
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    spaceBetween: 5,
//    slidesPerView:4,
    loop: true,
    loopedSlides : 7,
    slidesPerView: 5,
    speed: 1000,
    centeredSlides: true,
    centeredSlidesBounds: true,
    direction: 'vertical',
    autoplay: true,
    autoplay: {
        disableOnInteraction: false,
    },
})
// 新闻页面轮播
var newsSwiper = new Swiper('.swiper-news', {
    autoplay: true,
    autoplay: {
        disableOnInteraction: false,
    },
    effect: 'fade',
    loop: true,
    speed: 1000,
    loopedSlides : 7,
    slidesPerView: 1,
    mousewheel: false,
    spaceBetween: 10,
    //preventClicks: false,
    //slidesPerView:4,
    direction: 'vertical',
    lazy: {
        loadPrevNext: true,
    },
    thumbs: {
        swiper: thumbsSwiper,
    },
    on: {
        slideChangeTransitionStart: function(){
            if(this.realIndex == 0){
                title_opacity("#title_1", "#title_2,#title_3,#title_4,#title_5")
            }else if(this.realIndex == 1){
                title_opacity("#title_2", "#title_1,#title_3,#title_4,#title_5")
            }else if(this.realIndex == 2){
                title_opacity("#title_3", "#title_2,#title_1,#title_4,#title_5")
            }else if(this.realInde == 3){
                title_opacity("#title_4", "#title_2,#title_3,#title_1,#title_5")
            }else{
                title_opacity("#title_5", "#title_2,#title_3,#title_4,#title_1")
            }
        },
    },
});

// 前一个/后一个新闻资讯切换
$("#prev_news").click(function(){
    newsSwiper.slidePrev();
})
$("#next_news").click(function(){
    newsSwiper.slideNext();
})
recognize_url_hash();
// 导航追踪
window.onhashchange=function(event){
    recognize_url_hash();
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function recognize_url_hash(){
    if(window.location.hash=="#index" || window.location.hash==""){
        changeIcon("#right_li_1", "#right_li_2,#right_li_3,#right_li_4")
        changeCss("#index_hr","#game_hr,#news_hr,#about_hr")
        $("#index_right span").css({'opacity':"1"})
        $("#game_right span,#news_right span,#about_right span").css({'opacity':"0"})
        changeStyle("#index_head", "#game_head,#news_head,#about_head", "active")
    }else if(window.location.hash=="#game"){
        changeStyle("#game_head", "#index_head,#news_head,#about_head", "active")
        $(".game_dinosaur").css({"margin-left":"9rem","opacity":"1"})
        $(".name_logo").css({"margin-left":"1rem", "opacity":"1"})
        $("#game_text").css({"margin-top": "4rem", "opacity":"1"})
        $("#img_delay").css({'opacity':'1;', 'left':'0'})
    }else if(window.location.hash=="#news"){

        $.post("/news/news_title", function(ret){
            var temp = JSON.parse(ret)
            for(var i=0;i<5;i++){
                $("#news_" + (i+1) +",#thumbs_img_" + (i+1)).attr("src", "../media/" + temp.img[i]);
                // 注意这里优先级问题，直接使用a标签的id  news_id。不会跳转，更改不了页面初始化时的href.没有反应。
                $("#img_box_" + (i+1) + " a").attr("href", "/news/news_content?news_id=" + temp.id[i]);
                $("#title_" + (i+1) + ",#thumbs_title_" + (i+1)).html(temp.title[i]);
            }
        })
    }else{
    };
};
function playPause(){
    if(display_video.paused){
        $(".game_video").css({"height": "42.19rem", "width": "75rem", "position": "absolute", "top": "-20rem"});
        $(".video_control").css({"top": "38rem", "left": "5rem","background":"no-repeat url(" + play + ")"});
        $(".game_dinosaur").css({"display": "none"});
        display_video.play();
    }else{
        $(".game_video").css({"height": "11.25rem", "width": "20rem", "top":"0"});
        $(".video_control").css({"top": "5rem", "left": "9rem","background":"no-repeat url(" + pause + ")"});
        $(".game_dinosaur").css({"display": "inline-block"});
        display_video.pause();
    }
}
