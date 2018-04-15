$(document).on("click",".open-comments", function(event) {
	event.preventDefault();
	$("#comment-section").empty();
	let id = $(this).attr("data-id");

	$.get(`/api/article/${id}`)
	.done((data,status,xhr) => { 
	    $("#comment-section").append(`<h3><i>${data.title}</i></h3>`);
        //comment section heading
		$("#comment-section").append("<h2><i>Comments</i></h2>");
		 // A textarea to add a new note body
        $("#comment-section").append("<textarea id='bodyinput' name='body' placeholder='Type your message here'></textarea>");
		//text input for commenter name (for now)
		$("#comment-section").append("<input id='authorinput' name='title' placeholder='Your name (required)' required>");		
		// A button to submit a new note, with the id of the article saved to it
		$("#comment-section").append("<button data-id='" + data._id + "' class='btn btn-success post-comment'>Post Comment</button>");
        $("#comment-section").append("<div><ul id='notes'></ul></div>");
		data.notes.forEach(note => {
			$("#notes").append(`
			<li>${note.author}:</li>
            <li>${note.body}</li>
            <hr>
			`);
		});
	})
	.fail(err => console.log(err));

});

$(document).on("click",".post-comment", function(event){
	event.preventDefault();
	let id = $(this).attr("data-id");

	let note = {
      author:$("#authorinput").val(),
      body:$("#bodyinput").val()
	};

	$.post(`/api/article/${id}`,note)
	.done((data,status,xhr) => {
		$("#notes").append(`
            <li>${note.body}</li>
            <li>${note.author}</li>
            <hr>
			`);
	});
});