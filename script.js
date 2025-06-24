function generatePalette() {
  const input = document.querySelector('#colorInput').value.trim();
  const output = document.getElementById('output');

  if (!/^#?[0-9a-f]{6}$/i.test(input)) {
    output.textContent = 'Please enter a valid HEX color (e.g., #1079ff)';
    return;
  }

  const base = input.startsWith('#') ? input : '#' + input;
  const steps = 5;

  const lightShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix('#ffffff', base, (steps - i) / steps, 'lab').hex()
  );

  const darkShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix('#000000', base, (i + 1) / steps, 'lab').hex()
  );

  const finalPalette = [...lightShades, base, ...darkShades];

  const namedShades = finalPalette.map((hex, i) => `primary${(i + 1) * 10}: '${hex}'`);
  output.textContent = namedShades.join('\n');
}
