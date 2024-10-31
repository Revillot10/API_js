document.getElementById('conversorForm').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const monto = parseFloat(document.getElementById('monto').value);
  const moneda = document.getElementById('moneda').value;

  const valorMoneda = await getvalorMoneda(moneda);
  let resultado;

  if (valorMoneda !== null) {
      resultado = monto / valorMoneda; 

      if (!isNaN(resultado)) {
          document.getElementById('resultado').innerHTML = `Resultado: ${resultado.toFixed(2)} ${moneda}`;
      } else {
          document.getElementById('resultado').innerHTML = 'Error en la conversión';
      }
  } else {
      document.getElementById('resultado').innerHTML = 'Error: valor de moneda no encontrado.';
  }
});

async function getvalorMoneda(moneda) {
  try {
      const res = await fetch("https://mindicador.cl/api/");
      const data = await res.json();
      console.log(data);

      const valorMoneda = data[moneda]?.valor;

      if (valorMoneda !== undefined) {
          return valorMoneda; 
      } else {
          console.error(`No se encontró el valor para la moneda: ${moneda}`);
          return null; // Retorna null si no se encuentra la moneda
      }

  } catch (e) {
      console.error(e); 
      alert("Error en la ejecución");
      return null; 
  } 
}

      
        
