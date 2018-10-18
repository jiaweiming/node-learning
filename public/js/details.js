$(function () {
    $('.comment').on('click',function () {
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');
        $('<input/>').attr({
            type:'hidden',
            name:'comment[tid]',
            value:toId
        }).appendTo('#commentsForm');
        $('<input/>').attr({
            type:'hidden',
            name:'comment[cid]',
            value:commentId
        }).appendTo('#commentsForm')
    });
    $('.btn-submit-comment').on('click',function () {

    })
});