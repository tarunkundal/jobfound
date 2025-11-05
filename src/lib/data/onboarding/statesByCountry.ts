type StateMap = Record<
    string,
    { label: string; value: string }[]
>;

export const statesByCountry: StateMap = {
    US: [
        { label: "California", value: "CA" },
        { label: "Texas", value: "TX" },
        { label: "Washington", value: "WA" },
        { label: "Massachusetts", value: "MA" },
        { label: "New York", value: "NY" },
    ],
    // 1. Germany (DE)
    DE: [
        { label: "Bavaria", value: "BY" },
        { label: "Berlin", value: "BE" },
        { label: "North Rhine-Westphalia", value: "NW" },
        { label: "Hesse", value: "HE" },
        { label: "Baden-Württemberg", value: "BW" },
    ],
    // 2. France (FR)
    FR: [
        { label: "Île-de-France", value: "IDF" },
        { label: "Auvergne-Rhône-Alpes", value: "ARA" },
        { label: "Occitanie", value: "OCC" },
        { label: "Provence-Alpes-Côte d’Azur", value: "PACA" },
        { label: "Nouvelle-Aquitaine", value: "NAQ" },
    ],
    // 3. Canada (CA) – you already have, but including again for clarity
    CA: [
        { label: "Ontario", value: "ON" },
        { label: "British Columbia", value: "BC" },
        { label: "Alberta", value: "AB" },
        { label: "Quebec", value: "QC" },
        { label: "Manitoba", value: "MB" },
    ],
    // 4. Australia (AU)
    AU: [
        { label: "New South Wales", value: "NSW" },
        { label: "Victoria", value: "VIC" },
        { label: "Queensland", value: "QLD" },
        { label: "Western Australia", value: "WA" },
        { label: "South Australia", value: "SA" },
    ],
    // 5. United Kingdom (GB)
    GB: [
        { label: "England", value: "ENG" },
        { label: "Scotland", value: "SCT" },
        { label: "Wales", value: "WLS" },
        { label: "Northern Ireland", value: "NIR" },
        { label: "Greater London", value: "LDN" },
    ],
    // 6. Netherlands (NL)
    NL: [
        { label: "North Holland", value: "NH" },
        { label: "South Holland", value: "ZH" },
        { label: "Utrecht", value: "UT" },
        { label: "North Brabant", value: "NB" },
        { label: "Gelderland", value: "GE" },
    ],
    // 7. Ireland (IE)
    IE: [
        { label: "Dublin", value: "D" },
        { label: "Cork", value: "C" },
        { label: "Galway", value: "G" },
        { label: "Limerick", value: "L" },
        { label: "Waterford", value: "W" },
    ],
    // 8. Singapore (SG) – city-state but treat as “region”
    SG: [
        { label: "Central Region", value: "CR" },
        { label: "North Region", value: "NR" },
        { label: "North-East Region", value: "NER" },
        { label: "East Region", value: "ER" },
        { label: "West Region", value: "WR" },
    ],
    // 9. South Korea (KR)
    KR: [
        { label: "Seoul", value: "11" },
        { label: "Gyeonggi-do", value: "31" },
        { label: "Busan", value: "26" },
        { label: "Incheon", value: "28" },
        { label: "Daegu", value: "27" },
    ],
    // 10. Japan (JP)
    JP: [
        { label: "Tokyo", value: "13" },
        { label: "Kanagawa", value: "14" },
        { label: "Osaka", value: "27" },
        { label: "Aichi", value: "23" },
        { label: "Fukuoka", value: "40" },
    ],
    // 11. China (CN)
    CN: [
        { label: "Beijing", value: "BJ" },
        { label: "Shanghai", value: "SH" },
        { label: "Guangdong", value: "GD" },
        { label: "Zhejiang", value: "ZJ" },
        { label: "Jiangsu", value: "JS" },
    ],
    // 12. Brazil (BR)
    BR: [
        { label: "São Paulo", value: "SP" },
        { label: "Rio de Janeiro", value: "RJ" },
        { label: "Minas Gerais", value: "MG" },
        { label: "Santa Catarina", value: "SC" },
        { label: "Paraná", value: "PR" },
    ],
    // 13. India (IN)
    IN: [
        { label: "Karnataka", value: "KA" },
        { label: "Maharashtra", value: "MH" },
        { label: "Telangana", value: "TG" },
        { label: "Tamil Nadu", value: "TN" },
        { label: "Gujarat", value: "GJ" },
    ],
    // 14. Ireland (IE) – already above but note
    // 15. Israel (IL)
    IL: [
        { label: "Tel Aviv District", value: "TA" },
        { label: "Central District", value: "MD" },
        { label: "Jerusalem District", value: "JM" },
        { label: "Haifa District", value: "HA" },
        { label: "Northern District", value: "NW" },
    ],
    // 16. Sweden (SE)
    SE: [
        { label: "Stockholm County", value: "ST" },
        { label: "Västra Götaland", value: "VG" },
        { label: "Skåne County", value: "SK" },
        { label: "Östergötland County", value: "OE" },
        { label: "Uppsala County", value: "UP" },
    ],
    // 17. Switzerland (CH)
    CH: [
        { label: "Zurich", value: "ZH" },
        { label: "Geneva", value: "GE" },
        { label: "Vaud", value: "VD" },
        { label: "Bern", value: "BE" },
        { label: "Basel-Stadt", value: "BS" },
    ],
    // 18. Poland (PL)
    PL: [
        { label: "Mazowieckie", value: "MAZ" },
        { label: "Wielkopolskie", value: "WPL" },
        { label: "Śląskie", value: "SL" },
        { label: "Małopolskie", value: "MAL" },
        { label: "Łódź-kie", value: "LDZ" },
    ],
    // 19. Portugal (PT)
    PT: [
        { label: "Lisbon", value: "LI" },
        { label: "Porto", value: "PO" },
        { label: "Setúbal", value: "ST" },
        { label: "Aveiro", value: "AV" },
        { label: "Coimbra", value: "CO" },
    ],
    // 20. Thailand (TH)
    TH: [
        { label: "Bangkok", value: "BK" },
        { label: "Chiang Mai", value: "CM" },
        { label: "Phuket", value: "PK" },
        { label: "Chon Buri", value: "CB" },
        { label: "Khon Kaen", value: "KK" },
    ],
};
