$(function () {
    $('.comment').on('click',function () {
        var target = $(this);
        var toId = target.data('Toid');
        var commentId = target.data('Fromid');
        $('<input/>').attr({
            type:'hidden',
            name:'comment[Toid]',
            value:toId
        }).appendTo('#comments');
        $('<input/>').attr({
            type:'hidden',
            name:'comment[Fromid]',
            value:toId
        }).appendTo('#comments')
    })
});