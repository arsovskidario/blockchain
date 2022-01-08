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
    $ctr = $(".container"),
    $preFirst = $(".pre-first"),
    $districts = $(".districts");

$.ajax('http://localhost:5000/districts', {
    type: 'GET',
    headers: "Access-Control-Allow-Origin: *",
    async: true,
    crossDomain: true,
    contentType: 'application/json'
}).done(function (data) {
    $districts.empty();
    $.each(data, function (key, value) {
        $districts.append($("<option></option>")
            .attr("value", value.NAME.trim().toLowerCase()).text(value.NAME));
    });
}).fail(function (error) {
    console.log(error);
});

$preFirst.on("click", function (e) {
    $(this).text("Saving...").delay(delay).queue(function () {
        const district = $districts.find(":selected").text();

        $.ajax(`http://localhost:5000/districts/${district}/candidates`, {
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

            $ctr.addClass("center slider-two-active").removeClass("full slider-one-active");
        }).fail(function (error) {
            console.log(error);
        });
    });
    e.preventDefault();
});

$firstButton.on("click", function (e) {
    $(this).text("Saving...").delay(delay).queue(function () {
        $ctr.addClass("second-center slider-three-active").removeClass("center slider-two-active slider-one-active");
    });
    e.preventDefault();
});

$secondButton.on("click", function (e) {
    $(this).text("Saving...").delay(delay).queue(function () {
        $ctr.addClass("full slider-four-active").removeClass("second-center slider-three-active slider-two-active slider-one-active");
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
            'district': $districts.find(":selected").text(),
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
