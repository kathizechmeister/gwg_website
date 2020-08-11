$('.carousel').carousel({
    interval: false,
});


/**
 * Lightbox*
 **/
/**
 $(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});**/


/****Read more Filter****/


/*
function extendFilterBezirk() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("alleBezirksfilter");
    var btnText = document.getElementById("bezirksbutton");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Mehr anzeigen";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Weniger anzeigen";
        moreText.style.display = "inline";
    }
}

/***Range Slider***
$('#multi').mdbRange({
    width: '100%',
    direction: 'vertical',
    value: {
        min: 0,
        max: 100,
    },
    single: {
        active: true,
        value: {
            step: 1,
            symbol: ''
        },
        counting: false,
        countingTarget: null,
        bgThumbColor: '#4285F4',
        textThumbColor: '#fff',
        multi: {
            active: true,
            value: {
                step: 1,
                symbol: ''
            },
            counting: false,
            rangeLength: 2,
            countingTarget: null,
            bgThumbColor: '#4285F4',
            textThumbColor: '#fff'
        },
    }
});
$('#multi').mdbRange({
    single: {
        active: true,
        multi: {
            active: true,
            rangeLength: 1
        },
    }
});



/***Range***
$("#slider-range").slider({
    range: true,
    min: 0,
    max: 3500,
    step: 50,
    slide: function( event, ui ) {
        $( "#min-price").html(ui.values[ 0 ]);

        console.log(ui.values[0])

        suffix = '';
        if (ui.values[ 1 ] == $( "#max-price").data('max') ){
            suffix = ' +';
        }
        $( "#max-price").html(ui.values[ 1 ] + suffix);
    }
});*/


/*****Toggle Maps****/
function toggleMaps() {
    var toggleMaps = document.getElementById("toggleMaps");
    var filterergebnisse = document.getElementById("filterergebnisse");
    var maps = document.getElementById("maps");
    var children = filterergebnisse.getElementsByClassName("filterergebnis");
    var childArray = Array.from(children);


    if (filterergebnisse.classList.contains("col-lg-8")) {
        /**Inhaltsgröße umstellen**/
        filterergebnisse.classList.add("col-lg-12");
        filterergebnisse.classList.remove("col-lg-8");
        /**Buttontext**/
        toggleMaps.innerHTML = "<a onclick=\"toggleMaps()\" href=\"#\" aria-label='Karte wieder anzeigen'>" +
            "                            <small class=\"underline small\">Karte anzeigen</small>" +
            "                        </a>";

        /**Ergebnisgrößen umstellen**/

        childArray.forEach(function (item) {
            if (item.classList.contains("filterergebnis") && item.classList.contains("col-12")) {
                item.classList.add("col-lg-6");
                item.classList.remove("col-12");
            }
        });

        maps.style.display = "none";


    }

    /****Karte wieder einblenden***/
    else if (filterergebnisse.classList.contains("col-lg-12")) {
        filterergebnisse.classList.add("col-lg-8");
        filterergebnisse.classList.remove("col-lg-12");
        toggleMaps.innerHTML = "<a onclick=\"toggleMaps()\" href=\"#\">" +
            "                            <small class=\"underline small\">Karte ausblenden</small>" +
            "                        </a>";

        childArray.forEach(function (item) {
            if (item.classList.contains("filterergebnis") && item.classList.contains("col-lg-6")) {
                item.classList.add("col-12");
                item.classList.remove("small-col");
                item.classList.remove("col-lg-6");
            }
        });

        console.log("sollte 12 sein");
        console.log(filterergebnisse.getElementsByClassName("col-12"));


        maps.style.display = "block";


    }


}


/******ACCORDION ICON****/

$(".accordion button[aria-expanded='true']").click(function () {
    var accordion = document.querySelector(".accordion button[aria-expanded=\"true\"]");
    console.log("jetzt wirds klein");
});

$(".accordion button[aria-expanded='false']").click(function () {
    var accordion = document.querySelector(".accordion button[aria-expanded=\"true\"]");
    console.log("jetzt wirds groß");
});

$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});


