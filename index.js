function colorText(text, colorClass) {
    return `<span class="${colorClass}">${text}</span>`;
}


function displayImages() {
    let output = colorText("\nWelcome to my photography collection!\n", "ansi-green");
    output += colorText("I've recently picked up the hobby of taking photos recently, both in games and outside of games\n", "ansi-blue");
    output += colorText("All real-life photos are taken on either an iPhone 13 or a Nikon D300s with various lenses, and all in-game photos are on Forza Horizon 4\n", "ansi-blue");
    output += "<i>P.S.: Images may take a while to load</i>\n";
    output += colorText("─────────────────────────────────────────\n", "ansi-gray");

    for (const img of imageGallery) {
        output += `
${colorText(img.title, "ansi-yellow")}
${colorText(img.description, "ansi-gray")}
<img src="${img.url}" alt="${img.title}" style="max-width: 100%; margin: 10px 0; border-radius: 8px;">
${colorText("─────────────────────────────────────────", "ansi-gray")}
`;
    }

    return output;
}

function getFormattedTime() {
    const now = new Date();

    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = days[now.getDay()];

    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");

    let year = now.getFullYear().toString().slice(-2);

    return `${hours}:${minutes} - ${dayOfWeek} ${day}/${month}/${year}`;
}

function getBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (navigator.userAgent.includes("Arc")) return "Arc";
    if (userAgent.includes("edg")) return "Edge";
    if (userAgent.includes("chrome") && !userAgent.includes("edg")) return "Chrome";
    if (userAgent.includes("firefox")) return "Mozilla Firefox";
    if (userAgent.includes("safari") && !userAgent.includes("chrome")) return "Safari";
    if (userAgent.includes("opera") || userAgent.includes("opr")) return "Opera";

    return "Unknown Browser";
}

function getBrowserCaption() {
    const browser = getBrowser();

    const captions = {
        "Chrome": "Why are you using Chrome? Edge is the same thing but with Microsoft stuff lol",
        "Firefox": "Firefox detected! Privacy first.",
        "Safari": "You love the ecosystem, don't you?",
        "Edge": "The best browser for macOS - Why does everyone use Arc on it??",
        "Opera": "A rare Opera user! Interesting choice - especially if you use Opera GX!",
        "Arc Browser": "Interesting choice - I don't think it's the future of web browsing tho",
        "Unknown Browser": "Never seen this before - you're unique like that!"
    };

    return ` - ${captions[browser]}`;
}

function getOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows/i.test(userAgent)) return "Windows";
    if (/macintosh|mac os x/i.test(userAgent)) return "macOS";
    if (/linux/i.test(userAgent)) return "Linux";
    if (/android/i.test(userAgent)) return "Android";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";

    return "Unknown OS";
}

async function getGitHubStarredProjects() {
    try {
        const response = await fetch('https://api.github.com/users/advaitconty/starred?sort=stars&direction=desc');
        if (!response.ok) {
            throw new Error('Failed to fetch starred repositories');
        }
        const repos = await response.json();

        let output = colorText("\n Repositories I like:", "ansi-green");
        for (const repo of repos) {
            output += `\n<a href="https://github.com/${repo.full_name}">${colorText(repo.full_name, "ansi-yellow")}</a>`;
            output += ` - ${colorText(`${repo.stargazers_count} `, "ansi-blue")}`;
            if (repo.description) {
                output += `\n(${colorText(`<i>${repo.description}</i>`, "ansi-gray")})`;
            }
            output += "\n"
        }
        return output || colorText("\nNo starred repositories found.", "ansi-red");
    } catch (error) {
        return colorText(`\nError fetching starred repositories. Please try again later.\n${error}`, "ansi-red");
    }
}

