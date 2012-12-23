![Screenshot][screenshots]

Why `milestones.js`?
--------------------
Communicating progress and current features under development in general, but particularly people without any awareness of GitHub can be difficult, as unknowing users keep clamouring for the very features that are currently under development.

Even Github’s [milestones][milestones] system has its shortcomings, because you have to go traverse a jungle of links and clicks on a GitHub project page to even get to them. This user experience relects a belief by the GitHub team that the milestones system is not something that should be given a high priority nor something that should be used by people regularly to follow the developments of a GitHub project. It is only something to be used internally by the project collaborators who already know the existence of the milestones feature.

But consider the benefits of being able to communicate the milestones to your ordinary user. Every software developer worth his or her salt wants to automate *everything*, and leveraging the [milestones API][api] can accomplish this, if developers use and update their milestones every now and then.

Demo
----
Check out the working example at [jsFiddle][jsfiddle]. Note that it does not rely on `css_file` to load the CSS. You can also try this locally by downloading the `demo/` project folder to your computer.

Installation
------------
1. [Download][download] `milestones.js`.
2. Import `milestones.js` (and jQuery), and include an empty `ul` container with the id `#milestones` somewhere in your body text:

    ```html
    <head>
        <!-- (...) -->
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript">
            window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')
        </script>
        <script type="text/javascript" src="js/milestones.min.js"></script>
        <!-- (...) -->
    </head>
    <body>
        <!-- (...) -->
        <ul id="milestones"></ul>
        <!-- (...) -->
    </body>
    ```

    **Important!** You *must* write `<ul id="milestones"></ul>` as *one line*, because of the way the script detects an empty list of milestones to display.

    **Do** write it like this:

    ```html
    <ul id="milestones"></ul>
    ```

    **Don’t** write it like this:

    ```html
    <ul id="milestones">
    </ul>
    ```

    (jQuery’s `:empty` selector will only work, if the element (`ul`) contains no children *and* no whitespace.)

3. Fill out all mandatory arguments—and some of the optional, if you so desire.

### Parameters ###
When you first download the code for `milestones.js`, it will look like this:

```js
// (...)

// Mandatory parameters
    var username = "";
    var repo     = "";
    var css_file = ""; // "css/milestones.min.css"

// Optional parameters
    var sort_by = "due_date";
    var sort_order = "desc";
    var show_due = true;
    var show_state = "open"
    var show_closed = false;

// (...)
```

You will notice `"username"` and `"repo"` in the code. These are *mandatory* parameters and must be replaced by your own GitHub details; unlike the mandatory parameters, the optional have default values.

`css_file` must point to your `milestones.min.css` (or `milestones.css`) in order for your stylesheet to work.

Here is an overview of all parameters available to you in `milestones.js`:

#### Mandatory ####
1. `username`
2. `repo`
3. `css_file`

#### Optional ####
Parameter   | Values                 | Default Value | API Default
:-----------|:-----------------------|:--------------|------------
sort_by     | due_date, completeness | due_date      | due_date
sort_order  | desc, asc              | desc          | desc
show_due    | boolean                | true          | (N/A)
show_state  | open, closed           | open          | open
show_closed | boolean                | false         | true

#### Under Consideration ####
Parameter           | Values  | Default Value
:-------------------|:--------|:-------------
milestone_id        | int     | 0
display_cap         | int     | 0
show_descriptions   | boolean | false
expand_descriptions | boolean | false

License
-------
*“Don‘t be a dick.”*

Credits
-------
When I first banged out [a sketch][sketch] for the design, I went on to conceive of the idea in CSS. My initial code was decent, but I inevitably had to consult my trusted CSS handbook <i>[Handcrafted CSS][handcrafted]</i> on the best way to scale the progress bar through CSS. Turns out, the example project in the second chapter by **Dan Cederholm** proved more apt than I could have imagined. In his example, the progress bar scales through the *entire* `li`, which in turn leaves more space for the milestone name and due date.

Although this is just a basic, preliminary design (the current CSS doesn’t handle long names very well), I would like to thank **Dan Cederholm** for his great book. This experience just goes to show how relevant and valuable his book will remain. You should check it out. (You shouldn’t get the version with the DVD in my opinion, though.)

Similar Ideas
-------------
* [Interstate](http://interstateapp.com/tour)
* [Cultured Code’s development status](http://culturedcode.com/status/)
* [Status Charts](http://www.statuschart.com/)

Related Projects
----------------
* [Release Notes](https://github.com/posabsolute/releasenotes)
* [DocumentUp](http://documentup.com/#gh-pages)
* [Balanced Payments Status Board](http://blog.balancedpayments.com/status-page/)


[screenshots]:  https://github.com/ndarville/milestones.js/raw/master/screenshots/screenshot.png
[milestones]:   http://blog.hackerbeers.com/2012/06/how-hackerbeers-uses-github-milestones-to-stay-focused-and-make-progress/
[api]:          https://developer.github.com/v3/issues/milestones/
[jsfiddle]:     http://jsfiddle.net/DLgvm/
[download]:     https://github.com/ndarville/milestones.js/downloads
[sketch]:       https://github.com/ndarville/milestones.js/issues/2
[handcrafted]:  http://handcraftedcss.com/
