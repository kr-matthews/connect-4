// unfortunately, colour inputs don't recognize names like "Red"
const colours = [
  "#FF0000", // Red
  "#FF69B4", // HotPink
  "#FF8C00", // DarkOrange
  "#FFD700", // Gold
  "#FF00FF", // Magenta
  "#228B22", // ForestGreen
  "#0000FF", // Blue
  "#8B4513", // SaddleBrown
  "#C0C0C0", // Silver
];
function getRandomColour() {
  return colours[Math.floor(Math.random() * colours.length)];
}

// consumes RGF colour like "#4535D5"
// NOTE: this actually just inverts the RGB digits... oops
function oppositeColourOf(colour) {
  // extract RGB
  const r = parseInt(colour.substring(1, 3), 16) / 255;
  const g = parseInt(colour.substring(3, 5), 16) / 255;
  const b = parseInt(colour.substring(5, 7), 16) / 255;

  // convert to HSL, complement, convert back to RGB
  const [h, s, l] = rgbToHsl(r, g, b);
  const newH = h > 0.5 ? h - 0.5 : h + 0.5;
  const [newR, newG, newB] = hslToRgb(newH, s, 1 - l);
  // above was originally (newH, s, l)

  // put back together into string
  return (
    "#" +
    pad(Math.round(newR * 255).toString(16)).toUpperCase() +
    pad(Math.round(newG * 255).toString(16)).toUpperCase() +
    pad(Math.round(newB * 255).toString(16)).toUpperCase()
  );
}

function pad(hexStr) {
  return hexStr.length === 2 ? hexStr : "0" + hexStr;
}
function rgbToHsl(r, g, b) {
  const minVal = Math.min(r, g, b);
  const maxVal = Math.max(r, g, b);
  const delta = maxVal - minVal;
  const sum = maxVal + minVal;
  const avg = (maxVal + minVal) / 2;

  if (delta === 0) {
    /// this is grey
    return [0, 0, avg];
  }

  const deltaR = ((maxVal - r) / 6 + delta / 2) / delta;
  const deltaG = ((maxVal - g) / 6 + delta / 2) / delta;
  const deltaB = ((maxVal - b) / 6 + delta / 2) / delta;

  const l = avg;
  const s = avg < 0.5 ? delta / sum : delta / (2 - sum);
  const rawH =
    r === maxVal
      ? deltaB - deltaG
      : g === maxVal
      ? 1 / 3 + deltaR - deltaB
      : b === maxVal
      ? 2 / 3 + deltaG - deltaR
      : "N/A";
  const h = rawH < 0 ? rawH + 1 : rawH > 1 ? rawH - 1 : rawH;

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) {
    // this is grey
    return [l, l, l];
  }

  const v2 = l < 0.5 ? l * (1 + s) : l + s - s * l;
  const v1 = 2 * l - v2;
  return [help(v1, v2, h + 1 / 3), help(v1, v2, h), help(v1, v2, h - 1 / 3)];
}
function help(v1, v2, v3) {
  const newV3 = v3 < 0 ? v3 + 1 : v3 > 1 ? v3 - 1 : v3;
  if (6 * newV3 < 1) {
    return v1 + (v2 - v1) * 6 * newV3;
  } else if (2 * newV3 < 1) {
    return v2;
  } else if (3 * newV3 < 2) {
    return v1 + (v2 - v1) * ((2 / 3 - newV3) * 6);
  } else {
    return v1;
  }
}

export { getRandomColour, oppositeColourOf };
