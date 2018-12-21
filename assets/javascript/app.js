// api bd3f1b468b3a4812a242ad3c5c1e25f0
var searchTerm = "stock market crash";
var beginDate = "20180101";
var endDate = "20181220";
var limit = 5;
var page = 0;
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "?begin_date=" + beginDate + "?end_date=" + endDate + "?page=" + page;

$("#searchButton").on("click", function() {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?=" + $("#searchTerm").value();

    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();
    if (startYear.length === 4) {
        queryURL += "?begin_date=" + startYear + "0101";
    };
    if (endYear.length === 4) {
        queryURL += "?end_date=" + endYear + "0101";
    };

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    });
});

$("clearButton").on("click", function() {

});