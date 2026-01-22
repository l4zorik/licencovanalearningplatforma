export type RecipeCategory = 
  | 'Snídaně'
  | 'Oběd'
  | 'Večeře'
  | 'Polévky'
  | 'Saláty'
  | 'Moučníky'
  | 'Nápoje'
  | 'Svačiny'
  | 'Předkrmy'
  | 'Hlavní jídla';

export type RecipeDifficulty = 1 | 2 | 3 | 4 | 5;

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
  note?: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  duration?: number;
  imageUrl?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition?: NutritionInfo;
  tags: string[];
  cuisine: string;
  imageUrl?: string;
  author?: string;
  source?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const RECIPE_DATA: Recipe[] = [
  // === SNÍDANĚ ===
  {
    id: 'classic-scrambled-eggs',
    title: 'Klasická míchaná vejce',
    description: 'Jednoduchá a chutná snídaně, která je hotová za pár minut. Krémová textura a perfektní dochucení.',
    category: 'Snídaně',
    difficulty: 1,
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    ingredients: [
      { name: 'Vejce', amount: '4', unit: 'ks' },
      { name: 'Máslo', amount: '2', unit: 'lžíce' },
      { name: 'Sůl', amount: 'Špetka', unit: '' },
      { name: 'Pepř', amount: 'Špetka', unit: '' },
      { name: 'Čerstvý petržel', amount: '1', unit: 'lžíce', note: 'nasekaný' }
    ],
    steps: [
      { order: 1, instruction: 'Rozklepněte vejce do misky a lehce je prošlehejte vidličkou.' },
      { order: 2, instruction: 'Rozpusťte máslo na pánvi na střední teplotě.' },
      { order: 3, instruction: 'Přidejte vejce a za stálého míchání nechte sráet.' },
      { order: 4, instruction: 'Když jsou vejce téměř hotová, odstavte z ohně - zbytkové teplo je dopeče.' },
      { order: 5, instruction: 'Ochuťte solí, pepřem a posypte nasekanou petrželí.' }
    ],
    nutrition: {
      calories: 280,
      protein: 18,
      carbohydrates: 2,
      fat: 22
    },
    tags: ['snídaně', 'vejce', 'rychlé', 'jednoduché'],
    cuisine: 'Česká',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'avocado-toast',
    title: 'Avokádový toast s vejcem',
    description: 'Moderní snídaně plná zdravých tuků a bílkovin. Křupavý chléb s krémovým avokádem a dokonalým volským okem.',
    category: 'Snídaně',
    difficulty: 2,
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    ingredients: [
      { name: 'Chléb', amount: '2', unit: 'plátek', note: 'kvalitní, ideálně celozrnný' },
      { name: 'Avokádo', amount: '1', unit: 'ks', note: 'zralé' },
      { name: 'Vejce', amount: '2', unit: 'ks' },
      { name: 'Olivový olej', amount: '1', unit: 'lžíce' },
      { name: 'Citronová šťáva', amount: '1', unit: 'lžička' },
      { name: 'Chili vločky', amount: 'Špetka', unit: '' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Čerstvý pepř', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Opražte chléb v toastovači nebo na pánvi do zlatova.' },
      { order: 2, instruction: 'Avokádo rozřízněte, odstraňte pecku a dužinu vyloupněte.' },
      { order: 3, instruction: 'Rozmačkejte avokádo vidličkou a smíchejte s citronovou šťávou, solí a pepřem.' },
      { order: 4, instruction: 'Na pánvi rozpalte olivový olej a usmažte volská oka podle přání.' },
      { order: 5, instruction: 'Avokádovou směs natřete na toast, navrch dejte volské oko.' },
      { order: 6, instruction: 'Posypte chili vločkami a ihned podávejte.' }
    ],
    nutrition: {
      calories: 380,
      protein: 15,
      carbohydrates: 28,
      fat: 24
    },
    tags: ['snídaně', 'avokádo', 'zdravé', 'moderní'],
    cuisine: 'Mezinárodní',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'oatmeal-banana',
    title: 'Ovesná kaše s banánem a skořicí',
    description: 'Teplá a výživná snídaně, která vás zasytí na dlouhou dobu. Plná vlákniny a pomalých sacharidů.',
    category: 'Snídaně',
    difficulty: 1,
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    ingredients: [
      { name: 'Ovesné vločky', amount: '6', unit: 'lžící' },
      { name: 'Mléko', amount: '250', unit: 'ml' },
      { name: 'Voda', amount: '100', unit: 'ml' },
      { name: 'Banán', amount: '1', unit: 'ks' },
      { name: 'Skořice', amount: '1', unit: 'lžička' },
      { name: 'Med', amount: '1', unit: 'lžička' },
      { name: 'Vanilkový extrakt', amount: 'Pár kapek', unit: '' },
      { name: 'Ořechy', amount: '1', unit: 'lžíce', note: 'nasekané' }
    ],
    steps: [
      { order: 1, instruction: 'Smíchejte ovesné vločky s mlékem a vodou v hrnci.' },
      { order: 2, instruction: 'Přiveďte k varu a poté vařte na mírném ohni 5-7 minut za stálého míchání.' },
      { order: 3, instruction: 'Přidejte skořici a vanilkový extrakt.' },
      { order: 4, instruction: 'Sundejte z ohně a nechte chvíli odstát.' },
      { order: 5, instruction: 'Přelijte do misky, ozdobte nakrájeným banánem a ořechy.' },
      { order: 6, instruction: 'Pokapejte medem a podávejte teplé.' }
    ],
    nutrition: {
      calories: 320,
      protein: 10,
      carbohydrates: 55,
      fat: 7
    },
    tags: ['snídaně', 'ovesné vločky', 'zdravé', 'vegetariánské'],
    cuisine: 'Americká',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },

  // === OBĚD ===
  {
    id: 'gulas',
    title: 'Český guláš',
    description: 'Tradiční český guláš s chlebovým knedlíkem. Bohaté koření a dlouhé vaření dodávají masu dokonalou chuť.',
    category: 'Oběd',
    difficulty: 3,
    prepTime: 30,
    cookTime: 180,
    servings: 8,
    ingredients: [
      { name: 'Hovězí maso', amount: '1', unit: 'kg', note: 'kostkované' },
      { name: 'Cibule', amount: '3', unit: 'ks', note: 'velké' },
      { name: 'Česnek', amount: '4', unit: 'stroužek' },
      { name: 'Olej', amount: '3', unit: 'lžíce' },
      { name: 'Paprika sladká', amount: '2', unit: 'lžíce' },
      { name: 'Paprika pálivá', amount: '1', unit: 'lžička' },
      { name: 'Kmín', amount: '1', unit: 'lžička' },
      { name: 'Majoránka', amount: '2', unit: 'lžičky' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Pepř', amount: 'Podle chuti', unit: '' },
      { name: 'Vývar', amount: '500', unit: 'ml' },
      { name: 'Rajčatový protlak', amount: '2', unit: 'lžíce' }
    ],
    steps: [
      { order: 1, instruction: 'Omyjte a osušte maso, nakrájejte na kostky asi 3x3 cm.' },
      { order: 2, instruction: 'Cibuli nakrájejte na drobno, česnek prolisujte.' },
      { order: 3, instruction: 'V hrnci rozehřejte olej a osmahněte maso ze všech stran do zhnědnutí.' },
      { order: 4, instruction: 'Přidejte cibuli a restujte, dokud nebude sklovná.' },
      { order: 5, instruction: 'Přidejte česnek, papriku, kmín a majoránku, míchejte 1 minutu.' },
      { order: 6, instruction: 'Přidejte rajčatový protlak, promíchejte.' },
      { order: 7, instruction: 'Podlijte vývarem, přiveďte k varu.' },
      { order: 8, instruction: 'Stáhněte na minimální teplotu, přikryjte a vařte 2-3 hodiny.' },
      { order: 9, instruction: 'Občas zamíchejte a podle potřeby přidejte vývar.' },
      { order: 10, instruction: 'Dochuťte solí a pepřem, podávejte s knedlíkem.' }
    ],
    nutrition: {
      calories: 420,
      protein: 42,
      carbohydrates: 12,
      fat: 22
    },
    tags: ['oběd', 'guláš', 'tradiční', 'hovězí'],
    cuisine: 'Česká',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'roasted-chicken-rice',
    title: 'Pečené kuře s rýží a zeleninou',
    description: 'Šťavnaté pečené kuře s křupavou kůží, podávané s aromatickou rýží a čerstvou zeleninou.',
    category: 'Oběd',
    difficulty: 3,
    prepTime: 20,
    cookTime: 90,
    servings: 4,
    ingredients: [
      { name: 'Kuře', amount: '1.5', unit: 'kg', note: 'celé' },
      { name: 'Rýže', amount: '400', unit: 'g' },
      { name: 'Cuketa', amount: '1', unit: 'ks' },
      { name: 'Paprika', amount: '2', unit: 'ks', note: 'barevná' },
      { name: 'Cibule', amount: '2', unit: 'ks' },
      { name: 'Česnek', amount: '6', unit: 'stroužek' },
      { name: 'Olivový olej', amount: '4', unit: 'lžíce' },
      { name: 'Citron', amount: '1', unit: 'ks' },
      { name: 'Rozmarýn', amount: '2', unit: 'větev' },
      { name: 'Tymián', amount: '2', unit: 'větev' },
      { name: 'Sůl', amount: '2', unit: 'lžičky' },
      { name: 'Pepř', amount: '1', unit: 'lžička' }
    ],
    steps: [
      { order: 1, instruction: 'Předehřejte troubu na 180°C.' },
      { order: 2, instruction: 'Omyjte kuře a důkladně osušte papírovými utěrkami.' },
      { order: 3, instruction: 'Vnitřek kuře potřete solí, pepřem a polovinou oleje.' },
      { order: 4, instruction: 'Naplňte dutinu kuře polovinou cibule, česnekem a bylinkami.' },
      { order: 5, instruction: 'Zbytek cibule nakrájejte na měsíčky, rýži propláchněte.' },
      { order: 6, instruction: 'Smíchejte rýži s nakrájenou zeleninou, česnekem, olejem a bylinkami.' },
      { order: 7, instruction: 'Dejte rýži do pekáče, na ni položte kuře.' },
      { order: 8, instruction: 'Pečte 90 minut, každých 30 minut polévejte šťávou.' },
      { order: 9, instruction: '10 minut před koncem zvyšte teplotu na 200°C pro křupavou kůži.' },
      { order: 10, instruction: 'Nechte 10 minut odpočinout před krájením.' }
    ],
    nutrition: {
      calories: 650,
      protein: 48,
      carbohydrates: 45,
      fat: 28
    },
    tags: ['oběd', 'kuře', 'pečené', 'zdravé'],
    cuisine: 'Mezinárodní',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'pasta-carbonara',
    title: 'Pasta Carbonara',
    description: 'Klasická italská pasta s krémovou omáčkou z pancetty, vajec a parmezánu. Jednoduchá a luxusní.',
    category: 'Oběd',
    difficulty: 2,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      { name: 'Těstoviny', amount: '400', unit: 'g', note: 'spaghetti nebo tagliatelle' },
      { name: 'Pancetta', amount: '200', unit: 'g' },
      { name: 'Vejce', amount: '4', unit: 'ks' },
      { name: 'Parmazán', amount: '100', unit: 'g', note: 'strouhaný' },
      { name: 'Pecorino Romano', amount: '50', unit: 'g' },
      { name: 'Černý pepř', amount: 'Čerstvě mletý', unit: '' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Velkou pánev rozehřejte na střední teplotu.' },
      { order: 2, instruction: 'Pancettu nakrájejte na kostičky a opékejte 5-7 minut do křupava.' },
      { order: 3, instruction: 'Mezitím vařte těstoviny ve velkém množství slané vody al dente.' },
      { order: 4, instruction: 'Smíchejte vejce, parmezán a pecorino v misce.' },
      { order: 5, instruction: 'Přidejte hodně čerstvě mletého pepře.' },
      { order: 6, instruction: 'Sceďte těstoviny, ale uschovejte šálku vody.' },
      { order: 7, instruction: 'Přidejte těstoviny k pancettě, odstavte z ohně.' },
      { order: 8, instruction: 'Rychle vmíchejte vaječnou směs - teplo těstovin smaží vejce.' },
      { order: 9, instruction: 'Přidejte trochu vody z těstovin pro krémovou konzistenci.' },
      { order: 10, instruction: 'Podávejte ihned s extra parmezánem a pepřem.' }
    ],
    nutrition: {
      calories: 580,
      protein: 28,
      carbohydrates: 55,
      fat: 26
    },
    tags: ['oběd', 'pasta', 'italská', 'rychlé'],
    cuisine: 'Italská',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },

  // === VEČEŘE ===
  {
    id: 'grilled-salmon-salad',
    title: 'Grilovaný losos se salátem',
    description: 'Lehká a zdravá večeře s křupavým grilovaným lososem a čerstvým zeleninovým salátem.',
    category: 'Večeře',
    difficulty: 2,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'Lososí filé', amount: '2', unit: 'ks', note: 'asi 150g každý' },
      { name: 'Salát mix', amount: '200', unit: 'g' },
      { name: 'Okurka', amount: '1', unit: 'ks' },
      { name: 'Cherry rajčata', amount: '150', unit: 'g' },
      { name: 'Avokádo', amount: '0.5', unit: 'ks' },
      { name: 'Olivový olej', amount: '3', unit: 'lžíce' },
      { name: 'Citron', amount: '1', unit: 'ks' },
      { name: 'Med', amount: '1', unit: 'lžička' },
      { name: 'Dijonská hořčice', amount: '1', unit: 'lžička' },
      { name: 'Čerstvý kopr', amount: '2', unit: 'lžíce' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Pepř', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Smíchejte 2 lžíce olivového oleje, šťávu z půl citronu, med a hořčici na marinádu.' },
      { order: 2, instruction: 'Potřete losos marinádou a nechte 10 minut odležet.' },
      { order: 3, instruction: 'Grilujte losos 4-5 minut z každé strany.' },
      { order: 4, instruction: 'Omyjte salát, okurku nakrájejte na půlkolečka, rajčata rozpůlte.' },
      { order: 5, instruction: 'Avokádo nakrájejte na kostičky.' },
      { order: 6, instruction: 'Smíchejte zeleninu se zbytkovým olivovým olejem a citronovou šťávou.' },
      { order: 7, instruction: 'Na talíř dejte salát, navrch grilovaného lososa.' },
      { order: 8, instruction: 'Posypte čerstvým koprem a podávejte.' }
    ],
    nutrition: {
      calories: 420,
      protein: 38,
      carbohydrates: 12,
      fat: 26
    },
    tags: ['večeře', 'losos', 'ryba', 'zdravé', 'nízkokalorické'],
    cuisine: 'Mezinárodní',
    isGlutenFree: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'mushroom-risotto',
    title: 'Houbové risotto',
    description: 'Krémové italské risotto s čerstvými houbami a parmezánem. Dokonalá večeře pro speciální příležitosti.',
    category: 'Večeře',
    difficulty: 3,
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: 'Arborio rýže', amount: '300', unit: 'g' },
      { name: 'Čerstvé houby', amount: '400', unit: 'g', note: 'mix (žampiony, portobello)' },
      { name: 'Cibule', amount: '1', unit: 'ks', note: 'najemno' },
      { name: 'Česnek', amount: '2', unit: 'stroužek', note: 'najemno' },
      { name: 'Bílé víno', amount: '150', unit: 'ml' },
      { name: 'Kuřecí vývar', amount: '1', unit: 'l', note: 'teplý' },
      { name: 'Parmazán', amount: '80', unit: 'g', note: 'strouhaný' },
      { name: 'Máslo', amount: '50', unit: 'g' },
      { name: 'Olivový olej', amount: '2', unit: 'lžíce' },
      { name: 'Tymián', amount: '1', unit: 'lžička' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Pepř', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Houby očistěte a nakrájejte na plátky.' },
      { order: 2, instruction: 'Na pánvi rozpalte olej a osmahněte houby do zlatova, odstavte.' },
      { order: 3, instruction: 'V hrnci rozpusťte 30g másla a osmažte cibuli do sklovna.' },
      { order: 4, instruction: 'Přidejte česnek a tymán, míchejte 1 minutu.' },
      { order: 5, instruction: 'Přidejte rýži a míchejte 2 minuty, dokud nebude průhledná.' },
      { order: 6, instruction: 'Přilijte víno a míchejte, dokud se neodpaří.' },
      { order: 7, instruction: 'Postupně přidávejte vývar, vždy jednu naběračku, za stálého míchání.' },
      { order: 8, instruction: 'Vařte 18-20 minut, dokud rýže nebude měkká, ale stále pevná.' },
      { order: 9, instruction: 'Vypněte oheň, vmíchejte zbývající máslo, parmezán a houby.' },
      { order: 10, instruction: 'Nechte 2 minuty odpočinout a podávejte.' }
    ],
    nutrition: {
      calories: 480,
      protein: 14,
      carbohydrates: 58,
      fat: 20
    },
    tags: ['večeře', 'risoto', 'houby', 'italská', 'vegetariánské'],
    cuisine: 'Italská',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },

  // === POLÉVKY ===
  {
    id: 'chicken-soup',
    title: 'Kuřecí vývar s nudlemi',
    description: 'Tradiční kuřecí vývar, který léčí nachlazení a zahřívá duši. Podávaný s domácími nudlemi a zeleninou.',
    category: 'Polévky',
    difficulty: 2,
    prepTime: 30,
    cookTime: 120,
    servings: 6,
    ingredients: [
      { name: 'Kuře', amount: '1', unit: 'ks', note: 'celé nebo kuřecíquarters' },
      { name: 'Cibule', amount: '2', unit: 'ks' },
      { name: 'Mrkev', amount: '3', unit: 'ks' },
      { name: 'celer', amount: '1', unit: 'stonek' },
      { name: 'Petržel kořen', amount: '1', unit: 'ks' },
      { name: 'Česnek', amount: '3', unit: 'stroužek' },
      { name: 'Bobkový list', amount: '2', unit: 'ks' },
      { name: 'Nové koření', amount: '4', unit: 'ks' },
      { name: 'Sůl', amount: '2', unit: 'lžičky' },
      { name: 'Pepř', amount: '1', unit: 'lžička' },
      { name: 'Nudle', amount: '200', unit: 'g' },
      { name: 'Čerstvý kopr', amount: '2', unit: 'lžíce' }
    ],
    steps: [
      { order: 1, instruction: 'Omyjte kuře a dejte do velkého hrnce s 3 litry vody.' },
      { order: 2, instruction: 'Přiveďte k varu, seberte pěnu, která se utvoří.' },
      { order: 3, instruction: 'Přidejte celou cibuli, mrkev, celer, petržel, česnek a koření.' },
      { order: 4, instruction: 'Vařte na mírném ohni 1.5 - 2 hodiny.' },
      { order: 5, instruction: 'Vyndejte kuře a sceďte vývar.' },
      { order: 6, instruction: 'Kuře oberte a nakrájejte na kousky.' },
      { order: 7, instruction: 'Vývar ochutněte solí a pepřem.' },
      { order: 8, instruction: 'Přiveďte k varu a přidejte nudle, vařte 8-10 minut.' },
      { order: 9, instruction: 'Vraťte kuřecí maso do polévky.' },
      { order: 10, instruction: 'Podávejte s nasekaným koprem.' }
    ],
    nutrition: {
      calories: 280,
      protein: 25,
      carbohydrates: 22,
      fat: 8
    },
    tags: ['polévka', 'kuře', 'tradiční', 'léčivá'],
    cuisine: 'Česká',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tomato-soup',
    title: 'Rajská polévka',
    description: 'Klasická česká rajská polévka s rýží. Sladká, aromatická a dokonale vyvážená.',
    category: 'Polévky',
    difficulty: 2,
    prepTime: 15,
    cookTime: 40,
    servings: 4,
    ingredients: [
      { name: 'Rajčata', amount: '800', unit: 'g', note: 'čerstvá nebo konzervovaná' },
      { name: 'Cibule', amount: '1', unit: 'ks', note: 'najemno' },
      { name: 'Česnek', amount: '2', unit: 'stroužek' },
      { name: 'Mrkev', amount: '1', unit: 'ks', note: 'najemno' },
      { name: 'Rýže', amount: '100', unit: 'g' },
      { name: 'Rajčatový protlak', amount: '2', unit: 'lžíce' },
      { name: 'Kuřecí vývar', amount: '500', unit: 'ml' },
      { name: 'Smetana', amount: '100', unit: 'ml' },
      { name: 'Olivový olej', amount: '2', unit: 'lžíce' },
      { name: 'Cukr', amount: '1', unit: 'lžička' },
      { name: 'Bazalka', amount: '5', unit: 'lístků' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Pepř', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Rajčata nakrájejte na kousky (pokud čerstvá).' },
      { order: 2, instruction: 'V hrnci rozehřejte olej a osmahněte cibuli a mrkev.' },
      { order: 3, instruction: 'Přidejte česnek, míchejte 30 sekund.' },
      { order: 4, instruction: 'Přidejte rajčata, rajčatový protlak a vývar.' },
      { order: 5, instruction: 'Přiveďte k varu a vařte 20 minut.' },
      { order: 6, instruction: 'Přidejte rýži a vařte dalších 15 minut.' },
      { order: 7, instruction: 'Rozmixujte do hladké konzistence.' },
      { order: 8, instruction: 'Vmíchejte smetanu a cukr.' },
      { order: 9, instruction: 'Ochuťte solí, pepřem a bazalkou.' },
      { order: 10, instruction: 'Podávejte teplé s čerstvým chlebem.' }
    ],
    nutrition: {
      calories: 220,
      protein: 6,
      carbohydrates: 28,
      fat: 9
    },
    tags: ['polévka', 'rajčata', 'rychlé', 'vegetariánské'],
    cuisine: 'Česká',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },

  // === SALÁTY ===
  {
    id: 'greek-salad',
    title: 'Řecký salát',
    description: 'Osvěžující salát s křupavou zeleninou, olivami a fetou. Ideální na léto.',
    category: 'Saláty',
    difficulty: 1,
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    ingredients: [
      { name: 'Okurka', amount: '1', unit: 'ks', note: 'nakrájaná' },
      { name: 'Rajčata', amount: '4', unit: 'ks', note: 'nakrájaná' },
      { name: 'Cibule', amount: '1', unit: 'ks', note: 'tenké půlkolečka' },
      { name: 'Zelená paprika', amount: '1', unit: 'ks', note: 'nakrájaná' },
      { name: 'Olivový olej', amount: '4', unit: 'lžíce' },
      { name: 'Červený ocet', amount: '2', unit: 'lžíce' },
      { name: 'Oregano', amount: '1', unit: 'lžička' },
      { name: 'Sůl', amount: 'Špetka', unit: '' },
      { name: 'Feta sýr', amount: '200', unit: 'g' },
      { name: 'Kalamáta olivy', amount: '100', unit: 'g' }
    ],
    steps: [
      { order: 1, instruction: 'Nakrájejte okurku na půlkolečka, rajčata na klínky.' },
      { order: 2, instruction: 'Cibuli nakrájejte na tenké půlkolečka, papriku na proužky.' },
      { order: 3, instruction: 'Dejte zeleninu do mísy, přidejte olivy.' },
      { order: 4, instruction: 'Smíchejte olivový olej, ocet, oregano a sůl na zálivku.' },
      { order: 5, instruction: 'Zalijte salát zálivkou a promíchejte.' },
      { order: 6, instruction: 'Navrch nakrájejte fetu na kostky.' }
    ],
    nutrition: {
      calories: 280,
      protein: 9,
      carbohydrates: 12,
      fat: 22
    },
    tags: ['salát', 'řecký', 'zdravé', 'rychlé', 'vegetariánské'],
    cuisine: 'Řecká',
    isVegetarian: true,
    isGlutenFree: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'caesar-salad',
    title: 'Caesar salát',
    description: 'Klasický salát s křupavým salátem, kuřecím masem, krutony a slavným dresinkem.',
    category: 'Saláty',
    difficulty: 2,
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'Římský salát', amount: '1', unit: 'hlava', note: 'natrhaný' },
      { name: 'Kuřecí prsa', amount: '200', unit: 'g' },
      { name: 'Bílý chléb', amount: '2', unit: 'plátek', note: 'na krutony' },
      { name: 'Parmazán', amount: '50', unit: 'g' },
      { name: 'Ančovičky', amount: '4', unit: 'ks' },
      { name: 'Česnek', amount: '1', unit: 'stroužek' },
      { name: 'Dijonská hořčice', amount: '1', unit: 'lžička' },
      { name: 'Worcester omáčka', amount: '1', unit: 'lžička' },
      { name: 'Olivový olej', amount: '100', unit: 'ml' },
      { name: 'Citronová šťáva', amount: '2', unit: 'lžíce' },
      { name: 'Sůl', amount: 'Podle chuti', unit: '' },
      { name: 'Pepř', amount: 'Podle chuti', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Kuřecí opepřete, osolte a grilujte 6-7 minut z každé strany.' },
      { order: 2, instruction: 'Nechte 5 minut odpočinout a nakrájejte na proužky.' },
      { order: 3, instruction: 'Chléb nakrájejte na kostky, opečte do zlatova.' },
      { order: 4, instruction: 'V mixéru smíchejte ančovičky, česnek, hořčici, worcester.' },
      { order: 5, instruction: 'Přidejte citron, sůl, pepř a za stálého mixování přidávejte olej.' },
      { order: 6, instruction: 'V míse smíchejte salát s dresinkem.' },
      { order: 7, instruction: 'Navrch dejte kuře, krutony a hobliny parmezánu.' }
    ],
    nutrition: {
      calories: 450,
      protein: 32,
      carbohydrates: 18,
      fat: 30
    },
    tags: ['salát', 'caesar', 'kuře', 'klasika'],
    cuisine: 'Americká',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },

  // === MOUČNÍKY ===
  {
    id: 'apple-strudel',
    title: 'Jablečný závin',
    description: 'Tradiční český jablečný závin s křehkým těstem a voňavou náplní. Podávaný teplý s vanilkovou zmrzlinou.',
    category: 'Moučníky',
    difficulty: 4,
    prepTime: 60,
    cookTime: 45,
    servings: 12,
    ingredients: [
      { name: 'Mouka', amount: '300', unit: 'g' },
      { name: 'Máslo', amount: '150', unit: 'g', note: 'pokojové teploty' },
      { name: 'Vejce', amount: '1', unit: 'ks' },
      { name: 'Sůl', amount: 'Špetka', unit: '' },
      { name: 'Jablka', amount: '1', unit: 'kg', note: 'kyselejší odrůdy' },
      { name: 'Cukr', amount: '150', unit: 'g' },
      { name: 'Skořice', amount: '2', unit: 'lžičky' },
      { name: 'Hrozinky', amount: '100', unit: 'g' },
      { name: 'Vanilkový cukr', amount: '1', unit: 'balíček' },
      { name: 'Strouhanka', amount: '80', unit: 'g' },
      { name: 'Máslo', amount: '50', unit: 'g', note: 'na potření' },
      { name: 'Práškový cukr', amount: 'Na posypání', unit: '' }
    ],
    steps: [
      { order: 1, instruction: 'Smíchejte mouku, máslo, vejce a sůl, zpracujte na hladké těsto.' },
      { order: 2, instruction: 'Zabalte do fólie a nechte 30 minut v lednici.' },
      { order: 3, instruction: 'Jablka oloupejte, nastrouhejte na hrubém struhadle.' },
      { order: 4, instruction: 'Smíchejte jablka s cukrem, skořicí, vanilkovým cukrem a hrozinkami.' },
      { order: 5, instruction: 'Na pomoučněném vále rozválejte těsto na velký tenký plát.' },
      { order: 6, instruction: 'Posypte strouhankou (absorbuje šťávu).' },
      { order: 7, instruction: 'Rozložte jablečnou směs na těsto.' },
      { order: 8, instruction: 'Zaviňte pomocí utěrky a dejte na vymazaný plech.' },
      { order: 9, instruction: 'Potřete rozpuštěným máslem.' },
      { order: 10, instruction: 'Pečte při 180°C 40-45 minut do zlatova.' },
      { order: 11, instruction: 'Po vychladnutí posypte práškovým cukrem.' }
    ],
    nutrition: {
      calories: 280,
      protein: 4,
      carbohydrates: 45,
      fat: 10
    },
    tags: ['moučník', 'jablka', 'závin', 'tradiční', 'česká'],
    cuisine: 'Česká',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'pancakes',
    title: 'Americké palačinky',
    description: 'Nadýchané americké palačinky s javorovým sirupem a čerstvým ovocem. Ideální snídaně nebo dezert.',
    category: 'Moučníky',
    difficulty: 2,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      { name: 'Mouka', amount: '200', unit: 'g' },
      { name: 'Cukr', amount: '2', unit: 'lžíce' },
      { name: 'Prášek do pečiva', amount: '2', unit: 'lžičky' },
      { name: 'Sůl', amount: 'Špetka', unit: '' },
      { name: 'Vejce', amount: '2', unit: 'ks' },
      { name: 'Mléko', amount: '240', unit: 'ml' },
      { name: 'Rozpuštěné máslo', amount: '40', unit: 'g' },
      { name: 'Vanilkový extrakt', amount: '1', unit: 'lžička' },
      { name: 'Javorový sirup', amount: '200', unit: 'ml' },
      { name: 'Čerstvé bobule', amount: '200', unit: 'g' }
    ],
    steps: [
      { order: 1, instruction: 'Smíchejte mouku, cukr, prášek do pečiva a sůl ve velké míse.' },
      { order: 2, instruction: 'V jiné míse prošlehejte vejce, mléko, rozpuštěné máslo a vanilku.' },
      { order: 3, instruction: 'Tekuté ingredience vlijte do suchých a míchejte, dokud nejsou smíšené.' },
      { order: 4, instruction: 'Nechte 5 minut odpočinout.' },
      { order: 5, instruction: 'Rozpalte nepřilnavou pánev na střední teplotu.' },
      { order: 6, instruction: 'Nalijte těsto (asi 1/4 hrnku na palačinku).' },
      { order: 7, instruction: 'Až se objeví bubliny, otočte a dopečte 1-2 minuty.' },
      { order: 8, instruction: 'Opakujte se zbytkovým těstem.' },
      { order: 9, instruction: 'Podávejte s javorovým sirupem a čerstvým ovocem.' }
    ],
    nutrition: {
      calories: 320,
      protein: 8,
      carbohydrates: 52,
      fat: 8
    },
    tags: ['moučník', 'palačinky', 'snídaně', 'americké'],
    cuisine: 'Americká',
    isVegetarian: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  }
];

