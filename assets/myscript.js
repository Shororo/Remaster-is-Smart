// ヘッダーの設定
$(function(){
  
//  if (winW <= devW) {
    //720px以下の時の処理
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