const imageGallery = [
    {
        url: "/images/cover-2.png",
        title: "Potraits",
        description: "Captured at the skyline during a potraits workshop at Apple MBS"
    },
    {
        url: "/images/1-2.JPG",
        title: "A350-900 Take off",
        description: "Had only 1 take - came out perfectly!"
    },
    {
        url: "/images/2-2.JPG",
        title: "A320 Pushback",
        description: "A great photo I took when I first started photography"
    },
    {
        url: "/images/3-2.JPG",
        title: "Is it snowing in Singapore??",
        description: "A photo I took when it was raining with some very interesting settings on my phone at SPS"
    },
    {
        url: "/images/4-2.JPG",
        title: "Emirates Boeing 777-300ER",
        description: "A beauty of a plane just taxing into the gate"
    },
    {
        url: "/images/5-2.JPG",
        title: "iLight Marina Bay",
        description: "A shot of iLight in long-exposure"
    },
    {
        url: "/images/6-2.JPG",
        title: "The Last Goodbye",
        description: "A photo I took with a Lexus LFA near Derwent Reservoir in Forza Horizon 4"
    }
];

const startupMessage = `
${colorText("─────────────────────────────────────────────────────", "ansi-green")}\n
<b>ContyOS v1.0.0</b>${colorText(" : ", "ansi-green")}${getFormattedTime()}
${colorText("─────────────────────────────────────────────────────", "ansi-green")}
${colorText("- ", "ansi-green")}<b>Operating System: </b>${getOS()}
${colorText("- ", "ansi-green")}<b>Browser: </b>${colorText(getBrowser(), "ansi-blue")}${colorText(getBrowserCaption(), "ansi-gray")}
${colorText("─────────────────────────────────────────────────────", "ansi-green")}

${colorText("ContyOS Team        :", "ansi-gray")} ${colorText("https://github.com/advaitconty", "ansi-gray")}
${colorText("Web Hosting by      : Vercel", "ansi-gray")}
${colorText("Message by the team : Made with <3 by advaitconty", "ansi-gray")}

help         ${colorText(":", "ansi-green")} Get help with commands
about        ${colorText(":", "ansi-green")} Learn more about who this is made by
starred      ${colorText(":", "ansi-green")} Take a look at the projects I have starred on my GitHub
projects     ${colorText(":", "ansi-green")} Take a look at the projects I have starred on my GitHub
images       ${colorText(":", "ansi-green")} Check out the images I have taken
achievements ${colorText(":", "ansi-green")} See what I've done in competitions
random-cmds  ${colorText(":", "ansi-green")} Check out some random commands I've implemented
clear        ${colorText(":", "ansi-green")} Clear the terminal screen
`;

let random_comamands = `Aight so here are some random commands
curl   : literally acts like the real curl command
cowsay : one of the most random linux features ever
`

let achievements = `Here are my best achievements:
<b> Persoanl</b>
2024: <a class="ansi-yellow" href="https://www.simcconline.org/drct/">Dr. CT International</a> ${colorText("Silver award", "silver")}
2024: <a class="ansi-yellow" href="https://www.amt.edu.au/amo">Australian Maths Olympiad</a> ${colorText("Honourable Mention", "mention")}
2024: <a class="ansi-yellow" href="https://www.stpatricks.moe.edu.sg/">(School based)</a> ${colorText("Best in Computing and SS + Elective Geography", "gold")}

<b> Team-Based</b>
2024: <a class="ansi-yellow" href="https://www.mindef.gov.sg/news-and-events/latest-releases/20jan24_nr2">Sentinel Challenge</a> Participation with <a class="ansi-green" href="https://github.com/BrianJ09">Brian Joseph</a>, Tan Chee Tiong and Aaron Tan
2024: <a class="ansi-yellow" href="https://www.science.edu.sg/for-schools/competitions/national-stem-championship">National STEM Championship</a> Participation with <a class="ansi-green" href="https://github.com/BrianJ09">Brian Joseph</a>, Atman Tripathy and Ahan Goyal
2023: <a class="ansi-yellow" href="https://swiftinsg.org/">Swift Accelerator Programme</a> Class of 2023, making <a class="ansi-yellow" href="https://github.com/contyadvait/fitstreak">FitStreak</a> with <a class="ansi-green" href="https://github.com/BrianJ09">Brian Joseph</a>, Gideon Yen, and Sachin Dinesraja
`

