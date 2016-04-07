function mastheadImages() {
	var i = 0;

	// sets up images to be rotated
	$imageEl = $('.toggle-image');

	// setInterval method will call images with specific intervals
	setInterval(function () {
		// Gets image items - If at end of index, go back to the beginning.
		i = i + 1 < $imageEl.length ? i + 1 : 0;
		// Show next image - eq is the equal selector
		$imageEl.eq(i).addClass('show');
		// Hides the previous image
		$imageEl.eq(i - 1).removeClass('show');

	}, 4000);
};

// calling function
$(function () {
	mastheadImages();
});
