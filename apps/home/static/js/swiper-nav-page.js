
// 整体swiper切换
var mySwiper = new Swiper('.swiper-container', {
    lazy: true,
    speed: 800,
    direction: 'vertical',
    mousewheel: true,
    hashNavigation:true,
    on:{
        setTransition: function() {
            $(".game_dinosaur").css({"margin-left":"-8rem","opacity":"0", "transition":"0.4s all ease-in-out"})
            $(".name_logo").css({"margin-left":"-7rem", "opacity":"0", "transition":"0.4s all ease-in-out"})
            $(".game_text").css({"margin-top": "2rem", "opacity": "0", "transition":"0.4s all ease-in-out"})
        },
    },
    //pagination: {
    //  el: '.swiper-pagination',
    //  clickable: true,

    //},
});
// 导航条切换swiper页面
$('#index_head,#index_right').click(function(){
    mySwiper.slideTo(0, 1000, true);
})
$('#game_head,#game_right').click(function(){
    mySwiper.slideTo(1, 1000, true);
})
$('#news_head,#news_right').click(function(){
    mySwiper.slideTo(2, 1000, true);
})
$('#about_head,#about_right').click(function(){
    mySwiper.slideTo(3, 1000, true);
})
var thumbsSwiper = new Swiper("#thumbs",{
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    spaceBetween: 10,
    slidesPerView:4,
    watchSlidesVisibility: true,
    direction: 'vertical',
})
// 新闻页面轮播
var newsSwiper = new Swiper('.swiper-news', {
    autoplay: true,
    autoplay: {
        disableOnInteraction: false,
    },
    mousewheel: false,
    spaceBetween: 10,
    //slidesPerView:4,
    direction: 'vertical',
    lazy: {
        loadPrevNext: true,
    },
    thumbs: {
        swiper: thumbsSwiper,
    }
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
function changeStyle(add, remove, style_class){
    $(add).addClass(style_class)
    $(remove).removeClass(style_class)
}
function changeCss(add, change, style_css){
    $(add).css("margin-left","10%")
    $(change).css("margin-left","60%")
}

function recognize_url_hash(){
    if(window.location.hash=="#index" || window.location.hash==""){
        changeStyle("#index_head", "#game_head,#news_head,#about_head", "active")
        changeStyle("#index_right", "#game_right,#news_right,#about_right", "right_icon")
        changeCss("#index_hr","#game_hr,#news_hr,#about_hr")
        $(".bg_img").css("background","url(../../static/img/bg_1.png")
        $("#index_right").html('<span>首页</span>')
        $("#game_right, #news_right, #about_right").html("")
    }else if(window.location.hash=="#game"){
        changeStyle("#game_head", "#index_head,#news_head,#about_head", "active")
        changeStyle("#game_right", "#index_right,#news_right,#about_right", "right_icon")
        changeCss("#game_hr","#index_hr,#news_hr,#about_hr")
        $(".bg_img").css("background","url(../../static/img/bg_2.jpeg")
        $(".game_dinosaur").css({"margin-left":"-15rem","opacity":"1", "transition":"0.4s all ease-in-out"})
        $(".name_logo").css({"margin-left":"0rem", "opacity":"1", "transition":"0.4s all ease-in-out"})
        $(".game_text").css({"margin-top": "0rem", "opacity":"1", "transition":"0.4s all ease-in-out"})
        $("#game_right").html('<span>游戏</span>')
        $("#index_right, #news_right, #about_right").html("")
        $("#img_delay").css({'opacity':'1', 'left':'0'})
    }else if(window.location.hash=="#news"){
        changeStyle("#news_head", "#index_head,#game_head,#about_head", "active")
        changeStyle("#news_right", "#index_right,#game_right,#about_right", "right_icon")
        changeCss("#news_hr","#index_hr,#game_hr,#about_hr")
        $(".bg_img").css("background","url(../../static/img/bg_3.jpeg")
        $("#news_right").html('<span style="margin-left:1.2rem;">行业资讯</span>')
        $("#game_right, #index_right, #about_right").html("")
    }else{
        changeStyle("#about_head", "#index_head,#game_head,#news_head", "active")
        changeStyle("#about_right", "#index_right,#game_right,#news_right", "right_icon")
        changeCss("#about_hr","#index_hr,#game_hr,#news_hr")
        $(".bg_img").css("background","url(../../static/img/bg_4.jpeg")
        $("#about_right").html('<span style="margin-left:1.2rem;">关于我们</span>')
        $("#game_right, #news_right, #index_right").html("")
    };
};