$(document).ready(function() {
// Created by Niclas Darville, github.com/ndarville
//
// Project information at http://git.io/3-0xBg

// Mandatory arguments
    var username = "username";
    var repo     = "repo";
    var css_file = "" // "/css/milestones.min.css"
    
// Optional arguments    
    var sort_by = "due_date";
    var sort_order = "desc";
    var show_due = true;
    var show_state = "open";
    var show_closed = false;
    
    var queries = 'sort='+sort_by+'&direction='+sort_order+'&state='+show_state;

    function getCompletionStatus(milestone) {
        var open = milestone.open_issues;
        var closed = milestone.closed_issues;

        return closed == 0 ? 0 : Math.round(closed / (open + closed) * 100);
    }

    function getRelativeDate(milestone) {
        var due_date = new Date(milestone.due_on);
        var date_delta = due_date.getTime() - Date.now();

        if (milestone.due_on === null) {
            return "No due date";
        }

        else if (date_delta < 0) {
            return "Overdue";
        }

        else {
            var secs = date_delta/1000;
            var days = secs/86400;
            
            if (days === 0) {
                if (secs < 60) {
                    return "Due now";
                }
                else if (secs < 120) {
                    return "Due in one minute";
                }
                else if (secs < 3600) {
                    secs /= 60;
                    return "Due in "+Math.round(secs)+" minutes";
                }
                else if (secs < 7200) {
                    return "Due in one hour";
                }
                else if (secs < 86400) {
                    secs /= 3600;
                    return "Due in "+Math.round(secs)+" hours";
                }
            }
            else {
                if (days == 1) {
                    return "Due tomorrow";
                }
                else if (days < 7) {
                    return "Due in "+Math.round(days)+" days";
                }
                else if (days == 7) {
                    return "Due in one week";
                }
                else if (days/7 < 4) {
                    days /= 7;
                    return "Due in "+Math.round(days)+" weeks";
                }
                else if (days/7 == 4) {
                    return "Due in one month";
                }
                else {
                    return "Due in "+Math.round(days/28)+" weeks" + milestone.due_on;
                }
            }
        }
    }
            
    function displayMilestones(milestones) {
        $('head').append('<link rel="stylesheet" href="'+css_file+'" type="text/css" />');
            
        var ul = $("#milestones");
        $.each(milestones, function(i) {
            var milestone = milestones[i];
            var url =
                'https://github.com/'+ 
                username+'/'+repo+
                '/issues?milestone='+(i+1);
            var due = show_due == true ? '<em>'+getRelativeDate(milestone)+'</em>' : "";

            if (milestone.state == "open" || show_closed) {
                var li = document.createElement("li");
                $(li).
                    append($("<a>", {'href': url}).html(
                       due+milestone.title)).                    
                    append($("<span>", {'style': 'width:' + getCompletionStatus(milestone) + '%;'}).text(getCompletionStatus(milestone) + '%'));
                ul.append(li);
            }
        });
    }
    
    $.ajaxSetup({
        url: 'https://api.github.com/repos/'+username+'/'+repo+'/milestones?'+queries,
        type: "GET",
        datatype: "jsonp",
        ifModified: true
    });  
    
    $.ajax({
        success: displayMilestones
    });
});