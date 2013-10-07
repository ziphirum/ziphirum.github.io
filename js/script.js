// jQuery Quicksand project categories filtering
// Thanks to Sacha Greif - http://www.sachagreif.com/


jQuery(document).ready(function($){
 	// Clone applications to get a second collection
	var $data = $(".portfolio-grid").clone();
	
	//NOTE: Only filter on the main portfolio page, not on the subcategory pages
	$('.filter li').click(function(e) {
		$(".filter li a").removeClass("active");	
		// Use the last category class as the category to filter by. This means that multiple categories are not supported (yet)
		var filterClass=$(this).attr('class').split(' ').slice(-1)[0];
		
		if (filterClass == 'all-projects') {
			var $filteredData = $data.find('.project');
		} else {
			var $filteredData = $data.find('.project[data-type=' + filterClass + ']');
		}
		
		$(".portfolio-grid").quicksand($filteredData, {
			duration: 400,
			easing: 'swing'
		});		
		
		$(this.children).addClass("active"); 			
		return false;
	});
});

			function clickFocus(input){
				if (input.value == input.defaultValue){
				input.value = '';
				}
			};

			function unFocus(input){
				if (input.value == ''){
				input.value = input.defaultValue;
				}
			};

var targetDateStr = "Oct 18, 2013";
		// set the date we're counting down to
		var target_date = new Date(targetDateStr).getTime();
		// variables for time units
		var days, hours, minutes, seconds;
		// get tag element
		var countdown = document.getElementById("countdown");
		// update the tag with id "countdown" every 1 second
		setInterval(function () {
		    // find the amount of "seconds" between now and target
		    var current_date = new Date().getTime();
		    var seconds_left = (target_date - current_date) / 1000;
		    // do some time calculations
		    days = parseInt(seconds_left / 86400);
		    seconds_left = seconds_left % 86400;
		     
		    hours = parseInt(seconds_left / 3600);
		    seconds_left = seconds_left % 3600;
		     
		    minutes = parseInt(seconds_left / 60);
		    seconds = parseInt(seconds_left % 60);
		    
			if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
			   countdown.innerHTML = "";
			} else {
			    // format countdown string + set tag value
			    countdown.innerHTML = "<span class='span-timeout'>" + days + "</span> DAYS,  <span class='span-timeout'>" + hours + "</span> HOURS,<span class='span-timeout'> "
			    + minutes + "</span> MINS, <span class='span-timeout'>" + seconds + " </span> SECS";
			}
		}, 1000);