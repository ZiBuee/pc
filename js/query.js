function runQuery(query) {
  var result = "";
  $.ajax({
    type: "POST",
    url: "/js/api.php",
    data: { runQuery: query },
    async: false,
    success: function (data) {
      //console.log(data);
      result = JSON.parse(data);
    },
  });
  return result;
}
//const urlParams = new URLSearchParams(window.location.search);
//const productId = urlParams.get("id");

function get_categories() {
  return runQuery("SELECT * FROM categories")
}
function get_category(PKCategory) {
  return runQuery(`SELECT * FROM products WHERE FKCategory = ${PKCategory}`)
} 