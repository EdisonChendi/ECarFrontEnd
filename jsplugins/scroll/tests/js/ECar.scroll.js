/**
 * ����ֲ������֧�������أ�
 * settings ���ã�
 * 1.settings.arrow:true/false �Ƿ���ʾ���Ҽ�ͷ
 * 2.settings.time:3000 �ֲ����
 * 3.settings.type: scroll/fade �ֲ���ʽ�� ���ҹ���/����
 * 4.settings.class: �ֲ������ʽ
 * 5.settings.width: �ֲ�Ϊ���ҹ���ʱ�䣬������ȣ�Ĭ��Ϊһ����
 *
 * @author zhangweiming
 */
 
;(function($,ECar){
	ECar.scroll = function(settings){
		var scroll = function(settings){
				return new scroll.prototype.init(settings);
			};
		
		var $elem = $(settings.ele),loadimg = true;
		
		scroll.prototype = {
			init:function(settings){  //���ɽṹ
				
				if (typeof($elem) == "undefined" || $elem[0] == null) {
					return false;
				}
				
				settings = $.extend({
							'arrow':true,
							'time':3000,
							'type':scroll,
							'class':''
							},settings);
				
				scroll.main();
			}
		}
		
		scroll.main = function(){
				
				/*������ʽ*/
				$elem.addClass(settings.class);
				
				<!--����html �ṹ start-->
				/*����ǰ����ͼƬ*/
				var $scroll_li = $('.scroll_img',$elem),$scroll_len = $scroll_li.length,$scroll_box = $('.pics',$elem),$num = 1;
				//for(var i = $scroll_len;i>0;i--){
				var img_url1 = $scroll_li.eq(0).attr('imgurl');
				$scroll_li.eq(0).find('a').html('<img src="'+img_url1+'"/>');
				
				if(settings.width){
					var $scroll_li_w = settings.width;
					var $lab_len = parseInt($scroll_len*$scroll_li.width()/settings.width);
				} else {
					var $scroll_li_w = $scroll_li.width();
					var $lab_len = $scroll_len;
				}
				
				$scroll_box.css({position:'relative',overflow:'hidden'});
				
				if (settings.type == 'scroll') {
					var $first_li = $scroll_li[0].outerHTML;
					$($first_li).appendTo($scroll_box);
					$scroll_html = $scroll_box.html();
					$scroll_box.html('').append('<div class="scroll_div"></div>');
					
					var $scroll_act = $('.scroll_div',$elem);
					$scroll_act.html($scroll_html).css({position:'absolute',width:'1000000px',top:'0px',left:'0px'});
					
					var $scroll_li = $('.scroll_img',$elem);
					$scroll_li.css({float:'left',display:'inline'});
				}
				
				/*�������Ҽ�ͷ*/
				if(settings.arrow == true){
					var $arrow_html = '<div class="arrow-left" style="position:absolute;"></div><div class="arrow-right"  style="position:absolute;"></div>';
					$scroll_box.append($arrow_html);
				}
				
				/*����ͼƬ��ǩ*/
				var $lab_html = '<div class="lab_div">';
				for(i=1;i<=$lab_len;i++){
					if(i==1){
						$lab_html = $lab_html + "<span class='an_lab lab_sel'>"+i+"</span>";
					} else{
						$lab_html = $lab_html + "<span class='an_lab'>"+i+"</span>";
					}
				}
				$lab_html = $lab_html + '</div>';
				$($lab_html).appendTo($scroll_box);
				var $lab_ele = $('.an_lab',$elem);
				var $left_btn =  $('.arrow-left',$elem);
				var $right_btn =  $('.arrow-right',$elem);
				
				<!--����html �ṹ end-->
				
				
				/*����ƶ������� ��ת*/
				function step(k,move_arrow){
					if (settings.type == 'scroll') {
						step.prototype.scrollstep(k,move_arrow);
					} else {
						step.prototype.changestep(k,move_arrow);
					};
				}
				step.prototype = {
					changestep:function(k,move_arrow){
						clearInterval(timer);
						
						move.prototype.changemove(k,move_arrow);
					},
					scrollstep:function(k,move_arrow){
						clearInterval(timer);
						$lab_ele.removeClass("lab_sel");
						$lab_ele.eq(k).addClass("lab_sel");
						move.prototype.scrollmove(k,move_arrow);
					}
				}
				
				/*�Զ��ֲ�*/
				function move(k,move_arrow) {
					if (settings.type == 'scroll'){
						move.prototype.scrollmove(k);
					} else {
						move.prototype.changemove(k,move_arrow);
					};
				}
				
				move.prototype = {
					changemove:function(k,move_arrow){
						
						if(k!= undefined){
							var $num = k;
						} else {
							var $num = $('.lab_sel',$elem).index()+1;
						}
						$lab_ele.removeClass("lab_sel");
						$scroll_li.hide();
						if($num>=$scroll_len){
							$lab_ele.eq(0).addClass("lab_sel");
							$num = 0;
						} else {
							$lab_ele.eq($num).addClass("lab_sel");
						}
						var $eq_num = $scroll_li.eq($num).find('img').length;
						if($eq_num == 0){
							$scroll_li.eq($num).find('a').html('<img src="'+$eq_url+'"/>');
						}
						$scroll_li.eq($num).fadeIn(400);
						if(move_arrow==true){
								timer = setInterval(move,settings.time);
							}
						
					},
					scrollmove:function(k,move_arrow){
						
						if(k!= undefined){
							var $num = k;
						} else {
							var $num = parseInt($scroll_act.position().left*-1/$scroll_li_w)+1;
						}
						
						$lab_ele.removeClass("lab_sel");
						if($num>=$lab_len){
							$lab_ele.eq(0).addClass("lab_sel");
						} else {
							$lab_ele.eq($num).addClass("lab_sel");
						}
						var $scroll_left = -1*$num*$scroll_li_w;
						var $eq_num = $scroll_li.eq($num).find('img').length;
						var $eq_url = $scroll_li.eq($num).attr('imgurl');
						if($eq_num == 0){
							$scroll_li.eq($num).find('a').html('<img src="'+$eq_url+'"/>');
						}
						$scroll_act.animate({left:$scroll_left+'px'},"1.5s","linear" ,function(){
							if($num>=$lab_len){
								$scroll_act.css({left:'0px'});
							}
							
							if(move_arrow==true){
								timer = setInterval(move,settings.time);
							}
						});
						
					}
				}
				
				/*ΪͼƬ��� �¼� */
				$scroll_li.mouseover(function(){
					clearInterval(timer);
					var $lab_num = $(this).index();
					step($lab_num);
				});
				
				$scroll_li.mouseout(function(){
					clearInterval(timer);
					timer = setInterval(move,settings.time);
				});
				
				/*ΪͼƬ��ǩ��� �¼� */
				$lab_ele.mouseover(function(){
					clearInterval(timer);
					var $lab_num = $(this).index();
					step($lab_num);
				});
				
				$lab_ele.mouseout(function(){
					clearInterval(timer);
					timer = setInterval(move,settings.time);
				});
				
				/*���Ҽ�ͷ �����¼�*/
				$left_btn.click(function(){
					var $btn_num = $('.lab_sel',$elem).index();
					if($btn_num == 0){
						return false;
					}
					clearInterval(timer);
					step($btn_num-1,true);
				});
				$right_btn.click(function(){
					var $btn_num = $('.lab_sel',$elem).index();
					if($btn_num == $scroll_len-1){
						return false;
					}
					clearInterval(timer);
					step($btn_num+1,true);
					
				});
				
				var timer = setInterval(move,settings.time);
		}
		   
		scroll(settings);
		
	}	
})(jQuery, window.ECar||(window.ECar={}));