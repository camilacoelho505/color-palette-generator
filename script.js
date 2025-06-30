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

  const names = [
    'xColor-50', 'xColor-100', 'xColor-200', 'xColor-300',
    'xColor-400', // input color
    'xColor-500', 'xColor-600', 'xColor-700', 'xColor-800', 'xColor-900', 'xColor-950'
  ];

  const lightShades = Array.from({ length: 4 }, (_, i) =>
    chroma.mix('#ffffff', base, 1 - (i + 1) * 0.2, 'lab').hex()
  ).reverse(); // lightest to base

  const darkShades = Array.from({ length: 6 }, (_, i) =>
    chroma.mix(base, '#000000', (i + 1) * 0.1, 'lab').hex()
  );

  const allShades = [...lightShades, base, ...darkShades];

  const palette = {};

  allShades.forEach((hex, i) => {
    const name = names[i];
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

  function copyToClipboard() {
  const codeBlock = document.getElementById('codeBlock');
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(() => {
    alert('✅ JSON copied to clipboard!');
  }).catch(err => {
    alert('❌ Failed to copy: ' + err);
  });
}

}
