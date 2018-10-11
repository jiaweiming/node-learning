$(function () {//列表页删除功能
    $(".del").on("click", function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        $.ajax({
            type: "DELETE",
            url: '/admin/list?id=' + id,
            beforeSend: function () {
                $(".loading").show()
            }
        }).done(function (res) {
            $(".loading").hide();
            if (res.success === 1) {
                if (tr.length) {
                    tr.remove()
                }
            }
        })
    })
});

$('.btn-signIn').on('click', function (e) {
    $('#signInForm').on('submit',  //登录处理
        function () {
            var remindText = $(".remind-text");
            $(this).ajaxSubmit({
                type: 'POST',
                url: '/user/signIn',
                success: function (data) {
                    if(data.message === 1){
                        $(remindText).fadeIn();
                        $(remindText).text("登录成功!");
                        $(remindText).fadeOut(3500);
                        $("#signInForm").resetForm();
                        window.location.href = "/"
                    }else if(data.message === 2){
                        $(remindText).fadeIn();
                        $(remindText).text("账号不存在，请重新登录!");
                        $(remindText).fadeOut(3500);
                    }else{
                        $(remindText).fadeIn();
                        $(remindText).text("账号或密码错误，请重新输入！");
                        $(remindText).fadeOut(3500);
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            return false;
        }
    );
});

$('.btn-signUp').on('click', function () {
    $('#signUpForm').on('submit', //注册处理
        function () {
            var remindText = $(".remind-text-signup");
            $(this).ajaxSubmit({
                type: 'POST',
                url: '/user/signUp',
                success: function (data) {
                    if (data.message === 1) {
                        $(remindText).fadeIn();
                        $(remindText).text("注册成功!");
                        $(remindText).fadeOut(3500);
                        $("#signUpForm").resetForm();
                        window.location.href = "/"
                    } else {
                        $(remindText).fadeIn();
                        $(remindText).text("账号已存在，请更换账号！");
                        $(remindText).fadeOut(3500);
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            return false;
        }
    );
});
