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
        name: '1000SATS',
        symbol: '1000sats-ordinals',
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        transactions: [
            { date: '2024-12-23 17:58:40', price: 0.000176712, amount: 1000 },
        ],
    },
    {
        id: '2',
        name: 'LUNC',
        symbol: 'terra-luna',
        image: 'https://cryptologos.cc/logos/terra-luna-luna-logo.png',
        transactions: [
            { date: '2024-12-23 17:57:59', price: 0.000113755, amount: 1000 },
        ],
    },
    {
        id: '3',
        name: 'WIN',
        symbol: 'wink',
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4206.png',
        transactions: [
            { date: '2024-12-23 17:54:46', price: 0.000108351, amount: 1800 },
        ],
    },
    {
        id: '4',
        name: 'FLOKI',
        symbol: 'FLOKI',
        image: 'https://cryptologos.cc/logos/floki-inu-floki-logo.png',
        transactions: [
            { date: '2024-12-23 17:53:22', price: 0.000170802, amount: 1000 },
        ],
    },
    {
        id: '5',
        name: 'BONK',
        symbol: 'BONK',
        image: 'https://cryptologos.cc/logos/bonk1-bonk-logo.png?v=040',
        transactions: [
            { date: '2024-12-23 17:51:47', price: 0.0000318616, amount: 5000 },
        ],
    },
    {
        id: '6',
        name: 'SHIB',
        symbol: 'shiba-inu',
        image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
        transactions: [
            { date: '2024-12-23 17:51:24', price: 0.0000221033, amount: 10394.58 },
        ],
    },
    {
        id: '7',
        name: 'PEPE',
        symbol: 'PEPE',
        image: 'https://cryptologos.cc/logos/pepe-pepe-logo.png',
        transactions: [
            { date: '2024-12-23 17:50:21', price: 0.0000182284, amount: 5746.24 },
        ],
    },
    {
        id: '8',
        name: 'BTTC',
        symbol: 'bittorrent',
        image: 'https://cryptologos.cc/logos/bittorrent-btt-logo.png',
        transactions: [
            { date: '2024-12-23 11:36:50', price: 0.00000114989, amount: 43486.5 },
            { date: '2024-12-26 16:31:27', price: 0.00000109485, amount: 100000 }, // New transaction
            { date: '2024-12-28 17:54:44', price: 0.00000109485, amount: 125115.5 }, // New transaction
            { date: '2024-12-31 16:32:52', price: 0.00000108481, amount: 212836 }, // New transaction
        ],
    },
    {
        id: '9',
        name: 'USDT',
        symbol: 'tether',
        image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        transactions: [
            {
                date: '2024-12-23 17:49:47', price: 0.99, amount: 0.17009055
            },
        ],
    },
    {
        id: '10',
        name: 'PNUT',
        symbol: 'peanut-the-squirrel',
        image: 'https://assets.coingecko.com/coins/images/51301/standard/Peanut_the_Squirrel.png?1734941241', // Image placeholder, replace as necessary
        transactions: [
            { date: '2024-12-26 16:35:01', price: 0.655159, amount: 1 }, // New transaction
        ],
    },
    {
        id: '11',
        name: 'AMB',
        symbol: 'amber',
        image: 'https://assets.coingecko.com/coins/images/1041/standard/amb.png?1696502148', // Image placeholder, replace as necessary
        transactions: [
            { date: '2024-12-26 16:24:57', price: 0.00740351, amount: 49.07644172 }, // New transaction
        ],
    },
    {
        id: '12',
        name: 'MDT',
        symbol: 'measurable-data-token',
        image: 'https://assets.coingecko.com/coins/images/2441/standard/mdt_icon_120x120.png?1711452723', // Image placeholder, replace as necessary
        transactions: [
            { date: '2024-12-26 16:22:17', price: 0.0616507, amount: 5.89349478 }, // New transaction
        ],
    },
    {
        id: '13',
        name: 'DOGE',
        symbol: 'dogecoin',
        image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        transactions: [
            { date: '2024-12-26 16:20:04', price: 0.319657, amount: 1.13664987 }, // New transaction
        ],
    },
    {
        id: '14',
        name: 'AGLD',
        symbol: 'adventure-gold',
        image: 'https://assets.coingecko.com/coins/images/18125/standard/lpgblc4h_400x400.jpg?1696517628',
        transactions: [
            { date: '2024-12-31 16:38:32', price: 2.66551, amount: 0.31641872 },
        ],
    },
    {
        id: '15',
        name: 'LUNA',
        symbol: 'terra-luna-2',
        image: 'https://assets.coingecko.com/coins/images/25767/standard/01_Luna_color.png?1696524851',
        transactions: [
            { date: '2024-12-31 16:38:32', price: 0.424088, amount: 0.51239366 },
        ],
    },
    {
        id: '16',
        name: 'VET',
        symbol: 'vechain',
        image: 'https://assets.coingecko.com/coins/images/1167/standard/VET_Token_Icon.png?1710013505',
        transactions: [
            { date: '2024-12-31 16:38:32', price: 0.0437559 , amount: 4.96619234 },
        ],
    },
    {

        id: '17',
        name: 'BNB',
        symbol: 'binancecoin',
        image: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970',
        transactions: [
            { date: '2024-12-31 16:25:17', price: 709.148, amount: 0.00301 },
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
