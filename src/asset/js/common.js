/**
 * CONFIG
 */
var deviceType = "pc";
var isError = false;
var errorArray = [
	"",
	"入力してください。",
	"正しく入力してください。",
	"選択してください。",
	"選択されていない項目があります。",
	"入力されていない項目があります。",
	"パスワードは6文字以上で設定してください。",
	"パスワードに使用できるのは英数字のみです。",
	"パスワードには英字・数字を混ぜてください。",
	"携帯電話番号に使用できるのは数字のみです。",
	"jpg, gif, png いずれかのファイルを選択してください。",
	"アップロードできるのは50MB以内のjpg, gif, png形式のファイルです。",
	"免許証番号に使用できるのは数字のみです。",
	"メールアドレスとパスワードを入力してください。",
	"入力されたメールアドレス、またはパスワードに誤りがあります。",
	"パスワードと確認用パスワード両方に入力してください。",
	"パスワードが一致しません。",
	"クレジットカード情報が確認できませんでした。もう一度確認して、正しい内容を入力してください。",
	"このクルマは取り扱いを終了しました。お手数ですが他のクルマをお選びください。",
	"検討中リストに追加できるのは100件までです。（個車名）を追加するには、現在登録中のものを1件削除してください。",
	"クルマの予約にはログインが必要です。",
	"検討中リストへの追加にはログインが必要です。",
	"このクルマは現在予約できません。お手数ですが他のクルマをお選びください",
	"予定人数に達したため、乗り換え以外の予約を停止しています。申し訳ありませんが再開までお待ちください。",
	"納車期限を過ぎているため、サイトからのお手続きができません。お手数ですが、NOREL事務局までお問い合わせください。",
	"選択した納車日時ではお手続きできません。お手数ですが、もう一度選択してください。",
	"予定人数に達したため、乗り換え以外の予約を停止しています。",
	"あなたが次に乗り換えるクルマの予約ができるのはYYYY年MM月DD日以降です。",
	"すでに次に乗るクルマを予約中です。",
	"予約の前にすべての会員登録情報の入力を行ってください。",
	"免許証の有効期限切れです。更新してください。",
	"契約者情報の登録を行ってください。",
	"契約者情報の登録後、クレジットカード情報の登録を行ってください。",
	"クレジットカード情報の登録を行ってください。",
	"サービス提供エリア以外の住所は登録できません。",
	"免許証の有効期限切れが迫っています。更新してください。",
	"アカウントがロックアウトされました。詳しくはメールをご確認ください。",
	"ご本人様以外の連絡先を登録ください。",
	"未成年の方は事務局までお問い合わせください。"
];

