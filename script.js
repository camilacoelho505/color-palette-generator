function generatePalette() {
  const inputs = Array.from(document.querySelectorAll('#inputs input')).map(i => i.value.trim());
  const output = document.getElementById('output');

  if (inputs.length !== 6 || inputs.some(c => !/^#?[0-9a-f]{6}$/i.test(c))) {
    output.textContent = 'Please enter 6 valid HEX colors (e.g., #1079ff)';
    return;
  }

  // Ensure all colors have leading #
  const colors = inputs.map(c => c.startsWith('#') ? c : '#' + c);

  try {
    const shades = chroma.scale(colors).mode('lab').colors(11);
    const namedShades = shades.map((hex, i) => `primary${(i + 1) * 10}: '${hex}'`);
    output.textContent = namedShades.join('\n');
  } catch (err) {
    output.textContent = 'Error generating palette: ' + err.message;
  }
}
