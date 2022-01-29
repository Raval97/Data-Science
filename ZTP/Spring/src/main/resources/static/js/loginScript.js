$(document).ready(function () {
    $('#signIn').on('click', function (e) {
        $('#logOut_info').hide()
        e.preventDefault();
        $('#wrongPass').hide();
        $.ajax({
            url: '/SimpleLibrarySpring/html/login.html',
            type: 'POST',
            contentType: "application/x-www-form-urlencoded",
            data: $('#loginForm').serialize(),
            success: function (data, status) {
                var response = jQuery.parseJSON(data);
                window.location = "/SimpleLibrarySpring"+response.targetUrl;
            },
            error: function (res, status) {
                $('#wrongPass').show()
            }
        });
    })
    if(window.location.search === "?logout")
        $('#logOut_info').show()
});
