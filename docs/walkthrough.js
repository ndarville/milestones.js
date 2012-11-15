$(document).ready(function() {
    // Mandatory arguments
    var username = "";
    var repo     = "";
    var css_file = ""; // "css/milestones.min.css"

    // Optional arguments (because they have working default values)
    var sort_by = "due_date";
    var sort_order = "desc";
    var show_due = true;
    var show_state = "open";
    var show_closed = false;

    // Fetch milestones from GitHub using queries based on our arguments
    var queries = 'sort='+sort_by+'&direction='+sort_order+'&state='+show_state;
    var github = 'https://api.github.com/repos/'+username+'/'+repo+'/milestones?'+queries;

    // Helper function.
    // Returns the completion status as no. of closed issues / open
    function getCompletionStatus(milestone) {
        var open = milestone.open_issues;
        var closed = milestone.closed_issues;

        return closed === 0 ? 0 : Math.round(closed / (open + closed) * 100);
    }

    // Helper function.
    // Converts GitHub's (due) date format to relative time
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

    // Main function.
    // Is only called, if `getJSON()` below successfully queries GitHub
    function displayMilestones(milestones) {
        // Put a stylesheet reference to milestones.min.css in the `<head>` of the page
        $('head').append('<link rel="stylesheet" href="'+css_file+'" type="text/css" />');

        // Create a reference to the `ul` element with the ID `#milestones`
        var ul = $("#milestones");
        // For each of the milestones returned by GitHub
        $.each(milestones, function() {
            $.each(this, function(i, milestone) {
                // Display the milestone's due date, if we've set `show_due` to `true`
                var due = show_due === true ? '<em>'+getRelativeDate(milestone)+'</em>' : "";
                // Fetch milestone's URL. milestone.url fetches https://api..., which is no good.
                var url =
                    'https://github.com/'+ 
                    username+'/'+repo+
                    '/issues?milestone='+milestone.number;

                // If the milestone is open, or if we've set `show_closed` to `true`
                if (milestone.state === "open" || show_closed) {
                    // Create a list element `"li"`
                    var li = document.createElement("li");
                    $(li).
                        // Append a link to `li`
                        append($("<a>", {'href': url}).html(
                           due+milestone.title)).
                        // Append a `span` element to `li` containing the completion status
                        // as well the HTML we create the progress bar with
                        append($("<span>",
                            {'style': 'width:' + getCompletionStatus(milestone) + '%;'})
                            .text(getCompletionStatus(milestone) + '%'));
                    // Append our `li` to `ul#milestone`
                    ul.append(li);
                }
            });
        });
        // If we end up with a `ul#milestones` with no milestones (that fit our criteria),
        // we create a `li.no-milestones` element with a notification of this
        $('#milestones:empty').html(
            '<li class="no-milestones"><i>No current milestones for this repo</i></li>'
        );
    }

    // Query GitHub for a JSON-formatted response to our defined arguments
    $.getJSON(github+'&callback=?', displayMilestones);
});