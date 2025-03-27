function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$('#js_form_contacts').submit(function(e){
    e.preventDefault();

    let error_form = false;

    $(this).find('[data-required]').each(function( index ) {
        if($(this).val() == ''){
            $(this).parent().addClass('error');
            error_form = true
        }
        else{
            $(this).parent().removeClass('error');
        }
    });
    $(this).find('[data-required_email]').each(function( index ) {
        if($(this).val() == '' || !isValidEmailAddress($(this).val())){
            $(this).parent().addClass('error');
            error_form = true;
        }
        else{
            $(this).parent().removeClass('error');
        }
    });

    if( error_form == false ) {
        $.ajax({
            url: '/local/ajax/a_request.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    $.fancybox.open({
                        src: '#popup-thanks',
                        type: 'inline'
                    });
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    }
});

$('#js_form_feedback').submit(function(e){
    e.preventDefault();

    let error_form = false;
    let form = this;

    $(this).find('[data-required]').each(function( index ) {
        if($(this).val() == ''){
            $(this).parent().addClass('error');
            error_form = true
        }
        else{
            $(this).parent().removeClass('error');
        }
    });
    $(this).find('[data-required_email]').each(function( index ) {
        if($(this).val() == '' || !isValidEmailAddress($(this).val())){
            $(this).parent().addClass('error');
            error_form = true;
        }
        else{
            $(this).parent().removeClass('error');
        }
    });

    if( error_form == false ) {
        $.ajax({
            url: '/local/ajax/a_request.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    $(form).parent().hide();
                    $(form).parent().parent().children('.request-thanks').removeClass('hide');
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    }
});

$('#js_form_callback').submit(function(e){
    e.preventDefault();

    let error_form = false;
    let form = this;

    $(this).find('[data-required]').each(function( index ) {
        if($(this).val() == ''){
            $(this).parent().addClass('error');
            error_form = true
        }
        else{
            $(this).parent().removeClass('error');
        }
    });
    $(this).find('[data-required_email]').each(function( index ) {
        if($(this).val() == '' || !isValidEmailAddress($(this).val())){
            $(this).parent().addClass('error');
            error_form = true;
        }
        else{
            $(this).parent().removeClass('error');
        }
    });

    if( error_form == false ) {
        $.ajax({
            url: '/local/ajax/a_request.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    $.fancybox.close();
                    $.fancybox.open({
                        src: '#popup-thanks',
                        type: 'inline'
                    });
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    }
});

$('#js_form_addcity').submit(function(e){
    e.preventDefault();

    let error_form = false;
    let form = this;

    $(this).find('[data-required]').each(function( index ) {
        if($(this).val() == ''){
            $(this).parent().addClass('error');
            error_form = true
        }
        else{
            $(this).parent().removeClass('error');
        }
    });

    if( error_form == false ) {
        $.ajax({
            url: '/local/ajax/a_request.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    $(form).parent().hide();
                    $(form).parent().parent().children('.request2-thanks').removeClass('hide');
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    }
});

$(document).ready(function () {
    $('.js_add_basket').click(function () {
        let rawCities = $(this).data('cities');
        let cities = rawCities && (rawCities.split && rawCities.split(',') || [''+rawCities]) || [];
        let id = $(this).data('id');

        $('#popup-to-basket select').append('<option>Выбор города</option>');
        $.each(cities, function(i, item) {
            $('#popup-to-basket select').append('<option value="'+item+'">' + item + '</option>');
        });
        $('#popup-to-basket select').niceSelect();
        $('.nice-select .list').wrap('<div class="list-wr"></div>');

        $('#popup-to-basket input[name="product"]').val(id);
    });
    $(".js_add_basket").fancybox({
        touch: false,
        beforeClose: function() {
            BX.onCustomEvent('OnBasketChange');

            $('#popup-to-basket select').niceSelect('destroy');
            $('#popup-to-basket select').empty();
            $('.popup-form_inner').addClass('hide');
        }
    });
    $('.js_add_basket2').click(function () {
        let rawCityIds = $(this).data('cities');
        let cityIds = rawCityIds && (rawCityIds.split && rawCityIds.split(',') || [''+rawCityIds]) || [];
        let cities = catalogCities || [];
        let id = $(this).data('id');
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
            $('#popup-to-basket select').append('<option>Выбор города</option>');
        }
        $.each(productCities, function (i, city) {
            $('#popup-to-basket select').append('<option value="' + city.name + '">' + city.name + '</option>');
        });
        if (productCities.length != 1) {
            $('#popup-to-basket select').niceSelect();
            $('.nice-select .list').wrap('<div class="list-wr"></div>');
        }

        $('#popup-to-basket input[name="product"]').val(id);
        if (productCities.length == 1) {
            $('.popup-form_inner').removeClass('hide');
            $('#popup-to-basket [name=city]').hide();
            $('#js_form_add_basket').attr('show-thanks', 'y');
            $('#popup-to-basket :submit').trigger('click');
        }
    });
    $(".js_add_basket2").fancybox({
        touch: false,
        beforeClose: function () {
            BX.onCustomEvent('OnBasketChange');

            $('#popup-to-basket select').niceSelect('destroy');
            $('#popup-to-basket select').empty();
            $('.popup-form_inner').addClass('hide');
            $('#popup-to-basket [name=city]').show();
            $('#js_form_add_basket').attr('show-thanks', null);
        }
    });
    let oneConsultDoctor = false;
    $('.js_add_basket_consult').click(function () {
        oneConsultDoctor = false;
        let doctor = $(this).data('doctor');
        let doctors = $(this).data('doctors');
        doctors = doctors && doctors.split(',') || [];
        if (!doctors.length && doctor) {
            doctors.push(doctor);
        }
        let id = $(this).data('id');

        $('#popup-to-basket-consult select').append('<option>Выбор доктора</option>');
        $.each(doctors, function (i, doctor) {
            if (doctors.length < 2) {
                $('#popup-to-basket-consult select').append('<option selected value="' + doctor + '">' + doctor + '</option>');
            }
            else {
                $('#popup-to-basket-consult select').append('<option value="' + doctor + '">' + doctor + '</option>');
            }
        });
        $('#popup-to-basket-consult select').niceSelect();
        $('.nice-select .list').wrap('<div class="list-wr"></div>');

        $('#popup-to-basket-consult input[name="product"]').val(id);
        if (doctors.length < 2) {
            oneConsultDoctor = true;
            $('#popup-to-basket-consult .popup-form_inner').removeClass('hide');
            $('#popup-to-basket-consult select').hide();
            $('#popup-to-basket-consult .nice-select').hide();
            $('#popup-to-basket-consult .popup-form_btn').trigger('click');
        }
    });
    $(".js_add_basket_consult").fancybox({
        touch: false,
        beforeClose: function () {
            BX.onCustomEvent('OnBasketChange');

            $('#popup-to-basket-consult select').niceSelect('destroy');
            $('#popup-to-basket-consult select').empty();
            $('#popup-to-basket-consult .popup-form_inner').addClass('hide');

            $('#popup-to-basket-consult .popup-title-thanks').addClass('hide');
            $('#popup-to-basket-consult .popup-thanks_desc').addClass('hide');
        }
    });

    $('#js_form_add_basket').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: '/local/ajax/a_basket.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    if (window.ym) {
                        ym(91311690,'reachGoal','add_to_cart');
                    }
                    var showThanks = $('#js_form_add_basket').attr('show-thanks');
                    if (!showThanks) {
                        $.fancybox.close();
                    }
                    else {
                        $('#popup-to-basket .popup-title').addClass('hide');
                        $('#popup-to-basket .popup-title-thanks').removeClass('hide');
                        $('#popup-to-basket .popup-form_inner').addClass('hide');
                        $('#popup-to-basket .popup-thanks_desc').removeClass('hide');
                    }
                    // $.fancybox.open({
                    //     src: '#popup-thanks',
                    //     type: 'inline'
                    // });
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    });

    $('#js_form_add_basket_consult').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: '/local/ajax/a_basket.php',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.rez == "OK") {
                    if (window.ym) {
                        ym(91311690,'reachGoal','add_to_cart');
                    }
                    // $.fancybox.close();
                    $('#popup-to-basket-consult .popup-title').addClass('hide');
                    $('#popup-to-basket-consult .popup-title-thanks').removeClass('hide');
                    $('#popup-to-basket-consult .popup-form_inner').addClass('hide');
                    $('#popup-to-basket-consult .popup-thanks_desc').removeClass('hide');
                } else if (data.rez == "ERROR") {
                    console.log(data);
                }
            }
        });
    });

    $('#js_clear_basket').click(function(e){
        e.preventDefault();

        $.ajax({
            url: '/local/ajax/a_basket.php?type=clear',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {
                location.reload();
            }
        });
    });

    // Оформить заказ
    $(document).on('submit', '#js_order_form', function(e){
        e.preventDefault();

        let form = this;

        $(form).find('.basket-form_btn').attr('disabled', true);

        $.ajax({
            url: "/local/ajax/a_order.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){
                    if(data.rez == "AUTH"){

                        $(form).find('.basket-form_btn').attr('disabled', false);

                        $.fancybox.open({
                            src: '#popup-login',
                            type: 'inline'
                        });
                    }
                    else {
                        if (window.ym) {
                            ym(91311690,'reachGoal','BASKET_SHOW_PAYMENT');
                            ym(91311690,'reachGoal','cart_order');
                            ym(91311690,'reachGoal','lead');
                        }
                        setTimeout(function () {
                            $('#js_order_form_result').html(data.pay);
                        }, 200);
                    }
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $(document).on('click', '.js_btn_fast_order', function(e){
       $('#js_fast_order input[name="product"]').val($(this).data('id'));
    });

    // Оформить быстрый заказ
    $(document).on('submit', '#js_fast_order', function(e){
        e.preventDefault();

        let form = this;

        $.ajax({
            url: "/local/ajax/a_order.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){
                    if (window.ym) {
                        ym(91311690,'reachGoal','FAST_ORDER_SHOW_PAYMENT');
                        ym(91311690,'reachGoal','fast_order');
                        ym(91311690,'reachGoal','lead');
                    }
                    setTimeout(function () {
                        $('#js_fast_order_form_result').html(data.pay);
                        var  payForm = $('#js_fast_order_form_result').find('form')
                        if (payForm.length) {
                            payForm.find('input').trigger('click');
                        }
                    }, 200);
                    // $.fancybox.open({
                    //     src: '#popup-thanks',
                    //     type: 'inline'
                    // });
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('.popup.popup-login').on('input change', 'input', function(e) {
        var $form = $(this).closest('form');
        var $phone = $form.find('[name=phone]');
        var phone = $phone.val();
        var $email = $form.find('[name=email]');
        var email = $email.val();
        if (phone && (phone != '+')) {
            $form.addClass('form-inputing-phone');
            $form.removeClass('form-inputing-email');
            $email.prop('disabled', true);
        }
        else if (email) {
            $form.addClass('form-inputing-email');
            $form.removeClass('form-inputing-phone');
            $phone.prop('disabled', true);
        }
        else {
            $form.removeClass('form-inputing-phone');
            $form.removeClass('form-inputing-email');
            $email.prop('disabled', false);
            $phone.prop('disabled', false);
        }
    });

    $('#js_form_auth').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_auth.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){

                    $('#js_form_auth_code input[name="phone"]').val(data.phone);

                    $.fancybox.close();

                    $.fancybox.open({
                        src: '#popup-code',
                        type: 'inline'
                    });
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('#js_form_auth_inline').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_auth.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){

                    $('#js_form_auth_code input[name="phone"]').val(data.phone);

                    $.fancybox.open({
                        src: '#popup-code',
                        type: 'inline'
                    });
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('#js_form_auth_code').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_auth.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){

                    if(window.location.href == 'https://biochek.ru/basket/'){
                        window.location.reload()
                    }
                    else{
                        window.location.href = "/personal/";
                    }
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('#js_form_test').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_request.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){

                    // $.fancybox.open({
                    //     src: '#popup-thanks',
                    //     type: 'inline'
                    // });

                    location.href="/programs/";
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('.js_analysis').click(function(e){
        $('#js_analysis').html($(this).data('text'));
    });

    $('#js_form_reg').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_reg.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){

                if(data.rez){

                    $('#js_form_reg_code input[name="phone"]').val(data.phone);

                    $.fancybox.close();

                    $.fancybox.open({
                        src: '#popup-reg-code',
                        type: 'inline'
                    });
                }
                else {
                    console.log(data);
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });

    $('#js_form_reg_code').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: "/local/ajax/a_reg.php" ,
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data){
                if(data.rez){
                    if (data.authorized) {
                        if(window.location.href == 'https://biochek.ru/basket/'){
                            window.location.reload()
                        }
                        else{
                            window.location.href = "/personal/";
                        }
                    }
                    else {
                        $.fancybox.close();
                        $('form[name=regform] input[name="REGISTER[LOGIN]"]').addClass('input-confirmed');
                    }
                }
            },
            statusCode: {
                403: function() {
                    console.log('ERROR 403');
                }
            }
        });
    });
});