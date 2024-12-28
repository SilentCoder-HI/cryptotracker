export interface Days {
    date: string;
    initialPrice: number;
    finalPrice: number;
}

export interface Month {
    id: string;
    name: string;
    days: Days[];
    invested: number;
}

export const saving: Month[] = [
    {
        id: "1",
        name: "December",
        days: [
            {
                date: "26",
                initialPrice: 5,
                finalPrice: 5.08,
            },
            {
                date: "27",
                initialPrice: 5.08,
                finalPrice: 5.09,
            },
            {
                date: "28",
                initialPrice: 5.09,
                finalPrice: 10,
            }
        ],
        invested: 3.36014,
    }
];
