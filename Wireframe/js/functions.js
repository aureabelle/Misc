// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(function (){
	// Make external links open in a window, rel="external" attribute must be included to the link.
	$('a[rel=external]').attr('target', '_blank');
	// -----
	
	// Identify browser type: for use in CSS to avoid using hacks for browser incompatibilities.
	// Inserts a corresponding class for each browser except for IE browsers.
	// --------------------------------------------------------------------------------------------
	var browserType;
	if ($.browser.webkit) {
    browserType = 'webkit';
  }else if ($.browser.opera){
		browserType = 'opera';
	}else if ($.browser.mozilla){
		browserType = 'mozilla';
	}
	
	$('body').addClass(browserType);
	// -----
	


	// Activate the Header Drop-down Menu
	// -------------------------------------
	
	/* Top Menu 
		1. Find the immediate list item (li)
		2. Filter out items that has a list (ul) element
		3. Add the class "nav-with-sub" on the list element (ul) */
		
	$('.top-menu').find('ul:first').find('> li').filter(':has(ul)').addClass('nav-with-sub');
	
	/* Account Menu: Mega menu
		1. Add the class "sub-menu" on the list element with class "account-menu"
		2. Wrap the list element with a div element with class "nav-with-sub"
		3. Insert the "trigger" for the sub-menu */
		
	$('ul.account-menu').addClass('sub-menu').wrap('<div class="nav-with-sub"></div>').before('<a href="#" class="trigger mega-menu-button">My Payza E-wallet</a>');
	
	// Box Table Action Menu
	$('.container .container-action').find('> li').filter(':has(ul)').addClass('nav-with-sub');

	// Menu Tabs with 3-Level Menu
	$('.menu-tabs ul li.selected ul').find('> li').filter(':has(ul)').addClass('nav-with-sub');

	
	// Quick Menu Tabs with 2-Level Menu
	$('.quick-menu-tabs ul').find('> li').filter(':has(ul)').addClass('nav-with-sub');
	

	$('.nav-with-sub').nav();
	$('.sub-menu').hide();




	// Manipulate Mega menu button: this removes the default arrow and replaces with a different type of arrow. 
	$('nav .mega-menu-button').html('<span class="icon-16 icn-arrow-mega-button icon-only"><span class="icn" /><span class="icn-txt">More</span></span><span class="label" title="My Payza E-wallet">My Payza E-wallet</span>');
	// -----
	
	

	// Manipulate Table Row-level Menu
	// ----------------------------------
	$('table .row-action ul').hide();
	$('table tbody tr').mouseenter(function(){
		$(this).find('.row-action ul').show();	
	}).mouseleave(function(){
		$(this).find('.row-action ul').hide();
	});

	
	
	
	
	// Manipulate text with icons and insert ui-icon
	// ------------------------------------------------
	
	var icon16 = $('.icon-16');
	insertIcon(icon16, 'icn', 'icn-txt');

	var flag16 = $('.flag-16');
	insertIcon(flag16, 'icn', 'icn-txt');

	var icon24 = $('.icon-24');
	insertIcon(icon24, 'icn', 'icn-txt');

	var icon36 = $('.icon-36');
	insertIcon(icon36, 'icn', 'icn-txt');

	function insertIcon(icons, icn_class, icn_txt_class) {
			for (var i = 0; i < icons.length; i++) {
					var icn_txt = $(icons[i]).text();
					$(icons[i]).attr('title', icn_txt);
					$(icons[i]).html('<span class="' + icn_class + '"/><span class="' + icn_txt_class + '">' + icn_txt + '</span>');
			}
	}
	// -----


	// Form Elements
	// ------------------
	
	// Help Icon
	/* 
	  1. Place the help icon into the label or span.label 
		2. Give the help icon a "tooltip" behavior */
	var help = $('.field-help');
	for(var h=0; h < help.length; h++){
		var label = $(help[h]).prev();
		label.append( $(help[h]) );
		$(help[h]).find('.icn-help').addClass('tooltip');
	}
	// -----
	
	
	// Call the Tooltip plugin to elements that has the class "tooltip" and abbr tags.
	$('.tooltip, abbr').tooltip();
	// -----
	
	
	// Tabs 
	$('.tabs').tabs();
	// -----
	
	// Accordion
	$('.accordion').accordion();
	// -----
	
	// Simple Show/hide: Check plugin settings for customization.
	/* Sample 1: Takes the default settings for a block of text content.
	   Sample 2: Sample customization for Advanced Search Form fields. */
	$('.sample-text').moreLess();
	$('.dispute-search').moreLess({
		'minHeight': '78px',
		'textMore': 'Show Advanced Search',
		'textLess': 'Hide Advanced Search',
		'titleMore': 'Show Advanced Search',
		'titleLess': 'Hide Advanced Search'
	});
	// -----
	
	// Modal Box: Local Content
	/* Sample 1: Retrieves local content using the content ID.*/
	$('.sample-modal').modal({'triggerText': 'Click me!'});
	$('.sample-external').modal({'isAjax': true});
	// -----
	
	
	// Notable
	/* Sample 1: Default behavior 
	   Sample 2: Open on page load
	   Sample 3: Notably in form field */
	$('.sample-notable-default').notably({
		'contentContainer': $('.notable-default')
	});
	
	$('.sample-notable-open').notably({
		'isOpen': true,
		'contentContainer': $('.notable-open')
	});
	
	var info = $('.field-notably');
	for (var n = 0; n < info.length; n++){
		var label = $(info[n]).parent().find('label, .field-label');
		label.append('<span class="icon-16 icn-info icon-only" title="Note"><span class="icn"></span><span class="icn-txt">Note</span></span>');
		
		label.find('.icn-info').notably({
			'contentContainer': $(info[n])
		});
		
		
		
	}
	// -----
	
	
	// Fancy Cell
	$('#with_line_numbers').fancyTable();
	
	$('#without_line_numbers').fancyTable({
		'lineNumbers': false
	});
	// ----
	
	
	
	
});


