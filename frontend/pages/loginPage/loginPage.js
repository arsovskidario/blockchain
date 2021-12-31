const delay = 0;

var $loginButton = $(".login"),
    $password = $(".password");

$loginButton.on("click", function (e) {
    $(this).text("Login...").delay(delay).queue(function () {
        $password = $password.val();
        window.sessionStorage.setItem("password", $password);
        if (window.sessionStorage.getItem("password") === 'SCXy3eYMcPgY2hbG') {
            document.location.href = 'http://127.0.0.1:5500/frontend/pages/votePage/votePage.html?';
        }
    });
    e.preventDefault();
});

if (window.sessionStorage.getItem("password") === 'SCXy3eYMcPgY2hbG') {
    document.location.href = 'http://127.0.0.1:5500/frontend/pages/votePage/votePage.html?';
}
