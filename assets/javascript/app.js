// api bd3f1b468b3a4812a242ad3c5c1e25f0

function buildQueryURL() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var queryParams = { "api-key": "bd3f1b468b3a4812a242ad3c5c1e25f0" };

    queryParams.q = $("#searchTerm").val().trim();

    var startYear = $("#startYear").val().trim();
    if (parseInt(startYear)) {
        queryParams.begin_date = startYear + "0101";
    };

    var endYear = $("#endYear").val().trim();
    if (parseInt(endYear)) {
        queryParams.end_date = endYear + "0101";
    };

    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
};

function updatePage(NYTData) {
    var numArticles = $("#numberOfRecords").val();
    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");

    for (var i = 0; i < numArticles; i++) {
        var article = NYTData.response.docs[i];
        var articleCount = i + 1;
        var $articleList = $("<ul>");
        $articleList.addClass("list-group")
        $("#results").append($articleList);

        var $articleListItem = $("<li class='list-group-item articleHeadline'>");

        var headline = article.headline;

        if (headline && headline.main) {
            console.log(headline.main);
            $articleListItem.append("<span class='label label-primary'>" + articleCount + "</span><strong> " + headline.main + "</strong>");
        };

        var byline = article.byline;
        if (byline && byline.original) {
            console.log(byline.original);
            $articleListItem.append("<h5>" + byline.original + "</h5>");
        };

        var section = article.section_name;
        console.log(article.section_name);
        if (section) {
            $articleListItem.append("<h5>Section: " + section + "</h5>");
        };

        var pubDate = article.pub_date;
        console.log(article.pub_date);
        if (pubDate) {
            $articleListItem.append("<h5>" + article.pub_date + "</h5>");
        };

        $articleListItem.append("<a href='" + article.web_url + "'> " + article.web_url + "</a>");
        console.log(article.web_url);

        $articleList.append($articleListItem);
    };
};

function clear() {
    $("#results").empty();
};

$("#searchButton").on("click", function(event) {
    event.preventDefault();
    clear();

    var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});

$("#clearButton").on("click", clear);