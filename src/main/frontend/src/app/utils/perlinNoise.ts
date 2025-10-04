export class PerlinNoise {
  private permutation: number[] = [];

  constructor(seed?: number) {
    this.permutation = this.generatePermutation(seed);
  }

  private generatePermutation(seed?: number): number[] {
    const p = new Array(256).fill(0).map((_, i) => i);

    // Simple seeded shuffle (Fisher–Yates)
    let random = seed !== undefined ? this.seededRandom(seed) : Math.random;
    for (let i = p.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }

    // Repeat to avoid overflow
    return [...p, ...p];
  }

  private seededRandom(seed: number): () => number {
    return function () {
      // Linear congruential generator (LCG)
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x: number, y: number, z: number = 0): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const p = this.permutation;

    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;

    return this.lerp(
      w,
      this.lerp(
        v,
        this.lerp(
          u,
          this.grad(p[AA], x, y, z),
          this.grad(p[BA], x - 1, y, z)
        ),
        this.lerp(
          u,
          this.grad(p[AB], x, y - 1, z),
          this.grad(p[BB], x - 1, y - 1, z)
        )
      ),
      this.lerp(
        v,
        this.lerp(
          u,
          this.grad(p[AA + 1], x, y, z - 1),
          this.grad(p[BA + 1], x - 1, y, z - 1)
        ),
        this.lerp(
          u,
          this.grad(p[AB + 1], x, y - 1, z - 1),
          this.grad(p[BB + 1], x - 1, y - 1, z - 1)
        )
      )
    );
  }
}

// Example usage:
const perlin = new PerlinNoise(42); // optional seed
console.log(perlin.noise(1.3, 4.2)); // e.g. 0.038912...
