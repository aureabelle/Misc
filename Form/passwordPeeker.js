(function( $ ){
	
	$.fn.passwordPeeker = function( options ){
		var defaults = {},
			settings = $.extend( {}, defaults, options ),
			passwordEl = this;
		 
		 // Inserts the trigger to each field
		 passwordEl.each(function(i){
			var peekerTrigger = '<input type="text" id="reflector_'+ i +'" />'+
								'<div class="password-peeker">'+
									'<input type="checkbox" id="show-pass_'+ i +'" />'+
									'<label for="show-pass_'+ i +'">Show password</label>'
								'</div>';
							
			$(this).parent().append(peekerTrigger);
		 });
		
		return this.each(function(){
			var el = this,
				passTxt = $(el).val(),
				reveal = $(el).next().hide(),
				displayTrigger = $(el).parent().find('.password-peeker').find('input[type="checkbox"]');
			
			// Displays / hides the password or text field
			$(displayTrigger).click(function(){
				if($(this).is(':checked')){
					$(reveal).show();
					$(el).hide();
				}else{
					$(el).show();
					$(reveal).hide();
				}
			});
			
			$(this).keyup(function(){
				var passTxt = $(this).val(),
					reveal = $(this).next();
			
				$(reveal).val(passTxt);
			});
			
			$(reveal).keyup(function(){
				var revealTxt = $(this).val(),
					passField = $(this).prev();
					
				$(passField).val(revealTxt);
			});
			
		});
		
	};

}(jQuery));