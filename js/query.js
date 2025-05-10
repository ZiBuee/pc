function query(request, args) {
  var result = "";
  var data = { request: request}
  if(args != null) {
    data.args = JSON.stringify(args)
  }
  $.ajax({
    type: "POST",
    url: "/js/api.php",
    data: data,
    async: false,
    success: function (data) {
      console.log(data);
      result = JSON.parse(data);
    },
  });
  return result;
}