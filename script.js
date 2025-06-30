function generatePalette() {
  const input = document.querySelector('#colorInput').value.trim();
  const output = document.getElementById('output');
  const codeBlock = document.getElementById('codeBlock');
  const copyButton = document.getElementById('copyButton');

  output.innerHTML = '';
  codeBlock.textContent = '';
  copyButton.style.display = 'none';

  if (!/^#?[0-9a-f]{6}$/i.test(input)) {
    output.textContent = '❌ Please enter a valid HEX color (e.g., #1079ff)';
    return;
  }

  const base = input.startsWith('#') ? input : '#' + input;

  const shadeNames = [
    'Primary-5', 'Primary-10', 'Primary-20', 'Primary-30',
    'Primary-40', // Input color
    'Primary-50', 'Primary-60', 'Primary-70', 'Primary-80', 'Primary-90', 'Primary-100'
  ];

  const lightShades = Array.from({ length: 4 }, (_, i) =>
    chroma.mix('#ffffff', base, (i + 1) * 0.15, 'lab').hex()
  );

  const darkShades = Array.from({ length: 6 }, (_, i) =>
    chroma.mix(base, '#000000', (i + 1) * 0.12, 'lab').hex()
  );

  const allShades = [
    lightShades[0], // Primary-5
    lightShades[1], // Primary-10
    lightShades[2], // Primary-20
    lightShades[3], // Primary-30
    base,           // Primary-40
    ...darkShades   // Primary-50 → Primary-100
  ];

  const palette = {};

  allShades.forEach((hex, i) => {
    const name = shadeNames[i];
    palette[name] = hex;

    const div = document.createElement('div');
    div.className = 'color-swatch';
    div.innerHTML = `
      <div class="swatch-box" style="background-color: ${hex};"></div>
      <code>${name}: '${hex}'</code>
    `;
    output.appendChild(div);
  });

  codeBlock.textContent = JSON.stringify(palette, null, 2);
  copyButton.style.display = 'inline-block';
}
