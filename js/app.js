const main = () => {
    'use strict';
    const toDos = [
        'Bay food',
        'Renew few tasks',
        'Prepare to lecture on Monday',
        'Answer to letters',
        'Walk with Gracy to park',
        'End to read book'
    ];
    $('.tabs a span').toArray().forEach((tab) => {
        $(tab).on('click', () => {
            $('.tabs a span').removeClass('active');
            $(tab).addClass('active');
            $('main .content').empty();
            let $content = $('<ul>');
            if ($(tab).parent().is(':nth-child(1)')) {
                toDos.reverse().forEach((todo) => {
                    $content.append($('<li>').text(todo));
                });
                $('main .content').append($content);
                toDos.reverse();
            } else if ($(tab).parent().is(':nth-child(2)')) {
                toDos.forEach((todo) => {
                    $content.append($('<li>').text(todo));
                });
                $('main .content').append($content);
            } else if ($(tab).parent().is(':nth-child(3)')) {
                const $content = $('<div>');
                $content.append($('<input>'));
                $content.append($('<button>').text('Enter'));
                const addFromInput = () => {
                    if ($('.content input').val() !== '') {
                        toDos.push($('.content input').val());
                        $('.content input').val('');    
                    }        
                };
                $('main .content').append($content);
                $('.content button').on('click', () => {
                    addFromInput();
                });
                $('.content input').on('keypress', (event) => {
                    if (event.keyCode === 13) {
                        addFromInput();
                    }
                });
            }
        });        
        $('.tabs a:first-child span').trigger('click');
    });
    return false;
};
$(document).ready(main);