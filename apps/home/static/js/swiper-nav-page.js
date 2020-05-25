 // 整体swiper切换
var mySwiper = new Swiper('.swiper-container', {
    lazy: true,
    direction: 'vertical',
    mousewheel: true,
    hashNavigation:true,
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

// 新闻页面轮播
var newsSwiper = new Swiper('.swiper-news', {
    autoplay: true,
    autoplay: {
        disableOnInteraction: false,
    },
    direction: 'horizontal',

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
function recognize_url_hash(){
    if(window.location.hash=="#index"){
        $("#index_head,#index_right").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#game_head,#game_right,#news_head,#news_right,#about_head,#about_right").removeClass("active")
    }else if(window.location.hash=="#game"){
        $("#game_head,#game_right").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_2.jpeg")
        $("#index_head,#index_right,#news_head,#news_right,#about_head,#about_right").removeClass("active")
    }else if(window.location.hash=="#news"){
        $("#news_head,#news_right").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_3.jpeg")
        $("#game_head,#game_right,#index_head,#index_right,#about_head,#about_right").removeClass("active")
    }else{
        $("#about_head,#about_right").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_4.jpeg")
        $("#game_head,#game_right,#news_head,#news_right,#index_head,#index_right").removeClass("active")
    };
};