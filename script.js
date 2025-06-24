function generatePalette() {
  const input = document.querySelector('#colorInput').value.trim();
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!/^#?[0-9a-f]{6}$/i.test(input)) {
    output.textContent = '❌ Please enter a valid HEX color (e.g., #1079ff)';
    return;
  }

  const base = input.startsWith('#') ? input : '#' + input;

  // Lighter shades: mix with white
  const lightShades = Array.from({ length: 5 }, (_, i) =>
    chroma.mix('#ffffff', base, 1 - (i + 1) * 0.15, 'lab').hex()
  ).reverse(); // from lightest to less light

  // Darker shades: mix with black
  const darkShades = Array.from({ length: 5 }, (_, i) =>
    chroma.mix(base, '#000000', (i + 1) * 0.15, 'lab').hex()
  );

  const names = [
    'Primary-10', 'Primary-20', 'Primary-30', 'Primary-40', 'Primary-50',
    'Primary-60', 'Primary-70', 'Primary-80', 'Primary-90', 'Primary-100'
  ];

  const fullPalette = [...lightShades, ...darkShades];

  fullPalette.forEach((hex, i) => {
    const div = document.createElement('div');
    div.className = 'color-swatch';
    div.innerHTML = `
      <div class="swatch-box" style="background-color: ${hex};"></div>
      <code>${names[i]}: '${hex}'</code>
    `;
    output.appendChild(div);
  });
}
