// animation GSAP
gsap.from(".navbar", {
    x: -250,
    opacity: 0,
    duration: 1
});
gsap.from(".content", {
    x: 250,
    opacity: 0,
    duration: 1
});

// fonction pour charger une page
function loadPage(page) {
    fetch(page + ".html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-content").innerHTML = data;
            gsap.from("#main-content section", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3
            });
            if (page === "statistiques") {
                const canvas = document.getElementById("statsChart");
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Certificats', 'Projets', 'Diplômes', 'Expérience'],
                            datasets: [{
                                label: 'Mes Statistiques',
                                data: [5, 15, 3, 2],
                                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12'],
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }
                    });
                }
            }
        })
        .catch(error => console.log(error));
}

// au démarrage
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadPage(hash);
    } else {
        loadPage("profils");
    }
});

// quand on clique sur le menu
document.querySelectorAll(".nav-link a").forEach(link => {
    link.addEventListener("click", function (e) {
    });
});

// quand le hash change
window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadPage(hash);
    }
});

// bouton toggle
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "toggle-navbar") {
        document.querySelector(".navbar").classList.toggle("hidden-navbar");
    }
});

//section formation
gsap.from(".formation-col", {
    x: -200,
    opacity: 0,
    duration: 1,
    stagger: 0.3
});

gsap.from(".formation-col:nth-child(2)", {
    x: 200,
    opacity: 0,
    duration: 1,
    delay: 0.5
});


///section profil
gsap.from(".profil-card", {
    opacity: 0,
    y: 50,
    duration: 1
});

//experience 
gsap.from(".experience-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3
});

//competence
gsap.to(".progress", {
    width: (i, el) => el.style.width,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out",
    stagger: 0.3
});


