// Avoid console errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

jQuery(document).ready(function($) {

    //
    // Place your custom JS code here.
    // $() will work as an alias for jQuery() inside of this function
    //

    /*$(window).resize(function(){location.reload();});*/

    // if($('body').hasClass('desktop')){
    //     $(window).resize(function(){location.reload();});
    // }


    /** Uses mobble */

    // if ($('body').hasClass('iphone')) {
    //     // do stuff
    //     //console.log("iso mobile");
    //     $('meta[name=viewport]').attr('content','width=device-width, initial-scale=0.70');
    // } else {
    //     $('meta[name=viewport]').attr('content','width=device-width, initial-scale=1.0');
    // }



    $('#copyright p span').append((new Date).getFullYear());

    $('#booking_form #em-booking .em-booking-form-details label').html('Request');

    $('#post_content h1.Club.Statements').parent(".col-sm-12").children("img.wp-post-image").css("display", "none");
    $('#post_content h1.Press.Freedom').parent(".col-sm-12").children("img.wp-post-image").css("display", "none");
    $('#post_content h1.Our.Facilities').parent(".col-sm-12").children("img.wp-post-image").css("display", "none");

    $(".page-id-491 #event-categories option[value='155']").remove();


    /* Committee Slide */

    $('.committee_dropdown .list-group .group-header a').on('click', function(){
        /*$(".committee_dropdown .list-group").find('.group-body').slideToggle(300).removeClass('active');*/
        $(this).parent().parent().parent().toggleClass('active').find('.group-body').slideToggle(300);
    })

    $('.committee_dropdown .list-group:first-child').addClass('active');
    $('.committee_dropdown .list-group:first-child .group-body').css("display","block");


    /* Partner Clubs Table */

    // $('.list_table').cardtable();
    // $("#club_table").tablesorter();
    // $("#cj_table").tablesorter();

    // $("#partner_clubs").prepend('<form id="filter-form">Filter: <input name="filter" id="filter" value="" maxlength="30" size="30" type="text"></form><br>');

    // var PCTable = $('#club_table');
    // $("#filter").keyup(function() {
    //     $.uiTableFilter( PCTable, this.value );
    // })

    // $("#cj_directory").prepend('<form id="filter-form">Filter: <input name="filter" id="filter" value="" maxlength="30" size="30" type="text"></form><br>');

    // var CJTable = $('#cj_table');
    // $("#filter").keyup(function() {
    //     $.uiTableFilter( CJTable, this.value );
    // })



    /* Other List */

    $('.contactus_list .list-group .group-header a').on('click', function(){
        $(this).parent().parent().parent().toggleClass('active').find('.group-body').slideToggle(300);
    })

    var getLastPartOfUrl =function($url) {
        var url = $url;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length-1];
        if(lastpart==='')
        {
            lastpart = urlsplit[urlsplit.length-2];
        }
        return lastpart;
    }

    $('.media_file a').each(function(){
        file_url = $(this).text();
        //console.log(getLastPartOfUrl(file_url));
        $(this).text(getLastPartOfUrl(file_url));
    });


    /* Homepage Carousel / Slider */

    $('#top_owlslide .owl-carousel').children("div.form_holder").remove();

    $(".owl-carousel").owlCarousel({
        nav: true,
        mouseDrag: true,
        touchDrag: true,
        center: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7500,
        autoplayHoverPause: true,
        items: 1,
        responsiveClass: true,
        responsiveRefreshRate: 100,
        responsive:{
            0:{
                margin:0,
                stagePadding:0
            },
            600:{
                margin:20,
                stagePadding: 134
            }
        }
    });

    /*$('#top_owlslide .owl_topitem .slider_image img').each(function() {
        var maxWidth = 800; // Max width for the image
        var minHeight = 300;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = $(this).width();    // Current image width
        var height = $(this).height();  // Current image height

        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            $(this).css("width", maxWidth); // Set new width
            $(this).css("height", height * ratio);  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
            new_height = height;
            pick = "1";
        }

        // Check if current height is larger than max
        if(height < minHeight){
            ratio = minHeight / height; // get ratio for scaling image
            $(this).css("height", minHeight);   // Set new height
            $(this).css("width", width * ratio);    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            new_width = width * ratio;
            new_height = minHeight;

        }

         if(new_height == 300){
            //new_top = parseInt( minHeight / 2) + 'px';
            new_top = '50%';
        }else{
            new_top = '0';
        }
       
       //console.log(new_top);

        var $img = $(this),
        css = {
            position: 'absolute',
            marginLeft: '-' + ( parseInt( $img.css('width') ) / 2 ) + 'px',
            left: '50%',
            //top: '50%',
            top: new_top,
            marginTop: '-' + ( parseInt( $img.css('height') ) / 2 ) + 'px'
        };

            $img.css( css ); 

    });*/

    /*$('#top_owlslide .owl-carousel .owl-stage-outer .owl-stage .owl-item').children("div.form_holder").parent().remove();*/


    /* Event Gallery Start */

    if($(".single-event .col-sm-12 div").hasClass("galleria")){
        Galleria.loadTheme('../../wp-content/themes/fcc_2015/js/classic/galleria.classic.min.js');

        Galleria.configure({
            transition: 'fade',
            imageCrop: true,
            lightbox: true
        });

        Galleria.run('.galleria');
    };

    /* Event Gallery End */



    $( ".dialog" ).click(function(){        
            $('#dialog').html($(this).html());
            $('#dialog').css("display", "block");
            $('#fade').css("display","block");
        });
    $("#fade").click(function(){
        $('#dialog').css("display", "none");
        $('#fade').css("display", "none");
    });


    $('.single-post.postid-299 .post_body').jPaginate({
                items: 10,
                minimize: false,
                nav_items: 6,
                cookies: true,
                position: "after",
                equal: false,
                offset: 50
    });

    /* Club news Archives group by year */

    var archives_array = new Array;
    var archive_li_list = $('.post-type-archive-club-news #archives_clubnews ul li');
    var archive_wrapper = $('.post-type-archive-club-news #archives_clubnews ul');

    archive_li_list.each(function(index, value) {
        archives_link = $(this).find('a');
        var text = $(this).text();
        var link = archives_link.attr("href");

        var ret = text.split(" ");
        var str_month = ret[0];
        var ret2 = ret[1].toString().split("(");
        var str_count = "(" + ret2[1];
        var str_year = ret2[0];

        var list_index = index + 1;

        //console.log("Index: " + list_index + ", Month: " + str_month + ", Year: " + str_year + ", Count: " + str_count + ", URL: " + link + "<br/>");

        archives_array.push({"year" : str_year, "month" : str_month, "count" : str_count, "url" : link});
    });

    /* rearrange array by Year */

    if (archives_array.length != 0){
        //console.log("This array is full");

        //$("#test").dump(archives_array);
        by_year = _.groupBy(archives_array, function(obj) { return obj['year'] });
        //$("#test").dump(by_year);

        var new_menu = "";
        $.each(by_year, function(i, yearlist){
            //console.log(i);
            new_menu += "<li><span>" + i + "</span>";
                new_menu += "<ul>";
                $.each(yearlist, function(j, value){
                    new_menu += "<li><a href='"+value['url']+"'>"+value['month']+"</a>&nbsp;"+value['count']+"</li>";
                });
                new_menu += "</ul>";
            new_menu += "</li>";
        });
        archive_wrapper.empty().append(new_menu);
    }


    /* Correspondents & Journalists Directory */

    $('#cj_table').removeClass('list_table').removeClass('tablesorter').removeClass('stacktable').removeClass('small-only');
    $('#cj_table td').removeClass('dialog');

    // $('#cj_table td:nth-child(11)').each(function() {
    //     if($(this).text().match(/^http|www/)) {
    //         var url = $(this).text();
    //         $(this).empty().append('<a>WWW</a>');
    //         $(this).find('a').attr('href', url).addClass('website-link');
    //     }
    // });  
    // $('#cj_table td:nth-child(12)').each(function() {
    //     if($(this).text().match(/^http|www/)) {
    //         var url = $(this).text();
    //         $(this).empty().append('<a>LinkedIn</a>');
    //         $(this).find('a').attr('href', url).addClass('linkedin-link');
    //     }
    // }); 

    // load data tables for journalist directory: http://www.fcchk.org/correspondents-journalists-directory/
    $('#cj_table').addClass('display').addClass('nowrap').DataTable({
        // rowReorder: {
        //     selector: 'td:nth-child(2)'
        // },
        // "autoWidth": false,
        responsive: true,
        columnDefs: [
            // { width: 100, targets: 0 },
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 2 },
            { responsivePriority: 3, targets: 3 }
            // { responsivePriority: 4, targets: 8 },
            // { responsivePriority: 5, targets: 9 },
            // { responsivePriority: 6, targets: 7 },
        ]
    });




    /**
     * Search Box
     */
    
    // Search
    $('#search-button').toggle(
        function() {
            $("div.fcc-searchbox").addClass("fcc-searchbox-show");
            setTimeout(function() { $("#fcc-searchbox-search-input").focus(); }, 1000);
        },
        function() {
            $("div.fcc-searchbox").removeClass("fcc-searchbox-show");
        }
    );

    $("#fcc-searchbox-search-input").on('focus',function() {
        console.log('we have got focus');
    });
        
    $("a.fcc-searchbox-close").click(function() {
        $("div.fcc-searchbox").removeClass("fcc-searchbox-show");
    });


    /**
     * Program created by Ryan Tarson Updated 6.15.16, under this code is my pure JS Version
     * https://codepen.io/RTarson/pen/dMZMRx
     */

    // var wHeight = window.innerHeight;
    // //search bar middle alignment
    // $('#mk-searchbox-searchform').css('top', wHeight / 2);
    // //reform search bar
    // jQuery(window).resize(function() {
    //     wHeight = window.innerHeight;
    //     $('#mk-searchbox-searchform').css('top', wHeight / 2);
    // });



    // $(document).keypress(function(e) {
    //   console.log(e.keyCode);
    //   if (e.keyCode == 27) {
    //     $("div.mk-fullscreen-search-overlay").removeClass("mk-fullscreen-search-overlay-show");
    //   }
    // });


});