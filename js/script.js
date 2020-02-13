// Todoolean
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.
$(document).ready(function(){
  printList();

  $('#button').click(function() {
     var buttonClick = $('#input').val(); //----> aggiungiamo
     $('#input').val('');   //-------> svuotiamo il campo
    console.log(buttonClick);
    addNew(buttonClick);
  }
);
  $(document).on('click', '.delete', function(){
    var id = $(this).parent().attr('data-id');
    $(this).parent().remove();
    $.ajax(
      {
        url: 'http://157.230.17.132:3032/todos/' + id,
        method: 'DELETE',
        success: function(data){
          alert('Elemento eliminato con successo');
        },
        error: function(errors) {
          alert('Errore' + errors);
        }
      }
    );
  });
});

// Creiamo la lista delle cose da fare
function printList(){
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
            text: item.text,
            id: item.id
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

// Funzione per i nuovi elementi-lista da aggiungere
function addNew(buttonClick) {
  console.log(buttonClick.trim());
  if(buttonClick.trim() != ""){
  $.ajax(
    {
      url: 'http://157.230.17.132:3032/todos',
      method: 'POST',
      data: {
        text: buttonClick
      },
      success: function(data){
          $('.list').html('');
          printList();
      },
      error: function(errors) {
        alert('Errore' + errors);
      }
    }
  );
} else {
  alert('Inserire un elemento nella lista')
}
}
