interface days {
    date: string;
    amount: number;
    funds: number;//amount i add in wallet
}

interface Coin {
    id: string;//Month ID 
    name: string;//Month Name 
    days: days[];
}

const longterm: Coin[] = [
    {
        id: "1",
        name: "November",
        days: [
            { date: "2024-11-30", amount: 6.07, funds: 0 },
        ]

    },
    {
        id: "2",
        name: "December",
        days: [
            { date: "2024-12-31", amount: 9.67, funds: 0 },
        ]

    }
];

export { longterm };
