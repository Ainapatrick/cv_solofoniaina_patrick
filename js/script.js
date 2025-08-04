// ANIMATION GSAP INITIAL
/*
gsap.from(".nav-bar", {
    x: -250,
    opacity: 0,
    duration: 1
});
gsap.from(".content", {
    x: 250,
    opacity: 0,
    duration: 1
});
*/
// LOAD PAGE DYNAMIC
function loadPage(page) {
    fetch(`./pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-content").innerHTML = data;

            const section = document.querySelector("#main-content section");
            if (section) {
                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    stagger: 0.3
                });
            }

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

            if (typeof animateExtraSections === "function") {
                animateExtraSections();
            }


            // 🔽 Fanampiana EmailJS form submit
            if (page === "contact") {
                setTimeout(() => {
                    const form = document.getElementById("contact-form");
                    if (form) {
                        form.addEventListener("submit", function (e) {
                            e.preventDefault();

                            emailjs.sendForm("service_dyyb5ja", "template_jmgf59r", this)
                                .then(function () {
                                    alert("Message envoyé avec succès !");
                                    form.reset();
                                }, function (error) {
                                    alert("Erreur lors de l’envoi : " + JSON.stringify(error));
                                });
                        });
                    }
                }, 100);
            }

        })
        .catch(error => console.error("Erreur de chargement:", error));
}

// GESTION RESPONSIVE NAVBAR
function handleResponsiveNavbar() {
    const navbar = document.querySelector(".nav-bar");
    const toggleBtn = document.getElementById("toggle-navbar");
    const width = window.innerWidth;
    if (width <= 768) {
        navbar.classList.add("hidden-navbar");
        //navbar.style.display = "none";
        toggleBtn.style.display = "block";
    } else {
        navbar.classList.remove("hidden-navbar");
        toggleBtn.style.display = "none";
    }
}


// GESTION DU HASH AU DEMARRAGE
window.addEventListener("DOMContentLoaded", () => {
    handleResponsiveNavbar();

    const hash = window.location.hash.substring(1);
    if (hash) {
        loadPage(hash);
    } else {
        loadPage("profils");
    }
});

// BOUTON MENU NAVBAR 
document.getElementById("toggle-navbar").addEventListener("click", function () {
    const navbar = document.querySelector(".nav-bar");
    navbar.classList.toggle("hidden-navbar");
});


// REAJUSTEMENT AU REDIMENSIONNEMENT
window.addEventListener("resize", handleResponsiveNavbar);

// LIEN CLIQUÉE AO AMIN'NY MENU
document.querySelectorAll(".nav-link a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.getAttribute("href").substring(1);
        window.location.hash = target;
        loadPage(target);
    });
});

// LORSQUE MIOVA NY HASH
window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadPage(hash);
    }
});
