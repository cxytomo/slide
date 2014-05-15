(function(){
	$('#book .catagories .cat_cont a').click(function(e) {
		e.preventDefault();
		e = e || window.event;
		var tar = e.target || e.srcElement
			, order
			, match
			, result;
		$('#book .catagories .active')[0].className = "";
		tar.className = "active";
		order = tar.parentNode.className;
		match = /cat\w(\d+)/;
		result = order.match(match);
		result = result[1] - 1;
		return showBooks(result);
	});
	function showBooks(order) {
		$('#book .container .active')[0].className = "shelf";
		$('#book .container .shelf')[order].className = "shelf active";
	}
})();

var len =  $("#album_content .sort").length//global variant--the length of carousel
, row = 5//length of one row
, unit = 3
, next = 5
, prev = 0;
(function(){
	$('#carousel .prev').click(function(e) {
		e = e || window.event;
		e.preventDefault();
		move(-1);//3*209=width+padding
	});

	$('#carousel .next').click(function(e) {
		e = e || window.event;
		e.preventDefault();
		move(1);//3*209=width+padding
	});

	function move(flag) {
		var distance = -1 * flag * 627;
		next += flag * unit;
		prev += flag * unit;
		$('#album_content').css("left","+="+distance);
		if(next >= len) {
			$('#movie .next').css('display', 'none');
		} else {
			$('#movie .next').css('display', 'inline-block');
		}
		if(prev > 0) {
			$('#movie .prev').css('display', 'inline-block');
		} else {
			$('#movie .prev').css('display', 'none');
		}
	}
})();

//click to slide
(function(){
	var flag = 0;
	$('#movie .panel').click(function(e){
		e = e || window.event;
		var x = e.clientX
		, leftToDoc = $('#movie .drag').offset().left
		, leftToparent = parseInt($('#movie .drag').css('left'))
		, eleWidth = parseInt($('#movie .panel').css('width'))
		, dif;
		eleWidth = eleWidth/2;
		console.log("eleWidth:" + eleWidth);
		dif = x - leftToDoc;
		console.log("leftToDoc:" + leftToDoc);
		console.log("leftToparent:" + leftToparent);
		console.log("dif:" + dif);
		if(dif < -13) {
			if(dif < -40){
				$('#movie .drag').css('left', 0);
				flag = -1;
			}
			else{
				$('#movie .drag').css('left', leftToparent - 40 + "px");
				flag = flag -1;
			}
		}
		if(dif > 15) {
			if(dif > eleWidth + 14) {
				$('#movie .drag').css('left', "80px");
				flag = 1;
			}
			else{
				$('#movie .drag').css('left', leftToparent + 40 + "px");
				flag = flag + 1;
			}
		}

		$('#album_content').css("left","0");
		$('#movie .prev').css('display', 'none');
		console.log("flag:" + flag );
		switch(flag) {
			case -1: {
				$('#album_content .movies').css('display','list-item');
				$('#album_content .series').css('display','none');
				$('#movie .onlyMovies').css('color',"#67ab36");
				$('#movie .onlySeries').css('color',"#858fa2");
				len =  $("#album_content .movies").length;
				break;
			}
			case 1: {
				$('#album_content .series').css('display','list-item');
				$('#album_content .movies').css('display','none');
				$('#movie .onlyMovies').css('color',"#858fa2");
				$('#movie .onlySeries').css('color',"#67ab36");
				len =  $("#album_content .series").length;
				break;
			}
			default: {
				$('#album_content .movies').css('display','list-item');
				$('#album_content .series').css('display','list-item');
				$('#movie .onlyMovies').css('color',"#858fa2");
				$('#movie .onlySeries').css('color',"#858fa2");
				len =  $("#album_content .sort").length;
				break;
			}
		}
		prev = 0;
		if(len < row) {
			$('#movie .next').css('display', 'none');
			next = len;
		} else {
			next = 5;
			$('#movie .next').css('display', 'inline-block');
		}
	});
})();