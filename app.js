const botonHablar = document.getElementById('btnHablar');
const transcriptElement = document.getElementById('transcript');
const responseBox = document.getElementById('responseBox');

const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
reconocimiento.lang = 'es-ES';
reconocimiento.continuous = false;
reconocimiento.interimResults = false;

botonHablar.addEventListener('click', () => {
  reconocimiento.start();
  transcriptElement.textContent = 'Escuchando...';
});

reconocimiento.onresult = (event) => {
  const texto = event.results[0][0].transcript.toLowerCase();
  transcriptElement.textContent = `Escuchaste: "${texto}"`;
  buscarYResponder(texto);
};

function buscarYResponder(texto) {
  const coincidencia = personajes.find(personaje =>
    texto.includes(personaje.nombre.toLowerCase()) ||
    texto.includes(personaje.apellido.toLowerCase())
  );

  if (coincidencia) {
    const respuesta = `Siri dice, personaje encontrado: ${coincidencia.nombreCompleto}. ${coincidencia.descripcion}`;
    responseBox.textContent = respuesta;
    hablar(respuesta);
  } else {
    const mensaje = 'Siri dice, personaje no reconocido. Intenta nuevamente.';
    responseBox.textContent = mensaje;
    hablar(mensaje);
  }
}

function hablar(mensaje) {
  const sintesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(mensaje);
  utterance.lang = 'es-ES';

  // Elegir voz más parecida a Siri
  const voces = sintesis.getVoices();
  const vozSiri = voces.find(voz => voz.name.toLowerCase().includes('monica') || voz.lang === 'es-ES');
  if (vozSiri) utterance.voice = vozSiri;

  sintesis.speak(utterance);
}
