function reload() {
    console.log("loaded");
    console.log(getAll());
    var items = getAll();
    if (items.length===0) {
        $("#dinotable").hide();
        $("#emptylist").show();
        return;
    }
    $("#dinotable").show();
    $("#emptylist").hide();

    $("#todoitems").empty();
    for (i = 0; i < items.length; i++) {
        var item = items[i]
        var id = item.id;
        console.log(item.title, item.completed)
        var checkbox = $("<input>").attr("type", "checkbox").attr("todoitemid", id).prop('checked', item.completed)
        var tdCheckbox = $("<td>").append(checkbox).addClass('tododone');
        var tdTitle = $("<td>").addClass('todotitle').text(item.title).attr("todoitemid", id);
        var spanRemove = $("<span>").addClass('glyphicon glyphicon-remove');
        var buttonRemove = $("<button>").attr("type", "button").addClass('btn btn-danger delete').append(spanRemove).attr("todoitemid", id)

        buttonRemove.on("click", function(e) {
            var todoid = $(this).attr("todoitemid");
            console.log(remove(todoid));
            reload();
        });

        checkbox.change(function() {
            console.log(this)
            var todoid = $(this).attr("todoitemid");
            var status = $(this).is(':checked');
            console.log(todoid, status);
            setStatus(todoid, status);
            reload();
        })

        tdTitle.on("dblclick", function() {
            console.log("Double Click");
            var todoid = $(this).attr("todoitemid");
            var item = get(todoid);
            console.log("to do item ID", todoid);
            var result = prompt("Change Title", item.title);
            if (result === null)
                return
            setTitle(todoid, result);
            reload();


        })

        var tdRemove = $("<td>").addClass('todoremove').append(buttonRemove);
        var tr = $("<tr>").append(tdCheckbox).append(tdTitle).append(tdRemove);
        if (item.completed) {
            tr.addClass("done")
        }

        $("#todoitems").append(tr);

    }
}


$(function() {
    $.get( "/listofitems", function( data ) {
       console.log( data );
   });
    console.log ("sent request to the server");

    $("#inputtext").val("").focus();
    reload();
    $('#inputtext').on("keyup", function(e) {
        if (e.keyCode === 13) {
            console.log("Enter was released");
            $('#addbutton').click();
        }
    })
    $('#addbutton').on("click", function() {

        var text = $('#inputtext').val();
        if (text.length === 0) {
            $('#inputtext').parent().addClass("has-error");
            return;
        }
        $('#inputtext').parent().removeClass("has-error");
        create(text);
        reload();
        $("#inputtext").val("").focus();

    });
})