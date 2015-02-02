function validate_row() {
	var isValid = false;
	if ($.isNumeric($("#row").val())) {
		if (($("#row").val() >= 8)&($("#row").val() <= 30)) {
			$("#rowError").removeClass("errorDisplay").addClass("error");
			$("#minefield").empty();
			$("#minefield").removeClass();
			isValid = true;
		}
		else {
			$("#rowError").removeClass("error").addClass("errorDisplay");
			$("#minefield").empty();
			$("#minefield").removeClass();
		}
	}
	else {
		$("#rowError").removeClass("error").addClass("errorDisplay");
		$("#minefield").empty();
		$("#minefield").removeClass();
	}
	return isValid;
}

function validate_column() {
	var isValid = false;
	if ($.isNumeric($("#column").val())) {
		if (($("#column").val() >= 8)&($("#column").val() <= 40)) {
			$("#columnError").removeClass("errorDisplay").addClass("error");
			$("#minefield").empty();
			$("#minefield").removeClass();
			isValid = true;
		}
		else {
			$("#columnError").removeClass("error").addClass("errorDisplay");
			$("#minefield").empty();
			$("#minefield").removeClass();
		}
	}
	else {
		$("#columnError").removeClass("error").addClass("errorDisplay");
		$("#minefield").empty();
		$("#minefield").removeClass();
	}
	return isValid;
}


function validate_mine() {
	var isValid = false;
	var sum = parseInt($("#row").val()) * parseInt($("#column").val()) -1;
	if ($.isNumeric($("#mines").val())) {
		if (($("#mines").val() >= 1)&($("#mines").val() <= sum)) {
			$("#mineError").removeClass("errorDisplay").addClass("error");
			$("#minefield").empty();
			$("#minefield").removeClass();
			isValid = true;
		}
		else {
			$("#mineError").removeClass("error").addClass("errorDisplay");
			$("#minefield").empty();
			$("#minefield").removeClass();
		}
	}
	else {
		$("#mineError").removeClass("error").addClass("errorDisplay");
		$("#minefield").empty();
		$("#minefield").removeClass();
	}
	return isValid;
}
