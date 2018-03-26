// create array of topics
var topics = ["Astronaut", "Race Car Driver", "Superhero", "Ninja", "Princess", "Doctor", "Firefighter", "Jedi"];

// create function that makes Buttons
function buttonGenerator() {
  $('#button-view').empty();
  for (var i = 0; i < topics.length; i++) {
    var topicsButton = $('<button>').text(topics[i]);
    topicsButton.attr("data-person", topics[i]);
    $('#button-view').append(topicsButton);
  }
}

// when topics button is clicked
$(document).ready(function () {

$('#topic-button').on('click', function(event) {
  event.preventDefault();

  var userInput = $('#user-topic').val();
  topics.push(userInput);
  buttonGenerator();
  $('#user-topic').val('');
  console.log(userInput);
  console.log(topics);
});

buttonGenerator();

// when the buttons are clicked, generate a gif
$("body").on("click", 'button', function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=1";
    console.log(queryURL);
    console.log("Person: ", person);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
          var results = response.data;
          console.log(results);

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var topicImage = $("<img>");
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      // add data attribute to make gif image still
      topicImage.attr("data-still",results[i].images.fixed_height_still.url);
      // add data attribute to animate gif image
      topicImage.attr("data-animate",results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");

      gifDiv.prepend(p);
      gifDiv.prepend(topicImage);

      $("#gif-view").prepend(gifDiv);
      }
    });
    });
  });

  // pause gifs when gif is clicked
  // $('#document').on('click', 'img', function() {
  $(document).on('click', 'img', function() {
    var state = $(this).attr('data-state');

    if (state == 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }

  })
