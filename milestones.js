$(document).ready(function() {
// Created by Niclas Darville, github.com/ndarville
//
// Project information at http://git.io/3-0xBg

// Mandatory arguments
    var username = "";
    var repo     = "";
    var css_file = ""; // "css/milestones.min.css"

// Optional arguments
    var sort_by = "due_date";
    var sort_order = "desc";
    var show_due = true;
    var show_state = "open";
    var show_closed = false;
    
    var queries = 'sort='+sort_by+'&direction='+sort_order+'&state='+show_state;
    var github = 'https://api.github.com/repos/'+username+'/'+repo+'/milestones?'+queries;

    function getCompletionStatus(milestone) {
        var open = milestone.open_issues;
        var closed = milestone.closed_issues;

        return closed === 0 ? 0 : Math.round(closed / (open + closed) * 100);
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
                if (days === 1) {
                    return "Due tomorrow";
                }
                else if (days < 7) {
                    return "Due in "+Math.round(days)+" days";
                }
                else if (days === 7) {
                    return "Due in one week";
                }
                else if (days/7 < 4) {
                    days /= 7;
                    return "Due in "+Math.round(days)+" weeks";
                }
                else if (days/7 === 4) {
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
        $.each(milestones, function() {
            $.each(this, function(i, milestone) {
                var due = show_due === true ? '<em>'+getRelativeDate(milestone)+'</em>' : "";
                var url =
                    'https://github.com/'+ 
                    username+'/'+repo+
                    '/issues?milestone='+milestone.number;

                if (milestone.state === "open" || show_closed) {
                    var li = document.createElement("li");
                    $(li).
                        append($("<a>", {'href': url}).html(
                           due+milestone.title)).
                        append($("<span>",
                            {'style': 'width:' + getCompletionStatus(milestone) + '%;'})
                            .text(getCompletionStatus(milestone) + '%'));
                    ul.append(li);
                }
            });
        });
        $('#milestones:empty').html(
            '<li class="no-milestones"><i>No current milestones for this repo</i></li>'
        );
    }

    // $.ajaxSetup({
    //     type: "GET",
    //     datatype: "jsonp",
    //     cache: true,
    //     ifModified: true
    // });

    $.getJSON(github+'&callback=?', displayMilestones);
});