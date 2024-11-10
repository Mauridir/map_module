function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.addImage("../img/Logo.jpg", "JPG", 72, 260, 65, 39); // Posición y tamaño de la imagen

  // Configuración inicial del PDF
  doc.setFontSize(10);
  doc.text("Fecha: ____________________", 20, 20);
  doc.text("Orden de Trabajo: ____________________", 140, 20); // A la derecha

  // Recuperar la imagen pegada desde el portapapeles
  const imagen = localStorage.getItem("uploadedImage");
  if (imagen) {
    const img = new Image();
    img.src = imagen;
    img.onload = function () {
      doc.addImage(img, "PNG", 10, 30, 180, 100); // Agregar imagen al PDF
      agregarDatosPDF(doc);
    };
  } else {
    agregarDatosPDF(doc);
  }
}

function agregarDatosPDF(doc) {
  // Recuperar los datos del formulario
  const cliente = document.getElementById("cliente").value;
  const campo = document.getElementById("campo").value;
  const lote = document.getElementById("lote").value;
  const totalHectareas = document.getElementById("totalHectareas").value;
  const caudalHectarea = document.getElementById("caudalHectarea").value;
  const piloto = document.getElementById("piloto").value;
  const equipoTierra = document.getElementById("equipoTierra").value;
  const cantidadVuelos = document.getElementById("cantidadVuelos").value;

  // Obtener productos dinámicos
  const productos = [];
  const productosContainer = document.getElementById("productosContainer");
  const productosElements =
    productosContainer.getElementsByClassName("producto-row");

  for (let i = 0; i < productosElements.length; i++) {
    let productoInput = productosElements[i].querySelector(
      `input[id^="producto"]`
    );
    let dosisInput = productosElements[i].querySelector(`input[id^="dosis"]`);
    if (productoInput && dosisInput) {
      productos.push({
        producto: productoInput.value,
        dosis: dosisInput.value,
      });
    }
  }

  // Añadir datos al PDF
  doc.setFontSize(12);
  doc.text(`Cliente: ${cliente}`, 20, 140);
  doc.text(`Cantidad Total Hectáreas: ${totalHectareas}`, 140, 140);
  doc.text(`Campo: ${campo}`, 20, 150);
  doc.text(`Lote: ${lote}`, 20, 160);
  doc.text(`Caudal por Hectárea: ${caudalHectarea}`, 140, 160);

  doc.setFontSize(10);
  doc.text(`Piloto: ${piloto}`, 20, 170);
  doc.text(`Equipo de Tierra: ${equipoTierra}`, 20, 180);

  doc.text("Hora de Inicio: _______________", 20, 190);
  doc.text("Hora Final: ___________________", 20, 200);
  doc.text("Viento: ______________________", 20, 210);
  doc.text("Temperatura: ________________", 20, 220);
  doc.text("Humedad: ____________________", 20, 230);
  doc.text("Coordenadas: ________________", 20, 240);
  doc.text("Combustible Utilizado: __________________", 20, 250);

  // Añadir productos al PDF
  doc.setFontSize(9);
  productos.forEach((producto, index) => {
    doc.text(
      `Producto ${index + 1}: ${producto.producto} - Dosis: ${producto.dosis}`,
      20,
      260 + index * 7
    );
  });

  // Guardar el PDF
  doc.save("aplicacion_aerea.pdf");
}

// Función para pegar la imagen usando Ctrl+V
document.addEventListener("paste", function (event) {
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (var index in items) {
    var item = items[index];
    if (item.kind === "file") {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = function (event) {
        // Mostrar la imagen pegada
        var imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        var imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ""; // Limpiar contenido anterior
        imageContainer.appendChild(imgElement);

        // Guardar la imagen en localStorage
        localStorage.setItem("uploadedImage", event.target.result);
      };
      reader.readAsDataURL(blob);
    }
  }
});

// Función para reiniciar la página
function reiniciar() {
  document.getElementById("datosForm").reset();
  // Eliminar todos los productos adicionales
  const productosContainer = document.getElementById("productosContainer");
  productosContainer.innerHTML = "";
  productoCounter = 0;
}

// Función para generar el PDF de cálculos de equipo de tierra
function calculosEquipoTierra() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  var totalHectareas = parseFloat(document.getElementById("totalHectareas").value);
  var caudalHectarea = parseFloat(document.getElementById("caudalHectarea").value);
  var cantidadVuelos = parseInt(document.getElementById("cantidadVuelos").value);

  // Validación de valores
  if (isNaN(totalHectareas) || isNaN(caudalHectarea) || isNaN(cantidadVuelos) || cantidadVuelos <= 0) {
      console.error("Valores inválidos para el cálculo de caldo total por vuelo.");
      return;
  }

  // Cálculo del caldo total por vuelo
  var caldoTotalPorVuelo = (caudalHectarea * totalHectareas) / cantidadVuelos;

  // Añadir título y cálculo de caldo al PDF
  doc.setFontSize(12);
  doc.text("Cálculos equipo de tierra", 20, 20);
  doc.text(
      `Cantidad total de caldo por vuelo: ${caldoTotalPorVuelo.toFixed(2)} litros`,
      20,
      40
  );

  // Añadir productos y dosis
  var productos = [];
  for (var i = 0; i <= 6; i++) {
      var productoElement = document.getElementById("producto" + i);
      var dosisElement = document.getElementById("dosis" + i);

      if (productoElement && dosisElement) {
          var producto = productoElement.value;
          var dosis = parseFloat(dosisElement.value);

          if (producto && !isNaN(dosis)) {
              var productoPorVuelo = (dosis * totalHectareas) / cantidadVuelos;
              productos.push({ producto, productoPorVuelo });
              doc.text(
                  `${producto}: ${productoPorVuelo.toFixed(2)} unidades por vuelo`,
                  20,
                  50 + i * 10
              );
          }
      }
  }

  // Guardar el PDF
  doc.save("calculos_equipo_tierra.pdf");
}


let productoCounter = 0;

function agregarProducto() {
  productoCounter++;

  const productosContainer = document.getElementById("productosContainer");
  const productoRow = document.createElement("div");
  productoRow.className = "form-row producto-row";
  productoRow.id = `productoRow${productoCounter}`;

  productoRow.innerHTML = `
        <div class="form-group col-md-4">
          <label for="producto${productoCounter}">Producto ${productoCounter}</label>
          <input type="text" id="producto${productoCounter}" class="form-control" />
        </div>
        <div class="form-group col-md-4">
          <label for="dosis${productoCounter}">Dosis Producto ${productoCounter} (L/Ha)</label>
          <input type="number" id="dosis${productoCounter}" step="0.01" class="form-control" />
        </div>
        <div class="form-group col-md-4">

      `;

  productosContainer.appendChild(productoRow);
}

function eliminarProducto() {
  if (productoCounter > 1) {
    const productosContainer = document.getElementById("productosContainer");
    const productoRow = document.getElementById(
      `productoRow${productoCounter}`
    );
    if (productoRow) {
      productosContainer.removeChild(productoRow);
      productoCounter--;
    }
  }
}
