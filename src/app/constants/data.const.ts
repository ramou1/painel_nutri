export const PLANS = [
    {
        type: 0,
        title: 'Trial',
        value: 0,
        description: `Teste o aplicativo antes de escolher um plano.`,
        isClicked: false,
        // expiration: '10/04/2024',
        // status: null
    },
    {
        type: 1,
        title: 'Anual',
        value: 350,
        description: `Nessa modalidade <b>uma vez ao ano</b> você paga:`,
        isClicked: false,
        discount: 'Economize 10%',
        // expiration: '10/04/2024',
        // status: null
    },
    {
        type: 2,
        title: 'Mensal',
        value: 39.90,
        description: `Nessa modalidade <b>mensalmente</b> você paga:`,
        isClicked: false,
        discount: null,
        // expiration: '10/04/2024',
        // status: null
    },
]

export const INGREDIENT_RESTRICTIONS = [
    { label: 'Diabético', value: 'diabetic' },
    { label: 'Alérgico à proteína do leite', value: 'allergic' },
    { label: 'Intolerante à lactose', value: 'intolerant' },
    { label: 'Vegano', value: 'vegan' },
    { label: 'Ovolactovegetariano', value: 'ovolactovegetarian' },
    { label: 'Ovovegetariano', value: 'ovovegetarian' },
    { label: 'Lactovegetariano', value: 'lactovegetarian' },
    { label: 'Celíaco', value: 'celiac' },
    { label: 'Síndrome do Intestino Irritável', value: 'irritable'}
    // { label: 'SII', value: 'irritable'}
];

export const INGREDIENT_USAGES = [
    { label: 'Café da Manhã', value: 'breakfast' },
    { label: 'Lanche da Manhã', value: 'morning-snack' },
    { label: 'Almoço', value: 'lunch' },
    { label: 'Lanche', value: 'snack' },
    { label: 'Jantar', value: 'dinner' },
    { label: 'Ceia', value: 'supper' }
];

export const INGREDIENT_CATEGORIES = [
    { shortTitle: 'protein', title: 'Proteínas' },
    { shortTitle: 'fat', title: 'Gorduras' },
    { shortTitle: 'carbo', title: 'Carboidratos' },
    { shortTitle: 'fruit', title: 'Frutas' },
    { shortTitle: 'salad', title: 'Saladas' },
    { shortTitle: 'other', title: 'Outros' },
];

export const INGREDIENT_SHOWCASES = [
    { label: 'Receitas', value: 'recipes' },
    { label: 'Cardápio', value: 'menu' },
    // { label: 'Todos', value: 'all' },
];
