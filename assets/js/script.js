var replace_marks = [];

$(document).ready(function() {
    getTypes();

    $('#quiz-form').submit(function(e) {
        e.preventDefault();
        
        $('.replace-mark').each(function() {
            replace_marks.push($(this).attr('id'));
        });

        navQ1($('#navform-type').val());
    })
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
                html += '<a href="javascript:navForm(\'' + types[i] + '\');">';
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

function navForm(types) {
    $('#navform-type').val(types);
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'form'},
        success: function(result) {
            var f1 = JSON.parse(result);
            var f1_text = '';
            var f1_list = '';
            var html = '';

            for (var i in f1.F1_text) {
                f1_text += f1.F1_text[i] + '<br>';
            }

            for (var i in f1.F1) {
                var tmp = f1.F1[i].split('>');
                            
                html += '<div class="form-group">';
                html += '   <label>' + tmp[0].trim() + '</label>';
                html += '   <input type="text" class="form-control replace-mark" id="' + tmp[1].trim() + '" required>';
                html += '</div>';
            }
            html += '   <button type="submit" class="btn btn-primary">Submit</button>';

            $('.quiz-form h2').html(f1_text);
            $('#quiz-form').html(html);
        }
    });
    $('.wrapper').removeClass('active');
    $('.quiz-form').addClass('active');
}

function navQ1(type) {
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'q1', type: type},
        success: function(result) {
            var q1 = JSON.parse(result);
            var q1_text = '';
            var q1_list = '';
            for (var i in q1.Q1_text) {
                q1_text += q1.Q1_text[i] + '<br>';
            }

            for (var i in q1.Q1) {
                var disp_txt = replaceText(q1.Q1[i]);

                q1_list += '<a href="javascript:navQ2(\'' + btoa(unescape(encodeURIComponent(q1.Q1[i]))) + '\');">';
                q1_list += '   <div class="alert alert-success">';
                q1_list += '       <i class="glyphicon glyphicon-play-circle close"></i>';
                q1_list += '           <strong>' + disp_txt + '</strong>';
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
    console.log(atob(q1));
    $.ajax({
        method: 'POST',
        url: 'api.php',
        data: {action: 'q2', q1: q1},
        success: function(result) {
            var q2 = JSON.parse(result);
            var q2_text = '';
            var q2_list = '';

            for (var i in q2.Q2_text) {
                q2_text += q2.Q2_text[i] + '<br>';
            }

            for (var i in q2.Q2) {
                var disp_txt = replaceText(q2.Q2[i]);
                q2_list += '<a href="javascript:navIdea(\'' + btoa(unescape(encodeURIComponent(q2.Q2[i]))) + '\');">';
                q2_list += '   <div class="alert alert-success">';
                q2_list += '       <i class="glyphicon glyphicon-play-circle close"></i>';
                q2_list += '           <strong>' + disp_txt + '</strong>';
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
                var disp_txt = replaceText(ideas[i]);
                html += disp_txt;
            }

            $('.idea-wrapper h2').html(html);
        }
    });

    $('.wrapper').removeClass('active');
    $('.idea-wrapper').addClass('active');
}

function replaceText(s) {
    var disp_txt = s;
    
    if (disp_txt == null) return '';

    for (var i in replace_marks) {
        var replace_mark = replace_marks[i];
        var replace_txt = replace_mark;
        replace_txt = replace_txt.replace('{', '');
        replace_txt = replace_txt.replace('}', '');

        disp_txt = disp_txt.replaceAll(replace_mark, $('#\\{' + replace_txt + '\\}').val());
    }

    return disp_txt;
}