// Todoolean
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.
$(document).ready(function(){
  printList();
});




function printList(data){
  $.ajax(
    {
      url: 'http://157.230.17.132:3032/todos',
      method: 'GET',
      success: function(data){
        // console.log(data);
        var list = data;

        var source = $('#list-template').html();
        var template = Handlebars.compile(source);

        // Cicliamo tutti gli elementi della lista
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          console.log(item);
          var context = {
            text: item.text
          }
          // console.log(context);
          var html = template(context);
          $('.list').append(html);
        }
      },
      error: function(errors) {
        alert('Errore' + errors);
      }

    }
  );

}
