This is a really interesting problem, because it involves modular arithmetic, "a system of arithmetic for integers, where numbers 'wrap around' when reaching a certain value, called the modulus" (Wikipedia).

When you try to distribute a number of items in a x-y grid, in, say, rows of `n` items, you can get the horizontal (x value) and vertical (y value) positions using only simple integer divisions of the item index number by `n`. The quotient of the division would give the y value, and the remainder, the x value. Something like this, below. I'm calling `DIV` the operation of obtaining the integer part of the quotient of the division -- in Javascript you would do `Math.floor(i / n_items_per_row)`. And I'm calling `MOD` the operation of obtaining the reminder of the division -- in Javascript you can use `i % n_items_per_row`.

So, the most important part is the data preparation. I created an example on CodePen here: https://codepen.io/tiagombp/pen/wvMdybE. 

There is probably a better way to do this, I no expert, but what I tried to do was creating a new dataset based on the original one, computing the x and y positions of each item basically using those simple rules described above, but also accounting for the necessary horizontal shift for each column/category.

So basically I define a set of basic and arbitrary parameters, like radius of the circles,  how many dots per row, the spacing between the dots and the spacing between columns  (made these last two as multiples of the radius just for convenience).

```
let radius = 3;
let dots_per_row = 5;
let space_between_dots = radius;
let space_between_columns = 4 * radius;
``` 

Based on that, I then calculate the column width, the total width to accommodate all columns (that just to horizontally center the chart later on).

```
let columns_width = (2*radius + space_between_dots) * dots_per_row;

let categories = d3.map(dataset, d => d).keys();

let number_of_columns = categories.length;
let total_needed_width = columns_width * number_of_columns + space_between_columns * (number_of_columns -1);
```

And then the critical part. I will loop through each category, build a "mini dataset" of that category, and then loop through this mini dataset calculating `x` and `y` positions considering the relative index and the number of dots per row that I defined above. The `x` position is a little bit trickier, because we have to account for the space "occupied" (English is not my first language, as it is probably obvious by now, and sometimes I get the feeling that I'm choosing some weird words for the context) by each dot and its "padding", that is, the space between the centers of two adjacent circles: two time the radius, plus the space between the dots that I chose. And, on top of that, when we change the category, we have to add the horizontal spacing corresponding to the column position. I did that adding a `cat_index * (columns_width + space_between_columns)`, where `cat_index` is the category/column index (since we are looping through the categories).

```
let data = []

categories.forEach((cat,cat_index) => {
  let mini_dataset = dataset.filter(d => d == cat);
  mini_dataset.forEach((d, i) => data.push({ 
    "relative_index":  i,
    "x" :cat_index * (columns_width + space_between_columns) + (i % dots_per_row) * (2*radius + space_between_dots),
    "y" : Math.floor(i / dots_per_row),
    "cat" : cat
  }))
});
```

And the rest is drawing. I do add some x and y scales, but basically for positioning the chart in the container. The full code is on CodePen. 

Hope it makes some sense!