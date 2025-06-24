function generatePalette() {
  const input = document.querySelector('#colorInput').value.trim();
  const output = document.getElementById('output');

  if (!/^#?[0-9a-f]{6}$/i.test(input)) {
    output.textContent = '❌ Please enter a valid HEX color (e.g., #1079ff)';
    return;
  }

  const base = input.startsWith('#') ? input : '#' + input;
  const steps = 5;

  // Generate lighter shades (toward white)
  const lightShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix('#ffffff', base, (steps - i) / steps, 'lab').hex()
  );

  // Generate darker shades (toward black)
  const darkShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix('#000000', base, (i + 1) / steps, 'lab').hex()
  );

  const fullPalette = [...lightShades, base, ...darkShades];

  // Name shades: primary10 → primary110
  const namedPalette = fullPalette.map((hex, i) => `primary${(i + 1) * 10}: '${hex}'`);
  output.textContent = namedPalette.join('\n');
}
