
$(document).ready(function () {
    //�ֱ��ʴ���480px�������˵�
    $('.menuBtn').hover(function () {
        $(this).find('div').stop().fadeIn(400);
    }, function () {
        $(this).find('div').stop().fadeOut(400);
    });

    //�ֱ���С��480px�������˵�
    $('#menuBtn').click(function () {
        console.log('ok');
        $(this).nextAll().toggle(400);
        $(this).nextAll().children('div').remove(); //����֮��~
    })

    //�����ֲ�ͼ
    
})