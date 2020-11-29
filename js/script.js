// Script to change Navbar when user scrolls down
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("userScrolled", $(this).scrollTop() > $nav.height());
    });
});

