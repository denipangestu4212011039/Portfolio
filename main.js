const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );

const navItems =
    navLinks.querySelectorAll(
        "a"
    );


/* =========================================================
   THEME
========================================================= */

function updateThemeButton() {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-theme"
        );

    const isDark =
        currentTheme === "dark";

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );

}


themeToggle.addEventListener(
    "click",
    () => {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            nextTheme
        );

        localStorage.setItem(
            "portfolio-theme",
            nextTheme
        );

        updateThemeButton();

    }
);


updateThemeButton();


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    navLinks.classList.remove(
        "active"
    );

    menuToggle.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navLinks.classList.toggle(
                "active"
            );

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


navItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            closeMenu
        );

    }
);


window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "is-visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px"
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}