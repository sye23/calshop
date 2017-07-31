export interface Setup{
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    majorLegalHolidays: boolean;
    minorLegalHolidays: boolean;
    hoursFrom: string;
    hoursTo: string;
    sessionLength: number;
    sessionPrice: number;
    timeBtwApp: number;
    minSessionsAllowed: number;
    offerPackages: boolean;
    packageAmount: number;
    packagePrice: number;
    cancellationPolicy: boolean;
    cancelBefore: number;
    allowInstallmentPayments: boolean;
    bookInAdvance: number;
    delelictClient: number;
    haveAdditionalTrainers: boolean;
}