$(document).ready(function () {


    var accordionOpened = document.querySelectorAll(".accordion button[aria-expanded=\"true\"] span.accordion-icon");
    var accordionClosed = document.querySelectorAll(".accordion button[aria-expanded=\"false\"] span.accordion-icon");

    $(".accordion button[aria-expanded=\"true\"] span.accordion-icon").each(function () {
        $(this).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus"\n' +
            '                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
            '                                                    <path fill-rule="evenodd"\n' +
            '                                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>\n' +
            '                                                    <path fill-rule="evenodd"\n' +
            '                                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>\n' +
            '                                                </svg>');
    });

    $(".accordion button[aria-expanded=\"false\"] span.accordion-icon").each(function () {
        $(this).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\\n\' +\n' +
            '            \' <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>\\n\' +\n' +
            '            \'</svg>');
        console.log("hi");
    });

    var accordion = document.querySelector("#accordion");
    accordion.addEventListener("click", e => {

       /* let cards = $("#accordion .card");
        console.log(cards);
        console.log(cards);
        for(let card of cards){
            console.log(card)
        }
        for(let i = 0; i < cards.length; i++){
            console.log(cards.length);
            console.log(i);
            console.log(cards[i]);
            if(card[i].hasClass("collapsing")){

            }
        }
        for(let card of cards){
            console.log(card)
           /* card.prevObject[0].activeElement.children[0].innerHTML =("<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-minus\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\\\\\\\\n\\\\\\' +\\\\n\\' +\\n' +\n" +
                "                '            \\'            \\\\\\' <path fill-rule=\"evenodd\" d=\"M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z\"/>\\\\\\\\n\\\\\\' +\\\\n\\' +\\n' +\n" +
                "                '            \\'            \\\\\\'</svg>")
        }*/
       let card =$("#accordion span.accordion-icon");
        for(let icon of card){
            console.log(icon.innerHTML);
            icon.innerHTML="<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-minus\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\\\\\\\\n\\\\\\' +\\\\n\\' +\\n' +\n" +
                "                '            \\'            \\\\\\' <path fill-rule=\"evenodd\" d=\"M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z\"/>\\\\\\\\n\\\\\\' +\\\\n\\' +\\n' +\n" +
                "                '            \\'            \\\\\\'</svg>";
            console.log(icon.innerHTML);

        }



        let showncard = $("#accordion .card button.show");
        console.log(showncard);

        showncard.prevObject[0].activeElement.children[0].innerHTML = "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-plus\"\\n' +\n" +
            "                '                                                     fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\\n' +\n" +
            "                '                                                    <path fill-rule=\"evenodd\"\\n' +\n" +
            "                '                                                          d=\"M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z\"/>\\n' +\n" +
            "                '                                                    <path fill-rule=\"evenodd\"\\n' +\n" +
            "                '                                                          d=\"M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z\"/>\\n' +\n" +
            "                '                                                </svg>";




        /*   var cards = $("#accordion .card");
            for(let card of cards){
                console.log(card)
                if($(card).find("span.accordion-icon svg").hasClass("bi-minus")){
                    $(card).find("span.accordion-icon").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus"\n' +
                        '                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                        '                                                    <path fill-rule="evenodd"\n' +
                        '                                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>\n' +
                        '                                                    <path fill-rule="evenodd"\n' +
                        '                                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>\n' +
                        '                                                </svg>');
                }
            }
            console.log(card)
        console.log($("#accordion .card"));


        if ($(accordion).find("span.accordion-icon svg").hasClass("bi-minus")) {
            console.log("minus");
            $(accordion).find("span.accordion-icon").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus"\n' +
                '                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '                                                    <path fill-rule="evenodd"\n' +
                '                                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>\n' +
                '                                                    <path fill-rule="evenodd"\n' +
                '                                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>\n' +
                '                                                </svg>');

        }

        else if ($(accordion).find("span.accordion-icon svg").hasClass("bi-plus")) {
            console.log("minus");
            $(accordion).find("span.accordion-icon").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\\\\n\\\' +\\n\' +\n' +
                '            \'            \\\' <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>\\\\n\\\' +\\n\' +\n' +
                '            \'            \\\'</svg>');

        }*/
    })
});



