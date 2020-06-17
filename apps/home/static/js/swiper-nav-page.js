
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
    /*freeMode: true,*/
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    spaceBetween: 10,
//    slidesPerView:4,
    loop: true,
    loopedSlides : 7,
    slidesPerView: 4,
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
    $(add).css("margin-left","15%")
    $(change).css("margin-left","60%")
}
function changeIcon(add, remove){
    $(add).css("background", "no-repeat 0 1.2rem url(../../static/img/triangle.png)")
    $(remove).css("background", "")
}

function recognize_url_hash(){
    if(window.location.hash=="#index" || window.location.hash==""){
        changeStyle("#index_head", "#game_head,#news_head,#about_head", "active")
        changeIcon("#right_li_1", "#right_li_2,#right_li_3,#right_li_4")
        changeCss("#index_hr","#game_hr,#news_hr,#about_hr")
        $(".index_img ul li").css({"opacity": "1", "margin-top": "6rem"})
        $(".bg_img").css("background","url(../../static/img/bg_1.png")
        $("#index_right").html('<span style="position:relative;margin-left:-1.5rem;font-size:0.9rem;">首页</span>')
        $("#game_right, #news_right, #about_right").html("")
    }else if(window.location.hash=="#game"){
        changeStyle("#game_head", "#index_head,#news_head,#about_head", "active")
        changeIcon("#right_li_2", "#right_li_1,#right_li_3,#right_li_4")
        changeCss("#game_hr","#index_hr,#news_hr,#about_hr")
        $(".index_img ul li").css({"opacity": "0", "margin-top": "8rem"})
        $(".bg_img").css("background","url(../../static/img/bg_1.png")
        $(".game_dinosaur").css({"margin-left":"-15rem","opacity":"1", "transition":"0.4s all ease-in-out"})
        $(".name_logo").css({"margin-left":"0rem", "opacity":"1", "transition":"0.4s all ease-in-out"})
        $(".game_text").css({"margin-top": "0rem", "opacity":"1", "transition":"0.4s all ease-in-out"})
        $("#game_right").html('<span style="position:relative;margin-left:-1.5rem;font-size:0.9rem;">游戏</span>')
        $("#index_right, #news_right, #about_right").html("")
        $("#img_delay").css({'opacity':'1', 'left':'0'})
    }else if(window.location.hash=="#news"){
        changeStyle("#news_head", "#index_head,#game_head,#about_head", "active")
        changeIcon("#right_li_3", "#right_li_2,#right_li_1,#right_li_4")
        changeCss("#news_hr","#index_hr,#game_hr,#about_hr")
        $(".index_img ul li").css({"opacity": "0", "margin-top": "8rem"})
        $(".bg_img").css("background","url(../../static/img/bg_1.png")
        $("#news_right").html('<span style="position:relative;margin-left:-1rem;font-size:0.9rem;">行业资讯</span>')
        $("#game_right, #index_right, #about_right").html("")

        $.post("/news/news_title", function(ret){
            var temp = JSON.parse(ret)
            $("#news_1, #thumbs_img_1").attr("src", "../media/" + temp.img[0])
            $("#news_2, #thumbs_img_2").attr("src", "../media/" + temp.img[1])
            $("#news_3, #thumbs_img_3").attr("src", "../media/" + temp.img[2])
            $("#news_4, #thumbs_img_4").attr("src", "../media/" + temp.img[3])
            $("#news_5, #thumbs_img_5").attr("src", "../media/" + temp.img[4])
            $("#news_id_1").attr("href", "/news/news_content?news_id=" + temp.id[0])
            $("#news_id_2").attr("href", "/news/news_content?news_id=" + temp.id[1])
            $("#news_id_3").attr("href", "/news/news_content?news_id=" + temp.id[2])
            $("#news_id_4").attr("href", "/news/news_content?news_id=" + temp.id[3])
            $("#news_id_5").attr("href", "/news/news_content?news_id=" + temp.id[4])
            $("#title_1, #thumbs_title_1").html(temp.title[0])
            $("#title_2, #thumbs_title_2").html(temp.title[1])
            $("#title_3, #thumbs_title_3").html(temp.title[2])
            $("#title_4, #thumbs_title_4").html(temp.title[3])
            $("#title_5, #thumbs_title_5").html(temp.title[4])
        })
    }else{
        changeStyle("#about_head", "#index_head,#game_head,#news_head", "active")
        changeIcon("#right_li_4", "#right_li_2,#right_li_3,#right_li_1")
        changeCss("#about_hr","#index_hr,#game_hr,#news_hr")
        $(".index_img ul li").css({"opacity": "0", "margin-top": "8rem"})
        $(".bg_img").css("background","url(../../static/img/bg_1.png")
        $("#about_right").html('<span style="position:relative;margin-left:-1rem;font-size:0.9rem;">关于我们</span>')
        $("#game_right, #news_right, #index_right").html("")
    };
};