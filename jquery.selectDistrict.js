/**
 * Date: 2014-05-28
 * Author: Sanonz <sanonz@126.com>
 */



var sdSelfData = [];

;(function($){



	$.fn.selectDistrict = function(options){

		var settings = {
			offsetTop: 10,
			offsetLeft: 0,
			maxNumber: 0,
			areas: {},
			provinces: {},
			citys: {},
			districts: {},
			mark: $(this).attr('id')
		}, _this = $(this), x = $(this).offset();

		settings = $.extend(settings, options);

		var tpl = '';
			tpl += '<div class="sd-select-box" mark="' + settings.mark + '" style="display:none;top:' + (x.top+_this.outerHeight()+settings.offsetTop) + 'px;left:' + (x.left+settings.offsetLeft) + 'px;">';
			tpl += '	<div class="sd-select-title clearFix"><span class="fl">服务地区选择 <a href="javascript:void(0);" class="sd-select-all" data-value="all">全国</a></span> <span class="fr"><a href="javascript:void(0);" class="close">X</a></span></div>';
			tpl += '	<div class="sd-select-area">';
						for(var a in settings.areas){
			tpl	+=	  '<a href="javascript:void(0);" data-value="' + settings.areas[a].id + '" data-name="' + settings.areas[a].name + '" ' + (a==0 ? 'class="cur"' : '') + '>' + settings.areas[a].name + '<b class="sd-select-statistics" data-total="' + length(settings.provinces[settings.areas[a].id]) + '">(' + length(settings.provinces[settings.areas[a].id]) + ')</b><i></i></a>';
						}
			tpl += '	</div>';
			tpl += '	<div class="sd-select-content">';
						for(var a in settings.areas){
			tpl += '		<table cellspacing="0" cellpadding="0" class="sd-select-show" data-value="' + settings.areas[a].id + '" style="display:' + (a==0 ? 'table' : 'none') + ';">';
								for(var p in settings.provinces[settings.areas[a].id]){
			tpl += '			<tr>';
			tpl += '				<td class="sd-select-province"><input type="checkbox" name="' + settings.provinces[settings.areas[a].id][p].name + '" id="' + settings.mark + '_province-' + settings.provinces[settings.areas[a].id][p].id + '" data-value="1" data-area="' + settings.areas[a].id + '" /> <label for="' + settings.mark + '_province-' + settings.provinces[settings.areas[a].id][p].id + '">' + settings.provinces[settings.areas[a].id][p].name + '</label> <b class="sd-select-statistics" data-total="' + length(settings.citys[settings.provinces[settings.areas[a].id][p].id]) + '">(' + length(settings.citys[settings.provinces[settings.areas[a].id][p].id]) + ')</b></td>';
			tpl += '				<td class="sd-select-city">';
			tpl += '					<ul class="sd-select-city-list clearFix">';
										for(var c in settings.citys[settings.provinces[settings.areas[a].id][p].id]){
			tpl += '						<li>';
			tpl += '							<input type="checkbox" name="' + settings.citys[settings.provinces[settings.areas[a].id][p].id][c].name + '" id="' + settings.mark + '_city-' + settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id + '" data-value="' + settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id + '" data-area="' + settings.areas[a].id + '" /> <label for="' + settings.mark + '_city-' + settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id + '">' + settings.citys[settings.provinces[settings.areas[a].id][p].id][c].name + '</label> <b class="sd-select-statistics">(<u class="total">' + length(settings.districts[settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id]) + '</u>/<u class="already">0</u>)</b> <i></i>';
			tpl += '							<div class="line-separate"></div>';
			tpl += '							<div class="sd-select-district">';
												for(var d in settings.districts[settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id]){
			tpl += 								'<a href="javascript:void(0);" data-value="' + settings.districts[settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id][d].id + '" data-area="' + settings.areas[a].id + '">' + settings.districts[settings.citys[settings.provinces[settings.areas[a].id][p].id][c].id][d].name + '</a>';
												}
			tpl += '							</div>';
			tpl += '						</li>';
										}
			tpl += '					</ul>';
			tpl += '				</td>';
			tpl += '			</tr>';
								}
			tpl += '			<tr>';
			tpl += '				<td class="sd-select-province-all"><input type="checkbox" name="全选" id="' + settings.mark + '_province-all-' + settings.areas[a].id + '" data-value="1" /> <label for="' + settings.mark + '_province-all-' + settings.areas[a].id + '" class="sd-select-color-tip">全选</label></td>';
			tpl += '				<td>&nbsp;</td>';
			tpl += '			</tr>';
			tpl += '		</table>';
						}
			tpl += '	</div>';
			tpl += '	<div class="sd-select-tip sd-select-color-tip">提示：地区、省份、城市均可多项可选，复选取消！</div>';
			tpl += '	<div class="arrow"></div>';
			tpl += '	<div class="arrow-outer"></div>';
			tpl += '</div>';
		$('body').append(tpl);


		var intValue = sdValue(null, 3);
		if( intValue == '|all|' ){
			self('.sd-select-all').addClass('cur');
			self('.sd-select-area, .sd-select-content').append('<div class="sd-select-cover"></div>');
		}else if( intValue != '' ){
			$(this).find('.sd-selection-area span').each(function(){
				self('.sd-select-show[data-value="' + $(this).attr('data-value') + '"]').find('.sd-select-province input[type="checkbox"]').each(function(){
					var provinceChecked = true;
					$(this).parent('.sd-select-province').siblings('.sd-select-city').find('ul li > input[type="checkbox"]').each(function(){
						var city = $(this), cityChecked = true;
						$(this).siblings('.sd-select-district').children('a').each(function(){
							if( intValue.indexOf('|' + $(this).attr('data-value') + '|') > -1 ){
								$(this).addClass('cur');
								sdNumberState(null, city, 1);
							} else {
								cityChecked = false;
							}
						});
						$(this).prop('checked', cityChecked);
						if( !cityChecked )
							provinceChecked = false;
					});
					$(this).prop('checked', provinceChecked);
				});
			});
		}


		$(this).find('.sd-selection-click').click(function () {
			self(false).hide();
			self().slideToggle();
		});

		self('.sd-select-title a.close').click(function(){
			$(this).parents('.sd-select-box').slideUp();
		});

		self().on('mouseenter', '.sd-select-area a', function(){
			var o = self('.sd-select-content .sd-select-show[data-value="' + $(this).attr('data-value') + '"]');
			o.show().siblings().hide();
			if( o.length > 0 )
				$(this).addClass('cur').siblings().removeClass('cur');
		});

		self('.sd-select-district a').click(function(){
			var city = $(this).parents('li').children('input[type="checkbox"]');
			var state = $(this).hasClass('cur') ? 2 : 1;
			sdArea(this, city, state);
		});

		self('.sd-select-city-list li > input[type="checkbox"]').click(function(){
			var city = $(this), checked = $(this).prop('checked');
			var districts = $(this).siblings('.sd-select-district');
			var state = checked ? 1 : 2;
			var province = $(this).parents('tr').find('.sd-select-province input[type="checkbox"]');
			var total = parseInt(province.siblings('.sd-select-statistics').attr('data-total'));
			var citys = $(this).parents('.sd-select-city-list').find('li > input:checked');

			districts = checked ? districts.children('a[class!="cur"]') : districts.children('a.cur') ;
			districts.each(function(){
				sdArea(this, city, state);
			});

			if( total == citys.length )
				province.prop('checked', true);
			else
				province.prop('checked', false);
		});

		self('.sd-select-province > input[type="checkbox"]').click(function(){
			var checked = $(this).prop('checked');
			var state = checked ? 1 : 2;
			var o = $(this).parents('tr').find('.sd-select-city');
			o.find('ul li > input[type="checkbox"]').each(function(){
				$(this).prop('checked', checked);
				var city = $(this), filter = checked ? 'a[class!="cur"]' : 'a.cur';
				$(this).siblings('.sd-select-district').children(filter).each(function(){
					sdArea(this, city, state);
				});
			});
		});

		$(this).on('click', '.sd-selection-area span i', function(){
			var area = $(this).parent('span');
			sdArea(null, null, 3, area);
		});

		self('.sd-select-province-all input[type="checkbox"]').click(function(){
			var checked = $(this).prop('checked'), o = $(this).parents('.sd-select-show'), state = checked ? 1 : 2;
			o.find('.sd-select-province input[type="checkbox"]').prop('checked', checked);
			o.find('.sd-select-city ul li > input[type="checkbox"]').each(function(){
				$(this).prop('checked', checked);
				var city = $(this), filter = checked ? 'a[class!="cur"]' : 'a.cur';
				$(this).siblings('.sd-select-district').children(filter).each(function(){
					sdArea(this, city, state);
				});
			});
		});

		self('.sd-select-title .sd-select-all').click(function(){
			var checked = $(this).hasClass('cur') ? false : true;
			$(this).toggleClass('cur');
			var st = _this.find('.sd-selection-area strong'), sp = _this.find('.sd-selection-area span');

			if( sp.length > 0 ){
				sp.each(function(){
					self('.sd-select-show[data-value="' + $(this).attr('data-value') + '"]').each(function(){
						$(this).find('.sd-select-province-all input[type="checkbox"]').prop('checked', false);
						$(this).find('.sd-select-province input[type="checkbox"]').prop('checked', false);
						$(this).find('.sd-select-city ul li .sd-select-district a.cur').removeClass('cur');
						$(this).find('.sd-select-city ul li > input[type="checkbox"]').each(function(){
							$(this).prop('checked', false);
							$(this).siblings('.sd-select-statistics').children('.already').text( 0 );
						});
					});
					$(this).remove();
				});
			}

			if( checked ){
				self('.sd-select-area, .sd-select-content').append('<div class="sd-select-cover"></div>');
				self().append('<div class="sd-select-color-pop">选择全国时下边的区域选取的将自动取消选择，同时不能选取！<div class="pop-arrow"></div></div>');
				setTimeout(function(){
					self('.sd-select-color-pop').fadeOut('slow', function(){
						$(this).remove();
					});
				}, 2600);
			} else {
				self('.sd-select-cover').remove();
				if( st.length > 0 ){
					st.remove();
					sdValue(null, 5);
					sdFix();
					return 0;
				}
			}


			sdValue(this, 4);
			_this.find('.sd-selection-area').append('<strong data-value="all">全国 <i title="取消"></i></strong>');
			sdFix();
		});

		$(this).on('click', '.sd-selection-area strong i',function(){
			sdValue(null, 5);
			$(this).parent('strong').remove();
			self('.sd-select-cover').remove()
			self('.sd-select-title .sd-select-all').removeClass('cur');
			sdFix();
		});

		function self(ele){
		    if (ele === false)
			    return $('.sd-select-box[mark!="' + settings.mark + '"]');

			if( sdSelfData[settings.mark] )
			    return ele ? sdSelfData[settings.mark].find(ele) : sdSelfData[settings.mark];

			sdSelfData[settings.mark] = $('.sd-select-box[mark="' + settings.mark + '"]');
			return ele ? sdSelfData[settings.mark].find(ele) : sdSelfData[settings.mark];
		}

		function length(obj){
			var num = 0;
			for(var p in obj){ 
				if( typeof(obj[p]) == 'function' )
					continue;
				else
					++num;
			} 
			return num;
		}

		function sdArea(these, city, type, area){
			var aid;
			if( area ){
				aid = $(area).attr('data-value');
			} else {
				aid = $(these).attr('data-area');
				area = _this.find('.sd-selection-area span[data-value="' + aid + '"]');
			}

			if( area.length > 0 ){
				if( type == 3 ){//移除全部
					var o = self('.sd-select-content > table[data-value="' + aid + '"]');
					o.find('input[type="checkbox"]').each(function(){
						$(this).prop('checked', false);
						sdNumberState(null, $(this), 0);
					});
					o.find('.sd-select-district a').each(function(){
						sdValue(this, 2);
						$(this).removeClass('cur');
					});
					area.remove();
					sdFix();
					return true;
				}

				var pt = sdNumberState(null, city, 3), pc = $(these).parent('.sd-select-district').children('a.cur').length;
				if( type == 2 ){//移除一个
					$(these).removeClass('cur');
					sdValue(these, 2);
					--pc;
					var num = sdNumberState(area, city, 2);

					if( 0 == num ){
						area.remove();
						sdFix();
					}

					if( pt > pc )
						city.prop('checked', false);

					return true;
				}

				//添加
				$(these).addClass('cur');
				sdValue(these);
				++pc;
				sdNumberState(area, city, 1);

				if( pt == pc )
					city.prop('checked', true);

				return true;
			}

			area = $(these).parents('.sd-select-box').find('.sd-select-area a[data-value="' + aid + '"]');
			if( area.length <= 0 )
				return false;
			$(these).addClass('cur');
			sdValue( these );
			sdNumberState(null, city, 1);
			_this.find('.sd-selection-area').append('<span data-value="' + aid + '">' + area.attr('data-name') + '<b class="already" data-total="1">(1)</b><i title="移除"></i></span>');
			sdFix();
			return true;
		}

		function sdValue(these, type){
			if( these )
				var value = $(these).attr('data-value');
			var o = _this.find('.sd-selection-value'), val = o.val();
			if( type != 4 )
				var already = $(these).parents('.sd-select-district').siblings('input[type="checkbox"]');

			if( val != '' ){
				if( !new RegExp('^\\|').test(val) )
					val = '|' + val;
				if( !new RegExp('\\|$').test(val) )
					val += '|';
			}

			if( type == 2 ){
				if( val.indexOf('|' + value + '|') > -1 ){
					val = val.replace(new RegExp('\\|' + value + '\\|'), '|');
					o.val( val );
					return 2; //移除成功
				}
				return -2; //值已经存在
			}

			if( type == 3 )
				return val;

			if( type == 4 ){
				val = value;
			} else if( type == 5 ){
				val = '';
			}else {
				if( val == '' )
					val = '|' + value + '|';
				else
					val += value + '|';
			}

			o.val( val );
			return 1; //添加新值成功
		}

		function sdNumberState(area, city, type){
			var num;
			if( city ){
				var o = city.siblings('.sd-select-statistics');
				if( type == 3 )
					return parseInt(o.children('.total').text());
				var pv = o.children('.already'), num = parseInt(pv.text());
				if( type == 0 )
					num = 0;
				else if( type == 1 )
					++num;
				else if( type == 2 )
					--num;
				else
					num = parseInt(type);
				pv.text( num );
			}

			if( area ){
				var al = area.children('.already'), num = parseInt(al.attr('data-total'));
				if( type == 0 )
					num = 0;
				else if( type == 1 )
					++num;
				else if( type ==2 )
					--num;
				else
					num = parseInt(type);
				al.text( '(' + num + ')' ).attr('data-total', num);
			}

			return num;
		}

		function sdFix(){
			self().animate({top: (_this.offset().top+settings.offsetTop+_this.outerHeight())})
		}



	}



})(jQuery);