let projects = `I've made a lot of projects over the years, but here are my best ones:
${colorText("Made in Swift", "ansi-pink")}
<a href="https://github.com/advaitconty/fitstreak">${colorText('󱐋 FitStreak', 'ansi-yellow')}</a> - A fitness tracker I made while learning Swift in the <a href="https://swiftin.sg">${colorText('Swift Accelerator Programme', 'ansi-yellow')}</a>
<a href="https://solstice.advaitconty.com">${colorText(' Solstice', 'ansi-blue')}</a> - An aesthetic pomodoro timer since I got tired of most pomodoro timers locking features behind paywalls
<a href="https://github.com/advaitconty/verdi">${colorText('󰌪 Verdi', 'ansi-green')}</a> - A carbon emissions tracker that makes things fun and simple - <i>Winner of the HackClub Cider Winter Event 2024!</i> 

${colorText("Made in Python", "ansi-pink")}
<a href="https://github.com/advaitconty/QMLoaner">${colorText('󰝱 QMLoaner', 'ansi-yellow')}</a> -  A school app that I co-developed with a friend in Python to help automate boring tasks such as form creations and returning guitars, for the SPS Guitar Ensemble CCA</a>
<a href="https://github.com/advaitconty/moods">${colorText(' Moods', 'ansi-blue')}</a> - A custom music player built in Python that runs on "Moods", which invovles an iOS app and a Raspberry Pi Zero 2 W repurposed to run as a portable music player
<a href="https://github.com/advaitconty/verdi">${colorText('󰮃 Tetris: The Last Tetris', 'ansi-green')}</a> - My submission for <a href="https://counterspell.hackclub.com">${colorText('Counterspell', 'ansi-yellow')}</a> Globals - it's basically Tetris with a twist at the end!

<i>You can click on the highlighted text to check the repos out!</i>`

const commands = {
    "help": colorText("Available commands: help, about, starred, projects, images, clear", "ansi-green"),
    "about": colorText(`Hey! I'm Advait! I'm a coder, and love physics lore and planes! I'm also an active member of Hack Club, one of the largest teenage hacker groups in the world.\nI mainly code in Swift and Python\n\nFun facts:\nMy favourite plane: A350-1000 and Boeing 777-300ER (such beautiful planes!)\nFavourite language: Swift (so quick and efficient!)`, "ansi-blue"),
    "projects": projects,
    "starred": async () => {
        const loadingMessage = colorText("Fetching starred repositories...", "ansi-gray");
        terminal.innerHTML += `${loadingMessage}\n`;
        const projects = await getGitHubStarredProjects();
        terminal.innerHTML = terminal.innerHTML.replace(`${loadingMessage}\n`, '');
        return projects;
    },
    "images": displayImages,
    "clear": () => { terminal.innerHTML = ""; return startupMessage; },
    "achievements": achievements,
    "curl": async (args) => {
        const url = args.trim().split(" ")[0]; // Extract URL correctly
        return await runCurl(url);
    },
    "cowsay": (args) => {
        return generateCowsay(args);
    }
};

async function runCurl(url) {
    if (!url) {
        return colorText("Usage: curl <URL>", "ansi-red");
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json();
            data = JSON.stringify(jsonData, null, 2);
        } else {
            data = await response.text();
        }

        return applyAnsiColors(data);
    } catch (error) {
        return colorText(`Error fetching URL: ${error.message}`, "ansi-red");
    }
}

