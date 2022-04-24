$(document).ready(function() {
    getTypes();
});

function getTypes() {
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'type'},
        success: function(result) {
            var types = JSON.parse(result);
            var html = '';
            for (var i in types) {
                html += '<a href="javascript:navQ1(\'' + types[i] + '\');">';
                html += '   <div class="alert alert-success">';
                html += '       <i class="glyphicon glyphicon-play-circle close"></i>';
                html += '           <strong>' + types[i] + '</strong>';
                html += '   </div>';
                html += '</a>';
            }

            $('#type-list').html(html);
        }
    });
}

function navQ1(type) {
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'q1'},
        success: function(result) {
            var q1 = JSON.parse(result);
            var q1_text = '';
            var q1_list = '';
            for (var i in q1.Q1_text) {
                q1_text += q1.Q1_text[i] + '<br>';
            }

            for (var i in q1.Q1) {
                q1_list += '<a href="javascript:navQ2(\'' + q1.Q1[i] + '\');">';
                q1_list += '   <div class="alert alert-success">';
                q1_list += '       <i class="glyphicon glyphicon-play-circle close"></i>';
                q1_list += '           <strong>' + q1.Q1[i] + '</strong>';
                q1_list += '   </div>';
                q1_list += '</a>';                
            }
            $('.q1-wrapper h2').html(q1_text);
            $('.q1-wrapper #q1-list').html(q1_list);
        }
    });

    $('.wrapper').removeClass('active');
    $('.q1-wrapper').addClass('active');
}

function navQ2(q1) {
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'q2', q1: q1},
        success: function(result) {
            var q2 = JSON.parse(result);
            var q2_text = '';
            var q2_list = '';
            console.log(q2);

            for (var i in q2.Q2_text) {
                q2_text += q2.Q2_text[i] + '<br>';
            }

            for (var i in q2.Q2) {
                q2_list += '<a href="javascript:navIdea(\'' + q2.Q2[i] + '\');">';
                q2_list += '   <div class="alert alert-success">';
                q2_list += '       <i class="glyphicon glyphicon-play-circle close"></i>';
                q2_list += '           <strong>' + q2.Q2[i] + '</strong>';
                q2_list += '   </div>';
                q2_list += '</a>';                
            }
            $('.q2-wrapper h2').html(q2_text);
            $('.q2-wrapper #q2-list').html(q2_list);
        }
    });

    $('.wrapper').removeClass('active');
    $('.q2-wrapper').addClass('active');
}

function navIdea(q2) {
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'idea', q2: q2},
        success: function(result) {
            var ideas = JSON.parse(result);
            var html = '';
            for (var i in ideas) {
                html += ideas[i];
            }

            $('.idea-wrapper h2').html(html);
        }
    });

    $('.wrapper').removeClass('active');
    $('.idea-wrapper').addClass('active');
}