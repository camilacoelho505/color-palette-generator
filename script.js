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

  const lightSteps = 6;
  const darkSteps = 5;

  const lightNames = ['Primary-5', 'Primary-10', 'Primary-20', 'Primary-30', 'Primary-40', 'Primary-50'];
  const darkNames = ['Primary-60', 'Primary-70', 'Primary-80', 'Primary-90', 'Primary-100'];

  const lightShades = Array.from({ length: lightSteps }, (_, i) =>
    chroma.mix('#ffffff', base, (i + 1) / (lightSteps + 1), 'lab').hex()
  );

  const darkShades = Array.from({ length: darkSteps }, (_, i) =>
    chroma.mix(base, '#000000', (i + 1) / (darkSteps + 1), 'lab').hex()
  );

  const allShades = [...lightShades, ...darkShades];
  const allNames = [...lightNames, ...darkNames];

  const palette = {};

  allShades.forEach((hex, i) => {
    const name = allNames[i];
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

function copyCode() {
  const code = document.getElementById('codeBlock').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('copyButton');
    btn.textContent = '✅ Copied!';
    setTimeout(() => (btn.textContent = 'Copy JSON'), 1500);
  });
}
