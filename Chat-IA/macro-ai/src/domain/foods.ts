import { UserProfile } from "../types/types.js";

export function getFoodRecommendations(user: UserProfile): string[] {
    const goal = user.goal || "performance";
    const sport = user.sport || "gym";

    // Categorías base por objetivo con porciones aproximadas
    const baseRecommendations: Record<string, string[]> = {
        muscle: [
            "Pollo con batata (200g pollo, 300g batata) 🍗",
            "Licuado de banana y avena (1 banana, 50g avena) 🥤",
            "Carne con arroz integral (150g carne, 200g arroz) 🥩",
            "Huevos con palta (3 huevos, 100g palta) 🍳"
        ],
        fat_loss: [
            "Ensalada de atún (100g atún, verduras) 🥗",
            "Merluza con brócoli (150g merluza, 200g brócoli) 🐟",
            "Omelette de claras (4 claras, verduras) 🥚",
            "Yogur con arándanos (200g yogur, 50g arándanos) 🥣"
        ],
        performance: [
            "Pasta con salsa bolognesa (200g pasta, 100g carne) 🍝",
            "Quinoa con vegetales (150g quinoa, verduras) 🍚",
            "Sándwich de pavo (100g pavo, pan integral) 🥪",
            "Panqueques de avena (50g avena, frutas) 🥞"
        ],
        strength: [
            "Carne roja con patatas (200g carne, 300g patatas) 🥩",
            "Huevos con arroz (4 huevos, 200g arroz) 🥚",
            "Pollo con quinoa (200g pollo, 150g quinoa) 🍗",
            "Leche con cereales (300ml leche, 50g cereales) 🥛"
        ],
        toning: [
            "Pechuga de pavo con ensalada (150g pavo, verduras) 🥗",
            "Salmón con verduras (150g salmón, 200g verduras) 🐟",
            "Yogur griego con frutas (200g yogur, frutas) 🥣",
            "Tofu con quinoa (150g tofu, 150g quinoa) 🍚"
        ],
        volumen: [
            "Pollo con arroz (250g pollo, 300g arroz) 🍗",
            "Carne con pasta (200g carne, 250g pasta) 🥩",
            "Huevos con avena (5 huevos, 100g avena) 🥚",
            "Licuado de proteínas (proteína, frutas) 🥤"
        ],
        endurance: [
            "Pasta integral (250g pasta, verduras) 🍝",
            "Frutas secas y nueces (50g mixtas) 🥜",
            "Yogur con miel (200g yogur, 1 tbsp miel) 🥣",
            "Bebida isotónica (electrolitos) 💧"
        ],
        power: [
            "Carne con batatas (200g carne, 300g batatas) 🥩",
            "Huevos con pan (4 huevos, 2 rebanadas pan) 🥚",
            "Pollo con arroz (200g pollo, 200g arroz) 🍗",
            "Frutas y yogur (frutas, 200g yogur) 🍌"
        ],
        agility: [
            "Sándwich de pollo (150g pollo, pan) 🥪",
            "Frutas cítricas (2 naranjas) 🍊",
            "Yogur con granola (200g yogur, 30g granola) 🥣",
            "Frutos secos (30g) 🥜"
        ],
        flexibility: [
            "Frutas frescas (2 manzanas) 🍎",
            "Té herbal con miel 🍵",
            "Yogur natural (200g) 🥛",
            "Nueces (30g) 🥜"
        ],
        rehab: [
            "Pollo con verduras (150g pollo, verduras) 🍗",
            "Quinoa con tofu (100g quinoa, 100g tofu) 🍚",
            "Yogur con frutas (150g yogur, frutas) 🥣",
            "Té verde 🍵"
        ]
    };

    // Ajustes específicos por deporte (Expandido para más variedad)
    const sportExtras: Record<string, string[]> = {
        gym: ["Proteína de suero o claras (post-entreno) 🥚", "Creatina natural (carne roja) 🥩", "Avena con frutas 🍓", "Nueces y semillas 🥜"],
        football: ["Frutos secos (energía rápida) 🥜", "Pasta con atún (carga glucémica) 🍝", "Banana (potasio) 🍌", "Yogur griego 🥛"],
        basketball: ["Banana (evitar calambres) 🍌", "Yogur con cereales 🥣", "Frutas cítricas 🍊", "Sándwich de jamón 🥪"],
        crossfit: ["Batata (carbo de absorción lenta) 🍠", "Frutos rojos (antioxidantes) 🍓", "Huevo duro 🥚", "Quinoa con pollo 🍗"],
        running: ["Pasta integral 🍝", "Dátiles o miel 🍯", "Frutas secas 🥜", "Bebida de electrolitos 💧"],
        cycling: ["Barras de cereal caseras 🌾", "Bebida isotónica natural 💧", "Frutas frescas 🍎", "Yogur con miel 🥛"],
        martial: ["Té verde (enfoque) 🍵", "Pollo con jengibre 🥘", "Arroz integral 🍚", "Frutos secos 🥜"],
        swimming: ["Pasta con verduras 🍝", "Frutas tropicales 🍍", "Yogur natural 🥛", "Nueces 🥜"],
        tennis: ["Banana 🍌", "Sándwich de pollo 🥪", "Frutas cítricas 🍊", "Agua de coco 🥥"],
        yoga: ["Té herbal 🍵", "Frutas frescas 🍎", "Yogur con granola 🥣", "Nueces y semillas 🥜"],
        rugby: ["Carne roja 🥩", "Pasta 🍝", "Frutas 🍌", "Leche 🥛"],
        padel: ["Banana 🍌", "Sándwich 🥪", "Frutas 🍊", "Agua 💧"],
        handball: ["Frutas 🍌", "Yogur 🥛", "Frutos secos 🥜", "Pasta 🍝"],
        hockey: ["Carne 🥩", "Frutas 🍎", "Leche 🥛", "Cereales 🌾"],
        volley: ["Banana 🍌", "Yogur 🥣", "Frutos secos 🥜", "Agua 💧"],
        waterpolo: ["Frutas tropicales 🍍", "Yogur 🥛", "Nueces 🥜", "Bebida isotónica 💧"],
        baseball: ["Carne 🥩", "Frutas 🍎", "Leche 🥛", "Sándwich 🥪"],
        softball: ["Frutas 🍌", "Yogur 🥣", "Frutos secos 🥜", "Agua 💧"],
        lacrosse: ["Carne 🥩", "Frutas 🍎", "Leche 🥛", "Cereales 🌾"],
        cricket: ["Frutas 🍌", "Yogur 🥣", "Frutos secos 🥜", "Té 🍵"],
        ultimate_frisbee: ["Banana 🍌", "Sándwich 🥪", "Frutas 🍊", "Agua 💧"],
        athletics: ["Pasta 🍝", "Frutas 🍌", "Yogur 🥛", "Frutos secos 🥜"],
        marathon: ["Pasta integral 🍝", "Dátiles 🍯", "Frutas secas 🥜", "Bebida 💧"],
        triathlon: ["Barras de cereal 🌾", "Frutas 🍎", "Yogur 🥛", "Nueces 🥜"],
        duathlon: ["Pasta 🍝", "Frutas 🍌", "Leche 🥛", "Frutos secos 🥜"],
        rowing: ["Pasta 🍝", "Frutas 🍎", "Yogur 🥣", "Nueces 🥜"],
        kayak: ["Frutas 🍌", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        xc_skiing: ["Pasta 🍝", "Frutas secas 🥜", "Leche 🥛", "Cereales 🌾"],
        speed_skating: ["Pasta 🍝", "Frutas 🍌", "Yogur 🥛", "Frutos secos 🥜"],
        powerlifting: ["Carne roja 🥩", "Huevos 🥚", "Avena 🍚", "Leche 🥛"],
        weightlifting: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍌", "Yogur 🥛"],
        strongman: ["Carne 🥩", "Huevos 🥚", "Pasta 🍝", "Leche 🥛"],
        calisthenics: ["Pollo 🍗", "Quinoa 🍚", "Frutas 🍎", "Nueces 🥜"],
        street_workout: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍌", "Frutos secos 🥜"],
        gymnastics: ["Pollo 🍗", "Pasta 🍝", "Frutas 🍎", "Yogur 🥛"],
        boxing: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍌", "Té verde 🍵"],
        kickboxing: ["Pollo 🍗", "Quinoa 🍚", "Frutas 🍊", "Frutos secos 🥜"],
        muay_thai: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍍", "Té 🍵"],
        mma: ["Pollo 🍗", "Pasta 🍝", "Frutas 🍌", "Yogur 🥛"],
        bjj: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍎", "Frutos secos 🥜"],
        wrestling: ["Carne 🥩", "Pasta 🍝", "Frutas 🍌", "Leche 🥛"],
        judo: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍊", "Yogur 🥛"],
        taekwondo: ["Pollo 🍗", "Quinoa 🍚", "Frutas 🍌", "Frutos secos 🥜"],
        karate: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍎", "Té 🍵"],
        sambo: ["Carne 🥩", "Pasta 🍝", "Frutas 🍌", "Leche 🥛"],
        fencing: ["Pollo 🍗", "Pasta 🍝", "Frutas 🍊", "Yogur 🥛"],
        squash: ["Banana 🍌", "Sándwich 🥪", "Frutas 🍊", "Agua 💧"],
        badminton: ["Banana 🍌", "Yogur 🥣", "Frutas 🍎", "Frutos secos 🥜"],
        ping_pong: ["Banana 🍌", "Sándwich 🥪", "Frutas 🍊", "Agua 💧"],
        golf: ["Sándwich 🥪", "Frutas 🍎", "Yogur 🥛", "Agua 💧"],
        shooting: ["Frutas 🍌", "Yogur 🥣", "Frutos secos 🥜", "Agua 💧"],
        archery: ["Frutas 🍎", "Sándwich 🥪", "Yogur 🥛", "Agua 💧"],
        bowling: ["Pizza 🍕", "Cerveza 🍺", "Frutos secos 🥜", "Agua 💧"],
        billiards: ["Frutas 🍌", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        surf: ["Frutas tropicales 🍍", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        kitesurf: ["Frutas 🍌", "Yogur 🥣", "Agua 💧", "Frutos secos 🥜"],
        windsurf: ["Frutas 🍊", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        skateboarding: ["Pizza 🍕", "Refresco 🥤", "Frutos secos 🥜", "Agua 💧"],
        snowboard: ["Frutas 🍌", "Sándwich 🥪", "Chocolate 🍫", "Agua 💧"],
        alpine_skiing: ["Frutas 🍎", "Sándwich 🥪", "Chocolate 🍫", "Agua 💧"],
        climbing: ["Frutas 🍌", "Yogur 🥣", "Frutos secos 🥜", "Agua 💧"],
        boulder: ["Frutas 🍎", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        alpinism: ["Frutas secas 🥜", "Chocolate 🍫", "Agua 💧", "Sándwich 🥪"],
        paragliding: ["Frutas 🍌", "Yogur 🥣", "Agua 💧", "Frutos secos 🥜"],
        artistic_swimming: ["Frutas 🍍", "Yogur 🥛", "Agua 💧", "Frutos secos 🥜"],
        diving: ["Frutas 🍌", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        apnea: ["Frutas 🍊", "Yogur 🥣", "Agua 💧", "Frutos secos 🥜"],
        paddle_surf: ["Frutas tropicales 🍍", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        fitness: ["Pollo 🍗", "Quinoa 🍚", "Frutas 🍎", "Yogur 🥛"],
        functional_training: ["Pollo 🍗", "Arroz 🍚", "Frutas 🍌", "Frutos secos 🥜"],
        hiit: ["Banana 🍌", "Yogur 🥣", "Frutos secos 🥜", "Agua 💧"],
        pilates: ["Frutas 🍎", "Yogur 🥛", "Té 🍵", "Frutos secos 🥜"],
        barre: ["Frutas 🍌", "Yogur 🥣", "Agua 💧", "Frutos secos 🥜"],
        mobility: ["Frutas 🍊", "Sándwich 🥪", "Agua 💧", "Frutos secos 🥜"],
        stretching: ["Frutas 🍎", "Yogur 🥛", "Té 🍵", "Frutos secos 🥜"],
        rehab: ["Pollo 🍗", "Quinoa 🍚", "Frutas 🍌", "Yogur 🥛"]
    };

    const base = recommendationsByGoal(goal, baseRecommendations) || baseRecommendations["performance"];
    const extras = sportExtras[sport] || ["Frutas frescas 🍎", "Yogur natural 🥛"];

    // Retornamos 4 ejemplos combinando base y extras
    return [...(base || []).slice(0, 2), ...extras.slice(0, 2)];
}

function recommendationsByGoal(goal: string, base: Record<string, string[]>): string[] {
    return base[goal] || base["performance"];
}