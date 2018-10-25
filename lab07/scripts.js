$( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
        $("<em>", {html: "no data yet..."}).appendTo("body");
        event.preventDefault();
    } );
} );

