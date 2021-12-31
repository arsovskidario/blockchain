const delay = 0;

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

$.ajax('http://localhost:5000/elections/candidates', {
    type: 'GET',
    headers: "Access-Control-Allow-Origin: *",
    async: true,
    crossDomain: true,
    contentType: 'application/json'
}).done(function (data) {
    $candidate.empty();
    $.each(data, function (key, value) {
        $candidate.append($("<option></option>")
            .attr("value", value.trim().toLowerCase()).text(value));
    });
}).fail(function (error) {
    console.log(error);
});


$firstButton.on("click", function (e) {
    $(this).text("Saving...").delay(delay).queue(function () {
        $ctr.addClass("center slider-two-active").removeClass("full slider-one-active");
    });
    e.preventDefault();
});

$secondButton.on("click", function (e) {
    $(this).text("Saving...").delay(delay).queue(function () {
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
        var data = {
            'voter': $name,
            'candidate': $candidate.find(":selected").text(),
        };

        $.ajax('http://localhost:5000/elections/vote', {
            type: 'PUT',
            data: JSON.stringify(data),
            headers: "Access-Control-Allow-Origin: *",
            async: true,
            crossDomain: true,
            contentType: 'application/json'
        }).done(function () {
            alert("Successful Vote! Brao suvesten si!!");
        }).fail(function () {
            alert("Wrong UCN or candidate!");
            document.location.reload(true);
        });
    });
})
