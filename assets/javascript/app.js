// create array of topics
var topics = ["ric flair", "macho man", "hulk hogan", "the rock",];

// create function that makes Buttons
function buttonGenerator() {
  $('#button-view').empty();
  for (var i = 0; i < topics.length; i++) {
    var topicsButton = $('<button>').text(topics[i]);
    $('#button-view').append(topicsButton);
  }
}

// when topics button is clicked
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
$("button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=1";

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
      topicImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(topicImage);

      $("#gif-view").prepend(gifDiv);
      }
    });
    });
