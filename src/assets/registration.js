
$(document).ready(function(){
    $(".step").click(function(){
    $(this).addClass("active").prevAll().addClass("active");
$(this).nextAll().removeClass("active");
})

$(".step01").click(function(){
$("#line-progress").css("width","03%");
$(".step1").addClass("active").siblings().removeClass("active")
})

$(".step02").click(function(){
$("#line-progress").css("width","27%");
$(".step2").addClass("active").siblings().removeClass("active")
})

$(".step03").click(function(){
$("#line-progress").css("width","51%");
$(".step3").addClass("active").siblings().removeClass("active")
})

$(".step04").click(function(){
$("#line-progress").css("width","76%");
$(".step4").addClass("active").siblings().removeClass("active")
})

$(".step05").click(function(){
$("#line-progress").css("width","100%");
$(".step5").addClass("active").siblings().removeClass("active")
})


    $("#YourShop2").hide();
    $(".skip-button").click(function(){
      $("#YourShop1").hide();
      $("#YourShop2").show();
    });
  });

