$("#submitBtn").on("click", function(e) {
  e.preventDefault();
  $("#articleBox").empty();

  // Take the values from the input forms
  let serachTerm = $("#searchTerm").val();
  let limit = $("#resultLength").val();
  let start = $("#startYear").val();
  let end = $("#endYear").val();

  // For edge cases with no input resultLength
  if (!limit) {
    limit = 10;
  }

  // Urls for different situations of date boundary input
  let url = "";
  let urlBoth =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
    searchTerm +
    "&begin_date=" +
    start +
    "0101&end_date=" +
    end +
    "0101&api-key=APIKEYGOESHERE";
  let urlStart =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
    searchTerm +
    "&begin_date=" +
    start +
    "0101&api-key=APIKEYGOESHERE";
  let urlEnd =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
    searchTerm +
    "&end_date=" +
    end +
    "0101&api-key=APIKEYGOESHERE";
  let urlNeither =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
    searchTerm +
    "&api-key=";

  // COnditional Statements to prevent error if one or both years aren't input
  if (start === "" && end === "") {
    url = urlNeither;
  } else if (start === "") {
    url = urlEnd;
  } else if (end === "") {
    url = urlStart;
  } else {
    url = urlBoth;
  }

  // Send ajax call to API
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    // After promise, retrieve info and append to article box div

    let { data } = response.response.docs[i];
    for (var i = 0; i < limit; i++) {
      let title = $("<h3>").text(data.headline.main);

      let articleURL = $("<a>")
        .attr("href", data.web_url)
        .append(title);

      let snippet = $("<p>").text(data.snippet);

      let pubDate = $("<p>").html(
        `<b>Published In: ${data.pub_date.slice(0, 4)}`
      );
      console.log(data);
    }
  });
});
