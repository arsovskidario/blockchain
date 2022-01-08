const delay = 0;
console.log(window.sessionStorage.getItem("password"))

var $submitButton = $(".submit"),
    $region = $(".region"),
    $voters = $(".voters");

$submitButton.on("click", function (e) {
    $(this).text("Login...").delay(delay).queue(function () {
        $region = $region.val();
        $voters = $voters.val();

        $voters = $voters.split(',').map(x => x.trim());

        var data = {
            'voters': $voters,
            'region': $region,
        };
        $.ajax('http://localhost:5000/districts', {
            type: 'POST',
            data: JSON.stringify(data),
            headers: "Access-Control-Allow-Origin: *",
            async: true,
            crossDomain: true,
            contentType: 'application/json'
        }).done(function (data) {
            alert("Successful Registration of District!");
        }).fail(function () {
            alert("Something went wrong!");
        });
    });
    e.preventDefault();
});

if (window.sessionStorage.getItem("password") !== 'SCXy3eYMcPgY2hbG') {
    document.location.href = 'http://127.0.0.1:5500/frontend/pages/votePage/votePage.html?';
}
