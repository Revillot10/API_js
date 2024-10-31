let myChart; // Variable global

document.getElementById('conversorForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const monto = parseFloat(document.getElementById('monto').value);
    const moneda = document.getElementById('moneda').value;

    const valorMoneda = await getvalorMoneda(moneda);
    let resultado;

    if (valorMoneda !== null) {
        resultado = monto / valorMoneda; 
        document.getElementById('resultado').innerHTML = `Resultado: ${resultado.toFixed(2)} ${moneda}`;
        crearGraficoLineas(moneda);
    } else {
        document.getElementById('resultado').innerHTML = 'Error: valor de moneda no encontrado.';
    }
});

async function getvalorMoneda(moneda) {
    const res = await fetch("https://mindicador.cl/api/");
    const data = await res.json();
    return data[moneda]?.valor || null;
}

async function obtenerSerieMoneda(moneda) {
  const res = await fetch(`https://mindicador.cl/api/${moneda}`);
  const data = await res.json();

  const ultimos10Dias = data.serie.filter(dia => {
      const fechaDia = new Date(dia.fecha);
      const hoy = new Date();
      return (hoy - fechaDia) <= 10 * 24 * 60 * 60 * 1000; // Compara con 10 días
  }).slice(-10); // Asegurarse de que solo tomamos los últimos 10 días

  return ultimos10Dias.map(dia => ({
      fecha: new Date(dia.fecha).toLocaleDateString(),
      valor: dia.valor
  }));
}


async function crearGraficoLineas(moneda) {
    const datos = await obtenerSerieMoneda(moneda);
    const ctx = document.getElementById('myChart').getContext('2d');

    if (datos.length === 0) {
        console.error("No se obtuvieron datos para el gráfico.");
        return; 
    }

    if (myChart) {
        myChart.destroy(); // Destruye el gráfico anterior
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datos.map(d => d.fecha), // Etiquetas en el eje X (fechas)
            datasets: [{
                label: `Valor de ${moneda.toUpperCase()} (Pesos)`, // Título de la serie
                data: datos.map(d => d.valor), // Datos del gráfico
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de la línea
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de la línea
                borderWidth: 2, // Ancho de la línea
                fill: true // Rellenar el área bajo la línea
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false 
                }
            },
            responsive: true, 
            plugins: {
                legend: {
                    display: true, 
                }
            }
        }
    });
}





      
        
