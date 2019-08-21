// Russell uses the following convention:
// $aaa : variables that grab references to DOM elements;
// CAPS : constants

const $grafico = d3.select('.grafico-d3');
const $grafico_interior = d3.select('.grafico-d3-inner');
const $svg     = $grafico.select('.grafico-d3-svg');

const ALTURA_BARRA = 30;
const PADDING_BARRA = ALTURA_BARRA / 2;

// Definir uma função dentro da qual vai ficar a criação

function init() {
    const data = d3.range(5).map(i => ({
        i,
        value: Math.random()
    }));

    console.table(data);

    const w = $grafico_interior.node().offsetWidth;
    console.log("oi", {w});

    const $rect = $svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    $rect
      .style('x', d => d.value);

    console.log($rect);

    console.log(d3.selectAll('rect'));
}

init();