const wallpaper = require('wallpaper');

wallpaper.get().then(imagePath => {
	 console.log(imagePath);
	wallpaper.set('./resources/hasselhoff.jpg').then(() => {
	    console.log('done');
		wallpaper.get().then(imagePath => {
		    console.log(imagePath);
		});
	});
});


