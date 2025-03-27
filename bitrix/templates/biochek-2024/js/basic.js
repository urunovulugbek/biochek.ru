$(document).ready(function () {
	if ($('select:not(.no-js)').length) {
		$('select:not(.no-js)').niceSelect();
	}
	$('.nice-select .list').wrap('<div class="list-wr"></div>');
	$(document).mouseup(function (e){
		var mouseup = $('.header, .catalog-filter_inner');
		if (!mouseup.is(e.target)
	    && mouseup.has(e.target).length === 0) {
	    	$('body').removeClass('menu-open');
	    	$('.header-request').removeClass('active');
	    	$('.catalog-filter').removeClass('active');
		}
	});
	$('.field-code').on('keydown', function(e){
		// Если символ, то очищаем ввод
		if (e.keyCode >= 48) {
			e.target.value = '';
		}
	});
	$('.field-code').on('keyup', function(e){
		if(e.keyCode == 8) {
			var $prev = $(this).prev('input');
			if (!e.target.value) {
				$prev.val('');
			}
			$prev.focus();
		}
	});
	$('.field-code').on('input', function(e) {
		var value = e.target.value;
		var $next = $(this).next('input');
		// Если ввели больше 1 символа, то обрезаем
		if (value) {
			e.target.value = value.slice(0, 1);
		}
		// Переключамся на следующее поле ввода
		if(value && $next){
			$next.focus();
			// Заполняем следующее поле, если введено много символов
			var valueNext = value.slice(1);
			if (valueNext) {
				$next.val(valueNext);
				$next.trigger('input');
			}
		}
	});
	// navigator.credentials.get({
	// 	otp: {transport:['sms']}
	// })
	//   .then(function(otp) {
	// 	$('.popup-code .field-code:first-child').val(otp.code);
	//   });
	$('.header-request_btn').click(function() {
		$(this).parent().toggleClass('active');
	});
	$('.tabs button').click(function(){
		$(this).addClass('active').siblings().removeClass('active').closest('.tabs-wrapper').find('.tabs-block').removeClass('active').eq($(this).index()).addClass('active');
	});
	const slick_test = $('.test-slider'),
	slick_test_count = $('.test-slider_counts-active'),
	slick_test_total = $('.test-slider_counts-total');
	slick_test.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		slick_test_count.text(slick.slickCurrentSlide() + 1);
		slick_test_total.text(slick.slideCount);
	});
	slick_test.slick({
		infinite: false,
		appendArrows: $(this).find('.test-slider_dots'),
		prevArrow: '<button type="button" class="slick-prev slick-arrow"><svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM32 4.5H1V3.5H32V4.5Z" fill="black"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow"><svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.3536 4.35355C31.5488 4.15829 31.5488 3.84171 31.3536 3.64645L28.1716 0.464466C27.9763 0.269204 27.6597 0.269204 27.4645 0.464466C27.2692 0.659728 27.2692 0.976311 27.4645 1.17157L30.2929 4L27.4645 6.82843C27.2692 7.02369 27.2692 7.34027 27.4645 7.53553C27.6597 7.7308 27.9763 7.7308 28.1716 7.53553L31.3536 4.35355ZM0 4.5H31V3.5H0V4.5Z" fill="black"/></svg></button>'
	});
	if ($('.test-slider_type1 .test-slider_item-input input').prop('checked')) {
		$('.test-slider_type1 .test-slider_btn-next').attr('disabled', false);
	} else {
		$('.test-slider_type1 .test-slider_btn-next').attr('disabled', true);
	}
	if ($('.test-slider_type2 .test-slider_item-input input').prop('checked')) {
		$('.test-slider_type2 .test-slider_btn-next').attr('disabled', false);
	} else {
		$('.test-slider_type2 .test-slider_btn-next').attr('disabled', true);
	}
	$('.test-slider_item-input input').on('change', function() {
		var Checkboxes = $(this).parents('.test-slider_block').find('.test-slider_item-input input').filter(':checked').length;
		if (Checkboxes == 0) {
			$(this).parents('.test-slider_list').next().find('.test-slider_btn-next').attr('disabled', true);
			$(this).parents('.test-slider_wr').prev().find('.slick-next').addClass('disabled').attr('aria-disabled', true).attr('disabled', true);
		} else {
			$(this).parents('.test-slider_list').next().find('.test-slider_btn-next').attr('disabled', false);
			$(this).parents('.test-slider_wr').prev().find('.slick-next').removeClass('disabled').attr('aria-disabled', false).attr('disabled', false);
		}
	});
	$('.test-slider_btn-next').click(function(){
		slick_test.slick('slickNext');
	});
	$('.test-slider_btn-back').click(function(){
		slick_test.slick('slickPrev');
	});
    $('.faq-item_title').click(function(){
        if ($(this).parent().hasClass('active')) {
        	$(this).parent().removeClass('active');
        } else {
        	$('.faq-item_title').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
    });
    $('.calc-style1_minus').click(function () {
	    let $input = $(this).next('input');
	    let count = parseInt($input.val()) - 1;
	    let count2 = parseInt($input.val());
	    count = count < 1 ? 1 : count;
	    $input.val(count);	
	});
    $('.calc-style1_plus').click(function () {
	    let $input = $(this).prev('input');
	    let count = parseInt($input.val()) + 1;
	    let count2 = parseInt($input.val());
		$input.val(parseInt(count));
    });
    if ($('.article-about_slider').length) {
		$('.article-about_slider').slick({
			dots: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: false,
						infinite: false,
						variableWidth: true,
					}
				}
			]
		});
	}
	$('.header-sandwich').click(function() {
		$('body').addClass('menu-open');
	});
	$('.header-menu_close').click(function() {
		$('body').removeClass('menu-open');
	});
	$('.footer-up').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 700);
	});
	$('body').on('click', '.popup .nice-select .list .option', function() {
		$(this).parents('.nice-select').addClass('active');
		$('.popup-form_inner').removeClass('hide');
	});
	$('.catalog-filter_head-choice').click(function() {
		$('.catalog-filter').addClass('active');
	});
	$('.catalog-filter_inner-back').click(function() {
		$('.catalog-filter').removeClass('active');
	});
	$('.birthday').mask('99.99.9999');
	$('.field-phone').mask('+7 (999) 999-9999');
	$('.field-phone3').mask('+0#');
	function initIntlPhoneMask(input) {
		var iti1 = window.intlTelInput(input, {
			initialCountry: 'ru',
			formatOnDisplay: true,
			hiddenInput: "full_number",
		});
		$(input).on("countrychange", function (event) {
			var selectedCountryData = iti1.getSelectedCountryData();
			newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
				iti1.setNumber("");
			mask = newPlaceholder.replace(/[1-9]/g, "0");
			$(this).mask(mask);
		});
		iti1.promise.then(function () {
			$(input).trigger("countrychange");
		});
	}
	if ($('.field-phone2').length) {
		var phoneInputs = document.querySelectorAll('.field-phone2'), i;

		for (var i = 0; i < phoneInputs.length; ++i) {
			initIntlPhoneMask(phoneInputs[i]);
		}
	}
	// function reinitPhoneOrEmailMask($node, changed=false) {
	// 	var value = $node.val();
	// 	var type = $node.attr('type');
	// 	if (!value) {
	// 		if (type != 'text') {
	// 			$node.attr('type', 'text');
	// 			$node.unmask();
	// 			$node.removeClass('input_email');
	// 			$node.removeClass('input_phone');
	// 		}
	// 	}
	// 	else if (value && (/^[\+\d]/.test(value) || /^\+\d/.test(value))) {
	// 		if (type != 'tel') {
	// 			$node.attr('type', 'tel');
	// 			$node.mask('+0#');
	// 			$node.addClass('input_phone');
	// 			$node.removeClass('input_email');
	// 			if (changed) {
	// 				$node[0].selectionStart = $node.val().length;
	// 			}
	// 		}
	// 	}
	// 	else if (value) {
	// 		if (type != 'email') {
	// 			$node.attr('type', 'email');
	// 			$node.unmask();
	// 			$node.addClass('input_email');
	// 			$node.removeClass('input_phone');
	// 		}
	// 	}
	// }
	// $('.field-phone-or-email').each(function() {
	// 	reinitPhoneOrEmailMask($(this));
	// });
	// $('.field-phone-or-email').on('keypress input', function() {
	// 	reinitPhoneOrEmailMask($(this), true);
	// });
	$.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    });
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    });
	$.validator.addMethod("minlenghtphone2", function (value, element) {
        return !value || !value.length || value.replace(/\D+/g, '').length > 10;
    });
	$.validator.addClassRules({
		input_name: {
			required: true,
			minlength: 3,
		},
		input_surname: {
			required: true,
			minlength: 3,
		},
		input_middlename: {
			required: true,
			minlength: 3,
		},
		input_city: {
			required: true,
			minlength: 3,
		},
		input_phone: {
			requiredphone: true,
			minlenghtphone: true,
		},
		input_phone2: {
			minlenghtphone2: true,
		},
		input_email: {
			required: true,
		},
		input_code1: {
			required: true,
			minlength: 1,
		},
		input_code2: {
			required: true,
			minlength: 1,
		},
		input_code3: {
			required: true,
			minlength: 1,
		},
		input_code4: {
			required: true,
			minlength: 1,
		},
		input_code5: {
			required: true,
			minlength: 1,
		},
		input_code6: {
			required: true,
			minlength: 1,
		},
	});
	$.extend($.validator.messages, {
	    required: "Это поле обязательно к заполнению.",
	    requiredphone: 'Это поле обязательно к заполнению.',
	    minlength: 'Пожалуйста, введите не менее 3 символов.',
	    email: "Пожалуйста, введите действительный адрес электронной почты.",
	    minlenghtphone: 'Пожалуйста, введите не менее 10 цифр',
	    minlenghtphone2: 'Пожалуйста, введите не менее 10 цифр'
	});
	$('.popup-request form').validate();
	$('.popup-login form').validate();
	$('.popup-fastbuy form').validate();
	$('.contacts-form form').validate();
	$('.request-form form').validate();
	$('.request2-form form').validate();
	$('.basket-form form').validate();
	$('.popup-code form').validate({
		errorPlacement: function(error, element) {}
	});
    $('.btn-cities').click(function () {
	    let rawCities = $(this).data('cities');
        let cities = rawCities && (rawCities.split && rawCities.split(',') || [''+rawCities]) || [];
	    $('.popup-fastbuy select').append('<option>Выбор города</option>');
		$.each(cities, function(i, item) {
		    $('.popup-fastbuy select').append('<option>' + item + '</option>');
		});
	    $('.popup-fastbuy select').niceSelect();
	    $('.nice-select .list').wrap('<div class="list-wr"></div>');
    });
	$(".btn-cities").fancybox({
		touch: false,
		beforeClose: function() {
			$('.popup-fastbuy select').niceSelect('destroy');
			$('.popup-fastbuy select').empty();
			$('.popup-form_inner').addClass('hide');
		}
	});
	$('.btn-cities2').click(function () {
		let rawCityIds = $(this).data('cities');
        let cityIds = rawCityIds && (rawCityIds.split && rawCityIds.split(',') || [''+rawCityIds]) || [];
		let cities = catalogCities || [];
		let productCities = [];
		let bodyCityId = $('body').data('city');
		$.each(cities, function (i, city) {
			let hasProductCity = cityIds.indexOf(city.id) !== -1;
			let hasBodyCity = hasProductCity && (!bodyCityId || bodyCityId==city.id);
			if (hasProductCity && hasBodyCity) {
				productCities.push(city);
			}
		});
		if (productCities.length != 1) {
			$('.popup-fastbuy select').append('<option>Выбор города</option>');
		}
		$.each(productCities, function (i, city) {
			$('.popup-fastbuy select').append('<option>' + city.name + '</option>');
		});
		if (productCities.length != 1) {
			$('.popup-fastbuy select').niceSelect();
			$('.nice-select .list').wrap('<div class="list-wr"></div>');
		}
		if (productCities.length == 1) {
			$('.popup-form_inner').removeClass('hide');
			$('#popup-fastbuy [name=city]').hide();
		}
	});
	$(".btn-cities2").fancybox({
		touch: false,
		beforeClose: function () {
			$('.popup-fastbuy select').niceSelect('destroy');
			$('.popup-fastbuy select').empty();
			$('.popup-form_inner').addClass('hide');
			$('#popup-fastbuy [name=city]').show();
		}
	});
	$('.btn-no-cities').click(function () {
	    $('.popup-form_inner').removeClass('hide');
		$('.popup-fastbuy select').append('<option>-</option>').hide()
    });
    $('.basket-payment_promo-apply').click(function () {
		if ($(this).prevAll('.basket-payment_promo-code').val() != '') {
			$(this).parents('.basket-payment_promo-content').removeClass('hide').addClass('success');
		} else {
			$(this).parents('.basket-payment_promo-content').addClass('hide').removeClass('success');
		}
    });
    $('.basket-payment_promo-remove').click(function () {
    	$('.basket-payment_promo-content').removeClass('success');
		$(this).prevAll('.basket-payment_promo-code').val('');
    });
	setInterval(function(){
		$('.field').each(function(){
	        if ($(this).hasClass('valid')) {
	        	$('.form-btn').attr('disabled', false);
	        } else {
	        	$('.form-btn').attr('disabled', true);
	        }
		});
	}, 100);
    $('.field').click(function(){
        $(this).find('.form-btn');
    });
    $('.price-info_link').click(function(e){
    	e.preventDefault();
        $('html, body').animate({
			scrollTop: $('.screen-steps').offset().top
		}, 1000);
    });
    $('.catalog-filter_cities-list .catalog-filter_item').click(function(){
    	let text = $(this).find('.catalog-filter_item-text').text();
        $(this).parents('.catalog-filter_cities').prev().find('input').val(text);
    });
    $('.catalog-filter_cities-result').on('click', '.catalog-filter_item', function(){
    	let name = $(this).attr('data-name');
    	$('.catalog-filter_cities-list .catalog-filter_item-input input').prop('checked', false);
	    $('.catalog-filter_cities-list .catalog-filter_item[data-name="' + name + '"]').find('.catalog-filter_item-input input').prop('checked', true);
    });
    if ($('.time-give_cards.mobile').length) {
		$('.time-give_cards.mobile').slick({
			arrows: false,
			infinite: false,
			variableWidth: true,
		});
	}
	$('.lk-menu ul li:not(.exit)').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.lk-orders_table-body_header').click(function() {
		$(this).parent().toggleClass('hide');
	});

	// $('.js-order-cancel').on('click', function(e) {
	// 	e.preventDefault();

	// 	var $a = $(this);
	// 	var url = $a.attr('href');

	// 	$('#js_order_form_cancel').remove();
	// 	$('<div/>')
	// 		.attr('id', 'js_order_form_cancel')
	// 		.attr('style', 'display: none')
	// 		.appendTo($a.parent());

	// 	$.ajax({
	// 		url: url,
	// 		success: function(data){
	// 			$('#js_order_form_cancel').html(data);
				
	// 		}
	// 	});
	// });
	$('body').on('submit', '#certificate-send-email', function(e) {
		e.preventDefault();

		var $form = $(this);
		var url = $form.attr('action');
		var postData = $form.serializeArray();

		$.ajax({
            url: url,
			type: 'post',
			data: postData,
            success: function(data){
				$('.certificate-send-email-message').show();
				$('.certificate-send-email-message').siblings('.popup-form_inner').hide();
            }
        });
	});

	$('.js-order-payment').on('click', function(e) {
		e.preventDefault();

		var $a = $(this);
		var url = $a.attr('href');

		$('#js_order_form_result').remove();
		$('<div/>')
			.attr('id', 'js_order_form_result')
			.attr('style', 'display: none')
			.appendTo($a.parent());

		$.ajax({
            url: url,
            success: function(data){
				// if (window.ym) {
				// 	ym(91311690,'reachGoal','BASKET_SHOW_PAYMENT');
				// }
				setTimeout(function () {
					$('#js_order_form_result').html(data);
				}, 200);
            }
        });
	});
	$('body').on('submit', '#popup-order-hide form', function(e) {
		e.preventDefault();
		var $form = $(this);
		console.log('show-hide');
		$.post($form.attr('action'), $form.serializeArray(), function (data) {
			$.fancybox.close();
			if (data) {
				$('.lk-orders_table-group[data-order="'+$form.data('order')+'"]').remove();
			}
			else {
				location.reload();
			}
		});
	});

	if ($('.price-block_bottom [data-cities]').length) {
		$('.price-block_bottom [data-cities]').each(function() {
			let rawCityIds = $(this).data('cities');
			let cityIds = rawCityIds && (rawCityIds.split && rawCityIds.split(',') || [''+rawCityIds]) || [];
			let bodyCityId = $('body').data('city');
			if (bodyCityId) {
				if (cityIds.indexOf(''+bodyCityId) == -1) {
					$(this).remove();
				}
			}
		});
		if (!$('.price-block_bottom [data-cities]').length) {
			$('<span></span>').text('Данный товар не доступен в вашем городе').addClass('btn btn3').appendTo($('.price-block_bottom'))
		}
	}
});
if(window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches) {
	$('.getting-desc').insertBefore('.getting-sample');
}
if(window.matchMedia('(max-width: 1199px)').matches) {
	$('.mission-list').after( $('.mission-bottom') );
    if ($('.programs-content').length) {
		$('.programs-content').slick({
			arrows: false,
			infinite: false,
			variableWidth: true,
		});
	}
	$('.getting-sample_photo').append( $('.getting-btn') );
	$('.getting-bottom').remove();
    if ($('.products-content').length) {
		$('.products-content').slick({
			arrows: false,
			infinite: false,
			variableWidth: true,
		});
	}
}
if(window.matchMedia('(max-width: 767px)').matches) {
	$('.banner-photo').append( $('.banner-main .banner-video_play') );
	$('.programs-head_link').wrap('<div class="programs-bottom"></div>');
	$('.programs-content').after( $('.programs-bottom') );
    if ($('.useful-videos').length) {
		$('.useful-videos').slick({
			arrows: false,
			infinite: false,
			variableWidth: true,
		});
	}
	$('.page-programs_select .useful-link').wrap('<div class="useful-bottom"></div>');
	$('.page-programs_select .useful-content').after('<div class="useful-bottom"></div>');
	$('.page-programs_select .useful-bottom').append( $('.useful-title .title-link') );
	$('.request-info').after( $('.request-desc') );
	$('.lk-menu_current').click(function() {
		$(this).parent().toggleClass('active');
	});
	$('.lk-menu ul li:not(.exit) button').click(function() {
		let text = $(this).text();
		$('.lk-menu_current').text(text);
	});
	$('.lk-menu ul li:not(.exit) button').click(function() {
		$('.lk-menu').removeClass('active');
	});
}