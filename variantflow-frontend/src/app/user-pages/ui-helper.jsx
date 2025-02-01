import React from "react";
import { createTheme } from "react-data-table-component";

export const customStylesForSelect = {
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "blue" : "white", // Change the background color as desired
		color: state.isSelected ? "white" : "black", // Change the text color as desired
	}),
};
export const hoverEffectOnSelect = {
	option: (base, state) => ({
		...customStylesForSelect.option(base, state),
		"&:hover": {
			backgroundColor: "lightgray", // Change the hover background color
			color: "black", // Change the hover text color
		},
	}),
};

export const createDataTableTheme = () => {
	createTheme(
		"solarized",
		{
			background: {
				default: "transparent",
			},
			action: {
				button: "rgba(0,0,0,.54)",
				hover: "rgba(0,0,0,.08)",
				disabled: "rgba(0,0,0,.12)",
			},
		},
		"dark"
	);
};

export function getConvertedAmount(amount) {
	if (isNaN(amount)) {
		return "...";
	}
	if (amount < 1000) {
		return amount.toString();
	}
	if (amount >= 1000 && amount < 100000) {
		return (amount / 1000).toFixed(2) + " K";
	}
	if (amount >= 100000 && amount < 10000000) {
		return (amount / 100000).toFixed(2) + " L";
	}
	if (amount >= 10000000) {
		return (amount / 10000000).toFixed(2) + " Cr";
	}
}



// Function to create dark theme for DataTable
export const createDataTableDarkTheme = () => {
	createTheme(
		"solarized",
		{
			background: {
				default: "transparent",
			},
			action: {
				button: "rgba(0,0,0,.54)",
				hover: "rgba(0,0,0,.08)",
				disabled: "rgba(0,0,0,.12)",
			},
		},
		"dark"
	);
}

// Function to reset DataTable theme to default values
export const resetDataTableTheme = () => {
	createTheme(
		"resesolarized",
		{
			background: {
				default: "#fff",
			},
			action: {
				button: "rgba(0,0,0,.54)",
				hover: "rgba(0,0,0,.08)",
				disabled: "rgba(0,0,0,.12)",
			},
		},
		"light"
	);
}

// theme color for DATATABLE package
export const getTheme = () => {
	const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";

	if (isDarkTheme) {
		createDataTableDarkTheme();
		return "solarized";
	} else {
		resetDataTableTheme(); // Reset the theme when switching to light theme
		return "resesolarized";
	}
};

// data table custom styles
export const customStyles = {
	// data table columns header styles
	headCells: {
		style: {
			fontWeight: 'bold',
			fontSize: '14px',
			textAlign: 'center',
		},
	},
};