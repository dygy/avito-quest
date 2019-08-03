document.documentElement.className = "js";

const menu = document.querySelector('.menu'),
    button = document.querySelector('.nav-toggle'),
    dropdown = document.querySelector('.dropdown');

button.onclick = function() {
    classie.toggle( menu, 'menu-active' );
    if (/fa-angle-right/.test(elem('icon').className)) {
        elem('icon').className = elem('icon').className.replace('fa-angle-right', 'fa-angle-down')
    }
    else {
        elem('icon').className = elem('icon').className.replace('fa-angle-down', 'fa-angle-right')
    }
};

// Close menu when clicking outside
// See: https://css-tricks.com/dangers-stopping-event-propagation/
document.addEventListener('click', function(event) {
    if (event.target !== dropdown && !dropdown.contains(event.target)) {
        // hide the menu
        classie.removeClass(menu, "menu-active");
    }
});




( function( window ) {

    'use strict';


    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    let hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        const fn = hasClass(elem, c) ? removeClass : addClass;
        fn( elem, c );
    }

    const classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = classie;
    } else {
        // browser global
        window.classie = classie;
    }

})( window );

function matchNeedsToChange(media) {
    if (media.matches) { // If media query matches
        elem('navbar').className += ' hidden';
        elem('navtoggle').className=elem('navtoggle').className.replace(/hidden/,'')
    } else {
        elem('navtoggle').className += ' hidden';
        elem('navbar').className=elem('navbar').className.replace(/hidden/,'')

    }
}

const media = window.matchMedia("(max-width: 700px)");
matchNeedsToChange(media); // Call listener function at run time
media.addListener(matchNeedsToChange); // Attach listener function on state changes