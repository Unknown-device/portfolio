function toggle() {
  document.body.classList.toggle("light");
}
// Get the root element
var r = document.querySelector(':root');
var names = [
  '--bg-dark', '--bg', '--bg-light', '--text', '--text-muted', '--highlight', '--border', '--border-muted', '--primary', '--secondary', '--danger', '--warning', '--success', '--info',
]

var themes = [
  [
    "oklch(0.1 0.1 185)", "oklch(0.15 0.1 185)", "oklch(0.2 0.1 185)",
    "oklch(0.96 0.1 185)", "oklch(0.76 0.1 185)", "oklch(0.5 0.2 185)",
    "oklch(0.4 0.2 185)", "oklch(0.3 0.2 185)", "oklch(0.76 0.2 185)",
    "oklch(0.76 0.2 5)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.1 20)", "oklch(0.15 0.1 20)", "oklch(0.2 0.1 20)",
    "oklch(0.96 0.1 20)", "oklch(0.76 0.1 20)", "oklch(0.5 0.2 20)",
    "oklch(0.4 0.2 20)", "oklch(0.3 0.2 20)", "oklch(0.76 0.2 20)",
    "oklch(0.76 0.2 200)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.1 135)", "oklch(0.15 0.1 135)", "oklch(0.2 0.1 135)",
    "oklch(0.96 0.1 135)", "oklch(0.76 0.1 135)", "oklch(0.5 0.2 135)",
    "oklch(0.4 0.2 135)", "oklch(0.3 0.2 135)", "oklch(0.76 0.2 135)",
    "oklch(0.76 0.2 315)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.1 220)",  // --bg-dark
    "oklch(0.15 0.1 220)", // --bg
    "oklch(0.2 0.1 220)",  // --bg-light
    "oklch(0.96 0.1 220)", // --text
    "oklch(0.76 0.1 220)", // --text-muted
    "oklch(0.5 0.2 220)",  // --highlight
    "oklch(0.4 0.2 220)",  // --border
    "oklch(0.3 0.2 220)",  // --border-muted
    "oklch(0.76 0.2 220)", // --primary
    "oklch(0.76 0.2 40)",  // --secondary
    "oklch(0.7 0.2 30)",   // --danger
    "oklch(0.7 0.2 100)",  // --warning
    "oklch(0.7 0.2 160)",  // --success
    "oklch(0.7 0.2 260)"   // --info
  ]
];

var currentTheme = 0;


function changeTheme() {
  // Set the theme
  for (let i = 0; i != 14; i++) 
  {
  r.style.setProperty(names[i], themes[currentTheme][i]);
  }
  currentTheme = Math.floor(Math.random() * 5);;
}
