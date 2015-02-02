// The function to create minefield	and randomly assign mines
var build_minefield = function(rows, columns, mines) {
	var total = rows * columns;

    //Create minefield as a table with rows and columns
    for (var i = 0; i < rows; i++) {
        var row = $("<tr class='row'></tr>");
        $("#minefield").append(row); 
        for (var j = 0; j < columns; j++) {
            var cell = $("<td class='cell'></td>");
            row.append(cell);  
        }
    }
    
    // Randomly get mines' position in the minefield
    var mine_pos = get_mine_position(total, mines);
    
    // Assign mines to designated cell
	for (var k = 0; k < mines; k++) {
    	mine_cell = $("td").eq(mine_pos[k]); 
    	// Add class "mine" to the cell that is assigned mine
    	$("#minefield").find(mine_cell).addClass("mine");
    } 
    
    /* Calculate the number of adjacent mines of a cell, and assigned the number to the 
    cell's value */
    $("td").each(function(){
    	if (!$(this).hasClass("mine")) {
    		// Get the adjacent cells
    		var cell_adjacent = get_adjacent($(this));
    		// Calculate the number of adjacent mines of the cell
    		var num_mine = get_number_of_adjacent(cell_adjacent, "mine");
    		// Set the cell's value to the number to the number of adjacent mines
    		$(this).attr("value", num_mine);
    	}
    	
    });	 
    
    // Inistialize the number of mines
    $("#numFlag").html(mines);
};


// The function to randomly get mines' position, returns an array of cell's index
function get_mine_position(total, mines) {
	var mine_position = [];
	var m = mines;
	var mine_array = [];
	for (var i = 0; i < total; i++) {
		mine_array.push(i);
	}
	for (var i = 0; i < m; i++) {
		var position = Math.floor(Math.random() * total);
		temp = mine_array[position];
		mine_array[position] = mine_array[total-1];
		mine_array[total-1] = temp;
		mine_position.push(mine_array[total-1]);
		total -= 1;	
	}
	return mine_position;
};





/* The function to calculate the number of adjacent mines of a cell, returns the number of
mines of a cell */
function get_number_of_adjacent(cell_adjacent, label) {
	var number_of_label = 0;
	for (var i = 0; i < cell_adjacent.length; i++){
		if (cell_adjacent[i].hasClass(label)) {
			number_of_label += 1;
		}
	}
	return number_of_label;
};


// The function to check a cell that has not been left-clicked
function check_unclicked_cell(cell) {
	if ((!cell.hasClass("clicked"))&&(!cell.hasClass("flag"))){
		var cell_adjacent = get_adjacent(cell);
		/* If a cell with mine is left-clicked and it is not marked as mine, the user lose
		the game */
		if (cell.hasClass("mine")) {
			lose_game();
			cell.css("background-color", "red");
			$("#minefield").addClass("lose");
		}
		else {
			/* If a cell without mine is left-clicked, clear the cell and if the cell 
			hasn't any adjacent mine, clear its adjacent cell */
			if (cell.attr("value") == 0) {
				cell.addClass("clicked");
				cell_adjacent.forEach(function(entry) {
					check_unclicked_cell(entry);
				});
			}
			else {
				cell.html(cell.attr("value"));
				cell.addClass("clicked");
			}
		}
	}
};


/* The function to check a cell has already been left-clicked, check whether the number 
of adjacent cells that have been marked as mines equals exactly the number indicated by 
the cell's value */
function check_clicked_cell(cell) {
	// Get cell's adjacent cells
	var cell_adjacent = get_adjacent(cell);
	var flag = 0;
	// Get the number of marked mines of cell's adjacent
	var num_flag = get_number_of_adjacent(cell_adjacent, "flag");
	/* If the number of adjacent cells that have been marked as mines equals exactly the 
	number indicated by the cell's value */
	if (cell.attr("value") == num_flag) {
		// If any adjacent cell is wrongly marked as mine, lose game
		for (var i = 0; i < cell_adjacent.length; i++){
			if (!cell_adjacent[i].hasClass("clicked")) {
				if (cell_adjacent[i].hasClass("mine")) {
					if (!cell_adjacent[i].hasClass("flag")) {
						flag = 1;
					}
				}
			}
		}
		if (flag == 1) {
			lose_game();
			// Display the correct and incorrect mine position
			correct_adjacent(cell_adjacent);
			$("#minefield").addClass("lose");
		}
		// If no adjacent cell is wrongly marked as mine, clear the adjacent cell
		else {
			cell_adjacent.forEach(function(entry) {
				check_unclicked_cell(entry);
			});
		}
	}
	
}


// The function to display lose game and clear the minefield
function lose_game() {
	$("td").each(function() {
		// If wrongly marked a mine
		if ($(this).hasClass("flag")) {
			if (!$(this).hasClass("mine")) {
				$(this).removeClass("flag");
				$(this).addClass("wrongFlag");
			}
		}
		// If left-clicked a mine
		else {
			if ($(this).hasClass("mine")) {
				$(this).addClass("showMine");
			}
		}	
	});
};


// The function to display correct adjacent mine positon
function correct_adjacent(adjacent){
	for (var i = 0; i < adjacent.length; i++) {
		if (adjacent[i].hasClass("mine")) {
			if (!adjacent[i].hasClass("flag")) {
				adjacent[i].css("background-color", "red");
			}
		}
	}
};


// The function to check whether the game is over
function check_game_end() {
	var game_is_end = false;
	var message = "";
	if ($("#minefield").hasClass("lose")) {
		message = "You lose the game! Play Again?";
		game_is_end = true;
	}
	else {
		not_mine_num = $("td").length - $("td").filter(".mine").size();
		if ($(".clicked:not(.mine)").length == not_mine_num) {
			$(".mine:not(.flag)").addClass("showMine");
			message = "You win the game! Play Again?";
			game_is_end = true;
			
		}
	} 
	
	// If the game is over, clear the minefield
	if (game_is_end) {
		if(confirm(message)) {
			$("#minefield").empty();
			$("#minefield").removeClass("lose");
			$("#numFlag").empty();
			$("#setup").trigger("reset");
		}
	}
}