var errorFunc = {
	/**
	 * load page error check
	 */
	checkErrorCode: function() {
		$(".errorList").each(function(i) {
	    	var errorTxt = "";
		    var errorArr = $(this).data("error");
		    // error check
	    	if(errorArr[0]) {
	    		$.each(errorArr,function(i) {
		    		errorTxt += '<li class="errorTxt">' + errorArray[errorArr[i]] + '</li>';
		    	})
		    	//
		    	$(this).html(errorTxt);

		    	// ページロード時のエラーチェック
		    	if(!isError) isError=true;
	    	} else {
	    		$(this).html("");
	    	}
	    });

	},
	/**
	 * checkPostalTxt
	 *
	 * @param  val  		String
	 * @return flag		    Boolean
	 */
	checkPostalTxt: function(val) {
		var flag;

		if(val.match(/^\d{7}$/)) flag = true;
		else flag = false;

		return flag;
	},

	/**
	 * checkTelTxt
	 *
	 * @param  val  		String
	 * @return flag		    Boolean
	 */
	checkTelTxt: function(val) {
		var flag;

		if(val.match(/^\d+$/)&&val.match(/^\d{11}$/)) flag = true;
		else flag = false;

		return flag;
	},

	/**
	 * checkLicenseTxt
	 *
	 * @param  val  		String
	 * @return arr		    Array 　エラーコードが入っている配列
	 */
	checkLicenseTxt: function(val){
		var arr = [];

		//
		if(!val.match(/^\d+$/)) arr.push(2);
		//
		if(!val.match(/^\d{12}$/)) arr.push(12);

		return arr;
	},

	/**
	 * checkPasswordTxt
	 *
	 * @param  val1  		String  メイン
	 * @param  val2  		String　確認用
	 * @return arr		    Array 　エラーコードが入っている配列
	 */
	checkPasswordTxt: function(val1,val2){
		var arr = {
			main: [],
			conf: []
		};

		// 6文字以上
		if(!val1.match(/^.{6,}$/)) arr.main.push(6);

		// カナ & 記号
		if(val1.match(/[ァ-ヶー]/)||!val1.match(/\w/)) arr.main.push(7);

		// 半角英数字のみ
		if(!val1.match(/^\w+$/)|| val1.match(/^[0-9]+$/)|| val1.match(/^[a-zA-Z]+$/) ) arr.main.push(8);

		// パスワードの一致
		if(val1&&val2) {
			if(val1!==val2) arr.conf.push(16);
		}


		return arr;
	},

	/**
	 * checkEmailTxt
	 *
	 * @param  val  		String  メイン
	 * @return flag		    Boolean trueはOK
	 */
	checkEmailTxt: function(val) {
		var flag = true;

//		if(!val.match(/.+@.+\..+/)) flag = false;
		if(!val.match(/^[a-zA-Z0-9\.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/)) flag = false;

		return flag;

	},

	/**
	 * checkKanaTxt
	 *
	 * @param  val  		String  メイン
	 * @return flag		    Boolean trueはOK
	 */
	checkKanaTxt: function(val) {
		var flag = true;

		// 半角カナの有無　|| アルファベット 数字 アンダースコアの有無 || 大文字英数字 || ひらがな || 漢字
		if(val.match(/[\uFF65-\uFF9F]/)
			||val.match(/\w/)
			||val.match(/[Ａ-Ｚａ-ｚ０-９]/g)
			||val.match(/[\u3040-\u309F]/)
			||val.match(/[\u4E00-\u9FFF]/)) flag = false;

		return flag;

	},

	/**
	 * checkDateLessThan
	 * @param  val1  		String  対象日
	 * @param  val2  		String　入力日
	 * @return arr		    Array 　エラーコードが入っている配列
	 */
	checkDateLessThan: function(val1,val2){
		var flag = true;

		if(val1 > val2) flag = false;

		return flag;

	},

	/**
	 * 必須項目のチェック
	 *
	 * @param {[[Type]]} okcls     入力OKだったときのclass
	 * @param {[[Type]]} ngcls     入力NGだったときのclass
	 * @param {[[Type]]} targetcls 検索用class
	 */
	checkRequired: function(okcls, ngcls, targetcls) {
		var class_ok = okcls || 'correct';
		var class_ng = ngcls || 'error';
		var target = targetcls || 'js-check-required';
		$('.' + target).each(function(index, element){
			//入力か、ラジオボタンか、プルダウンか、チェックボックスか
			var _this = $(this);
			if(_this.prop("tagName") == 'INPUT'){
				//INPUT

				if(_this.attr('type') == 'radio' || _this.attr('type') == 'checkbox'){
					$('input[type="radio"][name="' + _this.attr('name') + '"]').each(function(){
						if($(this).prop('checked')){
							$('input[type="radio"][name="' + _this.attr('name') + '"]')
								.removeClass(class_ng)
								.addClass(class_ok);
						}
					});
				}else{
					//入力チェック
					if(_this.val()){
						_this
							.removeClass(class_ng)
							.addClass(class_ok);
					}
				}
			}else{
				//SELECT
				if(_this.val() != ''){
					_this
						.removeClass(class_ng)
						.addClass(class_ok);
				}
			}

		});

	},

	/**
	 * FileAPI
	 *
	 * @param  ele  		element object
	 * @param  func  		function handler
	 * @param  errorfunc    function handler
	 */
	loadFile: function(ele,func,errorfunc) {
		var reader = new FileReader();
		ele.addEventListener('change', fileChange, false);
		reader.addEventListener('load', func, false);

		function fileChange(e) {
		  var target = e.target;
		  var file = target.files[0];

		  // cancell
		  if(!file) return;

		  var type = file.type; // MIMEタイプ
		  var size = file.size; // ファイル容量（byte）
		  var limit = 50000000; // byte, 50MB
		  var errArr = [];
		  targetID = target.id;

		  // MIMEタイプの判定
		  if ( !type.match(/^image\/(png|jpeg|gif)$/) ) {
		    file = "";
		    errArr.push(10);
		  }

		  // サイズの判定
		  if ( limit < size ) {
		    file = "";
		    errArr.push(11);
  		  }

  		  // fail
  		  if(errArr[0]) {
  		  	errorfunc(target,errArr);
  		  } else {
  		  	reader.readAsDataURL(file);
  		  }


		}
	}
}



var CookieData = (function() {
	var _this;

	/**
	 * コンストラクタ
	 *
	 * @param path 　何処のディレクトリから管理するか
	 * @param bool 　json形式を有りにするかどうか
	 */
	function CookieData(path,bool) {
		_this = this;
		_this.expires;
		_this.path = path||"/";
		// $.cookie.json = bool||true;
	}

	/**
	 * クッキーをセット
	 *
	 * @param key     クッキー名
	 * @param value   クッキー値
	 * @param timer   セット時間
	 */
	CookieData.prototype.set = function(key,value,timer) {
		// 指定がない場合は24時間
		var _value = value.join(',');
		// _this.expires = timer||new Date().getTime() + (24 * 60 * 60 * 1000);
		_this.expires = timer||7;

		$.cookie( key, _value, {expires:_this.expires,path:_this.path});

	}

	/**
	 * クッキーをゲット
	 *
	 * @param  name     クッキーの名前
	 * @return _value   クッキーの値
	 */
	CookieData.prototype.get = function(name) {
		var _value;

		if(!$.cookie(name)){
			_value = [];
		} else {
			_value = $.cookie(name);
			_value = _value.split(',');
		}

		return _value;
	}

	return CookieData;
})();
