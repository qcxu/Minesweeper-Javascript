// The function to get adjacent cells of a cell, returns an array of adjacent cells
function get_adjacent(cell) {
	var adjacent = [];
	var previous_row = cell.parent().prev();
	var next_row = cell.parent().next();
	// Find the cell in the upper left positon
	if (previous_row.find('td').eq(cell.index()).prev().length) {
		adjacent.push(previous_row.find('td').eq(cell.index()).prev());
	}
	// Find the cell in the upper position
	if (previous_row.find('td').eq(cell.index()).length) {
		adjacent.push(previous_row.find('td').eq(cell.index()));
	}
	// Find the cell in the upper right position
	if (previous_row.find('td').eq(cell.index()).next().length) {
		adjacent.push(previous_row.find('td').eq(cell.index()).next());
	}
	// Find the cell in the left position
	if (cell.prev().length) {
		adjacent.push(cell.prev());
	}
	// Find the cell in the right position
	if (cell.next().length) {
		adjacent.push(cell.next());
	}
	// Find the cell in the lower left position
	if (next_row.find('td').eq(cell.index()).prev().length) {
		adjacent.push(next_row.find('td').eq(cell.index()).prev());
	}
	// Find the cell in the lower position
	if (next_row.find('td').eq(cell.index()).length) {
		adjacent.push(next_row.find('td').eq(cell.index()));
	}
	// Find the cell in the lower right position
	if (next_row.find('td').eq(cell.index()).next().length) {
		adjacent.push(next_row.find('td').eq(cell.index()).next());
	}
	return adjacent;
};