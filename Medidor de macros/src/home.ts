export { }; // Ensure it's treated as a module if needed, though here we're in a closure

import "./nav.js";

interface Macros {
    kcal: number;
    pro: number;
    carb: number;
    grasa: number;
}

interface Alimento {
    kcal: number;
    pro: number;
    carb: number;
    grasa: number;
}

interface HistorialItem {
    alimento: string;
    gramos: number;
    macros: Macros;
}

interface DiaGuardado {
    fecha: string;
    kcal: number;
    macros: Macros;
}



document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // 1. OBJETIVOS DIARIOS (Dinámicos por IA)
    // ==========================
    let objetivos: Macros = {
        kcal: 0,
        pro: 0,
        carb: 0,
        grasa: 0,
    };

    // La función se define más abajo, pero la invocamos aquí inicialmente
    // Nota: en TS las funciones con nombre tienen hoisting dentro del block
    // pero para evitar problemas con la let 'objetivos', la llamaremos después de la definición o usaremos la lógica aquí.


    // ==========================
    // 2. ESTADO ACTUAL DEL DÍA
    // ==========================
    let estado: Macros = {
        kcal: 0,
        pro: 0,
        carb: 0,
        grasa: 0,
    };

    let historial: HistorialItem[] = [];
    let diasGuardados: DiaGuardado[] = []; // Array para guardar días completos

    // ==========================
    // 3. BASE DE ALIMENTOS SIMPLIFICADA (100g)
    // ==========================
    const alimentos: Record<string, Alimento> = {
        // PROTEÍNAS ANIMALES
        huevo: { kcal: 155, pro: 13, carb: 1.1, grasa: 11 },
        clara_huevo: { kcal: 52, pro: 11, carb: 0.7, grasa: 0.2 },
        carne_magra: { kcal: 150, pro: 26, carb: 0, grasa: 5 },
        carne: { kcal: 200, pro: 26, carb: 0, grasa: 10 },
        milanesa_carne: { kcal: 250, pro: 20, carb: 10, grasa: 15 },
        milanesa_pechuga: { kcal: 220, pro: 22, carb: 10, grasa: 12 },
        carne_grasa: { kcal: 280, pro: 24, carb: 0, grasa: 20 },
        pollo_pechuga: { kcal: 165, pro: 31, carb: 0, grasa: 3.6 },
        pollo_muslo: { kcal: 209, pro: 26, carb: 0, grasa: 11 },
        pavo: { kcal: 135, pro: 29, carb: 0, grasa: 1 },
        cerdo_lomo: { kcal: 195, pro: 27, carb: 0, grasa: 9 },
        jamon_cocido: { kcal: 145, pro: 21, carb: 1, grasa: 6 },
        salchicha: { kcal: 300, pro: 12, carb: 3, grasa: 27 },

        // PESCADOS Y MARISCOS
        atun_lata_agua: { kcal: 116, pro: 26, carb: 0, grasa: 1 },
        atun_lata_aceite: { kcal: 198, pro: 29, carb: 0, grasa: 8 },
        salmon: { kcal: 208, pro: 20, carb: 0, grasa: 13 },
        merluza: { kcal: 90, pro: 19, carb: 0, grasa: 1 },
        sardinas: { kcal: 208, pro: 25, carb: 0, grasa: 11 },
        camarones: { kcal: 99, pro: 24, carb: 0.2, grasa: 0.3 },

        // LÁCTEOS
        leche_entera: { kcal: 61, pro: 3.2, carb: 4.8, grasa: 3.3 },
        leche_descremada: { kcal: 35, pro: 3.4, carb: 5, grasa: 0.2 },
        yogur_griego_0: { kcal: 59, pro: 10, carb: 3.6, grasa: 0.4 },
        yogur_natural: { kcal: 63, pro: 3.5, carb: 4.7, grasa: 3.3 },
        queso_crema: { kcal: 340, pro: 6, carb: 4, grasa: 34 },
        queso_muzzarella: { kcal: 280, pro: 22, carb: 3, grasa: 20 },
        ricota: { kcal: 174, pro: 11, carb: 3, grasa: 13 },
        proteina_suero: { kcal: 370, pro: 80, carb: 5, grasa: 3 }, // Suplemento

        // CARBOHIDRATOS PRINCIPALES
        arroz_cocido: { kcal: 130, pro: 2.7, carb: 28, grasa: 0.3 },
        arroz_crudo: { kcal: 365, pro: 7, carb: 80, grasa: 0.7 },
        pasta_cocida: { kcal: 131, pro: 5, carb: 25, grasa: 1.1 },
        papa_hervida: { kcal: 77, pro: 2, carb: 17, grasa: 0.1 },
        batata: { kcal: 86, pro: 1.6, carb: 20, grasa: 0.1 },
        quinoa_cocida: { kcal: 120, pro: 4.4, carb: 21, grasa: 1.9 },
        lentejas_cocidas: { kcal: 116, pro: 9, carb: 20, grasa: 0.4 },
        garbanzos_cocidos: { kcal: 164, pro: 9, carb: 27, grasa: 2.6 },
        avena: { kcal: 389, pro: 16.9, carb: 66, grasa: 6.9 },

        // PAN Y DERIVADOS
        pan_blanco: { kcal: 265, pro: 9, carb: 49, grasa: 3.2 },
        pan_integral: { kcal: 247, pro: 13, carb: 41, grasa: 4.2 },
        tostadas_pan: { kcal: 380, pro: 12, carb: 72, grasa: 5 },

        // FRUTAS
        banana: { kcal: 89, pro: 1.1, carb: 23, grasa: 0.3 },
        manzana: { kcal: 52, pro: 0.3, carb: 14, grasa: 0.2 },
        naranja: { kcal: 47, pro: 0.9, carb: 12, grasa: 0.1 },
        frutilla: { kcal: 32, pro: 0.7, carb: 7.7, grasa: 0.3 },
        uvas: { kcal: 69, pro: 0.7, carb: 18, grasa: 0.2 },
        arandanos: { kcal: 57, pro: 0.7, carb: 14, grasa: 0.3 },

        // VERDURAS 
        pure_papa: { kcal: 95, pro: 2, carb: 21, grasa: 2.5 },
        acelga: { kcal: 19, pro: 1.8, carb: 3.7, grasa: 0.2 },
        espinaca: { kcal: 23, pro: 2.9, carb: 3.6, grasa: 0.4 },
        brocoli: { kcal: 34, pro: 2.8, carb: 7, grasa: 0.4 },
        zanahoria: { kcal: 41, pro: 0.9, carb: 10, grasa: 0.2 },
        tomate: { kcal: 18, pro: 0.9, carb: 3.9, grasa: 0.2 },
        lechuga: { kcal: 15, pro: 1.4, carb: 2.9, grasa: 0.2 },

        // GRASAS / EXTRAS
        aceite_oliva: { kcal: 884, pro: 0, carb: 0, grasa: 100 },
        manteca: { kcal: 717, pro: 0.9, carb: 0.1, grasa: 81 },
        manteca_mani: { kcal: 588, pro: 25, carb: 20, grasa: 50 },
        palta: { kcal: 160, pro: 2, carb: 9, grasa: 15 },

        // DULCES
        mermelada: { kcal: 250, pro: 0.3, carb: 65, grasa: 0.2 },
        miel: { kcal: 304, pro: 0.3, carb: 82, grasa: 0 },

        // SNACKS / EXTRA DEPORTISTA
        frutos_secos_mix: { kcal: 600, pro: 20, carb: 20, grasa: 50 },
        almendras: { kcal: 579, pro: 21, carb: 22, grasa: 50 },
        nueces: { kcal: 654, pro: 15, carb: 14, grasa: 65 },
        chocolate_negro: { kcal: 600, pro: 8, carb: 46, grasa: 43 },
    };



    // ==========================
    // 4. ELEMENTOS DEL DOM
    // ==========================
    const kcalActual = document.querySelector("#kcalActual") as HTMLElement;
    const proActual = document.querySelector("#proActual") as HTMLElement;
    const carbActual = document.querySelector("#carbActual") as HTMLElement;
    const grasaActual = document.querySelector("#grasActual") as HTMLElement;

    const barraKcal = document.querySelector("#barraKcal") as HTMLElement;
    const barraPro = document.querySelector("#barraPro") as HTMLElement;
    const barraCarb = document.querySelector("#barraCarb") as HTMLElement;
    const barraGrasa = document.querySelector("#barraGrasa") as HTMLElement;

    const btnAñadir = document.querySelector(".btn-añadir") as HTMLElement;
    const btnBuscar = document.querySelector(".btn-buscar") as HTMLElement;
    const btnGuardar = document.querySelector(".btn-guardar") as HTMLElement;
    const btnReiniciar = document.querySelector(".btn-reiniciar") as HTMLElement;

    const listaHistorial = document.querySelector("#historialLista") as HTMLElement;
    const listaDiasElement = document.querySelector("#lista-dias") as HTMLElement;

    // ==========================
    // 5. FUNCIONES AUXILIARES
    // ==========================
    function calcularPorcentaje(actual: number, objetivo: number): number {
        return Math.min((actual / objetivo) * 100, 100);
    }

    function calcularMacros(alimentoKey: string, gramos: number): Macros | null {
        const base = alimentos[alimentoKey];
        if (!base) return null;
        const factor = gramos / 100;

        return {
            kcal: base.kcal * factor,
            pro: base.pro * factor,
            carb: base.carb * factor,
            grasa: base.grasa * factor,
        };
    }

    function loadAiObjetivos(): void {
        const aiObjetivosStr = localStorage.getItem("macroObjetivos");
        if (aiObjetivosStr) {
            try {
                const aiObjetivos = JSON.parse(aiObjetivosStr);
                objetivos = { ...objetivos, ...aiObjetivos };
            } catch (e) {
                console.error("Error cargando objetivos de IA", e);
            }
        }
    }

    // ==========================
    // 6. RENDERIZADO
    // ==========================
    function render(): void {
        loadAiObjetivos(); // Asegurar que los objetivos de la IA se apliquen antes de renderizar

        // Actualizar Textos
        if (kcalActual) kcalActual.textContent = Math.round(estado.kcal).toString();
        if (proActual) proActual.textContent = Math.round(estado.pro).toString();
        if (carbActual) carbActual.textContent = Math.round(estado.carb).toString();
        if (grasaActual) grasaActual.textContent = Math.round(estado.grasa).toString();

        // Actualizar Etiquetas de Objetivo
        const kcalObj = document.getElementById("kcalObj");
        const proObj = document.getElementById("proObj");
        const carbObj = document.getElementById("carbObj");
        const grasObj = document.getElementById("grasObj");

        if (kcalObj) kcalObj.textContent = Math.round(objetivos.kcal).toString();
        if (proObj) proObj.textContent = Math.round(objetivos.pro).toString();
        if (carbObj) carbObj.textContent = Math.round(objetivos.carb).toString();
        if (grasObj) grasObj.textContent = Math.round(objetivos.grasa).toString();

        // Actualizar Barras
        if (barraKcal) barraKcal.style.width = `${calcularPorcentaje(estado.kcal, objetivos.kcal)}%`;
        if (barraPro) barraPro.style.width = `${calcularPorcentaje(estado.pro, objetivos.pro)}%`;
        if (barraCarb) barraCarb.style.width = `${calcularPorcentaje(estado.carb, objetivos.carb)}%`;
        if (barraGrasa) barraGrasa.style.width = `${calcularPorcentaje(estado.grasa, objetivos.grasa)}%`;

        renderHistorial();
        renderDiasGuardados();
        renderFoods();
    }

    window.addEventListener('focus', () => {
        render();
    });


    function renderHistorial(): void {
        if (!listaHistorial) return;
        listaHistorial.innerHTML = "";

        historial.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "historial-item";

            const titulo = document.createElement("span");
            titulo.className = "historial-fecha";
            titulo.textContent = `${item.alimento.replace(/_/g, " ").toUpperCase()} (${item.gramos}g)`;

            const detalles = document.createElement("span");
            detalles.className = "historial-macros";
            detalles.textContent = `${Math.round(item.macros.kcal)} kcal | P: ${Math.round(item.macros.pro)} | C: ${Math.round(item.macros.carb)} | G: ${Math.round(item.macros.grasa)}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.className = "historial-borrar";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarItem(index);

            div.appendChild(titulo);
            div.appendChild(detalles);
            div.appendChild(btnEliminar);

            listaHistorial.appendChild(div);
        });
    }

    function renderDiasGuardados(): void {
        if (!listaDiasElement) return;
        listaDiasElement.innerHTML = "";

        if (diasGuardados.length === 0) {
            listaDiasElement.innerHTML = "<p style='text-align:center; color:#888;'>No hay días guardados aún.</p>";
            return;
        }

        diasGuardados.forEach((dia, index) => {
            const card = document.createElement("div");
            card.className = "dia-card";

            const fecha = document.createElement("h4");
            fecha.textContent = dia.fecha;

            const kcalTotal = document.createElement("p");
            kcalTotal.textContent = `Total: ${Math.round(dia.kcal)} kcal`;
            kcalTotal.style.fontWeight = "bold";
            kcalTotal.style.color = "#f8fafc"; // Adjusted for dark theme

            const macrosDisplay = document.createElement("p");
            macrosDisplay.style.fontSize = "0.85rem";
            macrosDisplay.style.color = "#94a3b8"; // Adjusted for dark theme
            macrosDisplay.textContent = `P: ${Math.round(dia.macros.pro)} | C: ${Math.round(dia.macros.carb)} | G: ${Math.round(dia.macros.grasa)}`;

            const btnBorrar = document.createElement("button");
            btnBorrar.className = "btn-borrar-dia-historial";
            btnBorrar.textContent = "×";
            btnBorrar.onclick = () => eliminarDiaGuardado(index);

            card.appendChild(fecha);
            card.appendChild(kcalTotal);
            card.appendChild(macrosDisplay);
            card.appendChild(btnBorrar);

            listaDiasElement.appendChild(card);
        });
    }

    function eliminarDiaGuardado(index: number): void {
        if (!confirm("¿Eliminar este registro del historial?")) return;
        diasGuardados.splice(index, 1);
        guardarAutomatico();
        renderDiasGuardados();
    }

    // ==========================
    // 7. LÓGICA DE ACTUALIZACIÓN
    // ==========================
    function agregarAlimento(nombre: string, gramos: number): void {
        const macros = calcularMacros(nombre, gramos);
        if (!macros) return;

        estado.kcal += macros.kcal;
        estado.pro += macros.pro;
        estado.carb += macros.carb;
        estado.grasa += macros.grasa;

        historial.push({ alimento: nombre, gramos, macros });
        guardarAutomatico();
        render();
    }

    function eliminarItem(index: number): void {
        if (!confirm("¿Eliminar este alimento?")) return;

        const item = historial[index];

        estado.kcal -= item.macros.kcal;
        estado.pro -= item.macros.pro;
        estado.carb -= item.macros.carb;
        estado.grasa -= item.macros.grasa;

        if (estado.kcal < 0) estado.kcal = 0;
        if (estado.pro < 0) estado.pro = 0;
        if (estado.carb < 0) estado.carb = 0;
        if (estado.grasa < 0) estado.grasa = 0;

        historial.splice(index, 1);
        guardarAutomatico();
        render();
    }

    function fuzzyMatchAlimento(input: string): string | null {
        const i = input.toLowerCase().trim();
        const keys = Object.keys(alimentos);

        // 1. Coincidencia exacta
        if (alimentos[i]) return i;

        // 2. Coincidencia de subtexto (ej: "pechuga" -> "pollo_pechuga")
        const subMatch = keys.find(k => k.includes(i) || i.includes(k));
        if (subMatch) return subMatch;

        // 3. Razonamiento por typos comunes (si empieza igual o tiene 70% de letras iguales)
        const closeMatch = keys.find(k => {
            if (k[0] === i[0] && k.length > 3) {
                let matches = 0;
                for (let char of i) if (k.includes(char)) matches++;
                return matches / k.length > 0.7;
            }
            return false;
        });

        return closeMatch || null;
    }

    // ==========================
    // 8. EVENT LISTENERS
    // ==========================
    if (btnAñadir) {
        btnAñadir.addEventListener("click", () => {
            let input = prompt("¿Qué almento consumiste? (Ej: pollo, pillo, arroz)");
            if (!input) return;

            const nombreMatch = fuzzyMatchAlimento(input);

            if (!nombreMatch) {
                alert("⚠️ No pudimos reconocer ese alimento. Probá con otro nombre.");
                return;
            }

            const gramosStr = prompt(`Reconocido como: ${nombreMatch.replace("_", " ")}. ¿Cuántos gramos?`);
            if (!gramosStr) return;
            const gramos = parseFloat(gramosStr);
            if (isNaN(gramos) || gramos <= 0) {
                alert("⚠️ Cantidad inválida.");
                return;
            }

            agregarAlimento(nombreMatch, gramos);
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            btnAñadir?.click();
        });
    }

    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            guardarDia();
            alert("✅ Día guardado correctamente.");
        });
    }

    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", () => {
            if (!confirm("⚠️ ¿Estás seguro de reiniciar todo el progreso de hoy?")) return;

            estado = { kcal: 0, pro: 0, carb: 0, grasa: 0 };
            historial = [];
            guardarAutomatico();
            render();
        });
    }

    const btnAi = document.querySelector("#BtnAiAction") as HTMLElement;
    const aiTips = document.querySelector("#aiTips") as HTMLElement;

    if (btnAi && aiTips) {
        btnAi.addEventListener("click", () => {
            generarRecomendacionesIA();
        });
    }

    function renderFoods(): void {
        const aiFoodsList = document.querySelector("#aiFoodsList");
        const savedSugerencias = localStorage.getItem("macroAlimentosSugeridos");

        if (aiFoodsList && savedSugerencias) {
            try {
                const sugerencias = JSON.parse(savedSugerencias);
                aiFoodsList.innerHTML = "";
                sugerencias.forEach((s: string) => {
                    const item = document.createElement("div");
                    item.style.padding = "10px";
                    item.style.background = "rgba(255,255,255,0.08)";
                    item.style.borderRadius = "8px";
                    item.style.textAlign = "center";
                    item.textContent = s;
                    aiFoodsList.appendChild(item);
                });
            } catch (e) {
                console.error("Error renderizando comidas IA", e);
            }
        }
    }

    function generarRecomendacionesIA(): void {
        const tips: string[] = [];
        const faltaKcal = objetivos.kcal - estado.kcal;

        if (estado.kcal === 0) {
            tips.push("¡Comienza tu día registrando tu primera comida! 🍳");
        } else if (faltaKcal > 500) {
            tips.push(`Todavía te faltan ${Math.round(faltaKcal)} kcal. Prioriza fuentes de proteína. 🥩`);
        } else if (faltaKcal <= 500 && faltaKcal > 0) {
            tips.push("Estás cerca de tu objetivo calórico. Opta por snacks ligeros. 🍎");
        } else if (faltaKcal <= 0) {
            tips.push("Has alcanzado tu objetivo de calorías por hoy. ¡Buen trabajo! ✅");
        }

        // Análisis de Proteína
        if (estado.pro < objetivos.pro * 0.7 && estado.kcal > 0) {
            tips.push("Tu consumo de proteínas es bajo. Intenta añadir claras de huevo o pollo. 🍗");
        }

        if (aiTips) {
            aiTips.innerHTML = "";
            tips.forEach(tip => {
                const p = document.createElement("p");
                p.style.marginBottom = "10px";
                p.style.animation = "fadeIn 0.5s ease-out";
                p.textContent = tip;
                aiTips.appendChild(p);
            });
        }
    }

    // ==========================
    // 9. PERSISTENCIA
    // ==========================
    function guardarAutomatico(): void {
        localStorage.setItem("macroEstado", JSON.stringify(estado));
        localStorage.setItem("macroHistorial", JSON.stringify(historial));
        localStorage.setItem("macroDiasGuardados", JSON.stringify(diasGuardados));
    }

    function guardarDia(): void {
        const fechaHoy = new Date().toLocaleDateString();
        diasGuardados.push({
            fecha: fechaHoy,
            kcal: estado.kcal,
            macros: { ...estado }
        });
        guardarAutomatico();
        renderDiasGuardados();
    }

    function cargarDatos(): void {
        const savedEstado = localStorage.getItem("macroEstado");
        const savedHistorial = localStorage.getItem("macroHistorial");
        const savedDias = localStorage.getItem("macroDiasGuardados");

        if (savedEstado) estado = JSON.parse(savedEstado);
        if (savedHistorial) historial = JSON.parse(savedHistorial);
        if (savedDias) diasGuardados = JSON.parse(savedDias);
    }

    cargarDatos();
    render();
});
