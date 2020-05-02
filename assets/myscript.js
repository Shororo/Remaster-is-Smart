// ヘッダーの設定
$(function(){
  
//  if (winW <= devW) {
    //720px以下の時の処理
    $(document).on('click',function(e) {
     if(!$(e.target).closest('.navigation').length) {
     // ターゲット要素の外側をクリックした時の操作
     $(".nav-mobile").slideUp();
     $(".nav-cover").slideUp();
   } else {
     // ターゲット要素をクリックした時の操作
     $(".nav-mobile:not(:animated)").slideToggle();
     $(".nav-cover:not(:animated)").slideToggle();
   }
 });
	//スマホ用navここまで

});


// priceの色
$('.menu-card').hover(
  function() {

        //マウスカーソルが重なった時の処理
        $(this).find('.price').css('color','#bd7b00');
      },
      function() {

        //マウスカーソルが離れた時の処理
        $(this).find('.price').css('color','#ff3b00');

      }
      );


// instagram
$(function () {
  try {
        // インスタのIDを入れようね
        this.name = "thelocalburger2019";
        $.ajax('https://www.instagram.com/' + this.name + '/', {
          timeout: 2000,
          datatype: 'html'
        }).then(function (data) {
          json_string = data.split("window._sharedData = ")[1];
          json_string = json_string.split("};</script>")[0] + "}";
          this.Arrya_data = JSON.parse(json_string);
          let datas = this.Arrya_data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;

          // ステップ1.for文でインスタの情報を9つ取得してくる
          for (i in datas) {
                // 画像URL取得
                var url = datas[i].node.display_url;

                // テキスト取得
                var text = datas[i].node.edge_media_to_caption.edges[0].node.text;

                this.html = `
                <div class="carousel-item sinchaku-item">
                <img class="d-block w-100 sec-picture3" src="${url}" alt="First slide">
                <div class="mt-5 sinchaku-text scroll d-md-block w-100">
                <p class="clr-white">${text}</p>
                </div>
                </div>
                `;
                
                $(".insta-card").append(this.html);
              }
            });

        // ステップ2.上記for文のインスタの情報が上手く読み込まれた場合、「kasika」クラスのついたdiv要素をhtml上に出現させる
        // ステップ3.は一番下に記述してる！ 
        $("#sec6").after('<div class="empty-space-0rem kasika"></div>');

      } catch (error) {
        alert(error);
      }
    });


// 詳細画面
$(window).on('load', function() {
    //menu-cardクラスが付与されている要素をクリックすると
    //詳細画面が開き、画像やテキストが代入されます
    $(".menu-card").on("click", function(){ 
      $(".item-img").attr("src", $(this).find(".menu-card-picture").attr("src"));
      $(".item-title").text($(this).find(".menu-name").text());
      $(".item-mini").text($(this).find(".menu-mini").text());
      $(".item-price").text($(this).find(".price").text());
      $(".item-text").text($(this).find(".menu-explanation").text());
      $(".shosai").css("display","block");
      $(".shosai-out").css("display","block");
    });
    
        //詳細画面外をクリックしたときに詳細画面を閉じます
        $(".shosai-out").on("click",function() {
          $(".shosai").css("display","none");
          $(".shosai-out").css("display","none");
        });

        // ステップ3.「kasika」クラスのついた要素が画面上に入った場合、カルーセル発動に必要な「active」クラスを付与する
        $('.kasika').one('inview', function() {
          $(".sinchaku-item:first-of-type").addClass("active");
        });

        $('#card-reload').one('click',function(){
          $(".sinchaku-item:first-of-type").addClass("active");
          $("#card-reload").css("display","none");
        });

        // 背景画像の入れ替え
        $('#change2').on('inview', function() {
        // 要素が画面に表示された時に実行する処理を記述
        $('.title-picture').attr('src', 'images/haikei.jpg');
      });

      });