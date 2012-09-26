README
======
![Screenshot](https://github.com/ndarville/milestones.js/raw/master/screenshots/screenshot.png)

Why `milestones.js`?
--------------------
Communicating progress and current features under development in general, but particularly people without any awareness of GitHub can be difficult, as unknowing users keep clamouring for the very features that are currently under development.

Even Github’s [milestones][milestones] system has its shortcomings, because you have to go traverse a jungle of links and clicks on a GitHub project page to even get to them. This user experience relects a belief by the GitHub team that the milestones system is not something that should be given a high priority nor something that should be used by people regularly to follow the developments of a GitHub project. It is only something to be used internally by the project collaborators who already know the existence of the milestones feature.

But consider the benefits of being able to communicate the milestones to your ordinary user. Every software developer worth his or her salt wants to automate *everything*, and leveraging the [milestones API][api] can accomplish this, if developers use and update their milestones every now and then.

Demo
----
Check out the working example at [jsFiddle](http://jsfiddle.net/zLMNU/). Note that it does not rely on `css_file` to load the CSS. You can also try this locally by downloading the `demo/` project folder to your computer.

Installation
------------
1. [Download][download] `milestones.js`.
2. Import `milestones.js` (and jQuery), and include an empty `ul` container with the id `#milestones` somewhere in your body text:

    ```html
    <head>
        <!-- (...) -->
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/milestones.min.js"></script>
        <!-- (...) -->
    </head>
    <body>
        <!-- (...) -->
        <ul id="milestones">
        </ul>
        <!-- (...) -->
    </body>
    ```

3. Fill out all mandatory arguments—and some of the optional, if you so desire.

### Parameters ###
When you first download the code for `milestones.js`, it will look like this:

```js
// (...)

// Mandatory parameters
    var username = "";
    var repo     = "";
    var css_file = "" // "css/milestones.min.css"
    
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
Parameter         | Values  | Default Value
:-----------------|:--------|:-------------
milestone_id      | int     | 0
display_cap       | int     | 0
show_descriptions | boolean | false

License
-------
*(To do. Nothing restrictive.)*

Similar Ideas
-------------
* [Interstate](//interstateapp.com/tour)
* [Cultured Code’s development status](//culturedcode.com/status/)
* [Status Charts](//statuschart.com/)

Related Projects
----------------
* [Release Notes](https://github.com/posabsolute/releasenotes)
* [DocumentUp](//documentup.com/#gh-pages)


[milestones]:   //blog.hackerbeers.com/2012/06/how-hackerbeers-uses-github-milestones-to-stay-focused-and-make-progress/
[api]:          //developer.github.com/v3/issues/milestones/
[download]:     https://github.com/ndarville/milestones.js/downloads