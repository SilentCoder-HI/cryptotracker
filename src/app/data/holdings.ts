interface Transaction {
    date: string;
    price: number;
    amount: number;
}

interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    transactions: Transaction[];
}

const holdings: Coin[] = [
    {
        id: '1',
        name: 'FLOKI',
        symbol: 'FLOKI',
        image: 'https://cryptologos.cc/logos/floki-inu-floki-logo.png',
        transactions: [
            { date: '2024-12-23 17:53:22', price: 0.000170802, amount: 1000 },
            { date: '2025-01-06 18:13:16', price: 0.000197445, amount: 605.55 },
            { date: '2025-01-06 18:13:16', price: 0, amount: 0.7185 },
            { date: '2025-01-12', price: 0.000165829, amount: 6030.31 },
        ],
    },
    {
        id: '2',
        name: 'BONK',
        symbol: 'BONK',
        image: 'https://cryptologos.cc/logos/bonk1-bonk-logo.png?v=040',
        transactions: [
            { date: '2024-12-23 17:51:47', price: 0.0000318616, amount: 5000 },
            { date: '2024-12-23 17:51:47', price: 0, amount: 0.8318 },
        ],
    },
    {
        id: '3',
        name: 'PEPE',
        symbol: 'PEPE',
        image: 'https://cryptologos.cc/logos/pepe-pepe-logo.png',
        transactions: [
            { date: '2024-12-23 17:50:21', price: 0.0000182284, amount: 5746.24 },
            { date: '2024-12-23 17:50:21', price: 0, amount: 0.3490 },
        ],
    },
    {
        id: '4',
        name: 'BTTC',
        symbol: 'bittorrent',
        image: 'https://cryptologos.cc/logos/bittorrent-btt-logo.png',
        transactions: [
            { date: '2024-12-23 11:36:50', price: 0.00000114989, amount: 43486.5 },
            { date: '2024-12-26 16:31:27', price: 0.00000109485, amount: 100000 }, // New transaction
            { date: '2024-12-28 17:54:44', price: 0.00000109485, amount: 125115.5 }, // New transaction
            { date: '2024-12-31 16:32:52', price: 0.00000108481, amount: 212836 }, // New transaction
            { date: '2025-01-06 18:10:26', price: 0.00000128576, amount: 600000 },// New transaction
            { date: '2025-01-06 18:10:26', price: 0, amount: 2125.5287 },// New transaction
            { date: '2025-01-08', price: 0.00000115938, amount: 888406.7 },
            { date: '2025-01-08', price: 0.00000115513, amount: 317804.7 },
            { date: '2025-01-12', price: 0.00000115512, amount: 1000000 },
            { date: '2025-01-16', price: 0.00000115512, amount: 1000000 },
            { date: '2025-01-27', price: 0.000000995122, amount: 10000000 },
            { date: '2025-02-02 13:25:55', price: 0.00000098, amount: 10193876.9 },
            { date: '2025-02-02 13:26:31', price: 0.000000985373, amount: 50742.2 },
        ],
    },
    {
        id: '5',
        name: 'PNUT',
        symbol: 'peanut-the-squirrel',
        image: 'https://assets.coingecko.com/coins/images/51301/standard/Peanut_the_Squirrel.png?1734941241', // Image placeholder, replace as necessary
        transactions: [
            { date: '2024-12-26 16:35:01', price: 0.655159, amount: 1 }, // New transaction
            { date: '2024-12-26 16:35:01', price: 0, amount: 0.00022118 }, // New transaction
            { date: '2025-01-08', price: 0.570508, amount: 1 },
        ],
    },
    {
        id: '6',
        name: 'MDT',
        symbol: 'measurable-data-token',
        image: 'https://assets.coingecko.com/coins/images/2441/standard/mdt_icon_120x120.png?1711452723', // Image placeholder, replace as necessary
        transactions: [
            { date: '2024-12-26 16:22:17', price: 0.0616507, amount: 5.89349478 }, // New transaction
            { date: '2024-12-26 16:22:17', price: 0, amount: 0.0038 }, // New transaction
        ],
    },
    {
        id: '7',
        name: 'DOGE',
        symbol: 'dogecoin',
        image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        transactions: [
            { date: '2024-12-26 16:20:04', price: 0.319657, amount: 1.13664987 }, // New transaction
            { date: '2024-12-26 16:20:04', price: 0, amount: 0.0001 }, // New transaction
            { date: '2025-01-19 21:13:23', price: 0.392194, amount: 2 }, // New transaction
        ],
    },
    {
        id: '8',
        name: 'AGLD',
        symbol: 'adventure-gold',
        image: 'https://assets.coingecko.com/coins/images/18125/standard/lpgblc4h_400x400.jpg?1696517628',
        transactions: [
            { date: '2024-12-31 16:38:32', price: 2.66551, amount: 0.31641872 },
            { date: '2024-12-31 16:38:32', price: 0, amount: 0.0015 },
        ],
    },
    {
        id: '9',
        name: 'DOT',
        symbol: 'polkadot',
        image: 'https://static.coingecko.com/s/polkadot-73b0c058cae10a2f076a82dcade5cbe38601fad05d5e6211188f09eb96fa4617.gif',
        transactions: [
            { date: '2024-12-31 16:38:32', price: 6.351, amount: 0.03762094 },
        ],
    },
    {
        id: '10',
        name: 'BNB',
        symbol: 'binancecoin',
        image: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970',
        transactions: [
            { date: '2024-12-31 16:25:17', price: 709.148, amount: 0.00301 },
            { date: "2025-01-08", price: 696.221, amount: 0.00143632 },
            { date: "2025-01-12", price: 700.585, amount: 0.00071369 },
            { date: "2025-01-18 14:57:02", price: 706.863, amount: 0.00046685 },
            { date: "2025-01-27 14:57:02", price: 651.286, amount: 0.00075048 },
            { date: "2025-01-28 12:08:14", price: 685.604, amount: 0.00168488 },
            { date: "2025-01-29 18:49:57", price: 669.163, amount: 0.0024316 },
            { date: "2025-02-02 13:27:09", price: 662.597, amount: 0.00030184 },
        ],
    },
    {
        id: '11',
        name: 'ETH',
        symbol: 'ethereum',
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        transactions: [
            { date: '2025-01-06 18:12:49', price: 3666.81, amount: 0.00005 },
            { date: '2025-01-12', price: 3307.23, amount: 0.00015118 },
            { date: '2025-01-16', price: 3384.76, amount: 0.00015072 },
        ],
    },
    {
        id: '12',
        name: 'SOL',
        symbol: 'solana',
        image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        transactions: [
            { date: '2025-01-06 18:11:32', price: 218.951, amount: 0.001 },
            { date: '2025-01-06 18:03:59', price: 219.154, amount: 0.0022 },
            { date: '2025-01-16 16:48:02', price: 211.719, amount: 0.00472324 },
            { date: '2025-01-18 14:57:23', price: 240.198, amount: 0.00137386 },
            { date: '2025-01-18 14:57:23', price: 283.123, amount: 0.00223117 },
            { date: '2025-01-20 14:22:46', price: 271.219, amount: 0.00398105 },
        ],
    },
    {
        id: '13',
        name: 'XRP',
        symbol: 'ripple',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
        transactions: [
            { date: '2025-01-06 18:02:17', price: 2.40458, amount: 1 },
            { date: '2025-01-17 19:01:10', price: 3.2601, amount: 0.42691053 },
            { date: '2025-01-17 19:01:10', price: 3.26531, amount: 0.04387996 },
            { date: '2025-01-18 14:55:43', price: 3.15022, amount: 0.2095095 },
            { date: '2025-01-19 21:12:28', price: 3.1779, amount: 1 },
            { date: '2025-01-20 14:22:19', price: 3.29269, amount: 0.60740702 },
        ],
    },
    {
        id: '14',
        name: 'Bio',
        symbol: 'bio-protocol',
        image: 'https://assets.coingecko.com/coins/images/53022/standard/bio.jpg?1735011002',
        transactions: [
            { date: '2025-01-03 00:00:00', price: 0, amount: 0.01539477 },
            { date: '2025-01-03 00:00:00', price: 0.586304, amount: 1 },
        ],
    },
    {
        id: '15',
        name: 'GRT',
        symbol: 'the-graph',
        image: 'https://assets.coingecko.com/coins/images/13397/standard/Graph_Token.png?1696513159',
        transactions: [
            { date: '2025-01-12', price: 0.205813, amount: 1.4259805 },
            { date: '2025-01-29 18:38:41', price: 0.168146, amount: 10 },
        ],
    },
    {
        id: '16',
        name: 'CGPT',
        symbol: 'chaingpt',
        image: 'https://assets.coingecko.com/coins/images/29306/standard/200x200.png?1696528257',
        transactions: [
            { date: '2025-01-12', price: 0.307584, amount: 1 },
        ],
    },
    {
        id: '17',
        name: 'AIXBT',
        symbol: 'aixbt',
        image: 'https://assets.coingecko.com/coins/images/51784/standard/3.png?1731981138',
        transactions: [
            { date: '2025-01-12', price: 0.473812, amount: 1 },
            { date: '2025-01-19 17:40:48', price: 0.746925, amount: 0.84572636 },
            { date: '2025-01-19 21:13:53', price: 0.74081, amount: 1.04980747 },
        ],
    },
    {
        id: '18',
        name: 'BTC',
        symbol: 'bitcoin',
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040',
        transactions: [
            { date: '2025-01-08', price: 94886.2, amount: 0.00001054 },
        ],
    },
    {
        id: '19',
        name: 'TON',
        symbol: 'the-open-network',
        image: 'https://assets.coingecko.com/coins/images/17980/standard/photo_2024-09-10_17.09.00.jpeg?1725963446',
        transactions: [
            { date: '2025-01-08', price: 5.30111, amount: 0.03435474 },
            { date: '2025-01-08', price: 5.29006, amount: 0.09 },
        ],
    },
    {
        id: '20',
        name: 'SUI',
        symbol: 'sui',
        image: 'https://assets.coingecko.com/coins/images/26375/standard/sui-ocean-square.png?1727791290',
        transactions: [
            { date: '2025-01-16 16:49:31', price: 4.68501, amount: 0.21344666 },
        ],
    },
    {
        id: '21',
        name: 'ADA',
        symbol: 'cardano',
        image: 'https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090',
        transactions: [
            { date: '2025-01-16', price: 1.06913, amount: 0.54692523 },
            { date: '2025-01-28 12:07:45', price: 0.960967, amount: 5 },
        ],
    }, {
        id: '22',
        name: 'Usual',
        symbol: 'usual',
        image: 'https://assets.coingecko.com/coins/images/51091/standard/USUAL.jpg?1730035787',
        transactions: [
            { date: '2025-01-30 13:31:44', price: 0.39016, amount: 0.61028922 },
        ],
    }, {
        id: '23',
        name: 'POL',
        symbol: 'matic-network',
        image: 'https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745',
        transactions: [
            { date: '2025-01-29 18:46:41', price: 0.397761, amount: 5 },
        ],
    }, {
        id: '24',
        name: 'FET',
        symbol: 'fetch-ai',
        image: 'https://assets.coingecko.com/coins/images/5681/standard/ASI.png?1719827289',
        transactions: [
            { date: '2025-01-29 18:38:20', price: 0.9726, amount: 1 },
        ],
    },
];

// Function to add a new coin to holdings
const addCoin = (coin: Coin) => {
    const exists = holdings.some(existingCoin => existingCoin.id === coin.id);
    if (!exists) {
        holdings.push(coin);
    } else {
        console.error(`Coin with id ${coin.id} already exists.`);
    }
};

// Function to remove a coin from holdings
const removeCoin = (coinId: string): boolean => {
    const index = holdings.findIndex(coin => coin.id === coinId);
    if (index !== -1) {
        holdings.splice(index, 1);
        return true; // Successfully removed
    }
    console.error(`Coin with id ${coinId} not found.`);
    return false; // Coin not found
};

export { holdings, addCoin, removeCoin };
