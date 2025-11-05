type Option = { label: string; value: string };

export const citiesByState: Record<string, Option[]> = {
    CA: [
        { label: "Los Angeles", value: "los_angeles" },
        { label: "San Francisco", value: "san_francisco" },
    ],
    TX: [
        { label: "Houston", value: "houston" },
        { label: "Dallas", value: "dallas" },
    ],
    WA: [
        { label: "Seattle", value: "seattle" },
        { label: "Spokane", value: "spokane" },
    ],
    MA: [
        { label: "Boston", value: "boston" },
        { label: "Cambridge", value: "cambridge" },
    ],
    NY: [
        { label: "New York City", value: "nyc" },
        { label: "Buffalo", value: "buffalo" },
    ],

    // 🇩🇪 Germany
    BY: [
        { label: "Munich", value: "munich" },
        { label: "Nuremberg", value: "nuremberg" },
    ],
    BE: [
        { label: "Berlin", value: "berlin" },
        { label: "Charlottenburg", value: "charlottenburg" },
    ],
    NW: [
        { label: "Cologne", value: "cologne" },
        { label: "Düsseldorf", value: "dusseldorf" },
    ],
    HE: [
        { label: "Frankfurt", value: "frankfurt" },
        { label: "Wiesbaden", value: "wiesbaden" },
    ],
    BW: [
        { label: "Stuttgart", value: "stuttgart" },
        { label: "Heidelberg", value: "heidelberg" },
    ],

    // 🇫🇷 France
    IDF: [
        { label: "Paris", value: "paris" },
        { label: "Versailles", value: "versailles" },
    ],
    ARA: [
        { label: "Lyon", value: "lyon" },
        { label: "Grenoble", value: "grenoble" },
    ],
    OCC: [
        { label: "Toulouse", value: "toulouse" },
        { label: "Montpellier", value: "montpellier" },
    ],
    PACA: [
        { label: "Nice", value: "nice" },
        { label: "Marseille", value: "marseille" },
    ],
    NAQ: [
        { label: "Bordeaux", value: "bordeaux" },
        { label: "Limoges", value: "limoges" },
    ],

    // 🇨🇦 Canada
    ON: [
        { label: "Toronto", value: "toronto" },
        { label: "Ottawa", value: "ottawa" },
    ],
    BC: [
        { label: "Vancouver", value: "vancouver" },
        { label: "Victoria", value: "victoria" },
    ],
    AB: [
        { label: "Calgary", value: "calgary" },
        { label: "Edmonton", value: "edmonton" },
    ],
    QC: [
        { label: "Montreal", value: "montreal" },
        { label: "Quebec City", value: "quebec_city" },
    ],
    MB: [
        { label: "Winnipeg", value: "winnipeg" },
        { label: "Brandon", value: "brandon" },
    ],

    // 🇦🇺 Australia
    NSW: [
        { label: "Sydney", value: "sydney" },
        { label: "Newcastle", value: "newcastle" },
    ],
    VIC: [
        { label: "Melbourne", value: "melbourne" },
        { label: "Geelong", value: "geelong" },
    ],
    QLD: [
        { label: "Brisbane", value: "brisbane" },
        { label: "Gold Coast", value: "gold_coast" },
    ],
    SA: [
        { label: "Adelaide", value: "adelaide" },
        { label: "Mount Gambier", value: "mount_gambier" },
    ],

    // 🇬🇧 United Kingdom
    ENG: [
        { label: "London", value: "london" },
        { label: "Manchester", value: "manchester" },
    ],
    SCT: [
        { label: "Edinburgh", value: "edinburgh" },
        { label: "Glasgow", value: "glasgow" },
    ],
    WLS: [
        { label: "Cardiff", value: "cardiff" },
        { label: "Swansea", value: "swansea" },
    ],
    NIR: [
        { label: "Belfast", value: "belfast" },
        { label: "Derry", value: "derry" },
    ],
    LDN: [
        { label: "Croydon", value: "croydon" },
        { label: "Harrow", value: "harrow" },
    ],

    // 🇳🇱 Netherlands
    NH: [
        { label: "Amsterdam", value: "amsterdam" },
        { label: "Haarlem", value: "haarlem" },
    ],
    ZH: [
        { label: "Rotterdam", value: "rotterdam" },
        { label: "The Hague", value: "the_hague" },
    ],
    UT: [
        { label: "Utrecht", value: "utrecht" },
        { label: "Nieuwegein", value: "nieuwegein" },
    ],
    NB: [
        { label: "Eindhoven", value: "eindhoven" },
        { label: "Breda", value: "breda" },
    ],
    GE: [
        { label: "Arnhem", value: "arnhem" },
        { label: "Nijmegen", value: "nijmegen" },
    ],

    // 🇮🇪 Ireland
    D: [
        { label: "Dublin City", value: "dublin_city" },
        { label: "Swords", value: "swords" },
    ],
    C: [
        { label: "Cork City", value: "cork_city" },
        { label: "Douglas", value: "douglas" },
    ],
    G: [
        { label: "Galway City", value: "galway_city" },
        { label: "Tuam", value: "tuam" },
    ],
    L: [
        { label: "Limerick City", value: "limerick_city" },
        { label: "Newcastle West", value: "newcastle_west" },
    ],
    W: [
        { label: "Waterford City", value: "waterford_city" },
        { label: "Dungarvan", value: "dungarvan" },
    ],

    // 🇸🇬 Singapore (regions)
    CR: [
        { label: "Downtown Core", value: "downtown_core" },
        { label: "Orchard", value: "orchard" },
    ],
    NR: [
        { label: "Woodlands", value: "woodlands" },
        { label: "Sembawang", value: "sembawang" },
    ],
    NER: [
        { label: "Hougang", value: "hougang" },
        { label: "Sengkang", value: "sengkang" },
    ],
    ER: [
        { label: "Tampines", value: "tampines" },
        { label: "Bedok", value: "bedok" },
    ],
    WR: [
        { label: "Jurong East", value: "jurong_east" },
        { label: "Clementi", value: "clementi" },
    ],
    // 🇰🇷 South Korea
    "11": [
        { label: "Seoul", value: "seoul" },
        { label: "Gangnam", value: "gangnam" },
    ],
    "31": [
        { label: "Suwon", value: "suwon" },
        { label: "Goyang", value: "goyang" },
    ],
    "26": [
        { label: "Busan", value: "busan" },
        { label: "Haeundae", value: "haeundae" },
    ],
    "28": [
        { label: "Incheon", value: "incheon" },
        { label: "Bupyeong", value: "bupyeong" },
    ],

    // 🇯🇵 Japan
    "13": [
        { label: "Tokyo", value: "tokyo" },
        { label: "Shinjuku", value: "shinjuku" },
    ],
    "14": [
        { label: "Yokohama", value: "yokohama" },
        { label: "Kawasaki", value: "kawasaki" },
    ],
    "27": [
        { label: "Osaka", value: "osaka" },
        { label: "Sakai", value: "sakai" },
    ],
    "23": [
        { label: "Nagoya", value: "nagoya" },
        { label: "Toyota", value: "toyota" },
    ],
    "40": [
        { label: "Fukuoka", value: "fukuoka" },
        { label: "Kitakyushu", value: "kitakyushu" },
    ],

    // 🇨🇳 China
    BJ: [
        { label: "Beijing City", value: "beijing_city" },
        { label: "Haidian", value: "haidian" },
    ],
    SH: [
        { label: "Shanghai City", value: "shanghai_city" },
        { label: "Pudong", value: "pudong" },
    ],
    GD: [
        { label: "Guangzhou", value: "guangzhou" },
        { label: "Shenzhen", value: "shenzhen" },
    ],
    ZJ: [
        { label: "Hangzhou", value: "hangzhou" },
        { label: "Ningbo", value: "ningbo" },
    ],
    JS: [
        { label: "Nanjing", value: "nanjing" },
        { label: "Suzhou", value: "suzhou" },
    ],

    // 🇧🇷 Brazil
    SP: [
        { label: "São Paulo", value: "sao_paulo" },
        { label: "Campinas", value: "campinas" },
    ],
    RJ: [
        { label: "Rio de Janeiro", value: "rio_de_janeiro" },
        { label: "Niterói", value: "niteroi" },
    ],
    MG: [
        { label: "Belo Horizonte", value: "belo_horizonte" },
        { label: "Uberlândia", value: "uberlandia" },
    ],
    SC: [
        { label: "Florianópolis", value: "florianopolis" },
        { label: "Joinville", value: "joinville" },
    ],
    PR: [
        { label: "Curitiba", value: "curitiba" },
        { label: "Londrina", value: "londrina" },
    ],

    // 🇮🇳 India
    KA: [
        { label: "Bengaluru", value: "bengaluru" },
        { label: "Mysuru", value: "mysuru" },
    ],
    MH: [
        { label: "Mumbai", value: "mumbai" },
        { label: "Pune", value: "pune" },
    ],
    TG: [
        { label: "Hyderabad", value: "hyderabad" },
        { label: "Warangal", value: "warangal" },
    ],
    TN: [
        { label: "Chennai", value: "chennai" },
        { label: "Coimbatore", value: "coimbatore" },
    ],
    GJ: [
        { label: "Ahmedabad", value: "ahmedabad" },
        { label: "Surat", value: "surat" },
    ],

    // 🇮🇱 Israel
    TA: [
        { label: "Tel Aviv", value: "tel_aviv" },
        { label: "Ramat Gan", value: "ramat_gan" },
    ],
    MD: [
        { label: "Petah Tikva", value: "petah_tikva" },
        { label: "Netanya", value: "netanya" },
    ],
    JM: [
        { label: "Jerusalem", value: "jerusalem" },
        { label: "Beit Shemesh", value: "beit_shemesh" },
    ],
    HA: [
        { label: "Haifa", value: "haifa" },
        { label: "Hadera", value: "hadera" },
    ],

    // 🇸🇪 Sweden
    ST: [
        { label: "Stockholm", value: "stockholm" },
        { label: "Solna", value: "solna" },
    ],
    VG: [
        { label: "Gothenburg", value: "gothenburg" },
        { label: "Borås", value: "boras" },
    ],
    SK: [
        { label: "Malmö", value: "malmo" },
        { label: "Lund", value: "lund" },
    ],
    OE: [
        { label: "Linköping", value: "linkoping" },
        { label: "Norrköping", value: "norrkoping" },
    ],
    UP: [
        { label: "Uppsala", value: "uppsala" },
        { label: "Enköping", value: "enkoping" },
    ],

    // 🇵🇱 Poland
    MAZ: [
        { label: "Warsaw", value: "warsaw" },
        { label: "Radom", value: "radom" },
    ],
    WPL: [
        { label: "Poznań", value: "poznan" },
        { label: "Kalisz", value: "kalisz" },
    ],
    SL: [
        { label: "Katowice", value: "katowice" },
        { label: "Gliwice", value: "gliwice" },
    ],
    MAL: [
        { label: "Kraków", value: "krakow" },
        { label: "Tarnów", value: "tarnow" },
    ],
    LDZ: [
        { label: "Łódź", value: "lodz" },
        { label: "Piotrków Trybunalski", value: "piotrkow_trybunalski" },
    ],

    // 🇵🇹 Portugal
    LI: [
        { label: "Lisbon", value: "lisbon" },
        { label: "Amadora", value: "amadora" },
    ],
    PO: [
        { label: "Porto", value: "porto" },
        { label: "Vila Nova de Gaia", value: "vila_nova_de_gaia" },
    ],
    AV: [
        { label: "Aveiro", value: "aveiro" },
        { label: "Ílhavo", value: "ilhavo" },
    ],
    CO: [
        { label: "Coimbra", value: "coimbra" },
        { label: "Figueira da Foz", value: "figueira_da_foz" },
    ],

    // 🇹🇭 Thailand
    BK: [
        { label: "Bangkok", value: "bangkok" },
        { label: "Nonthaburi", value: "nonthaburi" },
    ],
    CM: [
        { label: "Chiang Mai", value: "chiang_mai" },
        { label: "Lamphun", value: "lamphun" },
    ],
    PK: [
        { label: "Phuket Town", value: "phuket_town" },
        { label: "Patong", value: "patong" },
    ],
    CB: [
        { label: "Pattaya", value: "pattaya" },
        { label: "Chon Buri City", value: "chon_buri_city" },
    ],
    KK: [
        { label: "Khon Kaen City", value: "khon_kaen_city" },
        { label: "Udon Thani", value: "udon_thani" },
    ],
};