function changeAccordionIcon($e) {


    if ($($e).find("span.accordion-icon svg").hasClass("bi-minus")) {
        console.log("minus");
        $($e).find("span.accordion-icon").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus"\n' +
            '                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
            '                                                    <path fill-rule="evenodd"\n' +
            '                                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>\n' +
            '                                                    <path fill-rule="evenodd"\n' +
            '                                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>\n' +
            '                                                </svg>');

    }

    else if ($($e).find("span.accordion-icon svg").hasClass("bi-plus")) {
        console.log("minus");
        $($e).find("span.accordion-icon").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\\\\n\\\' +\\n\' +\n' +
            '            \'            \\\' <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>\\\\n\\\' +\\n\' +\n' +
            '            \'            \\\'</svg>');

    }


     if($(".accordion button[aria-expanded ='true']")){
         var iconToMinus = document.querySelector(".accordion button[aria-expanded=\"false\"] span.accordion-icon");
         $(iconToMinus).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
             ' <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>\n' +
             '</svg>');


         html("<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrows-collapse\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
             "  <path fill-rule=\"evenodd\" d=\"M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8zm6-7a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V1.5A.5.5 0 0 1 8 1z\"/>\n" +
             "  <path fill-rule=\"evenodd\" d=\"M10.354 3.646a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L8 5.293l1.646-1.647a.5.5 0 0 1 .708 0zM8 15a.5.5 0 0 0 .5-.5V10a.5.5 0 0 0-1 0v4.5a.5.5 0 0 0 .5.5z\"/>\n" +
             "  <path fill-rule=\"evenodd\" d=\"M10.354 12.354a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 .708.708L8 10.707l1.646 1.647a.5.5 0 0 0 .708 0z\"/>\n" +
             "</svg>")

     }

     if($(".accordion button[aria-expanded ='false']")){

         var iconToPlus = document.querySelector(".accordion button[aria-expanded=\"true\"] span.accordion-icon");
         $(iconToPlus).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus"\n' +
             '                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
             '                                                    <path fill-rule="evenodd"\n' +
             '                                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>\n' +
             '                                                    <path fill-rule="evenodd"\n' +
             '                                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>\n' +
             '                                                </svg>');


     }
}


/*********/
/*
document.querySelector('button.image').onclick = () => {

    basicLightbox.create(`
		<img width="1400" height="900" src="https://placehold.it/1400x900">
	`).show()

}*/


/********************************************************************/
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('.lightbox ul li img');
images.forEach(image => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })
});

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active')
});

/**************************************/

/*
$(".slidercss").prepend(" <script src=\"//code.jquery.com/jquery-1.11.1.min.js\"></script>\n" +
    "    <link rel=\"stylesheet\" href=\"https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css\"  media=\"screen\">\n" +
    "    <script src=\"https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js\"></script>\n" +
    "    <script src=\"js/codejquery.js\"></script>");*/

/*
$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );*/

//const filters = document.querySelectorAll('.choosenfilter .filter');
//const filters = document.querySelectorAll('.choosenfilter');
$(document).ready(function () {
    var filters = document.getElementsByClassName("choosenfilter");

    for (let f of filters) {
        f.addEventListener("click", e => {
            var filter= f.getElementsByClassName("filter");
            console.log(f.getElementsByClassName("filter"));
            //console.log(filter.getElementsByClassName("filter")[0].children);

            for(let i= 0; i < filter.length; i++ ){
                console.log(i);
                console.log(filter[i]);

                filter[i].addEventListener("click", e => {
                    filter[i].remove();
                });
            }

        });
    }

});

    /*filters.forEach(filter => {
        filter.addEventListener('click', e => {
           // filter.remove();
            console.log(filter.getElementsByClassName("labelText"));


        })
    });*/

    var erweiterteFilter = document.querySelectorAll('.filter-erweitert .filter');
    var filterFormular = document.querySelector('#erweiterteFilter');
    //console.log(erweiterteFilter)

    erweiterteFilter.forEach(filter => {
        filter.addEventListener('change', e => {
            $(".choosenfilter").html("");
            if ($(filter).find("input")) {
                var input = $(filter).find("input").attr('checked', true);

            }

            var form = document.getElementById("erweiterteFilter").getElementsByClassName("filter");
            for (let check of form) {

                if (check.getElementsByTagName("input")[0].checked) {
                    var labelText = check.getElementsByTagName("input")[0].labels[0].outerText;


                    $(".choosenfilter").append('<div class="col-6 filter" tabindex="0" aria-label="gewählter Filter">\n' +
                        '                            <p>\n' +
                        '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle"\n' +
                        '                                     fill="currentColor"\n' +
                        '                                     xmlns="http://www.w3.org/2000/svg">\n' +
                        '                                    <path fill-rule="evenodd"\n' +
                        '                                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\n' +
                        '                                    <path fill-rule="evenodd" fill="#CD1719"\n' +
                        '                                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>\n' +
                        '                                    <path fill-rule="evenodd" fill="#CD1719"\n' +
                        '                                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>\n' +
                        '                                </svg><span class="labelText">\n' + labelText +
                        '                            </span></p>\n' +
                        '                        </div>');

                }
            }


        });


    });









