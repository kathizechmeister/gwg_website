var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

$(function () {
    var today = new Date();
    var todaysMonth = today.getMonth() + 1;
    var todaysDay = today.getDate();
    var todaysYear = today.getFullYear();

    if (todaysDay < 10) {
        todaysDay = "0" + todaysDay;
    }
    if (todaysMonth < 10) {
        todaysMonth = "0" + todaysMonth;
    }
    var todaysDate = todaysYear + '-' + todaysMonth + '-' + todaysDay;

    var maxDate = todaysYear - 18 + '-' + todaysMonth + '-' + todaysDay;
    var minDate = todaysYear - 100 + '-' + todaysMonth + '-' + todaysDay;

    $(".restrictedBirtDate").attr("max", maxDate);
    $(".restrictedBirtDate").attr("min", minDate);

    $(".todayIsMinDate").attr("min", todaysDate)


});



function showTab(n) {
    if (document.getElementById("regForm") != null) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        if (x.length > 0) {
            x[n].style.display = "block";
            //... and fix the Previous/Next buttons:
            if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            if (n == (x.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Abschicken";
                //document.getElementById("nextBtn").setAttribute("formaction", "/submit.html");
                document.getElementById("nextBtn").classList.add("submit")

            } else {
                document.getElementById("nextBtn").innerHTML = "Nächste Seite";
                document.getElementById("nextBtn").classList.remove("submit")
            }
            //... and run a function that will display the correct step indicator:
            fixStepIndicator(n);
        }
        fixStepIndicator(n);
    }

}

function nextPrev(n) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;


  //  showErrors();
    // This function will figure out which tab to display


    var x = document.getElementsByClassName("tab");
    var errorInputs = document.getElementsByClassName("invalid-feedback");
    // Exit the function if any field in the current tab is invalid:

    if (n == 1 && !validateForm()) {
        validateForm();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;

        //showErrors();


        for (i = 0; i < errorInputs.length; i++) {
            if (window.getComputedStyle(errorInputs[i]).display == "block") {
                allValid = false;
                return allValid;
            }
        }
        return false;
    }
    else if(n==1 && validateForm()){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        x[currentTab].classList.add("was-validated");
        console.log(currentTab +" " +(x.length-1))

    }

    if(document.getElementById("errors").innerHTML != ""){
       showErrors();
    }
    else{

        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        if (currentTab >=( x.length-1)) {

            // ... the form gets submitted:
            console.log("submit")
            document.getElementById("regForm").submit();
            return false;


        }

        if(n == (-1)){
            showTab(currentTab)
            showErrors(-1);
            return;
        }
        // if you have reached the end of the form...

        console.log("step"+ currentTab);

        // Otherwise, display the correct tab:

        showTab(currentTab);
        showErrors();
    }



}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    var allValid = true;
    x = document.getElementsByClassName("tab");
    if(x != undefined) {
        //y = x[currentTab].getElementsByTagName("input");
        y = x[currentTab].getElementsByClassName("validate");

        var files = x[currentTab].getElementsByClassName("form-control-file");
        if (files > 0) {
            console.log(files[0].size);
            for (i = 0; i < files.length; i++) {
                valid = false;
                if (files[i].size > 3000) {
                    files[i].className += " invalid";
                    valid = false;
                    files[i].closest(".tab").classList.add("was-validated");
                    showErrors();
                }

            }
        }

        // A loop that checks every input field in the current tab:
        if (y.length > 0) {
            for (i = 0; i < y.length; i++) {
                valid = false;
                y[i].closest(".tab").classList.add("was-validated");
                // If a field is empty...

                if (y[i].value == "") {

                    // add an "invalid" class to the field:
                    y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;

                    showErrors();
                }
                else if (y[i].value != "") {

                    y[i].className -= " invalid";
                    showErrors();

                    valid = true;
                    /* if (files.length > 0) {

                         for (var j = 0; j > files.length; j++) {
                             if (files[j].size > 3000) {
                                 valid = false;
                                 files[i].className += " invalid";
                             }
                             else if (files[j].size <= 3000) {
                                 console.log(files[i].size);
                                 valid = true;
                                 files[i].className -= " invalid";
                             }
                         }
                     }
                     else {
                         valid = true;
                     }*/


                    /* if(y[i].id=="svnr"){
                         var svnr = document.getElementById("svnr");
                         if(svnr.value.length !=8){
                             y[i].className += " invalid";
                             // and set the current valid status to false
                             valid = false;
                             y[i].closest(".tab").classList.add("was-validated");
                             showErrors();
                         }
                     }*/
                }
                else {
                    y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                    y[i].closest(".tab").classList.add("was-validated");
                    showErrors();
                }

            }
        }

        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";


        }
        return valid; // return the valid status
    }
    else if(x == undefined && currentTab == 5){
        return true;
    }
}


