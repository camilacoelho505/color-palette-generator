function generatePalette() {
  const input = document.querySelector('#colorInput').value.trim();
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!/^#?[0-9a-f]{6}$/i.test(input)) {
    output.textContent = '❌ Please enter a valid HEX color (e.g., #1079ff)';
    return;
  }

  const base = input.startsWith('#') ? input : '#' + input;
  const steps = 5;
  const names = [
    'Primary-10', 'Primary-20', 'Primary-30', 'Primary-40', 'Primary-50',
    'Primary-60', 'Primary-70', 'Primary-80', 'Primary-90', 'Primary-100'
  ];

  const lightShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix('#ffffff', base, (i + 1) / (steps + 1), 'lab').hex()
  );

  const darkShades = Array.from({ length: steps }, (_, i) =>
    chroma.mix(base, '#000000', (i + 1) / (steps + 1), 'lab').hex()
  );

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
