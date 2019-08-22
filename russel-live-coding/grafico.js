// Russell uses the following convention:
// $aaa : variables that grab references to DOM elements;
// CAPS : constants

const $grafico = d3.select('.grafico-d3');
const $grafico_interior = d3.select('.grafico-d3-inner');
const $svg     = $grafico.select('.grafico-d3-svg');

///////////// início coisas que têm a ver com dimensões, que foram tiradas de dentro da função

const ALTURA_BARRA = 30;
const PADDING_BARRA = ALTURA_BARRA / 2;

// captura largura do div que envolve o svg
const w = $grafico_interior.node().offsetWidth;
const h = (ALTURA_BARRA + PADDING_BARRA) * data.length;

console.log("oi", {w, h});

//////////// fim das coisas.

// Definir uma função de rendering
function render() {
    $rect  // firefox não entende "style" para svgs, só 'attr'.
      .attr('x', 0)
      .attr('y', (d, i) => (ALTURA_BARRA + PADDING_BARRA) * i)
      .attr('width', d => scale(d.value))
      .attr('height', ALTURA_BARRA);

    //console.log($rect);
    //console.log(d3.selectAll('rect'));

}


// Definir uma função dentro da qual vai ficar o DATA JOIN

function init() {
    const data = d3.range(5).map(i => ({
        i,
        value: Math.random()
    }));

    //// sort data
    data.sort((a,b) => d3.descending(a.value, b.value));
    //console.table(data);


    $svg
       .attr('width', w)
       .attr('height', h);


    const scale = d3.scaleLinear().range([0, w]);

    const $rect = $svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');
}

init();