// List of colors from detectron 2
const DEFAULT_COLOR = [
  "0, 114, 189",
  "217, 83, 25",
  "237, 177, 32",
  "126, 47, 142",
  "119, 172, 48",
  "77, 190, 238",
  "162, 20, 47",
  "76, 76, 76",
  "153, 153, 153",
  "255, 0, 0",
  "255, 128, 0",
  "191, 191, 0",
  "0, 255, 0",
  "0, 0, 255",
  "170, 0, 255",
  "85, 85, 0",
  "85, 170, 0",
  "85, 255, 0",
  "170, 85, 0",
  "170, 170, 0",
  "170, 255, 0",
  "255, 85, 0",
  "255, 170, 0",
  "255, 255, 0",
  "0, 85, 128",
  "0, 170, 128",
  "0, 255, 128",
  "85, 0, 128",
  "85, 85, 128",
  "85, 170, 128",
  "85, 255, 128",
  "170, 0, 128",
  "170, 85, 128",
  "170, 170, 128",
  "170, 255, 128",
  "255, 0, 128",
  "255, 85, 128",
  "255, 170, 128",
  "255, 255, 128",
  "0, 85, 255",
  "0, 170, 255",
  "0, 255, 255",
  "85, 0, 255",
  "85, 85, 255",
  "85, 170, 255",
  "85, 255, 255",
  "170, 0, 255",
  "170, 85, 255",
  "170, 170, 255",
  "170, 255, 255",
  "255, 0, 255",
  "255, 85, 255",
  "255, 170, 255",
  "85, 0, 0",
  "128, 0, 0",
  "170, 0, 0",
  "212, 0, 0",
  "255, 0, 0",
  "0, 43, 0",
  "0, 85, 0",
  "0, 128, 0",
  "0, 170, 0",
  "0, 212, 0",
  "0, 255, 0",
  "0, 0, 43",
  "0, 0, 85",
  "0, 0, 128",
  "0, 0, 170",
  "0, 0, 212",
  "0, 0, 255",
  "36, 36, 36",
  "219, 219, 219",
  "255, 255, 255",
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

/*
Generator function use to dispatch colors without clashing
syntax:
  const generator = get_color()
  const color = generator.next().value
*/

export function* get_color() {
  while (true) {
    for (let i = 0; i < DEFAULT_COLOR.length; ++i) {
      const j = getRandomInt(DEFAULT_COLOR.length);
      [DEFAULT_COLOR[i], DEFAULT_COLOR[j]] = [
        DEFAULT_COLOR[j],
        DEFAULT_COLOR[i],
      ];
    }
    for (let color of DEFAULT_COLOR) yield color;
  }
}

const hash = (i) => (i >> 16) ^ ((i & 0xffff) * (2e7 + 3));

const psuedo_random = (val, seed, max) => {
  return hash(val + seed) % max;
};

const CHART_COLOR = [
  "47, 126, 216",
  "13, 35, 58",
  "139, 188, 33",
  "145, 0, 0",
  "26, 173, 206",
  "73, 41, 112",
  "242, 143, 67",
  "119, 161, 229",
  "196, 37, 37",
  "166, 201, 106",
];

export function* get_chart_color(seed) {
  let colors = [...CHART_COLOR]
  for (let i = 0; i < colors.length; ++i) {
    const j = psuedo_random(i, seed, colors.length);
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  while (true) {
    for (let color of colors) yield color;
  }
}
