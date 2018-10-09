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