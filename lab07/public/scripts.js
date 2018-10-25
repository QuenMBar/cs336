$( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {

        $.ajax({
            url: "hello",

            type: "GET",

            dataType : "json",
        })
            .done(function( json ) {
                $("<em>", {html: json}).appendTo("body");
            })
            .fail(function( xhr, status, errorThrown ) {
                $("<em>", {html: "no data yet..."}).appendTo("body");
            })

        // $.get( "hello", function( response ) {
        //     if (response.toString().length == 0) {
        //         $("<em>", {html: "no data yet..."}).appendTo("body");
        //     } else {
        //         $("<em>", {html: response}).appendTo("body");
        //     }
        // });
        event.preventDefault();
    } );
} );



