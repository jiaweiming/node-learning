//用户注册，拿到服务器返回信息，做对应的交互提示
$('.btn-search').on('click', function () {
    var inputContent = $(".input-content").val();
    if (inputContent && inputContent.length) {
        $('#form-search').ajaxSubmit({
            type: 'GET',
            url: '/search',
            success: function (data) {
                if (data) {
                    console.log(data)
                    // window.location.href = '/result?q='+inputContent
                } else {

                }
            }
        });
        return false;
    }
});