$(document).ready(function() {
// Created by Niclas Darville, github.com/ndarville
//
// License and project information at http://git.io/3-0xBg

// Mandatory arguments
    var username = "ndarville";
    var repo     = "milestones.js";   
    
// Optional arguments    
    var sort_by = "due_date";
    var sort_order = "desc";
    var css_file = null;
    var show_due = true;
    var show_closed = false;

    function getCompletionStatus(milestone) {
        var open = milestone.open_issues;
        var closed = milestone.closed_issues;

        return closed == 0 ? 0 : Math.round(closed / (open + closed) * 100)
    }
    
    function displayMilestones(milestones) {
        var ul = $("#milestones");
        $.each(milestones, function(i) {
            var milestone = milestones[i]
            var link = 
                '<a href="https://github.com/'+ 
                username+'/'+repo+
                '/issues?milestone='+(i+1)+'">'+
                milestone.title+'</a>';

            if (milestone.state == "open" || show_closed) {
                var li = document.createElement("li");
                $(li).text(
                    link +
                    '<span>'+getCompletionStatus(milestone)+'%</span>'
                );
                ul.append(li);
            }
        });
    }
    
    $.ajaxSetup({
        url: 'https://api.github.com/repos/'+username+'/'+repo+'/milestones',
        type: "GET",
        datatype: "jsonp",
        ifModified: true
    });  
    
    $.ajax({
        success: displayMilestones
    });
});