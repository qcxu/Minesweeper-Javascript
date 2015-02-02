$(document).ready(function() {
	/* After submission, get the number of rows, columns and mines from user input and 
	create the minefield with mines */
	
	$("#setup").submit(function(e) {
		// Get the number of rows, columns and mines from user input
		var number_row = $("#row").val();
		var number_column = $("#column").val();
		var number_mine = $("#mines").val();
		e.preventDefault();
		// var rowIsValid = validate_row(number_row);
// 		if (rowIsValid) {
// 			build_minefield(number_row, number_column, number_mine);
// 		}
		if (validate_row() & validate_column() 
			& validate_mine()) {
			build_minefield(number_row, number_column, number_mine);
		}
	});
	
	// Initialize minefield
	
		
	// Number of cell marked as mines
	var num_flag = 0; 
	
	// Start a new game
	$("#minefield").on('mousedown', 'td', function(event) {	
		switch (event.which) {
			// Left-clicked
			case 1:
				// Check whether the cell is already marked as mine
				if (!$(this).hasClass("flag")) {
					/* Check whether the cell has already been clicked, if so, check the 
					cell with adjacent cells */
					if ($(this).hasClass("clicked")) {
						check_clicked_cell($(this));
						check_game_end();
					}
					// If the cell has not been clicked, check whether the cell is bomb
					else {
						check_unclicked_cell($(this));
						check_game_end();
					}
				}
				break;
			case 2:
				break;
			// Right-clicked
			case 3:
				/* If the cell has not been left-clicked yet, check whether to mark the
				cell as mine */
				if (!$(this).hasClass("clicked")) {
					// If the cell has already been marked as mine, remove the mark
					if ($(this).hasClass("flag")) {
						$(this).removeClass("flag");
						if (num_flag >= 1) {
							num_flag -= 1;
						}
					}
					// If the cell has not been marked as mine, mark it as mine
					else {
						$(this).addClass("flag");
						num_flag += 1;
					}	
				}
				
				// Display the number of mines not yet thought to be found
				left_flag = $("#mines").val() - num_flag;
				$("#numFlag").html(left_flag);
				break;
			default:
		}
	});
	
	// Disable right-click context menu
	$("#minefield").on("contextmenu", "td", function(event){
		event.preventDefault();
	});
		
});
	