function applyAnsiColors(text) {
    return text
        .replace(/\\x1b\[30m/g, '<span class="ansi-black">')
        .replace(/\\x1b\[31m/g, '<span class="ansi-red">')
        .replace(/\\x1b\[32m/g, '<span class="ansi-green">')
        .replace(/\\x1b\[33m/g, '<span class="ansi-yellow">')
        .replace(/\\x1b\[34m/g, '<span class="ansi-blue">')
        .replace(/\\x1b\[35m/g, '<span class="ansi-magenta">')
        .replace(/\\x1b\[36m/g, '<span class="ansi-cyan">')
        .replace(/\\x1b\[37m/g, '<span class="ansi-white">')
        .replace(/\\x1b\[90m/g, '<span class="ansi-bright-black">')
        .replace(/\\x1b\[91m/g, '<span class="ansi-bright-red">')
        .replace(/\\x1b\[92m/g, '<span class="ansi-bright-green">')
        .replace(/\\x1b\[93m/g, '<span class="ansi-bright-yellow">')
        .replace(/\\x1b\[94m/g, '<span class="ansi-bright-blue">')
        .replace(/\\x1b\[95m/g, '<span class="ansi-bright-magenta">')
        .replace(/\\x1b\[96m/g, '<span class="ansi-bright-cyan">')
        .replace(/\\x1b\[97m/g, '<span class="ansi-bright-white">')
        .replace(/\\x1b\[40m/g, '<span class="ansi-bg-black">')
        .replace(/\\x1b\[41m/g, '<span class="ansi-bg-red">')
        .replace(/\\x1b\[42m/g, '<span class="ansi-bg-green">')
        .replace(/\\x1b\[43m/g, '<span class="ansi-bg-yellow">')
        .replace(/\\x1b\[44m/g, '<span class="ansi-bg-blue">')
        .replace(/\\x1b\[45m/g, '<span class="ansi-bg-magenta">')
        .replace(/\\x1b\[46m/g, '<span class="ansi-bg-cyan">')
        .replace(/\\x1b\[47m/g, '<span class="ansi-bg-white">')
        .replace(/\\x1b\[100m/g, '<span class="ansi-bg-bright-black">')
        .replace(/\\x1b\[101m/g, '<span class="ansi-bg-bright-red">')
        .replace(/\\x1b\[102m/g, '<span class="ansi-bg-bright-green">')
        .replace(/\\x1b\[103m/g, '<span class="ansi-bg-bright-yellow">')
        .replace(/\\x1b\[104m/g, '<span class="ansi-bg-bright-blue">')
        .replace(/\\x1b\[105m/g, '<span class="ansi-bg-bright-magenta">')
        .replace(/\\x1b\[106m/g, '<span class="ansi-bg-bright-cyan">')
        .replace(/\\x1b\[107m/g, '<span class="ansi-bg-bright-white">')
        .replace(/\\x1b\[0m/g, '</span>');
}

function generateCowsay(message) {
    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;
    
    const topBottom = " " + "_".repeat(message.length + 2);
    const textLine = `< ${message} >`;
    return `${topBottom}\n${textLine}\n${topBottom}\n${cow}`;
}


document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.getElementById("terminal");
    const commandContainer = document.getElementById("command-container");

    terminal.innerHTML = startupMessage;

    const commandLine = document.createElement("div");
    commandLine.className = "command-line";
    commandLine.innerHTML = `
        <span class="prompt">contyadvait@contyos:~$</span>
        <input type="text" id="input" autofocus>
    `;
    commandContainer.appendChild(commandLine);

    const input = document.getElementById("input");

    input.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            let cmdLine = input.value.trim();
            input.value = "";
    
            terminal.innerHTML += `\ncontyadvait@contyos:~$ ${cmdLine}\n`;
    
            let [cmd, ...args] = cmdLine.split(" ");
            args = args.join(" ").trim(); // Ensure args are properly handled
    
            let output = commands[cmd] || colorText("Command not found. Type 'help' for available commands.", "ansi-red");
            if (typeof output === "function") {
                if (output.constructor.name === "AsyncFunction") {
                    output = await output(args);
                } else {
                    output = output(args);
                }
            }
    
            terminal.innerHTML += `${output}\n`;
            window.scrollTo(0, document.body.scrollHeight);
        }        
    });
});