/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/




/* -----------------
	 Custom Plugins
	------------------*/ 

(function($){
	
// Navigation with sub-menu
// ---------------------------
	$.fn.nav = function (){
		var $item = $(this), $trigger = $item.find('> a').addClass('trigger'), $subMenu = $item.find('> ul').addClass('sub-menu');
		
		// Inserts an arrow if sub-menu exists
		if ( $item.find('ul') ){
			$trigger.append('<span class="icon-16 icn-arrow icon-only"><span class="icn" /><span class="icn-txt">More</span></span>');
		}
		
		return this.each(function(){
			var $menu = $(this).find('.sub-menu'), $link = $(this).find('.trigger');
			
			$link.click(function(event){event.preventDefault();});
			
			$(this).mouseenter(function(){
				$menu.show();
				$link.addClass('selected');
			}).mouseleave(function(){
				$menu.hide();
				$link.removeClass('selected');
			});
			
		});
		return false;
	};
// -----


// Tabs
// -------
	$.fn.tabs = function(){
		return this.each(function(){
			/* 1. Select the first tab link and tab panel.*/
			var tabPanels = $('div.tabs .tabs-panel');
			tabPanels.hide().filter(':first').show();
			$('div.tabs ul.tabs-navigation li').filter(':first').addClass('selected');
			
			/* 2. Set the click function of the tab link. 
				 3. Select the first tab. */
			$('div.tabs ul.tabs-navigation a').click(function(){
				tabPanels.hide();
				tabPanels.filter(this.hash).show();
				
				$('div.tabs ul.tabs-navigation li').removeClass('selected');
				$(this).parent('li').addClass('selected');
				return false;
			}).filter(':first').click();
		});
	};
// -----	



// Accordion
// ------------
	$.fn.accordion = function(){
		var container = $(this);
		
		// Find the first panel and select, hide the other panel's content
		for(var c=0; c<container.length; c++){
			$(container[c]).find('.accordion-content').hide().filter(':first').show();
			$(container[c]).find('.accordion-panel').filter(':first').addClass('selected');
		}
		
		return this.each(function(){
			
			$(this).find('h5').click(function(){
				var $panel = $(this).parent(), $content = $panel.find('.accordion-content');
				
				if( $panel.hasClass('selected')){
					$panel.removeClass('selected');
					$content.slideUp(500, function(){
						$(this).animate({opacity: '0'}, 500);
					});
				}else{
					// Find all the panels and content and hide
					$(this).parent().parent().find('.accordion-panel').removeClass('selected');
					$(this).parent().parent().find('.accordion-content').slideUp(500, function(){
						$(this).animate({opacity: '0'}, 500);
					});
					
					// Select the panel and show its content
					$panel.addClass('selected');
					$content.slideDown(500, function(){
						$(this).animate({opacity: '1'}, 500);
					});
				}
				
			});
		});
	};
// -----	


// Simple Show / Hide
// ---------------------
	$.fn.moreLess = function(options){
		//Defaults
		var settings = {
				'minHeight': '105px',     // The height of the box when content is clipped.
				'textMore': 'Show more',  // Text when box content is collapsed.
				'textLess': 'Show less',  // Text when box content is expanded.
				'titleMore': 'Show more', // Title attribute of the collapsed icon.
				'titleLess': 'Show Less', // Title attribute of the expanded icon.
				'iconMore': 'icn-arrow-right-dark',    // Icon for collapsed.
				'iconLess': 'icn-arrow-up-dark'    // Icon for expanded.
		};

		if (options) {
			$.extend(settings, options);
		}
		
		// Wrap the block in div with class more-less-wrapper and insert the toggler
		$(this).wrap('<div class="more-less-wrapper"></div>');
		$(this).parent().append('<a class="icon-16 '+ settings.iconMore +' more-less-toggler" title="' + settings.titleMore + '"><span class="icn" /><span class="icn-txt">' + settings.textMore + '</span></a>');	
	
		
		return this.each(function(){
			var $clipped = $(this), $wrapper = $clipped.parent(), $toggler = $(this).next();
			// Adjust the height and the overflow of the clipped content
			$clipped.addClass('more-less-clip').css({'height': settings.minHeight}).addClass('toggle');
			
			$toggler.click(function(){
				if( $clipped.hasClass('toggle') ){
					$clipped.removeClass('toggle').css({'height': 'auto'});
					$(this).removeClass(settings.iconMore).addClass(settings.iconLess).attr('title', settings.titleLess);
					$(this).find('.icn-txt').text(settings.textLess);
				}else{
					$clipped.addClass('toggle').stop().animate({height: settings.minHeight}, 500);
					$(this).removeClass(settings.iconLess).addClass(settings.iconMore).attr('title', settings.titleMore);
					$(this).find('.icn-txt').text(settings.textMore);
				}
				
			});
			
		});
	};



// Tooltip
// ----------
	$.fn.tooltip =  function(){
		return this.each(function(){
			var txt = $(this).attr('title');
			
			$(this).mouseover(function(){
				var position = $(this).offset(), top = position.top+20, left = position.left+20;
				/* 1. Create the tooltip box and insert into the body tag.
					 2. Insert the text in the box. 
					 3. Position the box in the document 
					 4. Remove the value of the title attribute to keep it from showing. */
				$('body').append('<div class="tip-box"></div>');
				$('.tip-box').text(txt).css({'top': top, 'left': left });
				$(this).attr('title', '');
			}).mouseout(function(){
				/* 1. Remove the tip-box in the body. 
					 2. Put back the value of the title attribute so that it can be retrieved again in the next mouse over. */
				$('.tip-box').remove();
				$(this).attr('title', txt);
			}).mousemove(function(event){
				var top = event.pageX+20, left = event.pageY+20;
				$('.tip-box').css({'top': left, 'left': top });
			});
							
		});
	};
// -----



// Modal Box
// ------------
	$.fn.modal = function(options){
		
		// Defaults
		var settings = {
			'width': 400, 									// Default width of the modal box.
			'height': 400,									// Default height of the modal box
			'isAjax': false, 								// Default "false" if content is coming from an ID on the page, set to "true" if the content is retrieved via ajax.
			'triggerText': 'Click here', 		// Default text for the trigger button: use for 
			'triggerClass': 'box-trigger', 	// Default class for the the trigger
			'closeTxt': 'Close'							// Default text of the close button
		};
		
		if (options) {
			$.extend(settings, options);
		}
				
		
				
		return this.each(function(){
			
			if ( settings.isAjax ){
			// If the content is retrieved via ajax
				$(this).click(function(event){
					event.preventDefault();
				
					var url = $(this).attr('href');
					$.ajax({
						type: 'get',
						url: url,
						success: function(data,textStatus, jqXHR){
							var content = jqXHR.responseText;
							
							// Create the box
							createBox(content, settings.width, settings.height, settings.closeTxt);
						}
					});
				
				});
				
									
			}else{
			// If the content is from the same page using ID	
			var content = $(this).html();
			
			// Create the trigger and hide the content from the view
				$(this).before('<a class="btn-link '+ settings.triggerClass +'">'+ settings.triggerText +'</a>').hide();
				
				$('.'+settings.triggerClass).click(function(){
					// Create the box
					createBox(content, settings.width, settings.height, settings.closeTxt);
				});
			
				// If window is resized, adjust the width and the height of the modal backdrop
				$(window).resize(function(){
					var winWidth = $(window).width(), winHeight = $(window).height();
					$('.modal-backdrop').css({'width':winWidth+'px', 'height':winHeight+'px'});
				});
				
			
			}
		});
		
		function createBox(content, boxWidth, boxHeight, closeTxt){
			var w = $(window).width(), 
			h = $(window).height(), 
			marginLeft = boxWidth/2, 
			marginTop = boxHeight/2;
			
			$('body').append('<div class="modal-backdrop"></div><div class="modal-box"><div class="modal-content"><a class="icon-16 icn-close icon-only close-box" title="'+ closeTxt +'"><span class="icn" /><span class="icn-txt">'+ closeTxt +'</span></a>'+ content +'</div></div>');
			$('.modal-backdrop').css({'width':w+'px', 'height':h+'px'});
			$('.modal-box').css({'width':boxWidth, 'height':boxHeight, 'margin-left':'-'+marginLeft+'px', 'margin-top':'-'+marginTop+'px'});
			
			// Close Box: Set for the close button and modal backdrop on click.
			$('.modal-backdrop, .close-box').click(function(){closeBox();});
		}
		
		function closeBox(){
			$('.modal-backdrop, .modal-box').remove();
		}
		
	};
// -----



// Notably
// ----------
	$.fn.notably = function(options){
	
		// Defaults
		var settings = {
			'isOpen': false,			                // Set to true if notably should be open on page load.
			'contentContainer': $('.notable-content')		// The class of the element containing the content of notable. This must be unique if there are multiple instances of notably on the page.
		};
		
		if (options) {
			$.extend(settings, options);
		}
		
		// Hide the container containing content
		$(settings.contentContainer).hide();
		
		return this.each(function(){
			var content = $(settings.contentContainer).html(),
				position = $(this).offset(), top = position.top - 15, left = position.left - 238,
				viewHeight = $(document).height(), viewWidth = $(document).width();
			
			// Check whether the notable box is open or close when initiated
			if( settings.isOpen ){
				createBox(content);
				
				$('.notably-backdrop').click(function(){
					removeBox(this, $('.notably-box'));
				});
				
				initiate (this, content);
				
			}else{
				initiate (this, content);
			}
			
			// Put the elements together and position on the page
			function createBox (content) {
				// Insert a backdrop to the body
				$('body').append('<div class="notably-backdrop"></div>');
				$('.notably-backdrop').css({ 'height': viewHeight + 'px', 'width': viewWidth + 'px' });
				
				// Insert the box in to the body
				$('body').append('<div class="notably-box"><div class="notably-content"></div></div>');
				
				// Position the box and insert content
				$('.notably-box').css({ 'top': top, 'left': left });
				$('.notably-box .notably-content').html(content);
				
				// Include an arrow and display hidden content
				$('.notably-box').prepend('<span class="up-arrow"></span>');
			}
			
			// Remove box into the DOM
            function removeBox (backdrop, box) {
                $(backdrop).remove();
                $(box).remove();
            }
			
			// Display the box when the element is clicked
			function initiate (el, content) {
				$(el).click(function(){
					createBox(content);
					
					$('.notably-backdrop').click(function(){
						removeBox(this, $('.notably-box'));
					});
				});
			}

		
		});
	
	
	};
// -----




// Fancy Table 
	$.fn.fancyTable = function(options){
		// Defaults
		var settings = {
			'lineNumbers': true			// Default true, inserts line numbers to each row
		};
		
		if (options) {
			$.extend(settings, options);
		}
		
		
		var table = $(this),
			columnCount = table.find('tr:first').children().length;
			
			
		// Check if line numbers is set to true
		if(settings.lineNumbers){
			// Insert line numbers 
			table.find('tr').each(function(i){
				
				var lineCell = $(this).children(':first-child').clone();
				$(this).prepend(lineCell);
				
				lineCell.text(function(){
					if(i === 0){
						return '';
					}else{
						return i;
					}
				});					
			});
			
			var cells = table.find('tr').find('th, td').not(':first-child'),
				lineNumberWidth = table.find('tr').find('th, td').first().outerWidth(),
				width = parseFloat( (table.width() - lineNumberWidth) / columnCount ) - 16; // 16 is the total cell left and right padding
				
				
				
			
			set(cells, width);
			
			
			
			
			
		}else{
			
			cells = table.find('tr').find('th, td'),
			width = parseFloat( table.width() / columnCount ) - 16; // 16 is the total cell left and right padding
			
			set(cells, width);
		}
		
		function set(c, w){
			c.each(function(){
				$(this).css({'padding': '0'});
				$(this).wrapInner('<div class="fancified"><span class="cell">');
				$(this).find('.fancified').css({'width': w+'px'});
				$(this).find('.cell').css({'width': 'auto'});
				
				if ($(this).find('.cell').outerWidth() > w){
					$(this).find('.cell').css({'width': w+'px'});
				
					$(this).find('.cell').mouseover(function(){
						$(this).parent().addClass('revealed');
						$(this).css({'width': 'auto'});
					}).mouseout(function(){
						$(this).parent().removeClass('revealed');
						$(this).css({'width': w+'px'});
					});
				
				}
			});
			
			
			
			
		}
		
		
		
		
		
	};
// -----



	
})(jQuery);
	
	