function addForm() {
    var newForm = document.getElementById("formwrap").firstChild;
    var cln = newForm.cloneNode(true);

    document.getElementById("wrapper").appendChild(cln);

    $( 'input[type="text"]' )
    .on('focus', function(){ 
        $(this).datepicker(); 
        $(this).datepicker('show');
    });
}

function refreshState (elem) {

   var jElem = $(elem);
   var currentForm = $(elem.parentNode.parentNode);
   var currentFormResultField = $(elem.parentNode.parentNode.lastChild);

   var currentFormResult = 1;

   var fields = $(currentForm).find("select");
   for (var i = 0; i < fields.length; i++) {
    currentFormResult *= fields[i].value;
};

    var days = 0;

    var dateFrom = $(currentForm).find(".from").val();
    dateFrom=dateFrom.split("/");
    var parsedDateFrom = new Date(dateFrom[2],dateFrom[0],dateFrom[1]).getTime();

    var dateTo = $(currentForm).find(".to").val();
    dateTo=dateTo.split("/");
    var parsedDateTo = new Date(dateTo[2],dateTo[0],dateTo[1]).getTime();

    days = Math.floor((parsedDateTo - parsedDateFrom) / 86400000);
    if (days<0) {
        alert ('incorrect date');
        $(currentForm).find(".from").css('border','1px solid red');
        $(currentForm).find(".to").css('border','1px solid red');
    } else   {  
        $(currentForm).find(".from").css('border','1px solid #ccc');
        $(currentForm).find(".to").css('border','1px solid #ccc');
        currentFormResult *= days;
    };


    currentFormResultField.html(currentFormResult);
    recalcTotal();
}

function recalcTotal(){
    var parentForm = $('#wrapper');
    var mainres = $('#mainres');
    var total = 0;

    var allres = $(parentForm).find(".result");

    for (var i=1; i<allres.length; i++) {
        var temp = parseInt(allres[i].innerHTML);
        if (isNaN(temp)) { total+=0
        } else {
            total+=temp;
        }
    }
    if (isNaN(total)) {mainres.html('Итого:  ')
} else {
 mainres.html('Итого:  ' + total);
}
}

function del(elem) {
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    recalcTotal()
}