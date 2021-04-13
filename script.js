$(document).ready(function() {
    var animals = ["dog", "cat", "duck", "sheep", "monkey", "fox", "hedgehog", "bear", "chicken", "cow"];
    var URL = "https://api.giphy.com/v1/gifs/search";
    var API_KEY = "6cUUoiCl43UTZNohQ7yAKffeRSaj7kqy";
    var LIMIT = 10;

    for (var animal of animals)
        $("#animal-buttons").append(`<button class="animal-button" value="${animal}">${animal}</button>`);
    
    $("#add-animal").click(function(event) {
        event.preventDefault();

        var animal = $("#animal-input").val();

        if (validateForm(animal)) {
            $("#animal-input").val("");
            animals.push(animal);
            $("#animal-buttons").append(`<button class="animal-button" value="${animal}">${animal}</button>`);
        }
        else
            alert("Text field is empty");
    });

    $("#animal-buttons").on("click", ".animal-button", function(event) {
        event.preventDefault();
        var animal = $(this).val();

        var request = {
            url: `${URL}?q=${animal}&api_key=${API_KEY}&limit=${LIMIT}`,
            success: function(response) {

                for (var item of response.data) {
                    var rating = item.rating;
                    var data_animate = item.images.fixed_height.url;
                    var data_still = item.images.fixed_height_still.url;
                    var image = `
                    <div class="animal-item">
                        <p>Rating: ${rating}</p>
                        <img src=${data_still} data-still=${data_still} data-animate=${data_animate} class="animal-image still">
                    </div>`
                    $("#animals").append(image);
                }
            },
            error: function() {
                console.log("Error");
            },
        };

        $.ajax(request);
    });

    $("#animals").on("click", ".animal-image", function(event) {
        event.preventDefault();
        var image = $(this);

        if (image.hasClass("still"))
            image.attr("src", image.attr("data-animate"));
        else
            image.attr("src", image.attr("data-still"));

        image.toggleClass("still");
    })
});

function validateForm(value) {
    if (value == "")
        return false;
    else
        return true;
}