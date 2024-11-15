import openpyxl

# Load the converted .xlsx workbook
wb = openpyxl.load_workbook('heat_load_sheet.xlsx', data_only=False)

# Select the active sheet
sheet = wb.active
formula_dict = {}

# Go through each cell to identify formulas and input values
for row in sheet.iter_rows():
    for cell in row:
        # Check if the cell's value is a formula
        if isinstance(cell.value, str) and cell.value.startswith('='):
            formula_dict[cell.coordinate] = cell.value  # Store the formula as a string
        else:
            formula_dict[cell.coordinate] = cell.value  # Store the raw value

# Function to translate Excel formulas to Python expressions
def translate_formula(formula):
    # Replace Excel-specific operators and functions
    python_formula = formula.replace("^", "**")  # Replace exponentiation
    python_formula = python_formula.replace("SUM(", "sum(")  # Convert SUM function
    python_formula = python_formula.replace("AVERAGE(", "avg(")  # Convert AVERAGE function
    # Additional replacements can be added here as needed
    return python_formula

# Process each formula and convert it to Python code
for cell, formula in formula_dict.items():
    if isinstance(formula, str) and formula.startswith('='):  # Likely a formula
        translated_formula = translate_formula(formula[1:])  # Remove '=' sign
        print(f"Cell {cell}: {translated_formula}")  # Display the translated formula
    else:
        print(f"Cell {cell}: {formula}")  # Display the raw value

# Optionally: Save the translated formulas to a file
with open('translated_formulas.txt', 'w') as f:
    for cell, formula in formula_dict.items():
        if isinstance(formula, str) and formula.startswith('='):
            translated_formula = translate_formula(formula[1:])  # Remove '=' sign
            f.write(f"Cell {cell}: {translated_formula}\n")  # Save the translated formula
        else:
            f.write(f"Cell {cell}: {formula}\n")  # Save the raw value
