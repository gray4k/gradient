import html2canvas from 'html2canvas';

    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const direction = document.getElementById('direction');
    const generateBtn = document.getElementById('generate');
    const randomBtn = document.getElementById('random');
    const downloadBtn = document.getElementById('download');
    const gradientPreview = document.getElementById('gradientPreview');
    const themeToggle = document.getElementById('themeToggle');

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function getRandomDirection() {
      const directions = [
        'to right',
        'to left',
        'to bottom',
        'to top',
        'to bottom right'
      ];
      return directions[Math.floor(Math.random() * directions.length)];
    }

    function updateGradient() {
      const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
      gradientPreview.style.background = gradient;
    }

    function generateRandomGradient() {
      color1.value = getRandomColor();
      color2.value = getRandomColor();
      direction.value = getRandomDirection();
      updateGradient();
    }

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      themeToggle.classList.add('rotate');
      setTimeout(() => {
        themeToggle.classList.remove('rotate');
      }, 500);
    }

    function initializeTheme() {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    generateBtn.addEventListener('click', updateGradient);
    randomBtn.addEventListener('click', generateRandomGradient);
    downloadBtn.addEventListener('click', () => {
      html2canvas(gradientPreview).then(canvas => {
        const link = document.createElement('a');
        link.download = 'gradient.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
    themeToggle.addEventListener('click', toggleTheme);

    initializeTheme();
    updateGradient();
