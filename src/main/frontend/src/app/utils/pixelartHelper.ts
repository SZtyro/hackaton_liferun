/**
 * Generuje pixelartową mozaikę jako tło z odcieniami danego koloru.
 * @param baseColor - kolor w formacie CSS, np. "#4faaff" lub "rgb(80,120,255)"
 * @param pixelCount - rozmiar kafelka (np. 16 = 16x16 pikseli)
 * @param variance - maksymalne rozjaśnienie/przyciemnienie (0–1)
 * @returns dataURL PNG do użycia w background-image
 */
export function generatePixelArtBackground(
    baseColor: string,
    pixelCount = 16,
    variance = 0.25
  ): string {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCount;
    canvas.height = pixelCount;
    const ctx = canvas.getContext("2d")!;
    
    const base = parseColor(baseColor);
  
    for (let y = 0; y < pixelCount; y++) {
      for (let x = 0; x < pixelCount; x++) {
        const factor = 1 + (Math.random() * 2 - 1) * variance;
        const r = clamp(base.r * factor, 0, 255);
        const g = clamp(base.g * factor, 0, 255);
        const b = clamp(base.b * factor, 0, 255);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  
    return canvas.toDataURL("image/png");
  }
  
  /** Ustawia mozaikę jako tło dla elementu (powtarzane, powiększone) */
  export function applyPixelArtBackground(
    element: HTMLElement,
    color: string
  ) {
    const url = generatePixelArtBackground(color, 16, Math.random());
    element.style.backgroundImage = `url(${url})`;
    element.style.backgroundRepeat = "repeat";
    element.style.imageRendering = "pixelated"; // zachowaj ostre krawędzie
  }
  
  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }
  
  function parseColor(color: string) {
    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.fillStyle = color;
    const computed = ctx.fillStyle as string; // browser-normalized
    const m = computed.match(/^#([\da-f]{6})$/i);
    if (m) {
      const hex = m[1];
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
    const rgb = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgb) {
      return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
    }
    throw new Error(`Nie udało się sparsować koloru: ${color}`);
  }
  