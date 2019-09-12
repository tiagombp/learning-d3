// helper functions

let parseTime = d3.timeParse("%Y-%m")

d3.text("./data/vehicle_sales_data.csv").then(function(text) {
    
    // takes the text and parses it, row by row, as a csv file, converting each row to an array of... comma separated values,
    // thus generating an array of arrays
    let rows = d3.csvParseRows(text);
    console.log(rows);

    // in this structure, the first three elements / rows represent vehicle info: make, model and type, respectively.
    // from the fourth element / row, for each array / row, the first element represents the date; the rest, the sale values.
    console.log(rows[3]);
    console.log(rows[3][0]);

    // given all that, let's make a dataset.
    let dataset = [];

    // loop along the rows, skipping the first three, which contain only vehicle info, not sales values

    for (let i = 3; i < rows.length; i++) {
        // let's create the dataset elements / objects:
        dataset[i-3] = {
            // first let's remember that the first element of the row corresponds to the date, so...
            date: parseTime(rows[i][0])
        };

        // now let's loop through each vehicle of this row
        for (let j = 1; j < rows[i].length; j++) {
            let make  = rows[0][j]; // since the first row / the first array corresponds to the "make" information
            let model = rows[1][j]; // same for model, which is described on the second row / array.
            let key   = make + " " + model;
            let type  = rows[2][j];
            let sales = rows[i][j];

            // sales can be empty, so:
            if (sales) {
                sales = parseInt(sales);
            } else {
                sales = 0;
            }

            // complement the dataset element / object:

            dataset[i-3][key] = {
                'make'  : make,
                'model' : model,
                'type'  : type,
                'sales' : sales
            };    
        } // end of loop through the row's elements
     } // end of loop through the rows.

     console.log(dataset);
});