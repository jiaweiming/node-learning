//列表页删除功能
$(function () {
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

//用户登录处理，拿到服务器返回信息
$('.btn-signIn').on('click', function () {
    var remindText = $(".remind-text");
    var signInName = $('#signInName').val();
    var signInPassWord = $('#signInPassWord').val();
    if (signInName && signInPassWord) {
        $('#signInForm').ajaxSubmit({
            type: 'POST',
            url: '/user/signIn',
            success: function (data) {
                if (data.message === 1) {
                    $(remindText).fadeIn();
                    $(remindText).text(data.text);
                    $(remindText).fadeOut(3500);
                    $("#signInForm").resetForm();
                    window.location.href = "/"
                } else if (data.message === 2) {
                    $(remindText).fadeIn();
                    $(remindText).text(data.text);
                    $(remindText).fadeOut(3500);
                } else {
                    $(remindText).fadeIn();
                    $(remindText).text(data.text);
                    $(remindText).fadeOut(3500);
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
        return false;
    } else {
        $(remindText).fadeIn();
        $(remindText).text("账号和密码不能为空！");
        $(remindText).fadeOut(3500);
    }
});

//用户注册，拿到服务器返回信息，做对应的交互提示
$('.btn-signUp').on('click', function () {
    var remindText = $(".remind-text-signup");
    var signUpName = $('#signUpName').val();
    var signUpPassWord = $('#signUpPassWord').val();
    if (signUpName && signUpPassWord) {
        $('#signUpForm').ajaxSubmit({
            type: 'POST',
            url: '/user/signUp',
            success: function (data) {
                if (data.message === 1) {
                    $(remindText).fadeIn();
                    $(remindText).text(data.text);
                    $(remindText).fadeOut(3500);
                    $("#signUpForm").resetForm();
                    window.location.href = "/"
                } else {
                    $(remindText).fadeIn();
                    $(remindText).text(data.text);
                    $(remindText).fadeOut(3500);
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
        return false;
    } else {
        $(remindText).fadeIn();
        $(remindText).text("账号和密码不能为空！");
        $(remindText).fadeOut(3500);
    }
});

$(document).bind("ajaxSend", function () {
    $(".loading").show();
}).bind("ajaxComplete", function () {
    $(".loading").hide();
});

