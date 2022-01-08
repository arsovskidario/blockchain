const delay = 0;
console.log(window.sessionStorage.getItem("password"))

var $submitButton = $(".submit"),
    $districts = $(".districts"),
    $results = $("results-list");

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

$submitButton.on("click", function (e) {
    $(this).text("Login...").delay(delay).queue(function () {
        districts = $districts.find(":selected").text();

        $.ajax(`http://localhost:5000/districts/${districts}/winner`, {
            type: 'GET',
            headers: "Access-Control-Allow-Origin: *",
            async: true,
            crossDomain: true,
            contentType: 'application/json'
        }).done(function (data) {

            data.sort((a, b) => {
                return b.count - a.count;
            })

            const max = data.reduce((acc, i) => acc + i.count, 0);
            const listValues = data.reduce((acc, i) => acc + `<li>${i.name} - ${i.count !== 0 ? (parseFloat(i.count)/parseFloat(max)) * 100 : 0}%</li>`, '');

            $('ul').html(listValues);
            
            console.log(data, listValues)
        }).fail(function () {
            alert("Something went wrong!");
        });
    });
    e.preventDefault();
});

if (window.sessionStorage.getItem("password") !== 'SCXy3eYMcPgY2hbG') {
    document.location.href = 'http://127.0.0.1:5500/frontend/pages/votePage/votePage.html?';
}
