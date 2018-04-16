
const addnote = note => $("#notes").prepend(
            $('<li></li>').text(`${note.author}:`).append(
            $("<li></li>").text(note.body).append('<hr>'))
            )

//listener for comments buttons
/*
*
*@event: the listener event
*@@this: the comment button
*/
$(document).on("click",".open-comments", function(event) {
	//No, window! No reload!
	event.preventDefault();
	$("#comment-section").empty();
	//drab id from button
	let id = $(this).attr("data-id");
    //get article and populate chat with comments
	$.get(`/api/article/${id}`)
	.done((data,status,xhr) => { 
		//comment section heading with headline
		$("#comment-section").append("<h2><i>Comments</i></h2>");
	    $("#comment-section").append(`<h3 id="comments-caption"><a href=${data.link} target="blank"><i>${data.title}</i></a></h3>`);
		 // A textarea to add a new note body
        $("#comment-section").append("<textarea id='bodyinput' name='body' placeholder='Type your message here'></textarea>");
		//text input for commenter name (for now)
		$("#comment-section").append("<input id='authorinput' name='title' placeholder='Your name (required)' required>");		
		// A button to submit a new note, with the id of the article saved to it
		$("#comment-section").append("<button id='post-comment' data-id='" + data._id + "' class='btn btn-success'>Post Comment</button>");
        $("#comment-section").append("<div id='note-wrapper'><ul id='notes'></ul></div>");
		data.notes.forEach(note => addnote(note));
	})
	.fail(err => console.log(err));

});

//listener for comment post button
/*
*
*@event: the listener event
*@@this: the comment post button
*/
$(document).on("click",".post-comment", function(event){
	//I thought I told you not to Mr. window
	event.preventDefault();
	//grab id from button
	let id = $(this).attr("data-id");
     
	let note = {
      author:$("#authorinput").val(),
      body:$("#bodyinput").val()
	};

	$.post(`/api/article/${id}`,note)
	.done((data,status,xhr) => addnote(note));	
});