//pre-existing list of animals or gif options
var fluffies = ["kittens" , "puppies" , "bunnies" , "marmosets" , "chickens"];


//function to render the newly appearing GIFs 
function displayGiphyContent () {

		var fluffy = $(this).attr("data-name");
		var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + fluffy + "&api_key=mekLBxjBrHqj4ZWGlvKnh07goq1vpAiL&limit=10";
		var imgPlaying = true;

	//AJAX call to giphy for the specific button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		//The thing that ajax will be pulling
		//appends the ten gifs, the ratings, within the gifsForDays div
		var results = response.data;

		//loops through each of the 10 items in pulled by the giphy API
		for (var i = 0; i < results.length; i++) {
			//creates a div with class "newItem" for each gif and rating
			var giphyDiv = $("<div class='newItem'>");
			//assigns a variable with the value of the rating
			var rating = results[i].rating;
			//makes a p tag to place the rating into
			var p = $("<p>").text("This GIF is rated: " + rating);
			//makes an img tag to place the image into
			var gifImage = $("<img>");
			//changes imgPlaying to paused if image is clicked, since default is true
			gifImage.on("click", function(){
				if (imgPlaying = true) {
					imgPlaying = false;
				}
				else {
					imgPlaying = true;
				}
				console.log(imgPlaying);
			});
			//gives the above img tag a src attribute to a specific one of the API's gif
			gifImage.attr("src", results[i].images.fixed_height.url);

			//prepends the rating and then the image below it
			giphyDiv.prepend(gifImage);
			giphyDiv.prepend(p);

			$("#gifsForDays").prepend(giphyDiv);

		}
	});
};

// finction for displaying the buttons
function renderButtons() {
	//deletes the area to prevent duplicates
	$("#buttonsArea").empty();
	//loops through existing array of fluffies
	for (var i = 0; i < fluffies.length; i++) {
		//dynamically generates a button for each item in fluffies array
		var btn = $("<button>");
		//adds a new class of 'newSubject' to each button
		btn.addClass("newSubject");
		//adds a data attribute to each data-name based on the item in the array
		btn.attr("data-name", fluffies[i]);
		//adds the initial button text
		btn.text(fluffies[i]);
		// Adds the button to the button area in the html
		$("#buttonsArea").append(btn);
	};
};

//handles events when the add button is clicked
$("#addButton").on("click", function(event) {
	event.preventDefault();
	//grabs input from the textbox and assigns it to a variable
	var newText = $("#buttonInput").val().trim();
	//pushes this new text to our array as a new item
	fluffies.push(newText);
	//clears the textbox for the next entry
	$("#buttonInput").empty();
	//calls on function that renders the items in the array into buttons
	renderButtons();
});

//adds an event handler that calls all elements with a class of newSubject
$(document).on("click", ".newSubject", displayGiphyContent);
//calling the renderButtons function to display the initial buttons from the fluffies array
renderButtons();

//clearPage button
$("#clearPage").on("click", function() {
	$("#gifsForDays").empty();
});