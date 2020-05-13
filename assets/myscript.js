// ヘッダーの設定

//ナビゲーションバーを推した時、画面外を推した時
$(function(){
    $(document).on('click',function(e) {
     if(!$(e.target).closest('.navigation').length) {
     // ターゲット要素の外側をクリックした時の操作
     if($('.nav-mobile').css("display") =="block"){
     $(".nav-mobile").slideUp();
     $(".nav-cover").slideUp();
     $('.navigation').toggleClass("pushed");
   }
   } else {
     // ターゲット要素をクリックした時の操作
     if(!$('.nav-mobile').is(':animated')){
     $('.navigation').toggleClass("pushed");
     $(".nav-mobile").slideToggle();
     $(".nav-cover").slideToggle();
     }
   }
 });
	//スマホ用navここまで

});


//ナビゲーションメニューのいずれかを推した時
$(document).ready(function(){
  //URLのハッシュ値を取得
  var urlHash = location.hash;
  //ハッシュ値があればページ内スクロール
  if(urlHash) {
    //スクロールを0に戻す
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      //ロード時の処理を待ち、時間差でスクロール実行
      scrollToAnker(urlHash) ;
    }, 100);
  }
  //通常のクリック時
  $('a[href^="#"]').click(function() {
    //ページ内リンク先を取得
    var href= $(this).attr("href");
    //リンク先が#か空だったらhtmlに
    var hash = href == "#" || href == "" ? 'html' : href;
    //スクロール実行
    scrollToAnker(hash);
    //リンク無効化
    return false;
  });

  // 関数：スムーススクロール
  // 指定したアンカー(#ID)へアニメーションでスクロール
  function scrollToAnker(hash) {
    if($('.nav-mobile').css("display") =="block"){
     $(".nav-mobile").slideUp();
     $(".nav-cover").slideUp();
     $('.navigation').toggleClass("pushed");
   }
    var target = $(hash);
    var position = target.offset().top;
    $('body,html').stop().animate({scrollTop:position}, 500);
  }
});



/* instagram */
$(function () {
    try {
        instaurl = "https://www.instagram.com/";
        this.name = "shoyo0000";
        $.ajax(instaurl + this.name + '/', {
            timeout: 2000,
            datatype: 'html'
        }).then(function (data) {
            json_string = data.split("window._sharedData = ")[1];
            json_string = json_string.split("};</script>")[0] + "}";
            this.Arrya_data = JSON.parse(json_string);
            let datas = this.Arrya_data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
            for (i in datas) {
                // 画像URL取得
                var url = datas[i].node.display_url;
                // テキスト取得
                var text = datas[i].node.edge_media_to_caption.edges[0].node.text;
                // リンク取得
                var link = instaurl + "/p/" + datas[i].node.shortcode;

                this.html = `
                <div class="col-4 cardImgWrp p-1">
                <a href="${link}" target="_blank">
                <img src="${url}">
                </a>
                </div>
                `;
                $(".insta-card").append(this.html);
            }
        });
    } catch (error) {
        alert(error);
    }
})
