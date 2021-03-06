/* 1. Search */

var UI = {};

//Create an object called UI.EnterPress that will be a function -> when enter is pressed, it will submit search and pull new data
 
 UI.EnterPress = function(inputValue) {
 	document.querySelector('.input-search').addEventListener('keyup', function (e){
 		
 		if (e.which === 13) {
 			var searchResults = document.querySelector('.js-search-results');
 			searchResults.innerHTML = "";

 			var userInput = getUserInput();
 			SoundCloudAPI.getTrack( userInput );

 			console.log(userInput);
 		}

 	});
 }

UI.EnterPress();

//Create a second object called SubmitClick that performs same function as the first

UI.SubmitClick = function(inputValue) {
	document.querySelector('.js-submit').addEventListener('click', function(){
		
		var searchResults = document.querySelector('.js-search-results');
 			searchResults.innerHTML = "";

 			var userInput = getUserInput();
 			SoundCloudAPI.getTrack( userInput );

 			console.log(userInput);
	
	});
}

UI.SubmitClick();

//Created function for grabbing the input value
function getUserInput() {
	var inputValue = document.querySelector('.input-search').value;

	return inputValue;
}



/* 2. Query Soundcloud API */


var SoundCloudAPI = {};

SoundCloudAPI.init = function() {
	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {

	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudAPI.renderTracks(tracks);
	});

}

SoundCloudAPI.getTrack("City and Colour");

/* 3. Display the cards */
SoundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track){

		//card
		var card = document.createElement('div');
		card.classList.add('card');


		//image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

		imageDiv.appendChild(image_img);


		//content
		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

		//button
		var button = document.createElement('div');
		button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to Playlist';

		//appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			SoundCloudAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);

	});


}

SoundCloudAPI.getEmbed = function(trackURL) {

	SC.oEmbed(trackURL, {
	  auto_play: true
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);
	  
	  var sideBar = document.querySelector('.js-playlist');
	  

	  var box = document.createElement('div');
	  box.innerHTML = embed.html;

	  sideBar.insertBefore(box, sideBar.firstChild);
	  localStorage.setItem("key", sideBar.innerHTML);

	});
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");

document.querySelector('.js-button').addEventListener('click', function() {
	
	localStorage.clear();
	sideBar.innerHTML = "";
	
});













