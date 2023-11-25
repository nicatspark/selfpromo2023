const greetings = {
  en: [
    [22, 'Working late'],
    [18, 'Good evening'],
    [12, 'Good afternoon'],
    [5, 'Good morning'],
    [0, 'Whoa, early bird'],
  ],
  es: [
    [22, 'Trabajando hasta tarde'],
    [18, 'Buenas noches'],
    [12, 'Buenas tardes'],
    [5, 'Buenos días'],
    [0, '¡Vaya, madrugador!'],
  ],
  fr: [
    [22, 'Travailler tard'],
    [18, 'Bonsoir'],
    [12, 'Bonjour'],
    [5, 'Bonjour'],
    [0, 'Tôt, très tôt'],
  ],
  se: [
    [22, 'Jobbar sent'],
    [18, 'God kväll', 'Trevlig kväll!', 'Ha en trevlig kväll!'],
    [12, 'God eftermiddag'],
    [5, 'God morgon'],
    [0, 'Gäsp, kvällsfågel?'],
    [3, 'Uppe med tuppen?'],
  ],
  pt: [
    [22, 'Trabalhando até tarde'],
    [18, 'Boa noite'],
    [12, 'Boa tarde'],
    [5, 'Bom dia'],
    [0, 'Quem é você?'],
  ],
} as const

function getGreeting() {
  const userLocale = navigator.language.slice(0, 2) as keyof typeof greetings

  const userGreetings = greetings[userLocale] || greetings['en']

  const hr = new Date().getHours()
  let greetingOutput

  for (const greeting of userGreetings) {
    if (hr >= greeting[0]) {
      greetingOutput =
        greeting[Math.floor(Math.random() * (greeting.length - 1)) + 1]
      break
    }
  }
  return greetingOutput
}

export { getGreeting }
