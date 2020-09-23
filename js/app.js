const organizedByTags = (todos) => {
    const tags = [];
    todos.forEach((todo) => {
        todo.tags.forEach((tag) => {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    const tagObjects = tags.map((tag) => {
        const toDoWishTag = [];
        todos.forEach((todo) => {
            if (todo.tags.indexOf(tag) !== -1) {
                toDoWishTag.push(todo.description);
            }
        });
        return {"name": tag, "toDos": toDoWishTag};
    });
    return tagObjects;
};
let toDos;
const main = (tasks) => {
    'use strict';
    const reNewToDos = () => {
        toDos = tasks.map((toDo) => {
            return toDo.description;
        });   
    };
    reNewToDos();
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

                const organizedByTag = organizedByTags(tasks);

                organizedByTag.forEach((tag) => {
                    const $tagName = $('<h4>').text(tag.name),
                        $content = $('<ul>');
                    tag.toDos.forEach((description) => {
                        $content.append($('<li>').text(description));
                    });
                    $('main .content').append($tagName);
                    $('main .content').append($content);
                });
                $('main .content').append($content);
            } else if ($(tab).parent().is(':nth-child(4)')) {
                const $content = $('<div>');
                $content.append($('<p>').text('Description'));
                $content.append($('<input>').addClass('task'));
                $content.append($('<p>').text('Tags'));
                $content.append($('<input>').addClass('tags'));
                $content.append($('<button>').text('Enter'));

                const addFromInput = () => {
                    if ($('.content input.task').val() !== '' && $('.content input.tags').val() !== '') {
                        tasks.push({'description': $('.content input.task').val(), 'tags': $('.content input.tags').val().split(','),});
                        reNewToDos();
                        $('.content input.task').val('');    
                        $('.content input.tags').val('');    
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
$(document).ready(() => {
    $.getJSON('./data/todo.json', (toDos) => {
        main(toDos);
    });
});