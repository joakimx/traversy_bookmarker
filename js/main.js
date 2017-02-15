//Listener listen for form submigt

document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e){
  //Get values from from
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
  if (!validateForm(siteUrl, siteName)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  console.log(siteName);
  console.log(siteUrl);
  console.log(bookmark);


/*Local storage test
localStorage.setItem('Test', 'Hello World');
console.log(localStorage.getItem('Test'));
localStorage.removeItem('Test');
console.log(localStorage.getItem('Test'));
*/


//Test if bookmarks bin empty
if(localStorage.getItem('bookmarks') === null){
  var bookmarks = [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //Fetch from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Add bookmark to bookmarks array
  bookmarks.push(bookmark);
  //Reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//fetch bookmarks
fetchBookmarks();
//Prevent from submitting
  e.preventDefault();
}



//Delete Bookmarks
function deleteBookmarks(url){

//Get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Loop through bookarks array
for (var i = 0; i < bookmarks.length; i++) {
  if(bookmarks[i].url == url) {
    //Delete from arr if url passed
    bookmarks.splice(i, 1);
  }
}
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//Refetch bookmarks
fetchBookmarks();
}

//Fetch bookmarks

function fetchBookmarks(){
  //Get Bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output id

  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML = 'HELLO';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

  bookmarksResults.innerHTML += '<div class="well">' +
                                '<h3>'+name+
                                ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                ' <a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                '</h3>'+
                                '</div>';

  }
}

function validateForm(siteName, siteUrl){
  if(!siteUrl || !siteName){
    alert('Please fill out the form');
    return false;
  }

var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
  //var regex = new RegExp(expression);

//  if (!siteUrl.match(regex) {
var siteUrl = document.getElementById("siteUrl").value;
  if (!regexp.test(siteUrl)) {

    alert('Please enter a valid URL!');
    return false;
  }

  return true;
}
