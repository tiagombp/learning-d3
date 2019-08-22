// função debounce para dar um atraso na chamada do resize
// https://davidwalsh.name/function-debounce
const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Russell uses the following convention:
// $aaa : variables that grab references to DOM elements;
// CAPS : constants

const $grafico = d3.select('.grafico-d3');
const $grafico_interior = d3.select('.grafico-d3-inner');
const $svg     = $grafico.select('.grafico-d3-svg');

///////////// início coisas que têm a ver com dimensões, que foram tiradas de dentro da função

const ALTURA_BARRA = 30;
const PADDING_BARRA = ALTURA_BARRA / 2;


//const h = (ALTURA_BARRA + PADDING_BARRA) * data.length;

//////////// fim das coisas dimensionais.

// Definir uma função de resize

function resize() {

    console.log('resize'); // só para mostrar que está funcionando.

    // captura largura do div que envolve o svg
    const w = $grafico_interior.node().offsetWidth;

    // agora chama o render toda vez que mudar o tamanho, passando a largura:
    render(w);

}

// Definir uma função de rendering
// Vai de fato desenhar o gráfico. Mas precisa saber o scale, por exemplo.

function render(w) {
    const $rect = $svg.selectAll('rect');
    const h = (ALTURA_BARRA + PADDING_BARRA) * $rect.size();
    // console.log(data.length)
    // em vez de fazer um data.length aqui, ele faz um $rect.size() para obter a quantidade de retângulos
    // pq esta função, que é chamada por uma função que é chamada por uma função em que `data` foi definida,
    // não enxerga essa variável? 

    $svg
      .attr('width' , w)
      .attr('height', h);

    // a escala vai ser atualizada toda vez que a função for chamada, o que vai acontecer toda vez que a largura for alterada.
    const scale = d3.scaleLinear().range([0, w]);

    // firefox não entende "style" para svgs, só 'attr'.
    $rect
      .attr('x', 0)
      .attr('y', (d, i) => (ALTURA_BARRA + PADDING_BARRA) * i)
      .attr('width', d => scale(d.value))
      .attr('height', ALTURA_BARRA);
}

// Definir uma função dentro da qual vai ficar o DATA JOIN:
// Vai pegar o data, fazer o bind e criar os elementos.

function init() {
    const data = d3.range(5).map(i => ({
        i,
        value: Math.random()
    }));

    //// sort data
    data.sort((a,b) => d3.descending(a.value, b.value));
    //console.table(data);

    $svg // Russel não inicializa mais uma variável para pegar essa seleção... const $rect = $svg.selectAll... 
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');


    // acrescenta um resize listener
    window.addEventListener('resize', debounce(resize, 500));
    resize(); // a primeira chamada, porque no início não tem evento de resize
}

init();