/**show the errors on top***/
function showErrors(n) {


    var errorsection = document.getElementById("errors");
    var errorInputs = document.getElementsByClassName("invalid-feedback");

    var newInnerHTML = "";
    errorsection.innerHTML = "";
    var errorCounter = 0;
    for (var i = 0; i < errorInputs.length; i++) {


        if (errorInputs[i].closest(".form-group").attributes.id) {
            var id = errorInputs[i].closest(".form-group").attributes.id.nodeValue;
            if (window.getComputedStyle(errorInputs[i]).display == "block") {
                newInnerHTML += "<p class='my-0' onclick='scrolling(\"" + id + "\")'>" + errorInputs[i].textContent + "</p>";
                errorCounter++;
            }
        }

    }


    if (errorCounter == 0) {
        errorsection.classList.add("d-none");
    }
    else if (errorCounter > 0) {
        errorsection.classList.remove("d-none");
    }
    if(n == (-1)){
        newInnerHTML = "";
        errorsection.classList.add("d-none");

    }



    errorsection.innerHTML = newInnerHTML;
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function loadEWR() {

    document.getElementById("daueraufenthalt").classList.add("d-none");
    document.getElementById("ewr-form-group").innerHTML =
        '<div class="form-group col-md-12" aria-label="Reisepasskopie" id="form-group-reisepasskopie">\n' +
        '\n' +
        '                            <div class="form-group">\n' +
        '                                <label for="reisepasskopie">Reisepasskopie / Staatsbürgerschaftsnachweis</label>\n' +
        '                                <input type="file" class="form-control-file" id="reisepasskopie">\n' +
        '                            </div>'
    ;
}

function loadNoneEWR() {

    document.getElementById("daueraufenthalt").classList.add("d-none");
    document.getElementById("ewr-form-group").innerHTML =

        '                            <div class="form-group col-md-12" id="form-group-reisepass">\n' +
        '                                <label for="reisepass">Reisepasskopie hochladen</label>\n' +
        '                                <input type="file" class="form-control-file" id="reisepass">\n' +
        '                            </div>\n' +
        '                            <p class="mt-3 mb-0">Haben Sie eine Aufenthaltskarte mit dem Titel „Daueraufenthalt EU“? </p>\n' +
        '                            <div class="form-group col-md-12" id="form-group-daueraufenthalt">\n' +
        '\n' +
        '                                <input type="radio" name="daueraufenthalt" id="daueraufenthaltJa" onclick="loadDauerAufenthalt()">\n' +
        '                                <label for="daueraufenthaltJa">Ja</label>\n' +
        '                                <input type="radio" name="daueraufenthalt" id="daueraufenthaltNein" onclick="loadDauerAufenthaltNein()">\n' +
        '                                <label for="daueraufenthaltNein">Nein</label>\n' +
        '\n' +
        '                            </div>';
}

function loadDauerAufenthalt() {
    document.getElementById("daueraufenthalt").classList.remove("d-none");
    document.getElementById("daueraufenthalt").innerHTML =
        '<div class="form-row"> <div class="form-group col-md-12" id="form-group-daueraufenthaltskarte"><label for="daueraufenthaltskarte ">Daueraufenthaltskarte hochladen</label>' +
        '<input type="file" class="form-control-file" id="daueraufenthaltskarte "></div></div>';
}

function loadDauerAufenthaltNein() {
    document.getElementById("daueraufenthalt").classList.remove("d-none");
    document.getElementById("daueraufenthalt").innerHTML = ' <div class="form-row">\n' +
        '                        <p class="">Ich Ihrem Fall sind folgende Nachweise unbedingt erforderlich – da wir Ihre Anmeldung ansonsten nicht entgegen nehmen können.</p>\n' +
        '                        <div class="form-group col-md-12 my-4" id="form-group-versicherungsdatenauszug">\n' +
        '                            <p class=" small">Versicherungsdatenauszug über\n' +
        '                                sozialversicherungspflichtiges Einkommen für mindestens 54 Monate innerhalb der letzten\n' +
        '                                fünf Jahre oder insgesamt mindestens 240 Monate </p>\n' +
        '                            <label class="mt-0 mb-2 small" for="versicherungsdatenauszug">Versicherungsdatenauszug</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '\n' +
        ' ' +
        '                            <input type="file" class="form-control-file" id="versicherungsdatenauszug">\n' +
        '                        </div>\n' +
        '                        <div class="form-group col-md-12 my-4" id="form-group-meldebestätigung">\n' +
        '                            <p class=" small">Meldebestätigung Auszug aus den Zentralen Melderegister über mind. 5 Jahre Hauptwohnsitz in Österreich</p>\n' +
        '                            <label class="mt-0 small mb-2" for="meldebestätigung">Meldebestätigung</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '                            <input type="file" class="form-control-file" id="meldebestätigung">\n' +
        '                        </div>\n' +
        '                        <div class="form-group col-md-12 my-4" id="form-group-sprachkenntnisse">\n' +
        '                            <p class=" small">Sprachkenntnisse mind. Niveau A2 </p>\n' +
        '                            <label class="mt-0 small mb-2" for="sprachkenntnisse">Zeugnis</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '                            <input type="file" class="form-control-file" id="sprachkenntnisse">\n' +
        '                        </div>\n' +
        '                    </div>';
    initializePopover();
}


/**POPOVER for more information button**/
$(function () {
    initializePopover();
});
function initializePopover() {


    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
    $('[data-toggle="popover"]').popover({html: true});

}

/**
 * check if country is an ewr-country
 */
function checkEWR() {
    var ewr = document.getElementById("ewr-country");
    if (ewr.value != "") {
        if (ewr.value == "BE"
            || ewr.value == "BG"
            || ewr.value == "DK"
            || ewr.value == "DE"
            || ewr.value == "EE"
            || ewr.value == "FI"
            || ewr.value == "FR"
            || ewr.value == "GR"
            || ewr.value == "IE"
            || ewr.value == "IS"
            || ewr.value == "IT"
            || ewr.value == "HR"
            || ewr.value == "LI"
            || ewr.value == "LV"
            || ewr.value == "LT"
            || ewr.value == "LU"
            || ewr.value == "MT"
            || ewr.value == "NL"
            || ewr.value == "NO"
            || ewr.value == "AT"
            || ewr.value == "PL"
            || ewr.value == "PT"
            || ewr.value == "RO"
            || ewr.value == "SE"
            || ewr.value == "SK"
            || ewr.value == "SI"
            || ewr.value == "ES"
            || ewr.value == "CZ"
            || ewr.value == "HU"
            || ewr.value == "CY"
        ) {
            //show EWR Form

            loadEWR();
        }
        else {
            //show none ewr

            loadNoneEWR();
        }
    }
}

/**
 * show upload when checked
 */
function checkNachweise() {
    var allCheckedCheckboxes = [];
    $.each($("input[name='dringlichkeit']:checked"), function () {
        allCheckedCheckboxes.push($(this).val());
    });
    var validateClass = "";

    var addRequiredStar = "";
    var invalidFeedbackDiv = "";
    console.log(allCheckedCheckboxes);

    for (actualCheckbox of allCheckedCheckboxes) {
        if ($(".nachweise." + actualCheckbox).length > 0) {

            if ($(".nachweise." + actualCheckbox).innerHTML != "") {
                if (actualCheckbox == "kinderzuwachs" || actualCheckbox == "gesundheit" || actualCheckbox == "beschluss") {
                    validateClass = "validate";
                    addRequiredStar = "<span\n" + "class=\"red small\">*</span>";
                    invalidFeedbackDiv = "<div class=\"invalid-feedback\">Bitte laden Sie einen Nachweis hoch.</div>";

                }
                else {
                    validateClass = "";

                    addRequiredStar = "";
                    invalidFeedbackDiv = "";
                }

                $(".nachweise." + actualCheckbox).html(
                    "<div class=\"form-group col-md-8\" id=\"form-group-nachhweis\">\n" +
                    "                                    <label class=\"small\" for=\"nachweis-" + actualCheckbox + " \">Nachweis hochladen (jpeg, png, gif,\n" +
                    "                                        pdf)</label>" + addRequiredStar +
                    "                                    <input type=\"file\" class=\"form-control-file" + validateClass + " \" id=\"nachweis-" + actualCheckbox + "\" max-size=\"10\"\n" +
                    "</div>" + invalidFeedbackDiv);
                console.log("load nachweis" + actualCheckbox);
                console.log($(".nachweise." + actualCheckbox));
            }
        }
    }
    var allUncheckedCheckedCheckboxes = [];
    $.each($("input[name='dringlichkeit']:not(:checked)"), function () {
        allUncheckedCheckedCheckboxes.push($(this).val());
    });
    console.log(allUncheckedCheckedCheckboxes);
    for (actualCheckbox of allUncheckedCheckedCheckboxes) {
        if ($(".nachweise." + actualCheckbox).length > 0) {
            $(".nachweise." + actualCheckbox).html("");
        }
    }
}

/**
 * show input when checked
 */
function gemeinnuetzigInput() {
    if ($("input[name='eigentuemer']:checked").val() == "gemeinnuetzig") {
        $(".gebaudeeigentuemerGemeinnuetzig").html("" +
            " <div class=\"form-group form-group-lg col-12\" id=\"form-group-gebaudeeigentuemerGemeinnuetzig\">\n" +
            "                                    <label for=\"gebaudeeigentuemerGemeinnuetzig\" class=\"small mt-0\">Gebäudeeigentümer der derzeitigen Wohnung</label>\n" +
            "                                    <input type=\"text\" class=\"form-control\" id=\"gebaudeeigentuemerGemeinnuetzig\"\n" +
            "                                           placeholder=\"Gebäudeeigentümer der derzeitigen Wohnung\"\n" +
            "                                           aria-label=\"Gebäudeeigentümer der derzeitigen Wohnung\">\n" +
            "                                </div>");
    }
    else {
        $(".gebaudeeigentuemerGemeinnuetzig").html("");
    }

}

/**
 * get a new id of a added person
 * display the html with the specific id
 * @param element
 */
function addPersonToMitinteressenten(element) {

    var count = 1;
    var newId = 0;
    var maxId = 1;
    var mitinteressentenArr = $(".mitinteressent");
    console.log("Anzahl gesamt =" + mitinteressentenArr.length );
    if (mitinteressentenArr.length == 8) {
        console.log("maximale Mitinteressenten");
    }

    //add New Perosn
    else if (mitinteressentenArr.length < 9) {
        console.log(mitinteressentenArr);
        var usedNumbers = [];

        var actualIdNumber = 0;
        console.log(mitinteressentenArr);
        if(mitinteressentenArr.length == 0){
            actualIdNumber = 1;
            usedNumbers.push(actualIdNumber);
            console.log(actualIdNumber);
        }
        else {
            for (actualMitinteressent of mitinteressentenArr) {
                actualIdNumber = actualMitinteressent.id.replace("mitinteressentNr", "");
                actualIdNumber = parseInt(mitinteressentenArr[mitinteressentenArr.length-1].id.replace("mitinteressentNr", ""))+1;
                usedNumbers.push(actualIdNumber);
                //actualIdNumber =mitinteressentenArr[mitinteressentenArr.length-1].id.replace("mitinteressentNr", "");
            }


        }
        console.log(usedNumbers);

        if (usedNumbers.length == 0) {

            newId = maxId;
            maxId++;
        }
        else {
            maxId = Math.max.apply(null, usedNumbers);
            newId = maxId;

            console.log("Neue Id"+newId);
        }





        //$(".mitinteressenten").append("<div class='fieldset py-4 px-sm-1 px-md-4 mitinteressent' id='mitinteressentNr"+newId+"'>Person"+mitinteressentenArr.length+"</div>")
        $(".mitinteressenten").append('<fieldset class=" fieldset py-4 px-sm-1 px-md-4 mitinteressent  my-4 mx-sm-1 mx-md-4 bg-light-gray" id="mitinteressentNr' + newId + '">\n' +

            '    <h3>Mitinteressent / Mitinteressentin</h3>\n' +
            '<div class="">\n' +
            '                            <button type="button" class="btn deleteBtn" id="deletePerson' + newId + '" onclick="deletePerson(this)">Diese Person löschen' +
            '                            </button>\n' +
            '                        </div>' +
            '    <fieldset class="fieldset  py-4 px-sm-1 px-md-4">\n' +
            '        <h4>Persönliche Daten</h4>\n' +
            '        <div class="form-row">\n' +
            '\n' +
            '            <div class="form-group form-group-lg col-md-12" id="form-group-svnr' + newId + '">\n' +
            '                <label for="svnr' + newId + '" class="small ">Sozial-Versicherungs-Nr</label>\n' +
            '                <a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
            '                   data-placement="top" data-trigger="focus" title="Sozial-Versicherungs-Nr."\n' +
            '                   data-content="<p>Sollten Sie über keine Sozialversicherungsnummer verfügen, so ersuchen wir Sie uns telefonisch unter<a href=\'tel:+43732 7613-981\'> 0732 7613-981</a> oder per Email: <a href=\'mailto:kundencenter@gwg-linz.at\'>kundencenter@gwg-linz.at</a> zu kontaktieren.</p>">i</a>\n' +
            '\n' +
            '                <input type="text" class="form-control validate " id="svnr' + newId + '"\n' +
            '                       placeholder="Sozial- Versicherungs-Nr"\n' +
            '                       aria-label="SozialversicherungsNr"\n' +
            '                       autocomplete="off"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       pattern="[0-9]{8}"\n' +
            '                       required\n' +
            '\n' +
            '                >\n' +
            '                <div class="invalid-feedback">Bitte geben Sie die Sozial-Versicherungs-Nr. ein. Sie\n' +
            '                    muss 8 Ziffern enthalten.\n' +
            '                </div>\n' +
            '\n' +
            '\n' +
            '            </div>\n' +
            '        </div>\n' +
            '\n' +
            '\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-sm-12" id="form-group-gender' + newId + '">\n' +
            '                <div class="form-check mt-sm-4 ">\n' +
            '                    <input class="form-check-input" type="radio" name="gender" id="female' + newId + '"\n' +
            '                           value="female" required="required">\n' +
            '                    <label class="form-check-label " for="female' + newId + '">\n' +
            '                        Frau\n' +
            '                    </label>\n' +
            '                </div>\n' +
            '                <div class="form-check ">\n' +
            '                    <input class="form-check-input" type="radio" name="gender" id="male' + newId + '"\n' +
            '                           value="male" required="required">\n' +
            '                    <label class="form-check-label" for="male' + newId + '">\n' +
            '                        Herr\n' +
            '                    </label>\n' +
            '                </div>\n' +
            '                <div class="invalid-feedback">Bitte geben Sie die Anrede an\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '\n' +
            '        </div>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-3" >\n' +
            '                <label for="title' + newId + '" class="small">Titel</label>\n' +
            '                <input type="text" class="form-control" id="title' + newId + '"\n' +
            '                       placeholder="Titel"\n' +
            '                       aria-label="Titel"\n' +
            '                       name="honorific-prefix"\n' +
            '                       oninput="this.className = \'form-control \'"\n' +
            '                >\n' +
            '            </div>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-6" id="form-group-fname' + newId + '">\n' +
            '\n' +
            '                <label for="vorname' + newId + '" class="small">Vorname</label><span class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="vorname' + newId + '"\n' +
            '                       placeholder="Vorname"\n' +
            '                       aria-label="Vorname"\n' +
            '                       name="fname"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie den Vornamen an.\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '            <div class="form-group form-group-lg col-md-6" id="form-group-lname' + newId + '">\n' +
            '                <label for="nachname' + newId + '" class="small">Nachname </label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="nachname' + newId + '"\n' +
            '                       placeholder="Nachname"\n' +
            '                       aria-label="Nachname"\n' +
            '                       name="lname"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie den Nachnamen an.\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '        </div>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-6" id="form-group-familienstand' + newId + '">\n' +
            '                <label for="familienstand' + newId + '" class="small">Familienstand</label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <select name="familienstand" class="custom-select validate" id="familienstand' + newId + '"\n' +
            '                        oninput="this.className = \'custom-select\'"\n' +
            '                        required>\n' +
            '                    <option value="" disabled selected>Familienstand auswählen</option>\n' +
            '                    <option value="ledig">ledig</option>\n' +
            '                    <option value="verheiratet">verheiratet / eingetragene Partnerschaft</option>\n' +
            '                    <option value="geschieden ">geschieden</option>\n' +
            '                    <option value="verwitwet">verwitwet</option>\n' +
            '                    <option value="Lebensgemeinschaft">Lebensgemeinschaft</option>\n' +
            '\n' +
            '                </select>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie den Familienstand an.\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-6" id="form-group-geburtsdatum' + newId + '">\n' +
            '                <label for="geburtsdatum' + newId + '" class="small">Geburtsdatum</label><span class="red small">*</span>\n' +
            '                <input type="date" class="form-control validate birthDate restrictedBirtDate"\n' +
            '                       id="geburtsdatum' + newId + '"\n' +
            '                       placeholder="Geburtsdatum"\n' +
            '                       aria-label="Geburtsdatum"\n' +
            '                       name="bday"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie Ihr Geburtsdatum an.\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '        </div>\n' +
            '\n' +
            '    </fieldset>\n' +
            '    <fieldset class=" fieldset   py-4 px-sm-1 px-md-4">\n' +
            '        <h4>Staatsbürgerschaft <span class="red small">*</span></h4>\n' +
            '        <div class="form-row">\n' +
            ' <div class="form-group col-md-12" aria-label="EWR-Staaten" onclick="checkPersonEWR(' + newId + ')" id="form-group-ewr-country' + newId + '">\n' +
            '                <label for="ewr-country' + newId + '">Staat auswählen</label>\n' +
            '<select name="country" class="custom-select validate" id="ewr-country' + newId + '"\n' +
            '                        onselect="this.className = \'form-control custom-select\'"\n' +
            '                        required>\n' +
            '                    <option value="" selected>Alle Staaten</option>\n' +
            '                    <option value="AT" onclick="checkPersonEWR(' + newId + ')">Österreich</option>\n' +
            '                    <optgroup label="A">\n' +
            '                        <option value="AF" onclick="checkPersonEWR(' + newId + ')">Afghanistan</option>\n' +
            '                        <option value="EG" onclick="checkPersonEWR(' + newId + ')">Ägypten</option>\n' +
            '                        <option value="AX" onclick="checkPersonEWR(' + newId + ')">Åland</option>\n' +
            '                        <option value="AL" onclick="checkPersonEWR(' + newId + ')">Albanien</option>\n' +
            '                        <option value="DZ" onclick="checkPersonEWR(' + newId + ')">Algerien</option>\n' +
            '                        <option value="AS" onclick="checkPersonEWR(' + newId + ')">Amerikanisch-Samoa</option>\n' +
            '                        <option value="VI" onclick="checkPersonEWR(' + newId + ')">Amerikanische Jungferninseln\n' +
            '                        </option>\n' +
            '                        <option value="AD" onclick="checkPersonEWR(' + newId + ')">Andorra</option>\n' +
            '                        <option value="AO" onclick="checkPersonEWR(' + newId + ')">Angola</option>\n' +
            '                        <option value="AI" onclick="checkPersonEWR(' + newId + ')">Anguilla</option>\n' +
            '                        <option value="AQ" onclick="checkPersonEWR(' + newId + ')">Antarktis</option>\n' +
            '                        <option value="AG" onclick="checkPersonEWR(' + newId + ')">Antigua und Barbuda</option>\n' +
            '                        <option value="GQ" onclick="checkPersonEWR(' + newId + ')">Äquatorialguinea</option>\n' +
            '                        <option value="AR" onclick="checkPersonEWR(' + newId + ')">Argentinien</option>\n' +
            '                        <option value="AM" onclick="checkPersonEWR(' + newId + ')">Armenien</option>\n' +
            '                        <option value="AW" onclick="checkPersonEWR(' + newId + ')">Aruba</option>\n' +
            '                        <option value="AC" onclick="checkPersonEWR(' + newId + ')">Ascension</option>\n' +
            '                        <option value="AZ" onclick="checkPersonEWR(' + newId + ')">Aserbaidschan</option>\n' +
            '                        <option value="ET" onclick="checkPersonEWR(' + newId + ')">Äthiopien</option>\n' +
            '                        <option value="AU" onclick="checkPersonEWR(' + newId + ')">Australien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="B">\n' +
            '                        <option value="BS" onclick="checkPersonEWR(' + newId + ')">Bahamas</option>\n' +
            '                        <option value="BH" onclick="checkPersonEWR(' + newId + ')">Bahrain</option>\n' +
            '                        <option value="BD" onclick="checkPersonEWR(' + newId + ')">Bangladesch</option>\n' +
            '                        <option value="BB" onclick="checkPersonEWR(' + newId + ')">Barbados</option>\n' +
            '                        <option value="BY" onclick="checkPersonEWR(' + newId + ')">Belarus (Weißrussland)</option>\n' +
            '                        <option value="BE" onclick="checkPersonEWR(' + newId + ')">Belgien</option>\n' +
            '                        <option value="BZ" onclick="checkPersonEWR(' + newId + ')">Belize</option>\n' +
            '                        <option value="BJ" onclick="checkPersonEWR(' + newId + ')">Benin</option>\n' +
            '                        <option value="BM" onclick="checkPersonEWR(' + newId + ')">Bermuda</option>\n' +
            '                        <option value="BT" onclick="checkPersonEWR(' + newId + ')">Bhutan</option>\n' +
            '                        <option value="BO" onclick="checkPersonEWR(' + newId + ')">Bolivien</option>\n' +
            '                        <option value="BA" onclick="checkPersonEWR(' + newId + ')">Bosnien und Herzegowina</option>\n' +
            '                        <option value="BW" onclick="checkPersonEWR(' + newId + ')">Botswana</option>\n' +
            '                        <option value="BV" onclick="checkPersonEWR(' + newId + ')">Bouvetinsel</option>\n' +
            '                        <option value="BR" onclick="checkPersonEWR(' + newId + ')">Brasilien</option>\n' +
            '                        <option value="VG" onclick="checkPersonEWR(' + newId + ')">Britische Jungferninseln</option>\n' +
            '                        <option value="IO" onclick="checkPersonEWR(' + newId + ')">Britisches Territorium im Indischen\n' +
            '                            Ozean\n' +
            '                        </option>\n' +
            '                        <option value="BN" onclick="checkPersonEWR(' + newId + ')">Brunei Darussalam</option>\n' +
            '                        <option value="BG" onclick="checkPersonEWR(' + newId + ')">Bulgarien</option>\n' +
            '                        <option value="BF" onclick="checkPersonEWR(' + newId + ')">Burkina Faso</option>\n' +
            '                        <option value="BI" onclick="checkPersonEWR(' + newId + ')">Burundi</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="C">\n' +
            '                        <option value="EA" onclick="checkPersonEWR(' + newId + ')">Ceuta, Melilla</option>\n' +
            '                        <option value="CL" onclick="checkPersonEWR(' + newId + ')">Chile</option>\n' +
            '                        <option value="CN" onclick="checkPersonEWR(' + newId + ')">Volksrepublik China</option>\n' +
            '                        <option value="CP" onclick="checkPersonEWR(' + newId + ')">Clipperton</option>\n' +
            '                        <option value="CK" onclick="checkPersonEWR(' + newId + ')">Cookinseln</option>\n' +
            '                        <option value="CR" onclick="checkPersonEWR(' + newId + ')">Costa Rica</option>\n' +
            '                        <option value="CI" onclick="checkPersonEWR(' + newId + ')">Côte d\'Ivoire (Elfenbeinküste)\n' +
            '                        </option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="D">\n' +
            '                        <option value="DK" onclick="checkPersonEWR(' + newId + ')">Dänemark</option>\n' +
            '                        <option value="DE" onclick="checkPersonEWR(' + newId + ')">Deutschland</option>\n' +
            '                        <option value="DG" onclick="checkPersonEWR(' + newId + ')">Diego Garcia</option>\n' +
            '                        <option value="DM" onclick="checkPersonEWR(' + newId + ')">Dominica</option>\n' +
            '                        <option value="DO" onclick="checkPersonEWR(' + newId + ')">Dominikanische Republik</option>\n' +
            '                        <option value="DJ" onclick="checkPersonEWR(' + newId + ')">Dschibuti</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="E">\n' +
            '                        <option value="EC" onclick="checkPersonEWR(' + newId + ')">Ecuador</option>\n' +
            '                        <option value="SV" onclick="checkPersonEWR(' + newId + ')">El Salvador</option>\n' +
            '                        <option value="ER" onclick="checkPersonEWR(' + newId + ')">Eritrea</option>\n' +
            '                        <option value="EE" onclick="checkPersonEWR(' + newId + ')">Estland</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="F">\n' +
            '                        <option value="FK" onclick="checkPersonEWR(' + newId + ')">Falklandinseln</option>\n' +
            '                        <option value="FO" onclick="checkPersonEWR(' + newId + ')">Färöer</option>\n' +
            '                        <option value="FJ" onclick="checkPersonEWR(' + newId + ')">Fidschi</option>\n' +
            '                        <option value="FI" onclick="checkPersonEWR(' + newId + ')">Finnland</option>\n' +
            '                        <option value="FR" onclick="checkPersonEWR(' + newId + ')">Frankreich</option>\n' +
            '                        <option value="GF" onclick="checkPersonEWR(' + newId + ')">Französisch-Guayana</option>\n' +
            '                        <option value="PF" onclick="checkPersonEWR(' + newId + ')">Französisch-Polynesien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="G">\n' +
            '                        <option value="GA" onclick="checkPersonEWR(' + newId + ')">Gabun</option>\n' +
            '                        <option value="GM" onclick="checkPersonEWR(' + newId + ')">Gambia</option>\n' +
            '                        <option value="GE" onclick="checkPersonEWR(' + newId + ')">Georgien</option>\n' +
            '                        <option value="GH" onclick="checkPersonEWR(' + newId + ')">Ghana</option>\n' +
            '                        <option value="GI" onclick="checkPersonEWR(' + newId + ')">Gibraltar</option>\n' +
            '                        <option value="GD" onclick="checkPersonEWR(' + newId + ')">Grenada</option>\n' +
            '                        <option value="GR" onclick="checkPersonEWR(' + newId + ')">Griechenland</option>\n' +
            '                        <option value="GL" onclick="checkPersonEWR(' + newId + ')">Grönland</option>\n' +
            '                        <option value="GB" onclick="checkPersonEWR(' + newId + ')">Großbritannien</option>\n' +
            '                        <option value="GP" onclick="checkPersonEWR(' + newId + ')">Guadeloupe</option>\n' +
            '                        <option value="GU" onclick="checkPersonEWR(' + newId + ')">Guam</option>\n' +
            '                        <option value="GT" onclick="checkPersonEWR(' + newId + ')">Guatemala</option>\n' +
            '                        <option value="GG" onclick="checkPersonEWR(' + newId + ')">Guernsey (Kanalinsel)</option>\n' +
            '                        <option value="GN" onclick="checkPersonEWR(' + newId + ')">Guinea</option>\n' +
            '                        <option value="GW" onclick="checkPersonEWR(' + newId + ')">Guinea-Bissau</option>\n' +
            '                        <option value="GY" onclick="checkPersonEWR(' + newId + ')">Guyana</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="H">\n' +
            '                        <option value="HT" onclick="checkPersonEWR(' + newId + ')">Haiti</option>\n' +
            '                        <option value="HM" onclick="checkPersonEWR(' + newId + ')">Heard- und McDonald-Inseln</option>\n' +
            '                        <option value="HN" onclick="checkPersonEWR(' + newId + ')">Honduras</option>\n' +
            '                        <option value="HK" onclick="checkPersonEWR(' + newId + ')">Hongkong</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="I">\n' +
            '                        <option value="IN" onclick="checkPersonEWR(' + newId + ')">Indien</option>\n' +
            '                        <option value="ID" onclick="checkPersonEWR(' + newId + ')">Indonesien</option>\n' +
            '                        <option value="IM" onclick="checkPersonEWR(' + newId + ')">Insel Man</option>\n' +
            '                        <option value="IQ" onclick="checkPersonEWR(' + newId + ')">Irak</option>\n' +
            '                        <option value="IR" onclick="checkPersonEWR(' + newId + ')">Iran</option>\n' +
            '                        <option value="IE" onclick="checkPersonEWR(' + newId + ')">Irland</option>\n' +
            '                        <option value="IS" onclick="checkPersonEWR(' + newId + ')">Island</option>\n' +
            '                        <option value="IL" onclick="checkPersonEWR(' + newId + ')">Israel</option>\n' +
            '                        <option value="IT" onclick="checkPersonEWR(' + newId + ')">Italien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="J">\n' +
            '                        <option value="JM" onclick="checkPersonEWR(' + newId + ')">Jamaika</option>\n' +
            '                        <option value="JP" onclick="checkPersonEWR(' + newId + ')">Japan</option>\n' +
            '                        <option value="YE" onclick="checkPersonEWR(' + newId + ')">Jemen</option>\n' +
            '                        <option value="JE" onclick="checkPersonEWR(' + newId + ')">Jersey (Kanalinsel)</option>\n' +
            '                        <option value="JO" onclick="checkPersonEWR(' + newId + ')">Jordanien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="K">\n' +
            '                        <option value="KY" onclick="checkPersonEWR(' + newId + ')">Kaimaninseln</option>\n' +
            '                        <option value="KH" onclick="checkPersonEWR(' + newId + ')">Kambodscha</option>\n' +
            '                        <option value="CM" onclick="checkPersonEWR(' + newId + ')">Kamerun</option>\n' +
            '                        <option value="CA" onclick="checkPersonEWR(' + newId + ')">Kanada</option>\n' +
            '                        <option value="IC" onclick="checkPersonEWR(' + newId + ')">Kanarische Inseln</option>\n' +
            '                        <option value="CV" onclick="checkPersonEWR(' + newId + ')">Kap Verde</option>\n' +
            '                        <option value="KZ" onclick="checkPersonEWR(' + newId + ')">Kasachstan</option>\n' +
            '                        <option value="QA" onclick="checkPersonEWR(' + newId + ')">Katar</option>\n' +
            '                        <option value="KE" onclick="checkPersonEWR(' + newId + ')">Kenia</option>\n' +
            '                        <option value="KG" onclick="checkPersonEWR(' + newId + ')">Kirgisistan</option>\n' +
            '                        <option value="KI" onclick="checkPersonEWR(' + newId + ')">Kiribati</option>\n' +
            '                        <option value="CC" onclick="checkPersonEWR(' + newId + ')">Kokosinseln</option>\n' +
            '                        <option value="CO" onclick="checkPersonEWR(' + newId + ')">Kolumbien</option>\n' +
            '                        <option value="KM" onclick="checkPersonEWR(' + newId + ')">Komoren</option>\n' +
            '                        <option value="CD" onclick="checkPersonEWR(' + newId + ')">Demokratische Republik Kongo\n' +
            '                        </option>\n' +
            '                        <option value="KP" onclick="checkPersonEWR(' + newId + ')">Demokratische Volksrepublik Korea\n' +
            '                            (Nordkorea)\n' +
            '                        </option>\n' +
            '                        <option value="KR" onclick="checkPersonEWR(' + newId + ')">Republik Korea (Südkorea)</option>\n' +
            '                        <option value="HR" onclick="checkPersonEWR(' + newId + ')">Kroatien</option>\n' +
            '                        <option value="CU" onclick="checkPersonEWR(' + newId + ')">Kuba</option>\n' +
            '                        <option value="KW" onclick="checkPersonEWR(' + newId + ')">Kuwait</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="L">\n' +
            '                        <option value="LA" onclick="checkPersonEWR(' + newId + ')">Laos</option>\n' +
            '                        <option value="LS" onclick="checkPersonEWR(' + newId + ')">Lesotho</option>\n' +
            '                        <option value="LV" onclick="checkPersonEWR(' + newId + ')">Lettland</option>\n' +
            '                        <option value="LB" onclick="checkPersonEWR(' + newId + ')">Libanon</option>\n' +
            '                        <option value="LR" onclick="checkPersonEWR(' + newId + ')">Liberia</option>\n' +
            '                        <option value="LY" onclick="checkPersonEWR(' + newId + ')">Libyen</option>\n' +
            '                        <option value="LI" onclick="checkPersonEWR(' + newId + ')">Liechtenstein</option>\n' +
            '                        <option value="LT" onclick="checkPersonEWR(' + newId + ')">Litauen</option>\n' +
            '                        <option value="LU" onclick="checkPersonEWR(' + newId + ')">Luxemburg</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="M">\n' +
            '                        <option value="MO" onclick="checkPersonEWR(' + newId + ')">Macao</option>\n' +
            '                        <option value="MG" onclick="checkPersonEWR(' + newId + ')">Madagaskar</option>\n' +
            '                        <option value="MW" onclick="checkPersonEWR(' + newId + ')">Malawi</option>\n' +
            '                        <option value="MY" onclick="checkPersonEWR(' + newId + ')">Malaysia</option>\n' +
            '                        <option value="MV" onclick="checkPersonEWR(' + newId + ')">Malediven</option>\n' +
            '                        <option value="ML" onclick="checkPersonEWR(' + newId + ')">Mali</option>\n' +
            '                        <option value="MT" onclick="checkPersonEWR(' + newId + ')">Malta</option>\n' +
            '                        <option value="MA" onclick="checkPersonEWR(' + newId + ')">Marokko</option>\n' +
            '                        <option value="MH" onclick="checkPersonEWR(' + newId + ')">Marshallinseln</option>\n' +
            '                        <option value="MQ" onclick="checkPersonEWR(' + newId + ')">Martinique</option>\n' +
            '                        <option value="MR" onclick="checkPersonEWR(' + newId + ')">Mauretanien</option>\n' +
            '                        <option value="MU" onclick="checkPersonEWR(' + newId + ')">Mauritius</option>\n' +
            '                        <option value="YT" onclick="checkPersonEWR(' + newId + ')">Mayotte</option>\n' +
            '                        <option value="MK" onclick="checkPersonEWR(' + newId + ')">Mazedonien</option>\n' +
            '                        <option value="MX" onclick="checkPersonEWR(' + newId + ')">Mexiko</option>\n' +
            '                        <option value="FM" onclick="checkPersonEWR(' + newId + ')">Mikronesien</option>\n' +
            '                        <option value="MD" onclick="checkPersonEWR(' + newId + ')">Moldawien (Republik Moldau)</option>\n' +
            '                        <option value="MC" onclick="checkPersonEWR(' + newId + ')">Monaco</option>\n' +
            '                        <option value="MN" onclick="checkPersonEWR(' + newId + ')">Mongolei</option>\n' +
            '                        <option value="ME" onclick="checkPersonEWR(' + newId + ')">Montenegro</option>\n' +
            '                        <option value="MS" onclick="checkPersonEWR(' + newId + ')">Montserrat</option>\n' +
            '                        <option value="MZ" onclick="checkPersonEWR(' + newId + ')">Mosambik</option>\n' +
            '                        <option value="MM" onclick="checkPersonEWR(' + newId + ')">Myanmar (Burma)</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="N">\n' +
            '                        <option value="NA" onclick="checkPersonEWR(' + newId + ')">Namibia</option>\n' +
            '                        <option value="NR" onclick="checkPersonEWR(' + newId + ')">Nauru</option>\n' +
            '                        <option value="NP" onclick="checkPersonEWR(' + newId + ')">Nepal</option>\n' +
            '                        <option value="NC" onclick="checkPersonEWR(' + newId + ')">Neukaledonien</option>\n' +
            '                        <option value="NZ" onclick="checkPersonEWR(' + newId + ')">Neuseeland</option>\n' +
            '                        <option value="NI" onclick="checkPersonEWR(' + newId + ')">Nicaragua</option>\n' +
            '                        <option value="NL" onclick="checkPersonEWR(' + newId + ')">Niederlande</option>\n' +
            '                        <option value="AN" onclick="checkPersonEWR(' + newId + ')">Niederländische Antillen</option>\n' +
            '                        <option value="NE" onclick="checkPersonEWR(' + newId + ')">Niger</option>\n' +
            '                        <option value="NG" onclick="checkPersonEWR(' + newId + ')">Nigeria</option>\n' +
            '                        <option value="NU" onclick="checkPersonEWR(' + newId + ')">Niue</option>\n' +
            '                        <option value="MP" onclick="checkPersonEWR(' + newId + ')">Nördliche Marianen</option>\n' +
            '                        <option value="NF" onclick="checkPersonEWR(' + newId + ')">Norfolkinsel</option>\n' +
            '                        <option value="NO" onclick="checkPersonEWR(' + newId + ')">Norwegen</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="O">\n' +
            '                        <option value="OM" onclick="checkPersonEWR(' + newId + ')">Oman</option>\n' +
            '                        <option value="XO" onclick="checkPersonEWR(' + newId + ')">Orbit</option>\n' +
            '                        <option value="AT" onclick="checkPersonEWR(' + newId + ')">Österreich</option>\n' +
            '                        <option value="TL" onclick="checkPersonEWR(' + newId + ')">Osttimor (Timor-Leste)</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="P">\n' +
            '                        <option value="PK" onclick="checkPersonEWR(' + newId + ')">Pakistan</option>\n' +
            '                        <option value="PS" onclick="checkPersonEWR(' + newId + ')">Palästinensische Autonomiegebiete\n' +
            '                        </option>\n' +
            '                        <option value="PW" onclick="checkPersonEWR(' + newId + ')">Palau</option>\n' +
            '                        <option value="PA" onclick="checkPersonEWR(' + newId + ')">Panama</option>\n' +
            '                        <option value="PG" onclick="checkPersonEWR(' + newId + ')">Papua-Neuguinea</option>\n' +
            '                        <option value="PY" onclick="checkPersonEWR(' + newId + ')">Paraguay</option>\n' +
            '                        <option value="PE" onclick="checkPersonEWR(' + newId + ')">Peru</option>\n' +
            '                        <option value="PH" onclick="checkPersonEWR(' + newId + ')">Philippinen</option>\n' +
            '                        <option value="PN" onclick="checkPersonEWR(' + newId + ')">Pitcairninseln</option>\n' +
            '                        <option value="PL" onclick="checkPersonEWR(' + newId + ')">Polen</option>\n' +
            '                        <option value="PT" onclick="checkPersonEWR(' + newId + ')">Portugal</option>\n' +
            '                        <option value="PR" onclick="checkPersonEWR(' + newId + ')">Puerto Rico</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="Q"></option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="R">\n' +
            '                        <option value="TW" onclick="checkPersonEWR(' + newId + ')">Republik China (Taiwan)</option>\n' +
            '                        <option value="CG" onclick="checkPersonEWR(' + newId + ')">Republik Kongo</option>\n' +
            '                        <option value="RE" onclick="checkPersonEWR(' + newId + ')">Réunion</option>\n' +
            '                        <option value="RW" onclick="checkPersonEWR(' + newId + ')">Ruanda</option>\n' +
            '                        <option value="RO" onclick="checkPersonEWR(' + newId + ')">Rumänien</option>\n' +
            '                        <option value="RU" onclick="checkPersonEWR(' + newId + ')">Russische Föderation</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="S">\n' +
            '                        <option value="BL" onclick="checkPersonEWR(' + newId + ')">Saint-Barthélemy</option>\n' +
            '                        <option value="MF" onclick="checkPersonEWR(' + newId + ')">Saint-Martin</option>\n' +
            '                        <option value="SB" onclick="checkPersonEWR(' + newId + ')">Salomonen</option>\n' +
            '                        <option value="ZM" onclick="checkPersonEWR(' + newId + ')">Sambia</option>\n' +
            '                        <option value="WS" onclick="checkPersonEWR(' + newId + ')">Samoa</option>\n' +
            '                        <option value="SM" onclick="checkPersonEWR(' + newId + ')">San Marino</option>\n' +
            '                        <option value="ST" onclick="checkPersonEWR(' + newId + ')">São Tomé und Príncipe</option>\n' +
            '                        <option value="SA" onclick="checkPersonEWR(' + newId + ')">Saudi-Arabien</option>\n' +
            '                        <option value="SE" onclick="checkPersonEWR(' + newId + ')">Schweden</option>\n' +
            '                        <option value="CH" onclick="checkPersonEWR(' + newId + ')">Schweiz</option>\n' +
            '                        <option value="SN" onclick="checkPersonEWR(' + newId + ')">Senegal</option>\n' +
            '                        <option value="RS" onclick="checkPersonEWR(' + newId + ')">Serbien</option>\n' +
            '                        <option value="SC" onclick="checkPersonEWR(' + newId + ')">Seychellen</option>\n' +
            '                        <option value="SL" onclick="checkPersonEWR(' + newId + ')">Sierra Leone</option>\n' +
            '                        <option value="ZW" onclick="checkPersonEWR(' + newId + ')">Simbabwe</option>\n' +
            '                        <option value="SG" onclick="checkPersonEWR(' + newId + ')">Singapur</option>\n' +
            '                        <option value="SK" onclick="checkPersonEWR(' + newId + ')">Slowakei</option>\n' +
            '                        <option value="SI" onclick="checkPersonEWR(' + newId + ')">Slowenien</option>\n' +
            '                        <option value="SO" onclick="checkPersonEWR(' + newId + ')">Somalia</option>\n' +
            '                        <option value="ES" onclick="checkPersonEWR(' + newId + ')">Spanien</option>\n' +
            '                        <option value="LK" onclick="checkPersonEWR(' + newId + ')">Sri Lanka</option>\n' +
            '                        <option value="SH" onclick="checkPersonEWR(' + newId + ')">St. Helena</option>\n' +
            '                        <option value="KN" onclick="checkPersonEWR(' + newId + ')">St. Kitts und Nevis</option>\n' +
            '                        <option value="LC" onclick="checkPersonEWR(' + newId + ')">St. Lucia</option>\n' +
            '                        <option value="PM" onclick="checkPersonEWR(' + newId + ')">Saint-Pierre und Miquelon</option>\n' +
            '                        <option value="VC" onclick="checkPersonEWR(' + newId + ')">St. Vincent und die Grenadinen\n' +
            '                        </option>\n' +
            '                        <option value="ZA" onclick="checkPersonEWR(' + newId + ')">Südafrika</option>\n' +
            '                        <option value="SD" onclick="checkPersonEWR(' + newId + ')">Sudan</option>\n' +
            '                        <option value="GS" onclick="checkPersonEWR(' + newId + ')">Südgeorgien und die Südlichen\n' +
            '                            Sandwichinseln\n' +
            '                        </option>\n' +
            '                        <option value="SR" onclick="checkPersonEWR(' + newId + ')">Suriname</option>\n' +
            '                        <option value="SJ" onclick="checkPersonEWR(' + newId + ')">Svalbard und Jan Mayen</option>\n' +
            '                        <option value="SZ" onclick="checkPersonEWR(' + newId + ')">Swasiland</option>\n' +
            '                        <option value="SY" onclick="checkPersonEWR(' + newId + ')">Syrien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="T">\n' +
            '                        <option value="TJ" onclick="checkPersonEWR(' + newId + ')">Tadschikistan</option>\n' +
            '                        <option value="TZ" onclick="checkPersonEWR(' + newId + ')">Tansania</option>\n' +
            '                        <option value="TH" onclick="checkPersonEWR(' + newId + ')">Thailand</option>\n' +
            '                        <option value="TG" onclick="checkPersonEWR(' + newId + ')">Togo</option>\n' +
            '                        <option value="TK" onclick="checkPersonEWR(' + newId + ')">Tokelau</option>\n' +
            '                        <option value="TO" onclick="checkPersonEWR(' + newId + ')">Tonga</option>\n' +
            '                        <option value="TT" onclick="checkPersonEWR(' + newId + ')">Trinidad und Tobago</option>\n' +
            '                        <option value="TA" onclick="checkPersonEWR(' + newId + ')">Tristan da Cunha</option>\n' +
            '                        <option value="TD" onclick="checkPersonEWR(' + newId + ')">Tschad</option>\n' +
            '                        <option value="CZ" onclick="checkPersonEWR(' + newId + ')">Tschechische Republik</option>\n' +
            '                        <option value="TN" onclick="checkPersonEWR(' + newId + ')">Tunesien</option>\n' +
            '                        <option value="TR" onclick="checkPersonEWR(' + newId + ')">Türkei</option>\n' +
            '                        <option value="TM" onclick="checkPersonEWR(' + newId + ')">Turkmenistan</option>\n' +
            '                        <option value="TC" onclick="checkPersonEWR(' + newId + ')">Turks- und Caicosinseln</option>\n' +
            '                        <option value="TV" onclick="checkPersonEWR(' + newId + ')">Tuvalu</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="U">\n' +
            '                        <option value="UG" onclick="checkPersonEWR(' + newId + ')">Uganda</option>\n' +
            '                        <option value="UA" onclick="checkPersonEWR(' + newId + ')">Ukraine</option>\n' +
            '                        <option value="HU" onclick="checkPersonEWR(' + newId + ')">Ungarn</option>\n' +
            '                        <option value="UY" onclick="checkPersonEWR(' + newId + ')">Uruguay</option>\n' +
            '                        <option value="UZ" onclick="checkPersonEWR(' + newId + ')">Usbekistan</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="V">\n' +
            '                        <option value="VU" onclick="checkPersonEWR(' + newId + ')">Vanuatu</option>\n' +
            '                        <option value="VA" onclick="checkPersonEWR(' + newId + ')">Vatikanstadt</option>\n' +
            '                        <option value="VE" onclick="checkPersonEWR(' + newId + ')">Venezuela</option>\n' +
            '                        <option value="AE" onclick="checkPersonEWR(' + newId + ')">Vereinigte Arabische Emirate\n' +
            '                        </option>\n' +
            '                        <option value="US" onclick="checkPersonEWR(' + newId + ')">Vereinigte Staaten von Amerika\n' +
            '                            (USA)\n' +
            '                        </option>\n' +
            '                        <option value="GB" onclick="checkPersonEWR(' + newId + ')">Vereinigtes Königreich\n' +
            '                            Großbritannien und Nordirland\n' +
            '                        </option>\n' +
            '                        <option value="VN" onclick="checkPersonEWR(' + newId + ')">Vietnam</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="W">\n' +
            '                        <option value="WF" onclick="checkPersonEWR(' + newId + ')">Wallis und Futuna</option>\n' +
            '                        <option value="CX" onclick="checkPersonEWR(' + newId + ')">Weihnachtsinsel</option>\n' +
            '                        <option value="EH" onclick="checkPersonEWR(' + newId + ')">Westsahara</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="Z">\n' +
            '                        <option value="CF" onclick="checkPersonEWR(' + newId + ')">Zentralafrikanische Republik\n' +
            '                        </option>\n' +
            '                        <option value="CY" onclick="checkPersonEWR(' + newId + ')">Zypern</option>\n' +
            '                    </optgroup>\n' +
            '                </select>' +
            '            </div>' +
            '\n' +
            '            <!-- <div class="form-group col-md-12" >\n' +
            '                 <label for="reisepasskopie' + newId + '">Reisepasskopie / Staatsbürgerschaftsnachweis</label>\n' +
            '                 <input type="file" class="form-control-file" id="reisepasskopie' + newId + '"  >\n' +
            '             </div>-->\n' +
            '        </div>\n' +
            '        <div class="form-row" id="ewr-form-group' + newId + '">\n' +
            '        </div>\n' +
            '        <div id="daueraufenthalt' + newId + '"></div>\n' +
            '    </fieldset>\n' +
            '    <fieldset class=" fieldset   py-4 px-sm-1 px-md-4">\n' +
            '        <h4>Anschrift <span class="red small">*</span></h4>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-8">\n' +
            '                <label for="living-country' + newId + '" class="small">Land</label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <select name="living-country" class="custom-select" id="living-country' + newId + '">\n' +
            '                    <option value="" disabled selected>Land auswählen</option>\n' +
            '                    <option value="AT">Österreich</option>\n' +
            '                    <optgroup label="A">\n' +
            '                        <option value="AF">Afghanistan</option>\n' +
            '                        <option value="EG">Ägypten</option>\n' +
            '                        <option value="AX">Åland</option>\n' +
            '                        <option value="AL">Albanien</option>\n' +
            '                        <option value="DZ">Algerien</option>\n' +
            '                        <option value="AS">Amerikanisch-Samoa</option>\n' +
            '                        <option value="VI">Amerikanische Jungferninseln</option>\n' +
            '                        <option value="AD">Andorra</option>\n' +
            '                        <option value="AO">Angola</option>\n' +
            '                        <option value="AI">Anguilla</option>\n' +
            '                        <option value="AQ">Antarktis</option>\n' +
            '                        <option value="AG">Antigua und Barbuda</option>\n' +
            '                        <option value="GQ">Äquatorialguinea</option>\n' +
            '                        <option value="AR">Argentinien</option>\n' +
            '                        <option value="AM">Armenien</option>\n' +
            '                        <option value="AW">Aruba</option>\n' +
            '                        <option value="AC">Ascension</option>\n' +
            '                        <option value="AZ">Aserbaidschan</option>\n' +
            '                        <option value="ET">Äthiopien</option>\n' +
            '                        <option value="AU">Australien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="B">\n' +
            '                        <option value="BS">Bahamas</option>\n' +
            '                        <option value="BH">Bahrain</option>\n' +
            '                        <option value="BD">Bangladesch</option>\n' +
            '                        <option value="BB">Barbados</option>\n' +
            '                        <option value="BY">Belarus (Weißrussland)</option>\n' +
            '                        <option value="BE">Belgien</option>\n' +
            '                        <option value="BZ">Belize</option>\n' +
            '                        <option value="BJ">Benin</option>\n' +
            '                        <option value="BM">Bermuda</option>\n' +
            '                        <option value="BT">Bhutan</option>\n' +
            '                        <option value="BO">Bolivien</option>\n' +
            '                        <option value="BA">Bosnien und Herzegowina</option>\n' +
            '                        <option value="BW">Botswana</option>\n' +
            '                        <option value="BV">Bouvetinsel</option>\n' +
            '                        <option value="BR">Brasilien</option>\n' +
            '                        <option value="VG">Britische Jungferninseln</option>\n' +
            '                        <option value="IO">Britisches Territorium im Indischen Ozean</option>\n' +
            '                        <option value="BN">Brunei Darussalam</option>\n' +
            '                        <option value="BG">Bulgarien</option>\n' +
            '                        <option value="BF">Burkina Faso</option>\n' +
            '                        <option value="BI">Burundi</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="C">\n' +
            '                        <option value="EA">Ceuta, Melilla</option>\n' +
            '                        <option value="CL">Chile</option>\n' +
            '                        <option value="CN">Volksrepublik China</option>\n' +
            '                        <option value="CP">Clipperton</option>\n' +
            '                        <option value="CK">Cookinseln</option>\n' +
            '                        <option value="CR">Costa Rica</option>\n' +
            '                        <option value="CI">Côte d\'Ivoire (Elfenbeinküste)</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="D">\n' +
            '                        <option value="DK">Dänemark</option>\n' +
            '                        <option value="DE">Deutschland</option>\n' +
            '                        <option value="DG">Diego Garcia</option>\n' +
            '                        <option value="DM">Dominica</option>\n' +
            '                        <option value="DO">Dominikanische Republik</option>\n' +
            '                        <option value="DJ">Dschibuti</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="E">\n' +
            '                        <option value="EC">Ecuador</option>\n' +
            '                        <option value="SV">El Salvador</option>\n' +
            '                        <option value="ER">Eritrea</option>\n' +
            '                        <option value="EE">Estland</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="F">\n' +
            '                        <option value="FK">Falklandinseln</option>\n' +
            '                        <option value="FO">Färöer</option>\n' +
            '                        <option value="FJ">Fidschi</option>\n' +
            '                        <option value="FI">Finnland</option>\n' +
            '                        <option value="FR">Frankreich</option>\n' +
            '                        <option value="GF">Französisch-Guayana</option>\n' +
            '                        <option value="PF">Französisch-Polynesien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="G">\n' +
            '                        <option value="GA">Gabun</option>\n' +
            '                        <option value="GM">Gambia</option>\n' +
            '                        <option value="GE">Georgien</option>\n' +
            '                        <option value="GH">Ghana</option>\n' +
            '                        <option value="GI">Gibraltar</option>\n' +
            '                        <option value="GD">Grenada</option>\n' +
            '                        <option value="GR">Griechenland</option>\n' +
            '                        <option value="GL">Grönland</option>\n' +
            '                        <option value="GB">Großbritannien</option>\n' +
            '                        <option value="GP">Guadeloupe</option>\n' +
            '                        <option value="GU">Guam</option>\n' +
            '                        <option value="GT">Guatemala</option>\n' +
            '                        <option value="GG">Guernsey (Kanalinsel)</option>\n' +
            '                        <option value="GN">Guinea</option>\n' +
            '                        <option value="GW">Guinea-Bissau</option>\n' +
            '                        <option value="GY">Guyana</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="H">\n' +
            '                        <option value="HT">Haiti</option>\n' +
            '                        <option value="HM">Heard- und McDonald-Inseln</option>\n' +
            '                        <option value="HN">Honduras</option>\n' +
            '                        <option value="HK">Hongkong</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="I">\n' +
            '                        <option value="IN">Indien</option>\n' +
            '                        <option value="ID">Indonesien</option>\n' +
            '                        <option value="IM">Insel Man</option>\n' +
            '                        <option value="IQ">Irak</option>\n' +
            '                        <option value="IR">Iran</option>\n' +
            '                        <option value="IE">Irland</option>\n' +
            '                        <option value="IS">Island</option>\n' +
            '                        <option value="IL">Israel</option>\n' +
            '                        <option value="IT">Italien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="J">\n' +
            '                        <option value="JM">Jamaika</option>\n' +
            '                        <option value="JP">Japan</option>\n' +
            '                        <option value="YE">Jemen</option>\n' +
            '                        <option value="JE">Jersey (Kanalinsel)</option>\n' +
            '                        <option value="JO">Jordanien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="K">\n' +
            '                        <option value="KY">Kaimaninseln</option>\n' +
            '                        <option value="KH">Kambodscha</option>\n' +
            '                        <option value="CM">Kamerun</option>\n' +
            '                        <option value="CA">Kanada</option>\n' +
            '                        <option value="IC">Kanarische Inseln</option>\n' +
            '                        <option value="CV">Kap Verde</option>\n' +
            '                        <option value="KZ">Kasachstan</option>\n' +
            '                        <option value="QA">Katar</option>\n' +
            '                        <option value="KE">Kenia</option>\n' +
            '                        <option value="KG">Kirgisistan</option>\n' +
            '                        <option value="KI">Kiribati</option>\n' +
            '                        <option value="CC">Kokosinseln</option>\n' +
            '                        <option value="CO">Kolumbien</option>\n' +
            '                        <option value="KM">Komoren</option>\n' +
            '                        <option value="CD">Demokratische Republik Kongo</option>\n' +
            '                        <option value="KP">Demokratische Volksrepublik Korea (Nordkorea)</option>\n' +
            '                        <option value="KR">Republik Korea (Südkorea)</option>\n' +
            '                        <option value="HR">Kroatien</option>\n' +
            '                        <option value="CU">Kuba</option>\n' +
            '                        <option value="KW">Kuwait</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="L">\n' +
            '                        <option value="LA">Laos</option>\n' +
            '                        <option value="LS">Lesotho</option>\n' +
            '                        <option value="LV">Lettland</option>\n' +
            '                        <option value="LB">Libanon</option>\n' +
            '                        <option value="LR">Liberia</option>\n' +
            '                        <option value="LY">Libyen</option>\n' +
            '                        <option value="LI">Liechtenstein</option>\n' +
            '                        <option value="LT">Litauen</option>\n' +
            '                        <option value="LU">Luxemburg</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="M">\n' +
            '                        <option value="MO">Macao</option>\n' +
            '                        <option value="MG">Madagaskar</option>\n' +
            '                        <option value="MW">Malawi</option>\n' +
            '                        <option value="MY">Malaysia</option>\n' +
            '                        <option value="MV">Malediven</option>\n' +
            '                        <option value="ML">Mali</option>\n' +
            '                        <option value="MT">Malta</option>\n' +
            '                        <option value="MA">Marokko</option>\n' +
            '                        <option value="MH">Marshallinseln</option>\n' +
            '                        <option value="MQ">Martinique</option>\n' +
            '                        <option value="MR">Mauretanien</option>\n' +
            '                        <option value="MU">Mauritius</option>\n' +
            '                        <option value="YT">Mayotte</option>\n' +
            '                        <option value="MK">Mazedonien</option>\n' +
            '                        <option value="MX">Mexiko</option>\n' +
            '                        <option value="FM">Mikronesien</option>\n' +
            '                        <option value="MD">Moldawien (Republik Moldau)</option>\n' +
            '                        <option value="MC">Monaco</option>\n' +
            '                        <option value="MN">Mongolei</option>\n' +
            '                        <option value="ME">Montenegro</option>\n' +
            '                        <option value="MS">Montserrat</option>\n' +
            '                        <option value="MZ">Mosambik</option>\n' +
            '                        <option value="MM">Myanmar (Burma)</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="N">\n' +
            '                        <option value="NA">Namibia</option>\n' +
            '                        <option value="NR">Nauru</option>\n' +
            '                        <option value="NP">Nepal</option>\n' +
            '                        <option value="NC">Neukaledonien</option>\n' +
            '                        <option value="NZ">Neuseeland</option>\n' +
            '                        <option value="NI">Nicaragua</option>\n' +
            '                        <option value="NL">Niederlande</option>\n' +
            '                        <option value="AN">Niederländische Antillen</option>\n' +
            '                        <option value="NE">Niger</option>\n' +
            '                        <option value="NG">Nigeria</option>\n' +
            '                        <option value="NU">Niue</option>\n' +
            '                        <option value="MP">Nördliche Marianen</option>\n' +
            '                        <option value="NF">Norfolkinsel</option>\n' +
            '                        <option value="NO">Norwegen</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="O">\n' +
            '                        <option value="OM">Oman</option>\n' +
            '                        <option value="XO">Orbit</option>\n' +
            '                        <option value="AT">Österreich</option>\n' +
            '                        <option value="TL">Osttimor (Timor-Leste)</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="P">\n' +
            '                        <option value="PK">Pakistan</option>\n' +
            '                        <option value="PS">Palästinensische Autonomiegebiete</option>\n' +
            '                        <option value="PW">Palau</option>\n' +
            '                        <option value="PA">Panama</option>\n' +
            '                        <option value="PG">Papua-Neuguinea</option>\n' +
            '                        <option value="PY">Paraguay</option>\n' +
            '                        <option value="PE">Peru</option>\n' +
            '                        <option value="PH">Philippinen</option>\n' +
            '                        <option value="PN">Pitcairninseln</option>\n' +
            '                        <option value="PL">Polen</option>\n' +
            '                        <option value="PT">Portugal</option>\n' +
            '                        <option value="PR">Puerto Rico</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="Q"></option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="R">\n' +
            '                        <option value="TW">Republik China (Taiwan)</option>\n' +
            '                        <option value="CG">Republik Kongo</option>\n' +
            '                        <option value="RE">Réunion</option>\n' +
            '                        <option value="RW">Ruanda</option>\n' +
            '                        <option value="RO">Rumänien</option>\n' +
            '                        <option value="RU">Russische Föderation</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="S">\n' +
            '                        <option value="BL">Saint-Barthélemy</option>\n' +
            '                        <option value="MF">Saint-Martin</option>\n' +
            '                        <option value="SB">Salomonen</option>\n' +
            '                        <option value="ZM">Sambia</option>\n' +
            '                        <option value="WS">Samoa</option>\n' +
            '                        <option value="SM">San Marino</option>\n' +
            '                        <option value="ST">São Tomé und Príncipe</option>\n' +
            '                        <option value="SA">Saudi-Arabien</option>\n' +
            '                        <option value="SE">Schweden</option>\n' +
            '                        <option value="CH">Schweiz</option>\n' +
            '                        <option value="SN">Senegal</option>\n' +
            '                        <option value="RS">Serbien</option>\n' +
            '                        <option value="SC">Seychellen</option>\n' +
            '                        <option value="SL">Sierra Leone</option>\n' +
            '                        <option value="ZW">Simbabwe</option>\n' +
            '                        <option value="SG">Singapur</option>\n' +
            '                        <option value="SK">Slowakei</option>\n' +
            '                        <option value="SI">Slowenien</option>\n' +
            '                        <option value="SO">Somalia</option>\n' +
            '                        <option value="ES">Spanien</option>\n' +
            '                        <option value="LK">Sri Lanka</option>\n' +
            '                        <option value="SH">St. Helena</option>\n' +
            '                        <option value="KN">St. Kitts und Nevis</option>\n' +
            '                        <option value="LC">St. Lucia</option>\n' +
            '                        <option value="PM">Saint-Pierre und Miquelon</option>\n' +
            '                        <option value="VC">St. Vincent und die Grenadinen</option>\n' +
            '                        <option value="ZA">Südafrika</option>\n' +
            '                        <option value="SD">Sudan</option>\n' +
            '                        <option value="GS">Südgeorgien und die Südlichen Sandwichinseln</option>\n' +
            '                        <option value="SR">Suriname</option>\n' +
            '                        <option value="SJ">Svalbard und Jan Mayen</option>\n' +
            '                        <option value="SZ">Swasiland</option>\n' +
            '                        <option value="SY">Syrien</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="T">\n' +
            '                        <option value="TJ">Tadschikistan</option>\n' +
            '                        <option value="TZ">Tansania</option>\n' +
            '                        <option value="TH">Thailand</option>\n' +
            '                        <option value="TG">Togo</option>\n' +
            '                        <option value="TK">Tokelau</option>\n' +
            '                        <option value="TO">Tonga</option>\n' +
            '                        <option value="TT">Trinidad und Tobago</option>\n' +
            '                        <option value="TA">Tristan da Cunha</option>\n' +
            '                        <option value="TD">Tschad</option>\n' +
            '                        <option value="CZ">Tschechische Republik</option>\n' +
            '                        <option value="TN">Tunesien</option>\n' +
            '                        <option value="TR">Türkei</option>\n' +
            '                        <option value="TM">Turkmenistan</option>\n' +
            '                        <option value="TC">Turks- und Caicosinseln</option>\n' +
            '                        <option value="TV">Tuvalu</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="U">\n' +
            '                        <option value="UG">Uganda</option>\n' +
            '                        <option value="UA">Ukraine</option>\n' +
            '                        <option value="HU">Ungarn</option>\n' +
            '                        <option value="UY">Uruguay</option>\n' +
            '                        <option value="UZ">Usbekistan</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="V">\n' +
            '                        <option value="VU">Vanuatu</option>\n' +
            '                        <option value="VA">Vatikanstadt</option>\n' +
            '                        <option value="VE">Venezuela</option>\n' +
            '                        <option value="AE">Vereinigte Arabische Emirate</option>\n' +
            '                        <option value="US">Vereinigte Staaten von Amerika (USA)</option>\n' +
            '                        <option value="GB">Vereinigtes Königreich Großbritannien und Nordirland\n' +
            '                        </option>\n' +
            '                        <option value="VN">Vietnam</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="W">\n' +
            '                        <option value="WF">Wallis und Futuna</option>\n' +
            '                        <option value="CX">Weihnachtsinsel</option>\n' +
            '                        <option value="EH">Westsahara</option>\n' +
            '                    </optgroup>\n' +
            '                    <optgroup label="Z">\n' +
            '                        <option value="CF">Zentralafrikanische Republik</option>\n' +
            '                        <option value="CY">Zypern</option>\n' +
            '                    </optgroup>\n' +
            '                </select>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie Ihr Wohnland an.\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group form-group-lg col-md-12" id="form-group-strasse' + newId + '">\n' +
            '\n' +
            '                <label for="strasse" class="small">Straße + Hausnummer</label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="strasse"\n' +
            '                       placeholder="Straße"\n' +
            '                       aria-label="Straße"\n' +
            '                       name="street-address"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie die Straße und Hausnummer an.\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '        </div>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-md-4" id="form-group-plz' + newId + '">\n' +
            '\n' +
            '                <label for="plz' + newId + '" class="small">PLZ</label><span class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="plz' + newId + '"\n' +
            '                       placeholder="PLZ"\n' +
            '                       aria-label="PLZ"\n' +
            '                       name="postal-address"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie die Postleitzahl an.\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="form-group form-group-lg col-md-8" id="form-group-ort' + newId + '">\n' +
            '                <label for="ort' + newId + '" class="small">Ort</label><span class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="ort' + newId + '"\n' +
            '                       placeholder="Ort"\n' +
            '                       aria-label="Ort"\n' +
            '                       name="city"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie den Wohnort an.\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '        </div>\n' +
            '        <div class="form-row" style="padding: auto 5px;" >\n' +
            '            <div class="form-group" id="form-group-meldezettel' + newId + '">\n' +
            '                <label class="small" for="meldezettel' + newId + '">Meldezettel hochladen (jpeg, png, gif,\n' +
            '                    pdf)</label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <input type="file" class="form-control-file " id="meldezettel' + newId + '" max-size="10"\n' +
            '                >\n' +
            '                <div class="invalid-feedback">Bitte laden Sie einen Meldezettel hoch</div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '    </fieldset>\n' +
            '    <fieldset class=" fieldset  border-bottom-0  py-4 px-sm-1 px-md-4">\n' +
            '        <h4>Beruf</h4>\n' +
            '        <div class="form-row">\n' +
            '            <div class="form-group form-group-lg col-12" id="form-group-beruf' + newId + '">\n' +
            '\n' +
            '                <label for="beruf' + newId + '" class="small">Beruf</label><span class="red small">*</span>\n' +
            '                <input type="text" class="form-control validate" id="beruf' + newId + '"\n' +
            '                       placeholder="Beruf"\n' +
            '                       aria-label="Beruf"\n' +
            '                       name="beruf"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                       required>\n' +
            '                <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie den Beruf an.\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="form-group form-group-lg col-12">\n' +
            '\n' +
            '                <label for="dienstgeber' + newId + '" class="small">Dienstgeber</label>\n' +
            '                <input type="text" class="form-control" id="dienstgeber' + newId + '"\n' +
            '                       placeholder="Dienstgeber"\n' +
            '                       aria-label="Dienstgeber"\n' +
            '                       name="dienstgeber"\n' +
            '                       oninput="this.className = \'form-control\'"\n' +
            '                >\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="form-group form-group-lg col-12" id="form-group-jahresnettoeinkommen' + newId + '">\n' +
            '\n' +
            '                <label for="jahresnettoeinkommen' + newId + '" class="small">Jahresnettoeinkommen</label><span\n' +
            '                    class="red small">*</span>\n' +
            '                <a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
            '                   data-placement="top" data-trigger="focus" title="Jahresnettoeinkommen"\n' +
            '                   data-content="<p>Falls dieser Mitinteressent kein Jahreseinkommen hat, geben Sie bitte 0 ein.</p>">i</a>\n' +
            '\n' +
            '                <input type="number" class="form-control validate" id="jahresnettoeinkommen' + newId + '"\n' +
            '                       placeholder="Jahresnettoeinkommen"\n' +
            '                       aria-label="Jahresnettoeinkommen"\n' +
            '                       name="jahresnettoeinkommen"\n' +
            '                       onchange="this.className = \'form-control\'"\n' +
            '                       required oninput="checkEinkommen(this, ' + newId + ')">' +
            '                   <div class="invalid-feedback">\n' +
            '                    Bitte geben Sie das Jahresnettoeinkommen an.\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '  <div id="lohnzettel' + newId + '"></div>' +

            '        </div>\n' +
            '    </fieldset>\n' +
            ' <div class=" ">\n' +
            '                        <button type="button" class="btn addBtn" id="addPerson' + newId + 1 + '" \n' +
            '                                onclick="addPersonToMitinteressenten(this)"> weitere Person\n' +
            '                            hinzufügen\n' +
            '                        </button>\n' +
            '                    </div>' +
            '</fieldset>'
        );


    }
    var mainContent = document.getElementsByClassName("main-content");

    var scrollOffset;
    for(elem of mainContent){
        scrollOffset = window.getComputedStyle(elem).getPropertyValue("padding-top");
        scrollOffset = parseInt(scrollOffset.replace("px",""));

    }

    document.getElementById("mitinteressentNr" + newId).scrollIntoView({top: scrollOffset});

    initializePopover();

}

function deletePerson(button) {
    var id = button.id;
    var idNumber = id.replace("deletePerson", "");
    console.log(idNumber);
    $("#mitinteressentNr" + idNumber).remove();


}

function checkPersonEWR(personId) {
    var ewr = document.getElementById("ewr-country" + personId);
    console.log(personId)

    if (ewr.value != "") {
        if (ewr.value == "BE"
            || ewr.value == "BG"
            || ewr.value == "DK"
            || ewr.value == "DE"
            || ewr.value == "EE"
            || ewr.value == "FI"
            || ewr.value == "FR"
            || ewr.value == "GR"
            || ewr.value == "IE"
            || ewr.value == "IS"
            || ewr.value == "IT"
            || ewr.value == "HR"
            || ewr.value == "LI"
            || ewr.value == "LV"
            || ewr.value == "LT"
            || ewr.value == "LU"
            || ewr.value == "MT"
            || ewr.value == "NL"
            || ewr.value == "NO"
            || ewr.value == "AT"
            || ewr.value == "PL"
            || ewr.value == "PT"
            || ewr.value == "RO"
            || ewr.value == "SE"
            || ewr.value == "SK"
            || ewr.value == "SI"
            || ewr.value == "ES"
            || ewr.value == "CZ"
            || ewr.value == "HU"
            || ewr.value == "CY"
        ) {
            //show EWR Form

            loadPersonEWR(personId);

        }
        else {
            //show none ewr

            loadNonePersonEWR(personId);
        }
    }

}

function loadPersonEWR(personId) {

    document.getElementById("daueraufenthalt" + personId).classList.add("d-none");
    document.getElementById("ewr-form-group" + personId).innerHTML =
        '<div class="form-group col-md-12" aria-label="Reisepasskopie">\n' +
        '\n' +
        '                            <div class="form-group">\n' +
        '                                <label for="reisepasskopie' + personId + '">Reisepasskopie / Staatsbürgerschaftsnachweis</label>\n' +
        '                                <input type="file" class="form-control-file" id="reisepasskopie' + personId + '">\n' +
        '                            </div>'
    ;
}

function loadNonePersonEWR(personId) {

    document.getElementById("daueraufenthalt" + personId).classList.add("d-none");
    document.getElementById("ewr-form-group" + personId).innerHTML =

        '                            <div class="form-group col-md-12">\n' +
        '                                <label for="reisepass' + personId + '">Reisepasskopie hochladen</label>\n' +
        '                                <input type="file" class="form-control-file" id="reisepass' + personId + '">\n' +
        '                            </div>\n' +
        '                            <p class="mt-3 mb-0">Haben Sie eine Aufenthaltskarte mit dem Titel „Daueraufenthalt EU“? </p>\n' +
        '                            <div class="form-group col-md-12">\n' +
        '\n' +
        '                                <input type="radio" name="daueraufenthalt" id="daueraufenthaltJa' + personId + '" onclick="loadDauerAufenthaltPerson()">\n' +
        '                                <label for="daueraufenthaltJa' + personId + '">Ja</label>\n' +
        '                                <input type="radio" name="daueraufenthalt" id="daueraufenthaltNein' + personId + '" onclick="loadDauerAufenthaltPersonNein()">\n' +
        '                                <label for="daueraufenthaltNein' + personId + '">Nein</label>\n' +
        '\n' +
        '                            </div>';
}

function loadDauerAufenthaltPerson(personId) {
    document.getElementById("daueraufenthalt" + personId).classList.remove("d-none");
    document.getElementById("daueraufenthalt" + personId).innerHTML =
        '<div class="form-row"> <div class="form-group col-md-12"><label for="daueraufenthaltskarte' + personId + '">Daueraufenthaltskarte hochladen</label>' +
        '<input type="file" class="form-control-file" id="daueraufenthaltskarte' + personId + '"></div></div>';
}

function loadDauerAufenthaltPersonNein() {
    document.getElementById("daueraufenthalt" + personId).classList.remove("d-none");
    document.getElementById("daueraufenthalt" + personId).innerHTML = ' <div class="form-row">\n' +
        '                        <p class="">Ich Ihrem Fall sind folgende Nachweise unbedingt erforderlich – da wir Ihre Anmeldung ansonsten nicht entgegen nehmen können.</p>\n' +
        '                        <div class="form-group col-md-12 my-4">\n' +
        '                            <p class=" small">Versicherungsdatenauszug über\n' +
        '                                sozialversicherungspflichtiges Einkommen für mindestens 54 Monate innerhalb der letzten\n' +
        '                                fünf Jahre oder insgesamt mindestens 240 Monate </p>\n' +
        '                            <label class="mt-0 mb-2 small" for="versicherungsdatenauszug' + personId + '">Versicherungsdatenauszug</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '\n' +
        ' ' +
        '                            <input type="file" class="form-control-file" id="versicherungsdatenauszug' + personId + '">\n' +
        '                        </div>\n' +
        '                        <div class="form-group col-md-12 my-4">\n' +
        '                            <p class=" small">Meldebestätigung Auszug aus den Zentralen Melderegister über mind. 5 Jahre Hauptwohnsitz in Österreich</p>\n' +
        '                            <label class="mt-0 small mb-2" for="meldebestätigung' + personId + '">Meldebestätigung</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '                            <input type="file" class="form-control-file" id="meldebestätigung' + personId + '">\n' +
        '                        </div>\n' +
        '                        <div class="form-group col-md-12 my-4">\n' +
        '                            <p class=" small">Sprachkenntnisse mind. Niveau A2 </p>\n' +
        '                            <label class="mt-0 small mb-2" for="sprachkenntnisse' + personId + '">Zeugnis</label>\n' +
        '<a tabindex="0" class="information " role="button" data-toggle="popover"\n' +
        '                                       data-placement="top" data-trigger="focus" title="Info"\n' +
        '                                       data-content="<p>Info</p>">i</a>\n' +
        '                            <input type="file" class="form-control-file" id="sprachkenntnisse' + personId + '">\n' +
        '                        </div>\n' +
        '                    </div>';
    initializePopover();
}

/**
 * check if specific radio button is checked and display input
 * @param e
 */
function checkRechtsform(e) {
    var divForm = document.getElementById("monatlicheBelastung");
    if (e.id != "") {
        if (e.id != "eigentum") {
            divForm.innerHTML = "" +
                "<div class=\"form-group form-group-lg col-12\">\n" +
                "\n" +
                "                                <label for=\"maxMonatlicheBelastung\" class=\"small\">Maximale monatliche Belastung:\n" +
                "                                    (inkl. Betriebskosten ohne Heizung und Strom)</label><span\n" +
                "                                    class=\"red small\">*</span>\n" +
                "\n" +
                "                                <input type=\"number\" class=\"form-control validate\" id=\"maxMonatlicheBelastung\"\n" +
                "                                       placeholder=\"Maximale monatliche Belastung in €\"\n" +
                "                                       aria-label=\"Maximale monatliche Belastung\"\n" +
                "                                       name=\"maxMonatlicheBelastung\"\n" +
                "                                       oninput=\"this.className = 'form-control'\"\n" +
                "                                       required>\n" +
                "                                <div class=\"invalid-feedback\">\n" +
                "                                    Bitte geben Sie Ihre maximale monatliche Belastung an.\n" +
                "                                </div>\n" +
                "\n" +
                "                            </div>";
        }
        if (e.id == "eigentum") {
            divForm.innerHTML = "";
        }
    }
}

/**check if it is higher than 0
 * if higher load upload
 * @param e
 * @param newId
 */
function checkEinkommen(e, newId) {
    var getMitinteressent = document.getElementById("lohnzettel" + newId);
    if (e.value != null) {
        if (e.value > 0) {
            getMitinteressent.innerHTML = ' <div class="form-group">\n' +
                '                <label class="small" for="jahreslohnzettel' + newId + '">Jahreslohnzettel/Monatslohnzettel\n' +
                '                    hochladen</label><span\n' +
                '                    class="red small">*</span>\n' +
                '                <input type="file" class="form-control-file" id="jahreslohnzettel' + newId + '" multiple>\n' +
                '                <div class="invalid-feedback">Bitte laden Sie den Jahreslohnzettel oder\n' +
                '                    Monatslohnzettel hoch.\n' +
                '                </div>\n' +
                '            </div>\n';
        }
        else {
            getMitinteressent.innerHTML = "";
        }
    }
}

/**if one specific checkbox is checked the others are not required anymore**/
function checkCheckboxes(e) {
    var formRowId = document.getElementById(e.id);
    console.log(formRowId);
    var countofStadtteil = 0;
    if (formRowId) {
        console.log(formRowId);
        var inputs = formRowId.getElementsByClassName("form-check-input");
        console.log(inputs);
        if (inputs.length > 0) {

            for (var i = 0; i < inputs.length; i++) {
                console.log(inputs[i].required)

                if (inputs[i].checked == true) {
                    countofStadtteil++;
                }

                if(inputs[i].checked == false){
                    inputs[0].checked = false;
                }
            }

            if (countofStadtteil > 0) {
                for (var i = 0; i < inputs.length; i++) {
                    //console.log(inputs[i]);
                    inputs[i].removeAttribute("required");
                    inputs[i].required == false;
                    /*
                                            inputs[i].validity.valid = true;
                                            inputs[i].validity.valueMissing = false;
                                            console.log(inputs[i].validity.valid);
                                            console.log(inputs);*/

                }
            }
            else if (countofStadtteil == 0) {

                for (var i = 0; i < inputs.length; i++) {
                    console.log(inputs[i]);
                    inputs[i].setAttribute("required", true);
                    inputs[i].required == true;
                    /* inputs[i].validity.valid = "false";
                     console.log(inputs[i].value);
                     console.log(inputs[i].validity.valid);*/
                }
            }
        }


    }
}
/***Select all if specific checkbox is checked**/
function check_all(idOfParent) {
    var parent = document.getElementById(idOfParent);
    var inputs = parent.getElementsByClassName("form-check-input");
    if (parent) {
        if (inputs[0].checked == true) {
            for (var i = 1; i < inputs.length; i++) {
                inputs[i].checked = true;
            }
        }

    }
}

//TODO
/**scroll to element with id**/
function scrolling(id) {
    var elem = document.getElementById(id);
    var scrollOffset = window.getComputedStyle(elem).getPropertyValue("padding-top");
    scrollOffset = parseInt(scrollOffset);
    elem.scrollIntoView(true);
    // now account for fixed header
    const scrolledY = window.scrollY;
    console.log(window.scrollY);
  /*  if (scrolledY) {
        window.scroll(0, scrolledY - scrollOffset);
    }
*/

}

function updateErrors() {
    $(".was-validated input").change(function () {
        console.log("change")
        showErrors();
    });
}