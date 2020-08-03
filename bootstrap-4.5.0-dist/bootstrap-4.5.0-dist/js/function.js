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
        toggleMaps.innerHTML = "<a onclick=\"toggleMaps()\" href=\"#\">" +
            "                            <small class=\"underline small\">Karte anzeigen</small>" +
            "                        </a>";

        /**Ergebnisgrößen umstellen**/

        childArray.forEach(function (item) {
            if ( item.classList.contains("filterergebnis") &&  item.classList.contains("col-12")) {
                item.classList.add("col-lg-6");
                item.classList.remove("col-12");
            }
        });

        maps.style.display="none";


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


        maps.style.display="block";


    }


}
