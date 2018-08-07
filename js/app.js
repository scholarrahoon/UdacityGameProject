var min = 0;
var sec = 0;



    
window.onclick = function() {
        var stop = 0

    setInterval(function() {
        if (stop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }

            $('.timer').html(min + ':' + sec);
            console.log(min);
            console.log(sec);
        }

    }, 1000);

};
/*
 * A list or array with its elements representing all cards to be accessed by program.
 */
var cards = [];
var cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var openCards = [];
/*
 Display cards function
 */

$('.deck').each(function() {
    $(this).find('li').each(function() {
        cards.push($(this));
    });
});
var temp = 0;

/* shuffle the cards on the page*/

cardList = shuffle(cardList);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(cardList[cardNumber]);
        cardNumber++;
    });
});


$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var tempClass = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});
// following code is taken from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
event listener is created once card is clicked.
cards are removed if they don't match and if they match, they will be locked in position.
 */
var moves = 0,
    stars = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        openCards[0].removeClass('show open animated wobble');
        openCards = [];
    }, 400);
};

/*  when moves taken to complete the game are either 24 or less, 3 stars will be given,
 if moves are between 25 to 40 then 2 stars will be given and if they are beyond 40, only one star will be given.*/

showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        moves++;
        if (moves === 24) {
            stars = 3;
        } else if (moves > 24 && moves <= 40) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 40) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        if ((openCards.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            openCards.push($(this));
        } else if (openCards.length !== 0) {
            $(this).addClass('show open animated wobble');

            var self = $(this);
            for (var i = 0; i < openCards.length; i++) {
                if (openCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                    
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    openCards[i].removeClass('animated wobble');
                    openCards[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    
                    openCards = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    openCards[0].on('click', showCardOnClick(openCards[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                   /* congratulations message popp up in screen once the game is complete*/
                    swal({
                        title: 'Congratulations',
                        type: 'success',
                        text: 'You have won the game . It took you ' + moves + ' moves. You got ' + stars + ' stars for completing within the respective time and moves. Your time is ' + min + ' Minutes and ' + sec + ' Seconds',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'restart',
                        confirmButtonColor: '#02ccba',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#f76605'
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        console.log('Yes');
                    });

                });
            }, 300);
            stop = 1;
            $('.timer').hide();
            $('.timer').html('0:0');
            $('.timer').show();
        }


    });
};

for (var i = 0; i < cards.length; i++) {
    cards[i].on('click', showCardOnClick(cards[i]));
}
/* TO set restart/reload function */
$('.restart').on('click', function() {
    location.reload();
});