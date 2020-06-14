
$(function(){
"use strict";

  	// Define Some Elements
  	var allWindow = $(window),
        body = $('body'),
        top = allWindow.scrollTop(),
        navBar = $(".nav-wrapper");

/*-----------------------------------------------------
  Javascript Function To check Animation support
-------------------------------------------------------*/

    var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }


/*-----------------------------------------------------
  Javascript Function For Smooth Mouse Scrolling
-------------------------------------------------------*/

    jQuery.scrollSpeed = function(step, speed) {
        
        var $document = $(document),
            $body = $('html, body'),
            option = 'default',
            root = top,
            scroll = false,
            scrollY,
            view;
            
        if (window.navigator.msPointerEnabled) {
            return false;
        }
            
            
		jQuery.event.special.mousewheel = {
			setup: function( _, ns, handle ){
				if ( ns.includes("PreventDefault") ) {
				 	this.addEventListener("mousewheel", handle, { passive: false });
				} else {
					return false;
				}
			}
		}

        allWindow.on('mousewheel.PreventDefault DOMMouseScroll', function(e) {
            
            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
                scrollY = $document.height() > allWindow.height();
                scroll = true;
            
            if (scrollY) {
                
                view = allWindow.height();
                    
                if (deltaY < 0 || detail > 0) {
                    root = (root + view) >= $document.height() ? root : root += step;
                }
                
                if (deltaY > 0 || detail < 0) {
                    root = root <= 0 ? 0 : root -= step;
                }
                
                $body.stop().animate({
                    scrollTop: root
                }, speed, option, function() {
                    scroll = false;
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            
            if (scrollY && !scroll) root = top;
            if (!scroll) root = allWindow.scrollTop();
            
        }).on('resize', function() {
            
            if (scrollY && !scroll) view = allWindow.height();
            
        });       
    };
    
    jQuery.easing.default = function (x,t,b,c,d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };

    // initialize Smooth Scrolling Only in Modern browsers
    if(animation) {
    	jQuery.scrollSpeed(100, 700);
    }



/*---------------------------------------------------
  Javascript Function FOR PARALLAX EFFECT
---------------------------------------------------*/

    // create variables
    var backgrounds = $('.parallax');

    function parallax() {

      // for each of background parallax element
      $.each( backgrounds, function( i, val ) {

        var backgroundObj = $(this),
          backgroundObjTop = backgroundObj.offset().top,
          backgroundHeight = backgroundObj.height();

        // update positions
        top = allWindow.scrollTop();

          var yPos = ((top - backgroundObjTop))/2;

          if ( yPos <= backgroundHeight + backgroundObjTop ) {
            backgroundObj.css({
              backgroundPosition: '50% ' + yPos + 'px'
            });
          }

      });
    };




    function scrollFunctions() {
      stikyNav();
      ChangeClass();
      parallax();
     // progressFunction();
    }

    // add Event listener to window
    allWindow.on('scroll', function() {
      scrollFunctions();
    });


/*------------------------------------------
  Javascript for initialize text Typer
--------------------------------------------*/

    // initialize text Typer Only in Modern browsers
    if (animation) {

      var text = $('#home .typer-title'),
          textOne = "Full Stack Web Developer",
          textTwo = "Python Programmer",
          textThree = "Enthusiastic Learner";

          if (!!$.prototype.typer) {
            text.typer([textOne,textTwo,textThree]);
          }
    }



});
