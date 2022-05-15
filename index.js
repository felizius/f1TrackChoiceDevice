let tracks = ['Bahrain','Imola','Portugal','Spain','Monaco','Azerbaijan','Canada','France','Austria','Great Britain','Hungary','Belgium','Netherlands','Monza','Russia','Singapore','Japan','USA','Mexico','Brasil','Australia','Saudi Arabia','Abu Dhabi','China'];
let state = 0; // 0 = Namen eingeben, 1 = Bannphase, 2 = Finished, 3 = Ziehung finished
let players = [];
let aussetzCounter = 0;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

$('#names').val(localStorage.getItem('players'));

let playerIndex = 0;

function start() {
    state = 1;
    $('#start').prop('disabled', true);
    $('textarea').prop('disabled', true);
    $('#trackCount').prop('disabled', true);
    players = $('#names').val();
    localStorage.setItem('players', players);
    players = players.split('\n');
    shuffle(players);
    $('#meldung').text(players[playerIndex] + " ist an der Reihe. Bitte eine Karte bannen oder aussetzen");
    $('#aussetzen').prop('disabled', false);
}

$('#start').click(start);

function ban(e) {
    if(state != 1) {
        return;
    }
    console.log(e);
    $('img[title=\'' + e.target.title + '\']').addClass('grey');
    tracks = tracks.filter(x => x != e.target.title);
    console.log(tracks.length);
    if(tracks.length <= players.length) {
        state = 2;
        $('#ziehen').prop('disabled', false);
        $('#meldung').text('Die Ziehung kann gestartet werden');
        $('#aussetzen').prop('disabled', true);
        return;
    }
    if(playerIndex == players.length - 1) {
        playerIndex = 0;
    } else {
        playerIndex++;
    }
    $('#meldung').text(players[playerIndex] + " ist an der Reihe. BiBitte eine Karte bannen oder aussetzen");
}

function aussetzen() {
    if(playerIndex == players.length - 1) {
        playerIndex = 0;
    } else {
        playerIndex++;
    }
    $('#meldung').text(players[playerIndex] + " ist an der Reihe. Bitte eine Karte bannen.");
    aussetzCounter++;
    if(aussetzCounter === players.length) {
        state = 2;
        $('#ziehen').prop('disabled', false);
        $('#meldung').text('Die Ziehung kann gestartet werden');
        $('#aussetzen').prop('disabled', true);
    }
}

function startDraw() {
    state = 2;
    for(let h = 0; h < +$('#trackCount').val(); h++) {
        $('#draws').append('<span>Strecke ' + (h+1) + '</span><h3 id="h' + h + '"></h3>');
        let time = Math.floor(Math.random() * 4000) + 1000;
        for(let i = 0, j = 0; i < time; i = i+50) {
            setTimeout(() => {$('#h' + h).text(tracks[j])},i);
            j++;
            if(j == tracks.length) {
                j = 0;
            }
        }
        let result = tracks[Math.floor(Math.random() * tracks.length)];
        tracks = tracks.filter(x => x != result);
        setTimeout(() => {$('#h' + h).text(result)},time + 50);
    }
}

$('img').click(ban);

console.log("test");