export function inicializarTema(btnTema) {
    if (!btnTema) return;

    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnTema.textContent = "☀️";
        btnTema.setAttribute("aria-label", "Cambiar a modo claro");
    } else {
        document.body.classList.remove("modo-oscuro");
        btnTema.textContent = "🌙";
        btnTema.setAttribute("aria-label", "Cambiar a modo oscuro");
    }

    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro");

        const modoOscuroActivo = document.body.classList.contains("modo-oscuro");

        if (modoOscuroActivo) {
            localStorage.setItem("tema", "oscuro");
            btnTema.textContent = "☀️";
            btnTema.setAttribute("aria-label", "Cambiar a modo claro");
        } else {
            localStorage.setItem("tema", "claro");
            btnTema.textContent = "🌙";
            btnTema.setAttribute("aria-label", "Cambiar a modo oscuro");
        }
    });
}