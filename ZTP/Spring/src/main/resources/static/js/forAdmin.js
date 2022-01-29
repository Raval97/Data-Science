function readBooks(){
    var url = "/SimpleLibrarySpring/dashboard";
    http_request = new XMLHttpRequest();
    http_request.onload = function(xhr) {
        if (xhr.target.status == 200) {
            var data = JSON.parse(xhr.target.response);
            writeBooksToTable(data)
        } else {
            console.log('error');
            console.log(xhr.target.response);
        }
    };
    http_request.open('GET', url, true);
    http_request.send(null);
}

function readBook(id){
    var url = "/SimpleLibrarySpring/dashboard/"+id;
    http_request = new XMLHttpRequest();
    http_request.onload = function(xhr) {
        if (xhr.target.status == 200) {
            var data = JSON.parse(xhr.target.response);
            showBook(data)
        } else {
            console.log('error');
            console.log(xhr.target.response);
        }
    };
    http_request.open('GET', url, true);
    http_request.send(null);
}

function addNewBook(){
    var title = $("#title").val();
    var author = $("#author").val();
    var year = $("#year").val();
    url ="/SimpleLibrarySpring/dashboard"
    http_request = new XMLHttpRequest();
    var data = JSON.stringify({
        "title": title,
        "author": author,
        "year": year
    });
    http_request.onload = function(xhr) {
        if (xhr.target.status == 200) {
            readBooks()
        } else {
            console.log('error');
            console.log(xhr.target.response);
        }
    };
    http_request.open('POST', url, true);
    http_request.send(data);
}

function deleteBook(id){
    var url = "/SimpleLibrarySpring/dashboard/"+id;
    http_request = new XMLHttpRequest();
    http_request.onload = function(xhr) {
        if (xhr.target.status == 200) {
            var data = JSON.parse(xhr.target.response);
            readBooks()
            alert("delete book: " + data.book.title)
        } else {
            console.log('error');
            console.log(xhr.target.response);
        }
    };
    http_request.open('DELETE', url, true);
    http_request.send(null);
}

$(document).ready(function () {

    readBooks()

});

function writeBooksToTable(data){
    document.getElementById("books").innerHTML = data.books.map(function(val, index) {
        tableBody = "<tr>" +
            "<th scope=\"row\">" + (index+1) +"</th>" +
            "<td>" + val.title + "</td>" +
            "<td>" + val.author + "</td>" +
            "<td>" + val.year + "</td>" +
            "<td>" +
                "<button onclick=\"readBook(" + val.id + ")\" + type=\"submit\" class=\"btn btn-primary\">Show</button>" +
            "</td>" +
            "<td>" +
                "<button onclick=\"deleteBook(" + val.id + ")\" + type=\"submit\" class=\"btn btn-primary\">DELETE</button>"  +
            "</td>" +
        "</tr>"
        return tableBody;
    }).join('')
};

function showBook(data){
    tableBody = "<thead className=\"thead-dark\" style=\"color: #fff; background-color: #032044\">" +
        "<tr>" +
            "<th scope=\"col\" colSpan=\"2\" style=\"text-align: center;\">Book Details</th>" +
        "</tr>" +
        "<tbody style=\"color: #fff\">" +
        "<tr>" +
            "<th>ID</th>" +
            "<td className=\"text-center\">" + data.book.id + "</td>" +
        "</tr>" +
        "<tr>" +
            "<th>Title</th>" +
            "<td className=\"text-center\">" + data.book.title + "</td>" +
        "</tr>" +
        "<tr>" +
            "<th>Author</th>" +
            "<td className=\"text-center\">" + data.book.author + "</td>" +
        "</tr>" +
        "<tr>" +
            "<th>Year</th>" +
            "<td className=\"text-center\">" + data.book.year + "</td>" +
        "</tr>" +
        "</tbody>";
    $("#bookDetails").html(tableBody);
};