export const RECIPE_CATEGORIES: { name: RecipeCategory; icon: string; color: string }[] = [
  { name: 'Snídaně', icon: '🍳', color: '#FF9800' },
  { name: 'Oběd', icon: '🍽️', color: '#4CAF50' },
  { name: 'Večeře', icon: '🌙', color: '#3F51B5' },
  { name: 'Polévky', icon: '🥣', color: '#FF5722' },
  { name: 'Saláty', icon: '🥗', color: '#8BC34A' },
  { name: 'Moučníky', icon: '🍰', color: '#E91E63' },
  { name: 'Nápoje', icon: '🥤', color: '#00BCD4' },
  { name: 'Svačiny', icon: '🍿', color: '#795548' },
  { name: 'Předkrmy', icon: '🥟', color: '#9C27B0' },
  { name: 'Hlavní jídla', icon: '🍖', color: '#F44336' }
];

export const getRecipesByCategory = (category: RecipeCategory): Recipe[] => {
  return RECIPE_DATA.filter(recipe => recipe.category === category);
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return RECIPE_DATA.find(recipe => recipe.id === id);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase();
  return RECIPE_DATA.filter(recipe =>
    recipe.title.toLowerCase().includes(lowerQuery) ||
    recipe.description.toLowerCase().includes(lowerQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    recipe.cuisine.toLowerCase().includes(lowerQuery)
  );
};

export const getRandomRecipes = (count: number = 1): Recipe[] => {
  const shuffled = [...RECIPE_DATA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getVegetarianRecipes = (): Recipe[] => {
  return RECIPE_DATA.filter(recipe => recipe.isVegetarian);
};

export const getQuickRecipes = (maxTime: number = 30): Recipe[] => {
  return RECIPE_DATA.filter(recipe => (recipe.prepTime + recipe.cookTime) <= maxTime);
};

export const getRecipesByCuisine = (cuisine: string): Recipe[] => {
  return RECIPE_DATA.filter(recipe => 
    recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
  );
};
