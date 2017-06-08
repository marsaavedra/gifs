        
        var heroes =  ["harry potter", "John Snow", "Wonder Woman", "Mulan", "Yoda", "dumbledore", "superman", "hamilton", "beyonce", "elon musk", "michelle obama", "oprah"];
    
        
       
        
    function buttonArrays (){
            $('.buttons').empty();
        //create a for loop thats appends a button for each string in the array
        for (var i =0; i < heroes.length; i++ ) {
            var theButton = $('<button>' +heroes[i]+ '</button>');
            theButton.addClass('heroeClass');
            theButton.attr('data-search', heroes[i]);
            $('.buttons').append(theButton);
            
        
        }
    };
    
  
         //search bar input
        $("#heroeButton").on("click", function(event) {
            event.preventDefault();
            var addHeroe = $("#heroeInput").val();
            heroes.push(addHeroe);
            buttonArrays ();
        });
  
       
       buttonArrays ();
        
        
    function displayHeroeInfo() {
        
        var type = $(this).data('search');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +type+ '&api_key=dc6zaTOxFJmzC&limit=10';
        console.log(queryURL);
        $.ajax({
           url: queryURL, 
            method: 'GET',
        }).done(function(response) {
            console.log(response);
 
            
            
            for(var i=0; i<response.data.length; i++) {
                
                var stillImage = response.data[i].images.fixed_height_still.url;
                var animatedImage = response.data[i].images.fixed_height.url;
                var heroeImage = $('<img>');
                heroeImage.attr('src', animatedImage);
                heroeImage.attr('data-still', stillImage);
                heroeImage.attr('data-animate', animatedImage);
                heroeImage.attr('data-state', 'still' );
               
                heroeImage.addClass('heroeImage');
                
                var heroeIsStill = false;
                
                
                //this is for the raitings
                var newDiv = $("<div class='imageDiv'>");
                var para = $('<p>');
                var rating = response.data[i].rating;
                
                heroeImage.appendTo(newDiv);
                para.html("Rating: " + rating);
                para.appendTo(newDiv);
                
                $(".gifs").prepend(newDiv);
                
                
            
           
              } 
            $('.heroeImage').on('click', function () {
                var state = $(this).attr('data-state');

                if(state === 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');


                }else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');

                }
                    
                });
           
            })
        };
        
        $(document).on("click", ".heroeClass", displayHeroeInfo);