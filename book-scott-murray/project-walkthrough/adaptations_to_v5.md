## Load and Parse the Data

```javascript
d3.text("./data/vehicle_sales_data.csv").then(function(text) {
    
    // takes the text and parses it, row by row, as a csv file, converting each row to an array of... comma separated values,
    // thus generating an array of arrays
    let rows = d3.csvParseRows(text);
    console.log(rows);
    });
```




