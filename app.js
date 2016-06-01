#!/usr/bin/env node

/*
Hasselhoffinator
by @ demiurgosoft <demiurgosoft@hotmail.com>
Easy Hasselhoff attacks
Licensed under GPL-V3.0
*/

var wallpaper = require('wallpaper');
var commander = require('commander');
var fs = require('fs');

var config = require('./config.js');
var rsc = __dirname+"/"+config.resourcesDir;
var wp = config.wallpapers;

var version=process.env.npm_package_version || "0.2.3";

function hasselhoff(done, image) {
    var img = image || wp.hasselhoff;
    storeCurrent(function() {
        wallpaper.set(rsc + img).then(done);
    });
}

function restore(done) {
    if (!done) done = function() {};
    fs.readFile(__dirname+'/data.json', 'utf-8', function(err, data) {
        if (err) return done(err);
        if (!data) return done(new Error("Data read problem"));
        var obj = JSON.parse(data);
        if (!obj || !obj.previous) return done(new Error("Error in object"));
        wallpaper.set(obj.previous).then(done);
    });
}

function storeCurrent(done) {
    wallpaper.get().then(function(imgpath) {
        var conf = {
            previous: imgpath
        };
        fs.writeFile(__dirname+'/data.json', JSON.stringify(conf), done);
    });
}

commander.version(version)
    .usage('[options]')
    .description("Hasselhoff attacks taken to a new level")
    .option('-r, --restore', 'Restores to previous version before attack')
    .option('-k, --koala', 'Koalified attack')
    .parse(process.argv);

	if (commander.restore) restore(function(err){
		if(err) console.log(err);
	});
	else{
		var image=wp.hasselhoff;
		if(commander.koala) image=wp.koala;
		hasselhoff(function(err){
			if(err) console.log(err);
		},image);
	}
