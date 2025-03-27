function nextPage(e)
{
    e.preventDefault();

    //let url = BX("js_btn_more").dataset.href;

    let url = BX("js_btn_more").getAttribute('href');

    //BX("js_btn_more").remove();
    BX.findParent(BX("js_btn_more"), {"tag" : "div"}).remove();

    BX.addClass(BX("js_content_block_ajax"), "load");

    BX.ajax({
        url: url,
        data: {is_pagenavigation_ajax: 'yes'},
        dataType: 'html',
        method: 'POST',
        timeout: 30,
        async: true,
        processData: true,
        scriptsRunFirst: false,
        emulateOnload: true,
        start: true,
        cache: false,
        onsuccess: function(data){

            BX.removeClass(BX("js_content_block_ajax"), "load");

            BX('js_content_block_ajax').insertAdjacentHTML('beforeend', data);

            BX.bind(
                BX('js_btn_more'),
                'click',
                BX.delegate(nextPage, this)
            );
        }
    });
}

BX.ready(function() {

    BX.bind(
        BX('js_btn_more'),
        'click',
        BX.delegate(nextPage, this)
    );
});