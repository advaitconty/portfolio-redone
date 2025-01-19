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

${colorText("ContyOS Team        : https://github.com/advaitconty", "ansi-gray")}
${colorText("Web Hosting by      : Vercel", "ansi-gray")}
${colorText("Message by the team : Made with <3 by advaitconty", "ansi-gray")}

help       ${colorText(":", "ansi-green")} Get help with commands
about      ${colorText(":", "ansi-green")} Learn more about who this is made by
starred    ${colorText(":", "ansi-green")} Take a look at the projects I have starred on my GitHub
projects   ${colorText(":", "ansi-green")} Take a look at the projects I have starred on my GitHub
images     ${colorText(":", "ansi-green")} Check out the images I have taken
clear      ${colorText(":", "ansi-green")} Clear the terminal screen
`;

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
};

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
            let cmd = input.value.trim().toLowerCase();
            input.value = "";

            terminal.innerHTML += `\ncontyadvait@contyos:~$ ${cmd}\n`;

            let output = commands[cmd] || colorText("Command not found. Type 'help' for available commands.", "ansi-red");
            if (typeof output === "function") {
                if (output.constructor.name === "AsyncFunction") {
                    output = await output();
                } else {
                    output = output();
                }
            }

            terminal.innerHTML += `${output}\n`;
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});