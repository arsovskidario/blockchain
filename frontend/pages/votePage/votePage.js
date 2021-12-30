
var $firstButton = $(".first"),
    $secondButton = $(".second"),
    $thirdButton = $(".third"),
    $input = $("input"),
    $name = $(".name"),
    $more = $(".more"),
    $candidate = $(".candidate"),
    $UCN = $(".UCN"),
    $choice = $(".choice"),
    $reset = $(".reset"),
    $ctr = $(".container");

$.ajax('http://localhost:5000/districts', {
    type: 'GET',
    headers: "Access-Control-Allow-Origin: *",
    async: true,
    crossDomain: true,
    contentType: 'application/json'
}).done(function (data) {
    $candidate.empty();
    $.each(data, function (key, value) {
        $candidate.append($("<option></option>")
            .attr("value", value.address).text(value.name));
    });
}).fail(function (error) {
    console.log(error);
});


$firstButton.on("click", function (e) {
    $(this).text("Saving...").delay(900).queue(function () {
        $ctr.addClass("center slider-two-active").removeClass("full slider-one-active");
    });
    e.preventDefault();
});

$secondButton.on("click", function (e) {
    $(this).text("Saving...").delay(900).queue(function () {
        $ctr.addClass("full slider-three-active").removeClass("center slider-two-active slider-one-active");
        $name = $name.val();
        if ($name == "") {
            $UCN.html("Anonymous!");
        }
        else { $UCN.html($name + "!"); }

        console.log($candidate.find(":selected").val());

        if ($candidate == "") {
            $choice.html("Anonymous!");
        }
        else { $choice.html($candidate.find(":selected").text() + "!"); }
    });
    e.preventDefault();
});

$thirdButton.on("click", function (e) {
    $(this).text("Saving...").queue(function () {
        console.log('Fetching.....')
    });
})
