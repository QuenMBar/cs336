// magic.js
$(document).ready(function() {

    // process the form
    $('#addNewData').submit(function(event) {
        event.preventDefault();
        let form = $(this);
        $.ajax({
            type: 'POST',
            url: '/people',
            data: form.serialize(),
            dataType: 'json',
        }).done(function (resp) {
            var response = resp.content;
            $("#responseHere").html(response)
        })
            .fail(function (xhr, status, errorThrown) {
                $("#responseHere").html("ERROR: " + errorThrown)
            })
    });

    $('#getData').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        $.ajax({
            type: 'POST',
            url: '/getPeople',
            data: {
                getId: $("#getId").val()
            },
        })
            .done(function (resp) {
                person = JSON.parse(resp.person);
                $("#firstNameGet").html('First name: ' + person.myfirstName)
                $("#lastNameGet").html('Last name: ' + person.mylastName)
                $("#IDGet").html("ID: " + person.myloginID)
                $("#StartDateGet").html('Start Date: ' + person.mystartDate)
            })
            .fail(function (xhr, status, errorThrown) {
                $("#firstNameGet").html('Error: ' + errorThrown)
                $("#lastNameGet").html('')
                $("#IDGet").html('')
                $("#StartDateGet").html('')
            })
    });
});